/**
 * Upload restoration images to Supabase Storage (public bucket).
 * Bucket must allow JPG/PNG, max 10MB per file.
 */

import { supabaseAdmin } from "@/lib/supabase";

const BUCKET = process.env.SUPABASE_RESTORATIONS_BUCKET ?? "photos";

export type UploadResult = {
  originalUrl: string;
  restoredUrl: string;
};

function getExt(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/jpeg" || mime === "image/jpg") return "jpg";
  return "png";
}

export async function uploadRestorationImages(
  userId: string,
  restorationId: string,
  originalBase64: string,
  restoredBase64: string,
  originalMime: string,
  restoredMime: string
): Promise<UploadResult> {
  const origExt = getExt(originalMime);
  const restExt = getExt(restoredMime);
  const prefix = `${userId}/${restorationId}`;
  const originalPath = `${prefix}-original.${origExt}`;
  const restoredPath = `${prefix}-restored.${restExt}`;

  const origBuffer = Buffer.from(originalBase64, "base64");
  const restBuffer = Buffer.from(restoredBase64, "base64");

  const { error: err1 } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(originalPath, origBuffer, {
      contentType: origExt === "png" ? "image/png" : "image/jpeg",
      upsert: true,
    });

  if (err1) throw new Error(`Upload original failed: ${err1.message}`);

  const { error: err2 } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(restoredPath, restBuffer, {
      contentType: restExt === "png" ? "image/png" : "image/jpeg",
      upsert: true,
    });

  if (err2) throw new Error(`Upload restored failed: ${err2.message}`);

  const { data: urlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(originalPath);
  const { data: urlData2 } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(restoredPath);

  return {
    originalUrl: urlData.publicUrl,
    restoredUrl: urlData2.publicUrl,
  };
}
