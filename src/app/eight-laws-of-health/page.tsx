import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title:
    "The Eight Laws of Health — NEWSTART Principles | Wellness Nurse Pro",
  description:
    "Discover God's blueprint for vibrant living through the Eight Laws of Health: Nutrition, Exercise, Water, Sunlight, Temperance, Air, Rest, and Trust in God. Rooted in Scripture and the writings of Ellen G. White.",
  keywords: [
    "eight laws of health",
    "NEWSTART",
    "Seventh-day Adventist health message",
    "Ellen White health",
    "natural remedies",
    "plant-based diet",
    "holistic health",
    "Ministry of Healing",
    "Weimar Institute",
    "God's health laws",
  ],
  openGraph: {
    title: "The Eight Laws of Health — God's Blueprint for Vibrant Living",
    description:
      "Pure air, sunlight, abstemiousness, rest, exercise, proper diet, the use of water, trust in divine power — these are the true remedies.",
    type: "article",
    locale: "en_US",
    siteName: "Wellness Nurse Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Eight Laws of Health — NEWSTART Principles",
    description:
      "Discover God's blueprint for vibrant living through the NEWSTART health principles rooted in Scripture and the writings of Ellen G. White.",
  },
  alternates: { canonical: "https://wellnessnursepro.com/eight-laws-of-health" },
};

