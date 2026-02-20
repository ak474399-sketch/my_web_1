import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AI RestorePic",
  description: "Learn how AI RestorePic handles your data and protects your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-warm-800 mb-8">Privacy Policy</h1>
      <p className="text-warm-400 mb-10">Last updated: February 18, 2026</p>

      <div className="space-y-8 text-warm-600 leading-relaxed">
        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">1. Information We Collect</h2>
          <p>
            When you use Memory Restore, we temporarily process the images you upload solely
            for the purpose of restoring them. We do not collect personal
            information such as names, email addresses, or payment details unless you explicitly
            provide them.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">2. How We Use Your Data</h2>
          <p>
            Uploaded images are restored and returned to you.
            Images are processed in memory and are <strong>not stored</strong> on our servers after
            the restoration is complete. We do not use your images for training, analytics, or any
            purpose other than fulfilling your restoration request.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">3. Third-Party Services</h2>
          <p>
            We use the Google Gemini API to perform image restoration. Your image data is sent to
            Google&apos;s servers for processing and is subject to{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-muted underline"
            >
              Google&apos;s Privacy Policy
            </a>
            . We do not share your data with any other third parties.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">4. Cookies</h2>
          <p>
            We use minimal, essential cookies to ensure the website functions correctly. We do not
            use tracking cookies or advertising pixels.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">5. Data Security</h2>
          <p>
            All data transmission between your browser and our servers is encrypted using TLS.
            We implement industry-standard security measures to protect your data during processing.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">6. Your Rights</h2>
          <p>
            Since we do not store your images or personal data, there is no persistent data to
            delete. If you have questions about your data, please contact us at{" "}
            <span className="text-accent">privacy@memoryrestore.ai</span>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated revision date.
          </p>
        </section>
      </div>
    </div>
  );
}
