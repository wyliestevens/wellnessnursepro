import Link from "next/link";

export default function MedicalDisclaimer() {
  return (
    <aside
      className="my-6 rounded-lg border-l-4 px-5 py-4"
      style={{
        backgroundColor: "#fef9e7",
        borderLeftColor: "#d4a574",
      }}
      role="note"
      aria-label="Medical disclaimer"
    >
      <p className="text-sm italic text-gray-600 leading-relaxed m-0">
        <span className="not-italic mr-1" aria-hidden="true">&#9877;&#65039;</span>
        <strong className="not-italic">Medical Disclaimer:</strong> This content
        is for informational purposes only and does not constitute medical advice.
        Always consult your healthcare provider before making any health changes.{" "}
        <Link
          href="/disclaimer"
          className="not-italic text-[var(--primary-green)] underline hover:text-[var(--secondary-green)] transition-colors"
        >
          Read full disclaimer
        </Link>
      </p>
    </aside>
  );
}
