import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Affiliate & Earnings Disclosure — Wellness Nurse Pro",
  description:
    "Affiliate and earnings disclosure for Wellness Nurse Pro. Learn how we earn revenue and our commitment to honest product recommendations.",
  alternates: {
    canonical: "https://wellnessnursepro.com/disclosure",
  },
  openGraph: {
    title: "Affiliate & Earnings Disclosure — Wellness Nurse Pro",
    description:
      "How Wellness Nurse Pro earns revenue and our commitment to honest recommendations.",
    type: "website",
  },
};

export default function DisclosurePage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://wellnessnursepro.com" },
          { name: "Affiliate & Earnings Disclosure", url: "https://wellnessnursepro.com/disclosure" },
        ]}
      />

      {/* Hero */}
      <section className="bg-[var(--primary-green)] text-white section-padding text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white mb-4">Affiliate &amp; Earnings Disclosure</h1>
          <p className="text-xl text-[var(--light-green)]">
            Transparency About How This Site Earns Revenue
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto space-y-10">
          <p className="text-sm text-gray-500">Last Updated: June 2026</p>

          {/* Overview */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wellness Nurse Pro (wellnessnursepro.com) is a for-profit website that generates
              revenue through the sale of health and wellness products. This page is provided
              in compliance with the Federal Trade Commission (FTC) guidelines to ensure full
              transparency about how we earn income and any material connections that may
              influence our content.
            </p>
          </div>

          {/* Product Sales */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Product Sales
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                This site sells dietary supplements, health products, and wellness-related
                items directly to consumers. When you purchase a product through our site,
                Wellness Nurse Pro earns revenue from that sale.
              </p>
              <p>
                Some products sold on this site may be sourced from third-party suppliers
                and shipped directly to you by those suppliers (commonly known as dropshipping).
                In these cases, Wellness Nurse Pro acts as the retailer and earns the margin
                between our wholesale cost and the retail price you pay.
              </p>
            </div>
          </div>

          {/* Material Connection */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Material Connection Disclosure
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                In accordance with FTC guidelines (16 CFR Part 255), we disclose that there
                is a <strong>material connection</strong> between Wellness Nurse Pro and the
                products and brands featured on this site. This means we may receive
                compensation — through direct sales, commissions, or other financial
                arrangements — when you purchase products through our links or on our site.
              </p>
              <p>
                This compensation may influence which products are featured, where they
                appear on the site, and how they are reviewed. However, it does not affect
                the honesty or integrity of our opinions and recommendations.
              </p>
            </div>
          </div>

          {/* Affiliate Relationships */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Affiliate Relationships
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Wellness Nurse Pro may participate in affiliate programs where we earn
                commissions by linking to products or services offered by other companies.
                When you click on an affiliate link and make a purchase, we may receive a
                small commission at no additional cost to you.
              </p>
              <p>
                We only recommend products that we believe offer genuine value to our
                readers. Affiliate relationships do not dictate our editorial content or
                the products we choose to recommend.
              </p>
            </div>
          </div>

          {/* Honest Opinions */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Our Commitment to Honest Recommendations
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Every product recommendation on this site reflects our honest opinion. We
                stand behind the products we sell and recommend, and we strive to only offer
                items that align with the health principles we teach.
              </p>
              <p>
                That said, what works for one person may not work for another. We encourage
                you to do your own research, read product labels, and consult your healthcare
                provider before trying any new supplement or product.
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Pricing and Availability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Product prices, availability, and shipping details are subject to change at
              any time without notice. While we make every effort to keep pricing accurate
              and up to date, we cannot guarantee that all prices displayed on the site are
              current. The final price will always be confirmed at checkout.
            </p>
          </div>

          {/* No Guarantees */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              No Income or Results Guarantees
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Any health results, outcomes, or experiences described on this site are
              individual and not guaranteed. We make no promises or representations about
              the results you may achieve from using any products sold or recommended here.
              Individual results will vary based on many factors beyond our control.
            </p>
          </div>

          {/* FTC Compliance */}
          <div className="bg-[var(--light-bg)] rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-3" style={{ color: "var(--primary-green)" }}>
              FTC Compliance
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This disclosure is made in compliance with the Federal Trade Commission&apos;s
              guidelines concerning the use of endorsements and testimonials in advertising
              (16 CFR Part 255). We take our obligation to be transparent with our readers
              seriously. If you have questions about this disclosure, please contact us at{" "}
              <a
                href="mailto:dbstevens04@hotmail.com"
                className="text-[var(--primary-green)] underline hover:text-[var(--secondary-green)]"
              >
                dbstevens04@hotmail.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
