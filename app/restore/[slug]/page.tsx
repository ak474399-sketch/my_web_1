import { notFound } from "next/navigation";
import { getSlugData, ALL_SLUGS } from "@/lib/seo-data";
import { RestoreGate } from "./restore-gate";
import { RestoreTool } from "./restore-tool";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://restorepic.xyz";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = getSlugData(slug);
  if (!data) return { title: "Photo Restoration", description: "AI photo restoration tool." };
  const canonical = `${baseUrl}/restore/${slug}`;
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}

export default async function RestoreSlugPage({ params }: Props) {
  const { slug } = await params;
  const data = getSlugData(slug);

  if (!data) return notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-warm-800 mb-4 text-center">
        {data.keyword}
      </h1>
      <p className="text-warm-500 text-center mb-10 max-w-2xl mx-auto leading-relaxed">
        {data.description}
      </p>

      <RestoreGate>
        <RestoreTool slug={slug} />
      </RestoreGate>

      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-warm-800 mb-4">
          How It Works
        </h2>
        <p className="text-warm-500 leading-relaxed">{data.intro}</p>
      </section>

      <section className="mt-14 max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-warm-800 mb-6">
          Common Questions
        </h2>
        <div className="space-y-4">
          {data.faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl bg-white border border-warm-300 shadow-sm overflow-hidden"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-warm-700 font-medium hover:text-warm-800 transition-colors">
                {faq.question}
                <span className="ml-2 text-warm-400 group-open:rotate-45 transition-transform text-xl">
                  +
                </span>
              </summary>
              <p className="px-5 pb-4 text-warm-500 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
