import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Memory Restore",
  description: "Terms and conditions for using Memory Restore services.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-warm-800 mb-8">Terms of Service</h1>
      <p className="text-warm-400 mb-10">Last updated: February 18, 2026</p>

      <div className="space-y-8 text-warm-600 leading-relaxed">
        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Memory Restore (&quot;the Service&quot;), you agree to be bound
            by these Terms of Service. If you do not agree to these terms, please do not use the
            Service.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">2. Description of Service</h2>
          <p>
            Memory Restore provides AI-powered photo restoration tools that help you
            repair damaged, faded, or low-quality photographs. The
            Service is provided &quot;as is&quot; and results may vary depending on the quality
            and condition of the original image.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">3. Your Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You must own or have the right to use any images you upload.</li>
            <li>You may not upload illegal, harmful, or offensive content.</li>
            <li>You are responsible for maintaining the security of your own devices.</li>
            <li>You may not attempt to misuse or abuse the Service.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">4. Your Photos, Your Rights</h2>
          <p>
            You retain all rights to the images you upload and the restored versions you receive.
            The Memory Restore service, including its design, code, and branding, is the
            intellectual property of its creators and is protected by applicable laws.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">5. Limitation of Liability</h2>
          <p>
            Memory Restore is provided without warranties of any kind. We are not liable for
            any direct, indirect, incidental, or consequential damages arising from your use of
            the Service, including but not limited to loss of data or unsatisfactory restoration
            results.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">6. Service Availability</h2>
          <p>
            We strive to maintain consistent availability but do not guarantee uninterrupted
            access. The Service may be temporarily unavailable due to maintenance, updates, or
            factors beyond our control.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">7. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the Service
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-warm-800 mb-3">8. Contact</h2>
          <p>
            If you have questions about these Terms, please contact us at{" "}
            <span className="text-accent">hello@memoryrestore.ai</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
