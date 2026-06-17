import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Medical Disclaimer — Wellness Nurse Pro",
  description:
    "Medical disclaimer for Wellness Nurse Pro. This site provides educational health information only and is not a substitute for professional medical advice.",
  alternates: {
    canonical: "https://wellnessnursepro.com/disclaimer",
  },
  openGraph: {
    title: "Medical Disclaimer — Wellness Nurse Pro",
    description:
      "Medical disclaimer for Wellness Nurse Pro. Educational health information only.",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://wellnessnursepro.com" },
          { name: "Medical Disclaimer", url: "https://wellnessnursepro.com/disclaimer" },
        ]}
      />

      {/* Hero */}
      <section className="bg-[var(--primary-green)] text-white section-padding text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white mb-4">Medical Disclaimer</h1>
          <p className="text-xl text-[var(--light-green)]">
            Please Read Carefully Before Using This Website
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto space-y-10">
          <p className="text-sm text-gray-500">Last Updated: June 2026</p>

          {/* Not Medical Advice */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Not Medical Advice
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The information provided on Wellness Nurse Pro (wellnessnursepro.com), including
              all text, images, graphics, and other materials, is for <strong>educational and
              informational purposes only</strong>. Nothing on this website is intended to be a
              substitute for professional medical advice, diagnosis, or treatment. The site owner
              is not a physician, and no content on this site should be construed as medical advice
              or as a recommendation for any specific treatment, product, or course of action.
            </p>
          </div>

          {/* No Doctor-Patient Relationship */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              No Doctor-Patient Relationship
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Use of this website does not create a doctor-patient relationship, nurse-patient
              relationship, or any other healthcare provider-patient relationship between you
              and anyone associated with Wellness Nurse Pro. No information on this site should
              be considered as forming such a relationship.
            </p>
          </div>

          {/* Consult Your Physician */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Always Consult Your Healthcare Provider
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Always seek the advice of your physician or other qualified healthcare provider
              before starting any new diet, exercise program, supplement regimen, or making
              changes to an existing health routine. This is especially important if you have
              a medical condition, are taking medication, are pregnant or nursing, or have
              any other health concerns.
            </p>
          </div>

          {/* Never Disregard Professional Advice */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Never Disregard Professional Medical Advice
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Never disregard professional medical advice or delay seeking medical treatment
              because of something you have read on this website. If you think you may have a
              medical emergency, call your doctor or 911 immediately. Wellness Nurse Pro does
              not recommend or endorse any specific tests, physicians, products, procedures,
              opinions, or other information that may be mentioned on this site.
            </p>
          </div>

          {/* No Liability */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wellness Nurse Pro, its owner, contributors, and affiliates shall not be held
              liable for any damages, claims, or losses arising from your use of or reliance
              on the information provided on this website. You assume full responsibility for
              any actions you take based on the content found here. Any reliance you place on
              such information is strictly at your own risk.
            </p>
          </div>

          {/* Individual Results */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Individual Results May Vary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Health outcomes are highly individual. Testimonials, case studies, or results
              mentioned on this site are not guaranteed and may not reflect the typical
              experience. Your results will vary depending on your individual health status,
              adherence to any program, and many other factors.
            </p>
          </div>

          {/* Emergency */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-800">
              Medical Emergencies
            </h2>
            <p className="text-red-800 leading-relaxed font-medium">
              If you are experiencing a medical emergency, <strong>call 911</strong> or your
              local emergency number immediately. Do not rely on this website for emergency
              medical guidance. Go to the nearest emergency room or call your local emergency
              services for immediate assistance.
            </p>
          </div>

          {/* Product / Supplement Disclaimer */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Product and Supplement Disclaimer
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Wellness Nurse Pro may sell or recommend dietary supplements and other health
                products. These statements have <strong>not been evaluated by the Food and Drug
                Administration (FDA)</strong>. Products sold or recommended on this site are
                not intended to diagnose, treat, cure, or prevent any disease.
              </p>
              <p>
                We make no warranties, expressed or implied, regarding the efficacy,
                appropriateness, or suitability of any products featured or sold on this
                website. Always read product labels, warnings, and directions before use.
                Consult your healthcare provider before taking any supplement, especially
                if you have a pre-existing medical condition or are taking prescription
                medications.
              </p>
            </div>
          </div>

          {/* Third-Party Products */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              Third-Party Products and Claims
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Some products available on this site may be manufactured or supplied by
              third parties. Wellness Nurse Pro is not responsible for the claims,
              representations, or warranties made by third-party manufacturers or suppliers.
              We encourage you to research products independently and consult your healthcare
              provider before use.
            </p>
          </div>

          {/* External Links */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
              External Links
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This website may contain links to external websites that are not operated by
              Wellness Nurse Pro. We have no control over the content, privacy policies, or
              practices of these third-party sites and assume no responsibility for them.
              The inclusion of any link does not imply endorsement or recommendation.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-[var(--light-bg)] rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-3" style={{ color: "var(--primary-green)" }}>
              Questions?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this disclaimer or the content on our site, please
              contact us at{" "}
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
