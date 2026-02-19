/**
 * 清空 Supabase 业务数据（restorations 表）
 * 用法: node --env-file=.env.local scripts/clear-db.mjs
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("缺少 NEXT_PUBLIC_SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY，请使用 .env.local");
  process.exit(1);
}

const admin = createClient(url, key);

async function main() {
  const { error } = await admin.from("restorations").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) {
    console.error("清空 restorations 失败:", error.message);
    process.exit(1);
  }
  console.log("已清空 restorations 表。");
}

main();
