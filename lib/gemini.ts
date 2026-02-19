/**
 * Gemini API 调用与系统提示词核心逻辑
 * 使用支持图像输出的模型，实现老照片修复并返回修复后的图像
 * 按修复类型(slug)选用对应专业提示词，提升修复效果
 */

import { GoogleGenAI, Modality } from "@google/genai";

const RESTORE_SYSTEM_PROMPT = `You are an advanced neural image reconstruction engine. Your EXCLUSIVE goal is to perform the restoration task specified by the user on the uploaded image.

CONSTRAINTS:
- OUTPUT ONLY THE FINAL RESTORED IMAGE DATA.
- NO TEXTUAL EXPLANATIONS.
- Follow the user's restoration instruction precisely.`;

/** 按功能 slug 映射的专业修复提示词（用户可见指令，传给模型） */
export const RESTORE_PROMPTS_BY_SLUG: Record<string, string> = {
  "old-photo-restoration":
    "Act as a professional photo conservator. Analyze this vintage photograph for age-related degradation. Perform a holistic restoration: balance exposure, neutralize yellowing/fading, and enhance global contrast while preserving the original historical texture and skin tones.",
  "faded-photo-repair":
    "Analyze the histogram of this faded image. Re-establish true black and white points to recover lost depth. Recalibrate saturation and vibrancy to bring back natural colors that have washed out over time, ensuring a balanced, lifelike dynamic range.",
  "scratch-removal":
    "Identify and isolate non-image artifacts such as physical scratches, fold lines, and creases. Use advanced inpainting logic to seamlessly fill these gaps by sampling surrounding textures. Ensure no repetitive patterns are created and original facial features remain untouched.",
  "water-damaged-photo-repair":
    "Identify water-stain boundaries, mold spots, and tide lines. Reconstruct the original color and detail beneath damage. Correct dye bleeding and paper warping artifacts. Restore the image to a clean, continuous photograph.",
  "black-and-white-photo-colorization":
    "Perform a highly realistic colorization of this monochrome image. Use AI vision to identify materials (textiles, skin, vegetation, sky) and apply historically accurate color palettes. Pay special attention to realistic skin undertones and ambient lighting consistency.",
  "blurry-photo-fix":
    "Apply deblurring algorithms to this image. Analyze the blur kernel (motion or focus) and reverse it. Enhance edge definition and fine details (like eyelashes or fabric weave) without introducing 'ringing' artifacts or excessive digital noise.",
  "photo-noise-reduction":
    "Conduct a deep scan for micro-scratches and dust particles. Execute a precision 'digital cleaning' process. Focus on maintaining the sharpness of the underlying grain while removing only the top-layer physical damage and noise.",
  "face-enhancement":
    "Detect all human faces in the image. Apply deep facial reconstruction to sharpen eyes, lips, and skin texture. Ensure the results maintain the subject's identity and avoid a 'plastic' or 'uncanny valley' appearance. Upscale facial resolution significantly.",
  "torn-photo-repair":
    "Analyze the missing sections and ripped edges of this photo. Synthesize missing data by extrapolating from existing visual context. Perfectly align the torn fragments and blend the seams to make the image appear as a single, continuous print.",
  "vintage-photo-enhancement":
    "Target specific color channels that have decayed (often the cyan or yellow layers). Reconstruct the original color balance based on chemical photographic aging patterns. Restore the 'soul' of the photo by recovering deep shadows and highlights.",
  "polaroid-photo-restoration":
    "Treat this as an instant-film print. Correct characteristic color casts and emulsion degradation. Restore punchy, saturated colors and remove haze, scratches, or yellowing of the border while preserving the period look.",
  "book-photo-restoration":
    "Treat this as a scan from a physical publication. Neutralize the paper grain and print-through (text from the other side of the page). Identify and smooth half-tone or moiré patterns while retaining image detail. Enhance the contrast and clarity to make the printed image look like an original high-resolution photograph.",
};

const DEFAULT_USER_PROMPT = "Restore this photo.";

export type RestoreInput = {
  imageBase64: string;
  mimeType?: string;
  /** 修复类型 slug，用于选择专业提示词 */
  slug?: string;
  userPrompt?: string;
};

export type RestoreResult = {
  success: boolean;
  text?: string;
  imageBase64?: string;
  imageMimeType?: string;
  error?: string;
};

function getClient() {
  const raw = process.env.GEMINI_API_KEY;
  const apiKey = raw?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return new GoogleGenAI({ apiKey });
}

export async function restorePhoto(input: RestoreInput): Promise<RestoreResult> {
  const { imageBase64, mimeType = "image/jpeg", slug, userPrompt } = input;
  const client = getClient();

  try {
    const prompt =
      userPrompt?.trim() ||
      (slug && RESTORE_PROMPTS_BY_SLUG[slug]) ||
      DEFAULT_USER_PROMPT;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType,
                data: imageBase64,
              },
            },
            { text: prompt },
          ],
        },
      ],
      config: {
        systemInstruction: RESTORE_SYSTEM_PROMPT,
        responseModalities: [Modality.TEXT, Modality.IMAGE],
        maxOutputTokens: 8192,
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];

    // 提取图像
    const imagePart = parts.find(
      (p): p is { inlineData: { mimeType: string; data: string } } =>
        "inlineData" in p && !!p.inlineData?.data
    );
    const imageBase64Out = imagePart?.inlineData?.data;
    const imageMimeOut = imagePart?.inlineData?.mimeType;

    // 提取文本
    const text = parts
      .filter((p): p is { text: string } => "text" in p && !!p.text)
      .map((p) => p.text)
      .join("")
      .trim();

    if (!imageBase64Out && !text) {
      return { success: false, error: "Gemini 未返回图像或文字" };
    }

    return {
      success: true,
      text: text || (imageBase64Out ? "修复完成" : ""),
      ...(imageBase64Out && {
        imageBase64: imageBase64Out,
        imageMimeType: imageMimeOut ?? "image/png",
      }),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
