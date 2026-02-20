#!/usr/bin/env node
/**
 * Postinstall: decode callback URL in next-auth assert.js to fix INVALID_CALLBACK_URL_ERROR
 * when callback URL is stored encoded in cookie/query.
 */
const path = require("path");
const fs = require("fs");

const assertPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "next-auth",
  "core",
  "lib",
  "assert.js"
);

if (!fs.existsSync(assertPath)) {
  process.exit(0);
}

let content = fs.readFileSync(assertPath, "utf8");
const original = content;

const alreadyParam = content.includes("decodeURIComponent(callbackUrlParam)");
const alreadyCookie = content.includes("decodeURIComponent(callbackUrlCookie)");
if (alreadyParam && alreadyCookie) {
  process.exit(0);
}

// Param: const -> let and insert decode block before "const url = (0, _parseUrl.default)"
const paramPattern = /const callbackUrlParam = \(_req\$query2 = req\.query\) === null \|\| _req\$query2 === void 0 \? void 0 : _req\$query2\.callbackUrl;\s*const url = \(0, _parseUrl\.default\)\(req\.origin\)/;
const paramReplacement = `let callbackUrlParam = (_req$query2 = req.query) === null || _req$query2 === void 0 ? void 0 : _req$query2.callbackUrl;
  if (typeof callbackUrlParam === "string") {
    try {
      callbackUrlParam = decodeURIComponent(callbackUrlParam);
    } catch (_) {}
  }
  const url = (0, _parseUrl.default)(req.origin)`;

if (!alreadyParam) {
  const afterParam = content.replace(paramPattern, paramReplacement);
  if (afterParam === content) {
    console.error("patch-next-auth-callback-url: FAILED to match callbackUrlParam pattern (next-auth version or format may differ)");
    process.exit(1);
  }
  content = afterParam;
}

// Cookie: const -> let and insert decode block before "if (callbackUrlCookie && !isValidHttpUrl"
const cookiePattern = /const callbackUrlCookie = \(_req\$cookies = req\.cookies\) === null \|\| _req\$cookies === void 0 \? void 0 : _req\$cookies\[\(_options\$cookies\$call = \(_options\$cookies = options\.cookies\) === null \|\| _options\$cookies === void 0 \|\| \(_options\$cookies = _options\$cookies\.callbackUrl\) === null \|\| _options\$cookies === void 0 \? void 0 : _options\$cookies\.name\) !== null && _options\$cookies\$call !== void 0 \? _options\$cookies\$call : defaultCallbackUrl\.name\];\s*if \(callbackUrlCookie && !isValidHttpUrl\(callbackUrlCookie, url\.base\)\)/;
const cookieReplacement = `let callbackUrlCookie = (_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies[(_options$cookies$call = (_options$cookies = options.cookies) === null || _options$cookies === void 0 || (_options$cookies = _options$cookies.callbackUrl) === null || _options$cookies === void 0 ? void 0 : _options$cookies.name) !== null && _options$cookies$call !== void 0 ? _options$cookies$call : defaultCallbackUrl.name];
  if (typeof callbackUrlCookie === "string") {
    try {
      callbackUrlCookie = decodeURIComponent(callbackUrlCookie);
    } catch (_) {}
  }
  if (callbackUrlCookie && !isValidHttpUrl(callbackUrlCookie, url.base))`;

if (!alreadyCookie) {
  const afterCookie = content.replace(cookiePattern, cookieReplacement);
  if (afterCookie === content) {
    console.error("patch-next-auth-callback-url: FAILED to match callbackUrlCookie pattern (next-auth version or format may differ)");
    process.exit(1);
  }
  content = afterCookie;
}

if (content === original) {
  process.exit(0);
}
fs.writeFileSync(assertPath, content);
console.log("patch-next-auth-callback-url: applied decodeURIComponent fix to next-auth assert.js");