const laws = [
  {
    letter: "N",
    name: "Nutrition",
    icon: "🌾",
    verse: '"And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat." — Genesis 1:29',
    intro:
      "In the Garden of Eden, God prescribed the perfect diet for humanity — a plant-based diet of fruits, grains, nuts, and vegetables. This original diet was not an afterthought; it was the Creator's intentional design for optimal human health and vitality.",
    quote:
      '"Grains, fruits, nuts, and vegetables constitute the diet chosen for us by our Creator. These foods, prepared in as simple and natural a manner as possible, are the most healthful and nourishing." — Ellen G. White, The Ministry of Healing, p. 296',
    content: [
      "Ellen G. White, writing decades before modern nutritional science confirmed her counsel, advocated a diet centered on whole grains, fresh fruits, vegetables, legumes, and nuts. She warned against the excessive use of sugar, rich foods, and flesh meats — counsel that aligns remarkably with what we now know about chronic disease prevention.",
      "The Adventist Health Studies conducted by Loma Linda University have consistently shown that Seventh-day Adventists who follow a plant-based diet live an average of 7 to 10 years longer than the general population. These studies, spanning decades and involving tens of thousands of participants, provide some of the strongest scientific evidence for the health benefits of a vegetarian lifestyle.",
    ],
    tips: [
      "Center your meals around whole, unprocessed plant foods",
      "Choose whole grains over refined — brown rice, oats, whole wheat",
      "Eat a rainbow of fruits and vegetables daily",
      "Include nuts and legumes as protein sources",
      "Minimize processed foods, refined sugars, and artificial additives",
      "Prepare meals simply, allowing the natural flavors to shine",
    ],
    benefits: [
      "Reduced risk of heart disease, diabetes, and many cancers",
      "Sustained energy throughout the day",
      "Healthy weight management",
      "Improved digestion and gut health",
      "Greater longevity and quality of life",
    ],
  },
  {
    letter: "E",
    name: "Exercise",
    icon: "🚶",
    verse: '"For bodily exercise profiteth little: but godliness is profitable unto all things, having promise of the life that now is, and of that which is to come." — 1 Timothy 4:8',
    intro:
      "While Paul reminds us that spiritual fitness surpasses physical fitness in eternal significance, Scripture never dismisses the importance of caring for the body. Our bodies are temples of the Holy Spirit, and regular physical activity is essential for maintaining that temple.",
    quote:
      '"Inactivity is a fruitful cause of disease. Exercise quickens and equalizes the circulation of the blood, but in idleness the blood does not circulate freely." — Ellen G. White, The Ministry of Healing, p. 238',
    content: [
      "Ellen White was a tireless advocate for physical activity, particularly outdoor exercise. She emphasized that God designed the human body for motion, and that a sedentary lifestyle leads to both physical and mental decline. She especially recommended walking, gardening, and useful manual labor as forms of exercise that benefit both body and mind.",
      "Modern research has overwhelmingly confirmed this counsel. Regular physical activity reduces the risk of cardiovascular disease, strengthens bones and muscles, improves mental health, enhances cognitive function, and even slows the aging process at a cellular level. The key, as Ellen White taught, is consistency over intensity — regular, moderate activity sustained over a lifetime yields the greatest benefits.",
    ],
    tips: [
      "Walk outdoors for at least 30 minutes daily",
      "Engage in gardening or other useful physical labor",
      "Choose activities you enjoy and can sustain long-term",
      "Prioritize consistency — moderate daily activity over occasional intense workouts",
      "Exercise in the fresh air and sunshine when possible",
      "Include strength and flexibility activities alongside aerobic exercise",
    ],
    benefits: [
      "Strengthened cardiovascular system and circulation",
      "Improved mental clarity and reduced anxiety",
      "Better sleep quality",
      "Stronger bones, muscles, and immune system",
      "Enhanced mood and emotional resilience",
    ],
  },
  {
    letter: "W",
    name: "Water",
    icon: "💧",
    verse: '"But whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life." — John 4:14',
    intro:
      "Water is the essence of life. Comprising 60 to 65 percent of our body weight, water is involved in virtually every bodily function — from digestion and nutrient transport to temperature regulation and waste elimination. It is no coincidence that water features prominently in Scripture as both a physical necessity and a spiritual symbol.",
    quote:
      '"In health and in sickness, pure water is one of heaven\'s choicest blessings. Its proper use promotes health. It is the beverage which God provided to quench the thirst of animals and man." — Ellen G. White, The Ministry of Healing, p. 237',
    content: [
      "Ellen White emphasized both the internal and external uses of water for health. She advocated drinking abundant pure water throughout the day and was also a proponent of hydrotherapy — the therapeutic use of water in baths, compresses, and treatments. The Adventist health institutions that arose in the 19th century, including the Battle Creek Sanitarium, made extensive use of water treatments.",
      "Even mild dehydration — as little as 1 to 2 percent of body weight — can impair cognitive function, reduce physical performance, and affect mood. Chronic inadequate hydration is linked to kidney stones, urinary tract infections, constipation, and may contribute to more serious conditions over time. Pure, clean water remains the best beverage for maintaining optimal health.",
    ],
    tips: [
      "Drink at least 8 glasses (64 ounces) of pure water daily",
      "Start each morning with a glass of water upon waking",
      "Drink water between meals rather than during meals for better digestion",
      "Replace sugary drinks, sodas, and excessive caffeine with water",
      "Carry water with you and sip throughout the day",
      "Use water externally — warm baths for relaxation, cool compresses for fever",
    ],
    benefits: [
      "Efficient detoxification and waste removal",
      "Improved digestion and nutrient absorption",
      "Better energy levels and mental focus",
      "Healthier skin and complexion",
      "Proper kidney function and reduced infection risk",
    ],
  },
  {
    letter: "S",
    name: "Sunlight",
    icon: "☀️",
    verse: '"And God said, Let there be light: and there was light. And God saw the light, that it was good." — Genesis 1:3-4',
    intro:
      "Light was the very first thing God created — even before the sun, moon, and stars. This speaks to the foundational importance of light in God's design. Sunlight is essential for life on earth, and it plays a critical role in human health that modern science is only beginning to fully appreciate.",
    quote:
      '"The feeble one should press out into the sunshine as earnestly and naturally as do the shaded plants and vines... There is life and healing in the sunshine." — Ellen G. White, Testimonies for the Church, Vol. 2, p. 527',
    content: [
      "Ellen White consistently identified sunlight as one of nature's most powerful healing agents. She counseled that homes should be built to admit plenty of sunlight, that sickrooms should not be darkened, and that people should spend time outdoors in the sunshine regularly. She understood, long before the discovery of vitamin D synthesis, that sunlight was essential for health.",
      "We now know that sunlight triggers vitamin D production in the skin — a nutrient essential for bone health, immune function, and mood regulation. Sunlight exposure helps regulate our circadian rhythm, promoting better sleep. It stimulates the production of serotonin, a neurotransmitter that boosts mood and helps prevent depression. Moderate, regular sun exposure is a cornerstone of good health.",
    ],
    tips: [
      "Get 15 to 30 minutes of morning sunlight daily",
      "Open curtains and blinds to let natural light into your home",
      "Spend time outdoors during daylight hours",
      "Allow sunlight into workspaces to boost mood and productivity",
      "Use sunlight exposure to help regulate your sleep-wake cycle",
      "Practice sensible sun safety — avoid prolonged exposure during peak hours",
    ],
    benefits: [
      "Vitamin D production for bone and immune health",
      "Improved mood and reduced risk of depression",
      "Better sleep through circadian rhythm regulation",
      "Enhanced immune system function",
      "Lowered blood pressure and improved cardiovascular health",
    ],
  },
  {
    letter: "T",
    name: "Temperance",
    icon: "⚖️",
    verse: '"Be not among winebibbers; among riotous eaters of flesh: For the drunkard and the glutton shall come to poverty." — Proverbs 23:20-21',
    intro:
      "Temperance is perhaps the most misunderstood of the eight laws. True temperance is not merely moderation — it is the complete avoidance of things that are harmful and the moderate use of things that are good. It is the exercise of self-control in every area of life, empowered by the Holy Spirit.",
    quote:
      '"True temperance teaches us to dispense entirely with everything hurtful and to use judiciously that which is healthful." — Ellen G. White, Patriarchs and Prophets, p. 562',
    content: [
      "Ellen White was one of the most outspoken health reformers of her era, calling for complete abstinence from alcohol, tobacco, and other harmful substances decades before the medical establishment recognized their dangers. She also warned against the use of tea, coffee, and other stimulants, understanding their addictive nature and their impact on the nervous system.",
      "But temperance extends beyond substance avoidance. It encompasses how we eat, work, rest, and even think. Overeating, overworking, excessive entertainment, and unbridled passions all fall within the scope of intemperance. The Adventist health message calls for a balanced, disciplined life — not out of legalism, but out of love for God and a desire to honor Him with our bodies. The fruit of the Spirit includes self-control (Galatians 5:22-23), and temperance is that principle lived out in daily practice.",
    ],
    tips: [
      "Abstain completely from alcohol, tobacco, and illicit drugs",
      "Avoid or minimize caffeine and other stimulants",
      "Practice mindful eating — stop before you are uncomfortably full",
      "Maintain balance between work and rest",
      "Set boundaries with screens, social media, and entertainment",
      "Seek the Holy Spirit's power for self-control in all areas of life",
    ],
    benefits: [
      "Clear, sharp thinking and sound judgment",
      "Freedom from addictions and harmful dependencies",
      "Greater self-discipline and emotional stability",
      "Improved physical health and longevity",
      "Deeper spiritual sensitivity and discernment",
    ],
  },
  {
    letter: "A",
    name: "Air",
    icon: "🌬️",
    verse: '"And the Lord God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul." — Genesis 2:7',
    intro:
      "The very first act God performed after forming Adam's body was to breathe life into him. Air — specifically, fresh, pure air — is the most immediate necessity of human life. We can survive weeks without food, days without water, but only minutes without air. Yet how often do we neglect the quality of the air we breathe?",
    quote:
      '"In order to have good blood, we must breathe well. Full, deep inspirations of pure air, which fill the lungs with oxygen, purify the blood. They impart to it a bright color and send it, a life-giving current, to every part of the body." — Ellen G. White, The Ministry of Healing, p. 272',
    content: [
      "Ellen White was remarkably ahead of her time in emphasizing the importance of air quality for health. She counseled families to keep their windows open for ventilation, warned against the dangers of sleeping in closed, stuffy rooms, and insisted that fresh outdoor air was essential for recovery from illness. At a time when many physicians kept sickrooms sealed and darkened, she advocated the opposite.",
      "Modern research has confirmed that indoor air pollution — from chemicals, mold, poor ventilation, and off-gassing materials — is a significant health concern. Deep breathing exercises oxygenate the blood, support the immune system, reduce stress hormones, and improve mental clarity. Time spent outdoors in clean air, particularly in natural settings surrounded by trees and vegetation, has been shown to lower blood pressure, reduce inflammation, and boost immune cell activity.",
    ],
    tips: [
      "Open windows daily to ventilate your living and work spaces",
      "Spend time outdoors in nature, especially among trees",
      "Practice deep breathing exercises — inhale slowly, hold, exhale fully",
      "Avoid smoking and secondhand smoke exposure",
      "Use natural cleaning products to reduce indoor air pollutants",
      "Sleep with a window cracked open when weather permits",
    ],
    benefits: [
      "Improved blood oxygenation and circulation",
      "Stronger immune system function",
      "Reduced stress and anxiety through deep breathing",
      "Better sleep quality",
      "Enhanced mental clarity and focus",
    ],
  },
  {
    letter: "R",
    name: "Rest",
    icon: "🌙",
    verse: '"And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made. And God blessed the seventh day, and sanctified it." — Genesis 2:2-3',
    intro:
      "Rest is so important to God that He modeled it Himself. After six days of creation, the Almighty — who neither slumbers nor sleeps — chose to rest on the seventh day and sanctified it as a blessing for all humanity. Rest is not weakness; it is a divine gift and a sacred principle woven into the fabric of creation.",
    quote:
      '"Some make themselves sick by overwork. For these, rest, freedom from care, and a spare diet, are essential to restoration of health. And for those whose brains are worn and weary, a period of rest, of open-air exercise, of time away from the grind, would be invaluable." — Ellen G. White, The Ministry of Healing, p. 236',
    content: [
      "Ellen White understood rest in its fullest sense — not merely sleep, but a comprehensive principle encompassing nightly sleep, weekly Sabbath rest, and the spiritual rest that comes from trusting God. She counseled 7 to 8 hours of sleep nightly, retiring early and rising early in harmony with natural rhythms. She warned that overwork and anxiety were as destructive to health as poor diet or inactivity.",
      "The weekly Sabbath rest — observed from Friday sunset to Saturday sunset — is unique to the Adventist health message. It provides not only physical rest from labor but also mental rest from worry, emotional rest through community and worship, and spiritual rest through communion with the Creator. Modern research on the importance of sleep for cellular repair, memory consolidation, immune function, and emotional regulation continues to affirm the wisdom of this ancient principle. The concept of a weekly digital detox and day of rest is gaining mainstream acceptance as burnout reaches epidemic proportions.",
    ],
    tips: [
      "Aim for 7 to 8 hours of quality sleep each night",
      "Maintain a consistent sleep schedule — early to bed, early to rise",
      "Create a restful sleep environment — dark, cool, and quiet",
      "Observe a weekly day of rest for physical, mental, and spiritual renewal",
      "Practice a digital detox during your rest periods",
      "Address worry and anxiety through prayer and trust in God",
    ],
    benefits: [
      "Cellular repair and physical restoration",
      "Improved memory, learning, and cognitive function",
      "Stronger immune response",
      "Better emotional regulation and mental health",
      "Deepened spiritual life and connection with God",
    ],
  },
  {
    letter: "T",
    name: "Trust in God",
    icon: "🙏",
    verse: '"Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." — Proverbs 3:5-6',
    intro:
      "The final law of health is also the foundation upon which all the others rest. Without trust in God — without a living, personal relationship with the Creator — the other seven laws become merely a health program. With trust in God, they become acts of worship, expressions of gratitude, and channels of divine grace.",
    quote:
      '"Nothing tends more to promote health of body and of soul than does a spirit of gratitude and praise. It is a positive duty to resist melancholy, discontented thoughts and feelings — as much a duty as it is to pray." — Ellen G. White, The Ministry of Healing, p. 251',
    content: [
      "Ellen White consistently taught that the mind-body-spirit connection is inseparable. Fear, anxiety, guilt, bitterness, and hopelessness are not merely emotional states — they produce measurable physiological effects that suppress the immune system, increase inflammation, raise blood pressure, and accelerate aging. Conversely, faith, hope, gratitude, forgiveness, and trust in God promote healing and wholeness.",
      "Modern psychoneuroimmunology — the study of the connection between the mind, nervous system, and immune system — has confirmed what Scripture has taught for millennia: a merry heart does good like a medicine (Proverbs 17:22). Studies show that people with active faith lives have lower rates of depression, recover faster from surgery, cope better with chronic illness, and live longer. Prayer, Scripture study, participation in a faith community, and the daily practice of surrendering anxiety to God are not merely spiritual exercises — they are powerful health practices.",
    ],
    tips: [
      "Begin each day with prayer and Scripture reading",
      "Practice gratitude — keep a journal of blessings",
      "Release anxiety and worry to God through prayer",
      "Participate in a faith community for support and encouragement",
      "Forgive freely — holding grudges poisons body and soul",
      "Rest in God's promises — He is in control, even when life is difficult",
    ],
    benefits: [
      "Deep peace of mind and freedom from anxiety",
      "Reduced stress hormones and lower inflammation",
      "Greater sense of purpose, meaning, and hope",
      "Stronger social connections through faith community",
      "Eternal hope that transcends earthly circumstances",
    ],
  },
];

