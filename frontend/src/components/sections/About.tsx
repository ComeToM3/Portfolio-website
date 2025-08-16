'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  const highlights = [
    {
      icon: "💻",
      title: "Développeur Junior Full-Stack",
      description: "Formation AEC Développement Web + projets personnels. Stack complète : HTML5, CSS3, JavaScript ES6+, Node.js, Express.js, Flutter/Dart. Collaboration IA-Humain pour développement rapide.",
      skills: ["HTML5/CSS3", "JavaScript", "Node.js", "Flutter"]
    },
    {
      icon: "🎵",
      title: "Musicien Professionnel (15+ ans)",
      description: "Performance solo et en groupe, composition et arrangement. Enseignement musical et gestion de projets artistiques. Excellence sous pression et créativité sous contrainte.",
      skills: ["Performance", "Composition", "Enseignement", "Leadership"]
    },
    {
      icon: "🏃",
      title: "Kinésiologue & Athlète",
      description: "Baccalauréat en Kinésiologie (UQAM). Approche scientifique rigoureuse, accompagnement humain, méthodologie structurée. Discipline sportive et bien-être physique/mental.",
      skills: ["Approche scientifique", "Accompagnement", "Méthodologie", "Discipline"]
    },
    {
      icon: "🍰",
      title: "Pâtissier & Leadership",
      description: "Diplôme professionnel en pâtisserie. Leadership improvisé et gestion de crise exceptionnelle. Formation d'équipes et optimisation workflows sous pression.",
      skills: ["Leadership", "Gestion crise", "Formation", "Optimisation"]
    }
  ];

  const experiences = [
    {
      year: "2024 - Présent",
      title: "Pâtissier Professionnel & Leadership",
      company: "Boulangerie Louise, Montréal",
      description: "Leadership improvisé du secteur pâtisserie, formation de nouveaux employés, gestion de crise exceptionnelle. 100% respect des délais malgré obstacles."
    },
    {
      year: "2023",
      title: "Formation AEC Développement Web",
      company: "Collège Ahuntsic, Montréal",
      description: "Stack complète : HTML5, CSS3, JavaScript ES6+, Node.js, Express.js, bases de données SQL/NoSQL. Méthodologies agiles et Git/GitHub."
    },
    {
      year: "2019 - Présent",
      title: "Service Client & Soft Skills",
      company: "Caribou Gourmand, Montréal",
      description: "Excellence service client, gestion opérations sous pression, formation d'équipes. Résistance stress exceptionnelle et communication multi-niveaux."
    },
    {
      year: "2018 - 2019",
      title: "Entraîneur en Kinésiologie",
      company: "Nautilus Plus, Îles-des-Sœurs",
      description: "Élaboration programmes personnalisés, conseils santé et bien-être. Approche scientifique rigoureuse et accompagnement humain."
    },
    {
      year: "2009 - Présent",
      title: "Musicien Professionnel & Athlète",
      company: "Performance & Compétition",
      description: "15+ années musique professionnelle, performance solo/groupe, composition. Pratique sportive régulière, discipline et persévérance."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            À propos de moi
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            🚀 <strong>JUNIOR TECH UNIQUE</strong> : Quand la créativité rencontre l&apos;apprentissage technique. 
            Formation AEC Développement Web + 15 ans de musique + compétition athlétique + kinésiologie + artisanat = 
            Un junior avec des soft skills exceptionnelles et une approche créative de la résolution de problèmes.
          </motion.p>
        </motion.div>

        {/* Highlight Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{highlight.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {highlight.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {highlight.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {highlight.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Parcours Professionnel
          </motion.h3>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline Line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                )}

                <div className="flex items-start space-x-6">
                  {/* Timeline Dot */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-xl font-semibold text-white">
                        {experience.title}
                      </h4>
                      <span className="text-blue-400 text-sm font-medium">
                        {experience.year}
                      </span>
                    </div>
                    <p className="text-purple-300 font-medium mb-2">
                      {experience.company}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ma Philosophie
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              &ldquo;Dans chaque discipline que j&apos;ai explorée - musique, artisanat, cuisine, échecs - 
              j&apos;ai appris que l&apos;excellence naît de la passion, de la discipline et de l&apos;apprentissage constant. 
              Mon parcours de résilience m&apos;a enseigné la persévérance, l&apos;adaptabilité et la capacité 
              de transformer les défis en opportunités. Je transporte cette mentalité dans mon apprentissage tech.&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
