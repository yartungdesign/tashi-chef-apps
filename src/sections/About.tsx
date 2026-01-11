import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "-100px",
  });
  const { t } = useLanguage();

  const timeline = [
    {
      year: "2015",
      location: "Paris, France",
      title: "Sushi Chef",
      description:
        "Sushi Kyobashi – Began professional journey in Japanese cuisine, mastering fundamental techniques and traditional preparation methods.",
    },
    {
      year: "2016-2017",
      location: "Paris, France",
      title: "Sous Chef",
      description:
        "Côte Sushi – Monitored stock levels, ensured proper food preservation, and verified all prepared dishes before service.",
    },
    {
      year: "2017",
      location: "Paris, France",
      title: "Sushi Chef",
      description:
        "Buddha Bar – Gained experience in high-end Asian fusion cuisine, working in a prestigious Parisian establishment.",
    },
    {
      year: "2018-2021",
      location: "Paris, France",
      title: "Sushi Chef & Kitchen Manager",
      description:
        "Les Convives – Complete management of the kitchen, supervised team of 6 cooks preparing 70–90 covers daily, maintained highest quality standards.",
    },
    {
      year: "2021-2022",
      location: "Paris, France",
      title: "Sushi Chef",
      description:
        "Sushi Daily – Managed supplier orders, ensured compliance with hygiene and safety procedures, led and trained kitchen team.",
    },
    {
      year: "2022",
      location: "Paris, France",
      title: "Sous Chef",
      description:
        "Kinugawa – Verified all prepared dishes before service, monitored stock levels, coordinated with front-of-house staff.",
    },
    {
      year: "2022-2024",
      location: "Saint-Tropez & Megève",
      title: "Sushi Chef",
      description:
        "Tigr – Designed menus and created full carte, managed supplier orders and quality control, led team of 9 employees.",
    },
    {
      year: "2024-Present",
      location: "Paris, France",
      title: "Sushi Chef",
      description:
        "Bar des Prés Saint-Germain – Cyril Lignac – Manage team of 10 staff, prepare 100+ covers daily, design creative seasonal menus, train team in Japanese techniques.",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            {t("about.title")}
          </h2>
          <div className="w-24 h-1 bg-accent-red mx-auto mb-6" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Photo Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] bg-wood/50 rounded-lg overflow-hidden border border-accent-red/20">
              {/* Chef Portrait */}
              <img
                src="/chef-portrait.jpg"
                alt="Tashi Phuri - Master Sushi Chef"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-heading text-text-primary font-semibold">
              {t("about.journey")}
            </h3>
            <p className="text-text-secondary leading-relaxed text-lg">
              {t("about.summary1")}
            </p>
            <p className="text-text-secondary leading-relaxed text-lg">
              {t("about.summary2")}
            </p>
            <p className="text-text-secondary leading-relaxed text-lg">
              {t("about.summary3")}
            </p>
            <div className="pt-4 border-t border-accent-red/20 space-y-3">
              <div>
                <p className="text-gold font-medium mb-2">
                  {t("about.competencies")}
                </p>
                <ul className="text-text-secondary text-sm space-y-1 list-disc list-inside">
                  <li>{t("about.competency1")}</li>
                  <li>{t("about.competency2")}</li>
                  <li>{t("about.competency3")}</li>
                  <li>{t("about.competency4")}</li>
                  <li>{t("about.competency5")}</li>
                  <li>{t("about.competency6")}</li>
                </ul>
              </div>
              <div className="pt-3">
                <p className="text-gold font-japanese text-xl font-light">
                  {t("about.quote")}
                  <span className="text-text-secondary text-sm ml-2">
                    {t("about.quoteTranslation")}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <h3 className="text-3xl md:text-4xl font-heading text-text-primary font-semibold mb-12 text-center">
            {t("about.timeline")}
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent-red/30 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className={`relative flex items-start ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent-red rounded-full transform md:-translate-x-1/2 z-10 border-2 border-background" />

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"
                    }`}
                  >
                    <div className="bg-wood/30 backdrop-blur-sm border border-accent-red/20 rounded-lg p-6 hover:border-accent-red/40 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gold font-bold text-lg">
                          {item.year}
                        </span>
                        <span className="text-text-secondary text-sm">
                          {item.location}
                        </span>
                      </div>
                      <h4 className="text-xl font-heading text-text-primary mb-2">
                        {item.title}
                      </h4>
                      <p className="text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <h3 className="text-3xl md:text-4xl font-heading text-text-primary font-semibold mb-8 text-center">
            {t("about.languages")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { lang: "Tibetan", level: "Native" },
              { lang: "English", level: "Fluent" },
              { lang: "French", level: "Fluent" },
              { lang: "Hindi", level: "Fluent" },
              { lang: "Nepali", level: "Fluent" },
              { lang: "Chinese", level: "Basic/Conversational" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="bg-wood/30 backdrop-blur-sm border border-accent-red/20 rounded-lg p-4 text-center hover:border-accent-red/40 transition-all duration-300"
              >
                <p className="text-gold font-medium mb-1">{item.lang}</p>
                <p className="text-text-secondary text-sm">{item.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
