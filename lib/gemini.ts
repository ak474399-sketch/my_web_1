/**
 * Gemini API 调用与系统提示词核心逻辑
 * 使用支持图像输出的模型，实现老照片修复并返回修复后的图像
 */

import { GoogleGenAI, Modality } from "@google/genai";

const RESTORE_SYSTEM_PROMPT = `You are an advanced neural image reconstruction engine. Your EXCLUSIVE goal is to perform high-fidelity physical restoration of the uploaded image.

MANDATORY STEPS:
1. De-scratching: Identify and surgically remove every white scratch and dust spot.
2. Denoising: Eliminate film grain and digital artifacts without losing edge sharpness.
3. Face Reconstruction: Detect all faces (main subjects and background crowd) and perform neural face enhancement for 4K clarity.
4. Colorization: If the image is B&W, apply historically accurate color palettes.

CONSTRAINTS:
- OUTPUT ONLY THE FINAL RESTORED IMAGE DATA.
- DO NOT PRESERVE ANY AGING TEXTURES.
- NO TEXTUAL EXPLANATIONS.`;

const RESTORE_USER_PROMPT = `Restore this photo.`;

export type RestoreInput = {
  imageBase64: string;
  mimeType?: string;
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
  const { imageBase64, mimeType = "image/jpeg", userPrompt } = input;
  const client = getClient();

  try {
    const prompt = userPrompt?.trim() || RESTORE_USER_PROMPT;

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
