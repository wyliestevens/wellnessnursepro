import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About — Wellness Nurse Pro",
  description:
    "Learn about Wellness Nurse Pro — a registered nurse dedicated to sharing God's Eight Laws of Health through the NEWSTART lifestyle principles.",
  alternates: {
    canonical: "https://wellnessnursepro.com/about",
  },
  openGraph: {
    title: "About — Wellness Nurse Pro",
    description:
      "A registered nurse sharing God's Eight Laws of Health through the NEWSTART lifestyle.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://wellnessnursepro.com" },
          { name: "About", url: "https://wellnessnursepro.com/about" },
        ]}
      />

      {/* Hero */}
      <section className="bg-[var(--primary-green)] text-white section-padding text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white mb-4">About Wellness Nurse Pro</h1>
          <p className="text-xl text-[var(--light-green)]">
            Nurse-Led Health Education Rooted in Faith and Science
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--primary-green)" }}>
            Our Mission
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-gray-700">
            <p>
              Wellness Nurse Pro exists to make God&apos;s health principles accessible,
              practical, and backed by modern science. We believe that the Eight Laws of
              Health — known as the NEWSTART lifestyle — offer a time-tested, divinely
              inspired path to vibrant living.
            </p>
            <p>
              Founded by a registered nurse with a passion for preventive health and
              whole-person wellness, this site bridges the gap between clinical nursing
              knowledge, evidence-based research, and the health wisdom found in Scripture
              and the writings of Ellen G. White.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding bg-[var(--light-bg)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--primary-green)" }}>
            Nurse-Led Expertise
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[var(--light-green)] flex items-center justify-center text-3xl shrink-0">
                🩺
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: "var(--primary-green)" }}>
                  Registered Nurse, RN
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Licensed Registered Nurse with clinical experience in patient care
                  and health education
                </p>
              </div>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Every article on Wellness Nurse Pro is written or reviewed by a licensed
                registered nurse who combines clinical training with a deep understanding
                of the Adventist health message. Our content reflects both professional
                nursing knowledge and personal commitment to the NEWSTART principles.
              </p>
              <p>
                We draw on peer-reviewed research, including the landmark Adventist Health
                Studies from Loma Linda University, alongside the health writings of
                Ellen G. White to provide balanced, trustworthy wellness guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--primary-green)" }}>
            What We Cover
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🌾", title: "Nutrition", desc: "Plant-based eating rooted in Genesis 1:29" },
              { icon: "🚶", title: "Exercise", desc: "Movement as God designed for the human body" },
              { icon: "💧", title: "Water", desc: "Hydration and hydrotherapy for healing" },
              { icon: "☀️", title: "Sunlight", desc: "Vitamin D, mood, and circadian health" },
              { icon: "⚖️", title: "Temperance", desc: "Self-control and avoiding harmful substances" },
              { icon: "🌬️", title: "Air", desc: "Fresh air and deep breathing for vitality" },
              { icon: "🌙", title: "Rest", desc: "Sleep science and Sabbath rest" },
              { icon: "🙏", title: "Trust in God", desc: "Faith, prayer, and mental wellness" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--light-bg)]">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold" style={{ color: "var(--primary-green)" }}>{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section-padding bg-[var(--light-bg)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-green)" }}>
            Medical Disclaimer
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The content on Wellness Nurse Pro is for educational and informational purposes
            only. It is not intended as a substitute for professional medical advice, diagnosis,
            or treatment. Always seek the advice of your physician or other qualified healthcare
            provider with any questions you may have regarding a medical condition. Never
            disregard professional medical advice or delay seeking it because of something
            you have read on this website.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--primary-green)] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white text-3xl font-bold mb-4">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Explore the eight principles that have transformed lives for over 160 years.
          </p>
          <Link
            href="/eight-laws-of-health"
            className="inline-block bg-[var(--accent-gold)] text-[var(--dark-text)] font-semibold px-8 py-4 rounded-full text-lg hover:bg-[var(--accent-gold)]/90 transition-colors"
          >
            Discover the Eight Laws of Health
          </Link>
        </div>
      </section>
    </div>
  );
}