export default function EightLawsOfHealth() {
  return (
    <div>
      <ArticleSchema
        title="The Eight Laws of Health — NEWSTART Principles"
        description="Discover God's blueprint for vibrant living through the Eight Laws of Health: Nutrition, Exercise, Water, Sunlight, Temperance, Air, Rest, and Trust in God."
        url="https://wellnessnursepro.com/eight-laws-of-health"
        datePublished="2026-06-02"
        dateModified="2026-06-02"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://wellnessnursepro.com" },
          { name: "Eight Laws of Health", url: "https://wellnessnursepro.com/eight-laws-of-health" },
        ]}
      />
      <FAQSchema
        questions={[
          { question: "What does NEWSTART stand for?", answer: "NEWSTART is an acronym for the eight laws of health: Nutrition, Exercise, Water, Sunlight, Temperance, Air, Rest, and Trust in God. These principles form a comprehensive approach to health developed by the Weimar Institute based on Seventh-day Adventist health teachings." },
          { question: "What are the Eight Laws of Health?", answer: "The Eight Laws of Health are Nutrition (plant-based whole foods), Exercise (regular physical activity), Water (adequate hydration and hydrotherapy), Sunlight (moderate daily sun exposure), Temperance (avoiding harmful substances and practicing moderation), Air (fresh air and deep breathing), Rest (7-8 hours of sleep and weekly Sabbath rest), and Trust in God (faith, prayer, and spiritual wellness)." },
          { question: "How long do Seventh-day Adventists live compared to the general population?", answer: "According to the Adventist Health Studies conducted by Loma Linda University, Seventh-day Adventists who follow a plant-based diet live an average of 7 to 10 years longer than the general population." },
          { question: "What is the NEWSTART lifestyle program?", answer: "The NEWSTART lifestyle program was developed by the Weimar Institute in California based on the health writings of Ellen G. White. It teaches eight foundational principles for optimal health that combine faith-based wisdom with evidence-based wellness practices." },
          { question: "Is the NEWSTART diet plant-based?", answer: "Yes, the NEWSTART nutrition principle advocates a plant-based diet centered on whole grains, fresh fruits, vegetables, legumes, and nuts — the diet God prescribed in Genesis 1:29. The Adventist Health Studies have shown significant health and longevity benefits from this dietary pattern." },
        ]}
      />
      {/* Hero Section */}
      <section className="bg-[var(--primary-green)] text-white section-padding text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white mb-4">The Eight Laws of Health</h1>
          <p className="text-xl md:text-2xl font-serif text-[var(--light-green)] mb-8">
            God&apos;s Blueprint for Vibrant Living
          </p>
          <blockquote className="max-w-3xl mx-auto border-l-4 border-[var(--accent-gold)] pl-6 text-left italic text-lg md:text-xl leading-relaxed text-white/90">
            &ldquo;Pure air, sunlight, abstemiousness, rest, exercise, proper
            diet, the use of water, trust in divine power — these are the true
            remedies.&rdquo;
            <footer className="mt-4 text-[var(--accent-gold)] not-italic font-semibold text-base">
              — Ellen G. White, <cite>The Ministry of Healing</cite>, p. 127
            </footer>
          </blockquote>
        </div>
      </section>

      {/* NEWSTART Introduction */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-6">
            The NEWSTART Lifestyle Principles
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {laws.map((law) => (
              <span
                key={law.name}
                className="inline-flex items-center gap-2 bg-[var(--light-green)] text-[var(--primary-green)] px-4 py-2 rounded-full font-semibold text-sm md:text-base"
              >
                <span className="font-bold text-lg">{law.letter}</span>
                {law.name}
              </span>
            ))}
          </div>
          <div className="prose max-w-none text-lg leading-relaxed text-[var(--dark-text)]">
            <p>
              The NEWSTART acronym — <strong>N</strong>utrition,{" "}
              <strong>E</strong>xercise, <strong>W</strong>ater,{" "}
              <strong>S</strong>unlight, <strong>T</strong>emperance,{" "}
              <strong>A</strong>ir, <strong>R</strong>est,{" "}
              <strong>T</strong>rust in God — represents a comprehensive,
              divinely inspired approach to health that has been a cornerstone of
              Seventh-day Adventist health ministry for over 160 years.
            </p>
            <p className="mt-4">
              These principles were popularized by the{" "}
              <strong>Weimar</strong> Institute in California, which developed
              the NEWSTART lifestyle program based on the health writings of
              Ellen G. White. Beginning in the 1860s, Mrs. White received
              visions and insights on health reform that were decades, and in
              some cases more than a century, ahead of scientific understanding.
              Her counsel — to eat a plant-based diet, exercise regularly, drink
              pure water, get fresh air and sunshine, practice temperance, rest
              adequately, and trust God — has been validated time and again by
              modern medical research.
            </p>
            <p className="mt-4">
              The Adventist health message is not merely a wellness program. It
              is an expression of the biblical truth that our bodies are temples
              of the Holy Spirit (1 Corinthians 6:19-20), and caring for them is
              an act of worship. What follows is a thorough exploration of each
              of these eight divinely ordained laws of health.
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <nav className="section-padding bg-white border-b border-gray-100" aria-label="Table of Contents">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-[var(--primary-green)]">Table of Contents</h2>
          <ol className="grid sm:grid-cols-2 gap-2">
            {laws.map((law, index) => (
              <li key={law.name}>
                <a
                  href={`#${law.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[var(--light-bg)] transition-colors text-[var(--dark-text)] hover:text-[var(--primary-green)]"
                >
                  <span className="text-xl">{law.icon}</span>
                  <span className="font-medium">{index + 1}. {law.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Individual Law Sections */}
      {laws.map((law, index) => (
        <section
          key={law.name}
          id={law.name.toLowerCase().replace(/\s+/g, "-")}
          className={`section-padding ${
            index % 2 === 0 ? "bg-[var(--light-bg)]" : "bg-white"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Law Header */}
            <div className="text-center mb-8">
              <span className="text-5xl md:text-6xl block mb-4">
                {law.icon}
              </span>
              <h2 className="mb-2">
                <span className="text-[var(--accent-gold)]">
                  {index + 1}.
                </span>{" "}
                {law.name}
              </h2>
              <p className="text-sm font-semibold tracking-widest uppercase text-[var(--secondary-green)]">
                {law.letter} — The {ordinal(index + 1)} Law of Health
              </p>
            </div>

            {/* Scripture Verse */}
            <blockquote className="border-l-4 border-[var(--accent-gold)] pl-6 italic text-[var(--dark-text)]/80 text-lg mb-8 leading-relaxed">
              {law.verse}
            </blockquote>

            {/* Introduction */}
            <p className="text-lg leading-relaxed mb-6 text-[var(--dark-text)]">
              {law.intro}
            </p>

            {/* Ellen White Quote */}
            <div className="bg-[var(--primary-green)]/5 border border-[var(--primary-green)]/15 rounded-xl p-6 mb-8">
              <p className="italic text-[var(--primary-green)] text-base md:text-lg leading-relaxed">
                {law.quote}
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-4 mb-8">
              {law.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-[var(--dark-text)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tips and Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Practical Tips */}
              <div className="bg-white rounded-xl shadow-sm border border-[var(--primary-green)]/10 p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <span className="text-[var(--accent-gold)]">&#9733;</span>
                  Practical Steps
                </h3>
                <ul className="space-y-3">
                  {law.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-base">
                      <span className="text-[var(--secondary-green)] mt-1 shrink-0">
                        &#10003;
                      </span>
                      <span className="text-[var(--dark-text)]">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-[var(--light-green)]/30 rounded-xl shadow-sm border border-[var(--secondary-green)]/10 p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <span className="text-[var(--accent-gold)]">&#9829;</span>
                  Health Benefits
                </h3>
                <ul className="space-y-3">
                  {law.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-base">
                      <span className="text-[var(--primary-green)] mt-1 shrink-0">
                        &#8226;
                      </span>
                      <span className="text-[var(--dark-text)]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Closing Section */}
      <section className="section-padding bg-[var(--primary-green)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-6">
            The Eight Laws Working Together
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg leading-relaxed text-white/90 text-left">
            <p>
              No single law of health stands alone. God designed these eight
              principles to work together as a unified system — each one
              supporting and amplifying the others. Good nutrition fuels
              exercise. Exercise improves sleep. Rest renews the mind for
              spiritual communion. Trust in God provides the motivation and power
              to follow all the others. When practiced together, these laws
              create a virtuous cycle of ever-increasing health and vitality.
            </p>
            <p>
              The Seventh-day Adventist health message is not about perfection or
              legalism. It is about stewardship — honoring the God who created
              us, redeemed us, and calls us to glorify Him in our bodies.
              &ldquo;Whether therefore ye eat, or drink, or whatsoever ye do, do
              all to the glory of God&rdquo; (1 Corinthians 10:31).
            </p>
            <p>
              Whether you are just beginning your health journey or seeking to
              deepen your commitment, these eight laws offer a time-tested,
              divinely inspired path to vibrant living. Start where you are.
              Take one step today. Trust God with the results.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-block bg-[var(--accent-gold)] text-[var(--dark-text)] font-semibold px-8 py-4 rounded-full text-lg hover:bg-[var(--accent-gold)]/90 transition-colors"
            >
              Explore More Articles
            </Link>
            <Link
              href="/"
              className="inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-[var(--light-bg)] border-t border-gray-200 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 italic">
            <strong>Disclaimer:</strong> This content is for educational purposes only and does not constitute medical advice.
            Always consult a qualified healthcare provider before making changes to your diet, exercise routine, or health regimen.
          </p>
        </div>
      </section>
    </div>
  );
}

function ordinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}