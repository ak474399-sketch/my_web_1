export type FaqItem = { question: string; answer: string };

export type SlugData = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  intro: string;
  faqs: FaqItem[];
  iconName: string;
  previewBefore: string;
  previewAfter: string;
};

export const RESTORE_SLUGS: Record<string, SlugData> = {
  "old-photo-restoration": {
    slug: "old-photo-restoration",
    keyword: "Old Photo Restoration",
    iconName: "Clock",
    previewBefore: "https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?w=400&q=60&sat=-100",
    previewAfter: "https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?w=400&q=80",
    title: "Old Photo Restoration Online Free",
    description:
      "Restore old photos online for free with AI. Remove scratches, fix fading, enhance faces, and bring your vintage memories back to life in seconds.",
    intro:
      "Old photo restoration is the process of digitally repairing photographs that have deteriorated over time due to physical damage, chemical degradation, or environmental exposure. Our AI-powered restoration engine analyzes each image at the pixel level, detecting scratches, creases, water stains, and color shifts that have accumulated over decades. Using advanced neural networks trained on millions of historical photographs, the system reconstructs missing details, rebuilds facial features with remarkable accuracy, and restores the original tonal range. Whether your photo is from the 1920s or the 1990s, the AI adapts its approach to match the era-appropriate aesthetic while delivering crystal-clear results. The entire process takes just seconds — upload your image and watch decades of damage disappear.",
    faqs: [
      { question: "How does AI old photo restoration work?", answer: "Our AI scans your photo to identify damage like scratches, fading, and noise. It then uses neural networks trained on millions of images to reconstruct missing details, enhance faces, and restore colors to their original quality." },
      { question: "What types of old photo damage can be fixed?", answer: "The AI handles scratches, creases, water damage, yellowing, fading, torn edges, dust spots, and general blurriness. It can also colorize black-and-white photos with historically accurate palettes." },
      { question: "Will the restored photo look natural?", answer: "Yes. The AI preserves the original composition and character of your photo while removing only the damage. Faces are enhanced to be clear without looking artificial." },
    ],
  },
  "faded-photo-repair": {
    slug: "faded-photo-repair",
    keyword: "Faded Photo Repair",
    iconName: "Sun",
    previewBefore: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=40&sat=-80",
    previewAfter: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    title: "Faded Photo Repair — Restore Color & Contrast",
    description:
      "Fix faded and washed-out photos instantly with AI. Restore lost colors, improve contrast, and bring vibrancy back to sun-damaged or aged photographs.",
    intro:
      "Faded photo repair targets one of the most common forms of photographic deterioration: the gradual loss of color density and contrast caused by prolonged light exposure, chemical instability in print materials, and improper storage conditions. Over time, dyes in photographic prints break down — reds shift toward pink, blues wash out, and the entire image takes on a flat, milky appearance. Our AI restoration engine reverses this process by analyzing the remaining color information and intelligently reconstructing the original tonal balance. The system understands how different photographic processes (C-prints, Kodachrome, Ektachrome) fade differently and applies era-specific correction curves. Beyond simple contrast boosting, the AI performs selective color channel reconstruction, bringing depth back to shadows and richness to highlights while preserving the authentic character of the original photograph.",
    faqs: [
      { question: "Can AI restore completely faded photos?", answer: "Even severely faded photos retain trace color information invisible to the human eye. Our AI amplifies and reconstructs these traces to restore remarkably accurate colors." },
      { question: "Will the colors look accurate after repair?", answer: "The AI uses era-specific color science to match how photos from different decades originally looked. It applies historically informed palettes rather than generic color boosting." },
      { question: "Does faded photo repair work on both prints and scans?", answer: "Yes. Whether you scan a physical print or upload a photo of the print, the AI detects and corrects fading regardless of how the image was digitized." },
    ],
  },
  "scratch-removal": {
    slug: "scratch-removal",
    keyword: "Photo Scratch Removal",
    iconName: "Eraser",
    previewBefore: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=40&sat=-60",
    previewAfter: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80",
    title: "Photo Scratch Removal — AI-Powered Repair",
    description:
      "Remove scratches, creases, and dust marks from photos using AI. Our neural engine detects and repairs surface damage while preserving every detail.",
    intro:
      "Photo scratch removal is one of the most technically demanding aspects of image restoration. Scratches, creases, and surface abrasions create irregular patterns of missing data that cut across fine details, textures, and facial features. Traditional methods require painstaking manual work with clone-stamp tools and hours of careful retouching. Our AI approach transforms this into an instant process. The neural network distinguishes between intentional image content and physical damage by analyzing texture continuity, color flow, and edge patterns at a sub-pixel level. It then performs context-aware inpainting — filling each damaged area with content that matches the surrounding region in color, texture, and detail frequency. Deep scratches across faces are repaired with the face reconstruction module that understands facial anatomy and can regenerate realistic skin texture, eye detail, and hair strands that the scratch destroyed.",
    faqs: [
      { question: "Can AI remove deep scratches from photos?", answer: "Yes. The AI handles everything from light surface scratches to deep gouges. For scratches crossing faces, the dedicated face reconstruction module regenerates realistic facial details." },
      { question: "Will scratch removal affect the rest of the image?", answer: "No. The AI precisely targets only the damaged areas. Surrounding pixels remain untouched, preserving all original detail and sharpness." },
      { question: "Can it remove crease marks from folded photos?", answer: "Absolutely. Crease marks are treated similarly to scratches. The AI rebuilds the image content along the fold line, restoring a smooth, crease-free appearance." },
    ],
  },
  "water-damaged-photo-repair": {
    slug: "water-damaged-photo-repair",
    keyword: "Water Damaged Photo Repair",
    iconName: "Droplets",
    previewBefore: "https://images.unsplash.com/photo-1495837174058-628aafc7d610?w=400&q=40&sat=-100",
    previewAfter: "https://images.unsplash.com/photo-1495837174058-628aafc7d610?w=400&q=80",
    title: "Water Damaged Photo Repair with AI",
    description:
      "Repair water-damaged photos online. AI removes water stains, warping artifacts, mold spots, and color bleeding to restore flood or humidity-damaged images.",
    intro:
      "Water damage is among the most destructive forces a photograph can face. Whether from flooding, leaks, humidity, or accidental spills, water causes a cascade of deterioration: emulsion layers swell and separate, dyes bleed across boundaries, mold growth creates dark spots, and mineral deposits leave tide-line stains. The physical warping of the paper substrate adds geometric distortion to the already corrupted image data. Our AI restoration engine tackles each of these issues systematically. It identifies water-stain boundaries and reconstructs the original color beneath them, separates bleeding dye channels to restore proper color placement, removes mold and mineral artifacts, and corrects the subtle geometric distortions caused by paper warping. The result is a clean, flat image that recovers as much of the original photograph as the remaining data allows.",
    faqs: [
      { question: "Can water-stained photos really be restored?", answer: "In most cases, yes. Water stains overlay the original image data, which often remains intact underneath. The AI separates stain patterns from original content to recover the photo beneath." },
      { question: "What about photos stuck together from water damage?", answer: "If you can carefully separate and scan the photos, the AI can repair the surface damage where they were stuck. The more image data that survives, the better the restoration." },
      { question: "Does it fix color bleeding from water damage?", answer: "Yes. The AI analyzes how dyes have migrated and works to place colors back in their original positions, reversing the bleeding effect." },
    ],
  },
  "black-and-white-photo-colorization": {
    slug: "black-and-white-photo-colorization",
    keyword: "Black and White Photo Colorization",
    iconName: "Palette",
    previewBefore: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&q=60&sat=-100",
    previewAfter: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&q=80",
    title: "Black and White Photo Colorization with AI",
    description:
      "Colorize black and white photos automatically with AI. Get historically accurate, natural-looking color applied to your vintage monochrome images.",
    intro:
      "Black and white photo colorization uses artificial intelligence to add realistic, historically informed color to monochrome photographs. Unlike simple tinting or manual colorization that relies on guesswork, our AI system has been trained on vast archives of color-paired historical photographs, learning the relationship between grayscale luminance values and their probable real-world colors across different eras, settings, and subjects. The system recognizes thousands of objects, materials, and contexts — from military uniforms of specific periods to common vegetation, skin tones across ethnicities, and architectural materials. It applies color with remarkable spatial precision, respecting edges and texture boundaries that define the original photograph. The result is a naturally colored image that feels authentic rather than painted, bringing an entirely new dimension to family history, historical archives, and heritage preservation projects.",
    faqs: [
      { question: "How accurate are the colors in AI colorization?", answer: "The AI uses historical references and object recognition to apply period-appropriate colors. While not 100% perfect for unknown subjects, results are remarkably realistic for skin tones, vegetation, skies, and common objects." },
      { question: "Can I adjust the colors after AI colorization?", answer: "The AI delivers a ready-to-use result. For fine-tuning specific colors, you can use any photo editor on the output image." },
      { question: "Does colorization work on very old photos from the 1800s?", answer: "Yes. The AI handles images from any era. Very early photographs may have less detail for the AI to work with, but results are still impressive for most well-preserved images." },
    ],
  },
  "blurry-photo-fix": {
    slug: "blurry-photo-fix",
    keyword: "Blurry Photo Fix",
    iconName: "Focus",
    previewBefore: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=30&blur=2",
    previewAfter: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    title: "Fix Blurry Photos Online — AI Sharpening",
    description:
      "Sharpen blurry photos with AI. Fix out-of-focus images, motion blur, and low-resolution photos to achieve crisp, clear results instantly.",
    intro:
      "Blurry photo restoration addresses one of the most frustrating image quality problems — the loss of sharpness due to camera shake, subject motion, incorrect focus, or simply low-resolution capture on older devices. Our AI sharpening engine goes far beyond traditional unsharp mask filters, which merely amplify existing edges and noise. The neural network understands what sharp versions of objects should look like. When processing a blurry face, it knows the expected structure of eyes, lips, and hair and can reconstruct these features with realistic detail. For landscape scenes, it restores texture in foliage, architecture, and surfaces that blur has smoothed away. The AI also distinguishes between different types of blur — Gaussian (out-of-focus), motion (directional), and compression artifacts — and applies targeted deconvolution strategies for each. The result is a genuinely sharper image with new real detail, not just artificial edge enhancement that creates halos and artifacts.",
    faqs: [
      { question: "Can AI actually add detail to blurry photos?", answer: "Yes. Unlike basic sharpening filters, our AI generates plausible new detail based on learned patterns. It reconstructs facial features, text, and textures that blur has obscured." },
      { question: "Does it work on motion blur?", answer: "Yes. The AI detects the direction and magnitude of motion blur and applies directional deconvolution to reverse it, recovering sharp detail along the blur axis." },
      { question: "Will sharpening introduce noise or artifacts?", answer: "The AI applies simultaneous denoising to prevent noise amplification. Results are clean and natural-looking without the halo artifacts common in traditional sharpening." },
    ],
  },
  "torn-photo-repair": {
    slug: "torn-photo-repair",
    keyword: "Torn Photo Repair",
    iconName: "Scissors",
    previewBefore: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=40&sat=-70",
    previewAfter: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    title: "Torn Photo Repair — Reconstruct Missing Pieces",
    description:
      "Repair torn and ripped photos with AI. Reconstruct missing edges, fill torn sections, and restore damaged photographs to their complete form.",
    intro:
      "Torn photo repair handles one of the most visually devastating forms of physical damage — when portions of a photograph are physically ripped away, leaving jagged edges and missing content. Whether the tear removed a corner, split the image in half, or created irregular holes, our AI reconstruction engine analyzes the surrounding visual context to intelligently fill the missing regions. The system examines color gradients, texture patterns, perspective lines, and object continuity from the intact portions of the image to generate plausible content for the damaged areas. For faces that are partially torn, the face reconstruction module uses symmetry cues and learned facial structure to rebuild missing features with remarkable realism. The AI also handles the common scenario where torn pieces have been roughly reassembled — it can smooth over misaligned joins, fill gaps between pieces, and correct the slight color shifts that occur at tear boundaries.",
    faqs: [
      { question: "Can AI rebuild completely missing parts of a photo?", answer: "The AI can generate plausible content for missing areas based on surrounding context. The more of the original image that remains, the more accurate the reconstruction." },
      { question: "What if my torn photo has pieces that don't align perfectly?", answer: "The AI handles misaligned reassembly by smoothing joins, filling gaps, and correcting color shifts at tear boundaries for a seamless result." },
      { question: "Does torn photo repair work on scanned pieces?", answer: "Yes. Scan the reassembled photo (or even scan pieces separately and stitch them digitally), then upload for the AI to smooth joins and fill gaps." },
    ],
  },
  "photo-noise-reduction": {
    slug: "photo-noise-reduction",
    keyword: "Photo Noise Reduction",
    iconName: "AudioLines",
    previewBefore: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=30",
    previewAfter: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80",
    title: "Photo Noise Reduction — AI Denoising",
    description:
      "Remove grain and digital noise from photos with AI denoising. Clean up high-ISO shots, film grain, and compression artifacts while preserving sharpness.",
    intro:
      "Photo noise reduction removes the unwanted random variation in brightness and color that degrades image quality. Noise comes from multiple sources: high-ISO digital sensor readout, film grain in analog photography, JPEG compression artifacts from repeated saving, and scanner noise from digitizing prints. Traditional noise reduction works by blurring the image, which inevitably destroys fine detail along with the noise. Our AI denoising engine takes a fundamentally different approach. The neural network has learned to distinguish between noise patterns and real image detail by training on pairs of noisy and clean versions of millions of photographs. It recognizes that noise is spatially random while real detail follows meaningful patterns — edges, textures, gradients. This allows it to surgically remove noise while preserving and even enhancing the underlying detail. The system handles everything from subtle luminance noise to aggressive chroma noise and blocky compression artifacts.",
    faqs: [
      { question: "Will noise reduction make my photo look soft?", answer: "No. Unlike traditional blur-based methods, our AI removes noise while preserving and even enhancing fine detail. The result is clean but sharp." },
      { question: "Can it remove heavy film grain?", answer: "Yes. The AI distinguishes film grain from image detail effectively. You can achieve a clean digital look from heavily grainy film scans." },
      { question: "Does it fix JPEG compression artifacts?", answer: "Yes. The AI recognizes and removes blocky artifacts, ringing around edges, and color banding caused by aggressive JPEG compression." },
    ],
  },
  "face-enhancement": {
    slug: "face-enhancement",
    keyword: "Photo Face Enhancement",
    iconName: "Smile",
    previewBefore: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=30&blur=1",
    previewAfter: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    title: "AI Face Enhancement for Old Photos",
    description:
      "Enhance faces in old or low-quality photos with AI. Restore facial details, sharpen features, and achieve portrait-quality clarity from damaged originals.",
    intro:
      "Face enhancement is a specialized branch of photo restoration focused on the most important element in the majority of personal photographs — human faces. Old photos, low-resolution scans, and damaged prints often render faces as blurry, pixelated, or obscured blobs that strip away the identity and emotion that make the photo meaningful. Our AI face enhancement module uses a dedicated neural network trained specifically on facial reconstruction. It detects every face in the image — from prominent subjects to tiny background figures — and applies targeted super-resolution processing. The system understands facial anatomy in depth: the structure of eyes with their reflections and lash detail, the texture and variation of skin, the flow and strand patterns of hair, and the subtle asymmetries that make each face unique. Rather than applying a generic sharpening, it generates realistic high-frequency detail that is consistent with the person's apparent age, ethnicity, and the lighting conditions in the photograph.",
    faqs: [
      { question: "Can AI enhance very small faces in group photos?", answer: "Yes. The AI detects and enhances faces of all sizes in the image. Even small background faces receive meaningful detail improvement." },
      { question: "Will enhanced faces still look like the original person?", answer: "The AI preserves the facial structure and distinguishing features of each person. Enhancement adds clarity and detail without changing identity." },
      { question: "Does it work on heavily damaged faces?", answer: "The AI can reconstruct faces with significant damage — scratches, stains, missing areas — using learned facial structure and cues from the intact portions." },
    ],
  },
  "vintage-photo-enhancement": {
    slug: "vintage-photo-enhancement",
    keyword: "Vintage Photo Enhancement",
    iconName: "Film",
    previewBefore: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&q=40&sat=-100",
    previewAfter: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&q=80",
    title: "Vintage Photo Enhancement — Preserve & Improve",
    description:
      "Enhance vintage photographs while preserving their character. AI improves clarity, fixes damage, and optionally adds color without losing the period feel.",
    intro:
      "Vintage photo enhancement strikes a careful balance between improvement and authenticity. Unlike aggressive restoration that aims to make an old photo look modern, vintage enhancement preserves the character and charm that makes historical photographs special while addressing the genuine quality issues that prevent enjoyment of the image. Our AI system is trained to understand the aesthetic qualities of photographs from different eras — the tonal characteristics of daguerreotypes, the warmth of albumin prints, the specific grain structure of different film stocks. It enhances the image within its original aesthetic framework: sharpening details without removing period-appropriate softness, cleaning damage without eliminating the natural patina of age, and improving contrast while respecting the tonal palette of the original photographic process. The result is a photograph that looks like the best possible version of itself from its original era, not a modern image with a vintage filter.",
    faqs: [
      { question: "Will enhancement remove the vintage feel of my photo?", answer: "No. The AI is designed to preserve period-appropriate aesthetics. It fixes damage and improves clarity while maintaining the authentic character of the original photograph." },
      { question: "Can I choose between full restoration and subtle enhancement?", answer: "The vintage enhancement mode prioritizes preservation. For maximum restoration, use our standard old photo restoration tool instead." },
      { question: "Does it work on daguerreotypes and tintypes?", answer: "Yes. The AI handles photographs from all eras and processes, adapting its enhancement approach to match the specific characteristics of each photographic medium." },
    ],
  },
  "polaroid-photo-restoration": {
    slug: "polaroid-photo-restoration",
    keyword: "Polaroid Photo Restoration",
    iconName: "Camera",
    previewBefore: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=40&sat=-80",
    previewAfter: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80",
    title: "Polaroid Photo Restoration — Revive Instant Prints",
    description:
      "Restore faded, yellowed, or damaged Polaroid photos with AI. Fix color shifts, remove scratches, and bring your instant-print memories back to vivid life.",
    intro:
      "Polaroid and instant-print photographs hold a unique place in photographic history — their one-of-a-kind, tangible nature makes each one irreplaceable. However, the chemical process behind instant film is notoriously unstable over time. Polaroid prints suffer from a distinctive set of aging issues: the signature white border yellows, colors shift dramatically toward magenta or cyan as unstable dyes degrade, and the sealed emulsion layer can develop bubbles, cracks, or delamination that creates cloudy patches across the image. Our AI restoration engine is specifically trained to recognize the unique degradation patterns of instant-film prints. It corrects the characteristic color casts that affect Polaroid chemistry differently from standard photographic prints, removes the haze and blotchiness caused by emulsion breakdown, and restores the punchy, saturated color palette that made instant photos so beloved. The AI also handles common physical damage — scratches on the plastic cover sheet, water intrusion marks, and the bending or cracking that occurs when the rigid print is flexed.",
    faqs: [
      { question: "Can AI fix the yellow tint on old Polaroids?", answer: "Yes. Yellowing in Polaroid prints is caused by specific chemical degradation that the AI understands. It removes the yellow cast from both the image area and the iconic white border." },
      { question: "My Polaroid has cloudy patches — can that be fixed?", answer: "Cloudy or hazy areas are typically caused by emulsion delamination or moisture intrusion. The AI reconstructs the image beneath these defects using surrounding color and texture data." },
      { question: "Will the restored Polaroid keep its classic look?", answer: "Absolutely. The AI restores the vibrant, slightly warm color signature that Polaroid film is known for, rather than converting it to a generic modern digital look." },
    ],
  },
  "book-photo-restoration": {
    slug: "book-photo-restoration",
    keyword: "Book Photo Restoration",
    iconName: "BookImage",
    previewBefore: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=40&sat=-60",
    previewAfter: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80",
    title: "Book Photo Restoration — Recover Printed Images",
    description:
      "Restore photos printed in books, yearbooks, and albums with AI. Remove halftone dots, fix binding shadows, correct page curvature, and recover sharp detail.",
    intro:
      "Book photo restoration addresses the unique challenges of recovering high-quality images from photographs printed on paper pages — yearbooks, family albums, photo books, newspapers, and magazines. Unlike original photographic prints, book-printed images suffer from a distinct set of quality limitations: halftone dot patterns that create visible moiré when scanned, binding shadows where the page curves into the spine, uneven lighting across the page surface, yellowed or foxed paper that tints the image, ink bleed-through from the reverse side, and the generally lower resolution of offset printing compared to photographic processes. Our AI restoration engine tackles each of these issues with specialized processing. It detects and removes halftone screening patterns through intelligent frequency-domain filtering, reconstructs content lost in binding shadows by analyzing perspective and gradient cues, removes paper discoloration while preserving the original image colors, and applies super-resolution to recover detail beyond what the printed dots can represent. The result transforms a rough page scan into a clean, sharp photograph.",
    faqs: [
      { question: "Can AI remove the dot pattern from scanned book photos?", answer: "Yes. The AI identifies halftone dot patterns and screening frequencies, then reconstructs smooth, continuous-tone imagery from the underlying data — far superior to simple blur-based descreening." },
      { question: "What about the dark shadow near the book spine?", answer: "The AI detects binding curvature shadows and compensates for both the darkening and the geometric distortion caused by the page curving into the spine." },
      { question: "Does it work on newspaper clipping photos?", answer: "Yes. Newspaper photos use a coarser halftone screen and lower-quality paper, but the AI handles these effectively, removing visible dots and paper texture to produce a clean image." },
    ],
  },
};

export const ALL_SLUGS = Object.keys(RESTORE_SLUGS);

export function getSlugData(slug: string): SlugData | null {
  return RESTORE_SLUGS[slug] ?? null;
}
