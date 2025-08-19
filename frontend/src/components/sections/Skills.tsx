'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslations } from '@/lib/i18n/useTranslations';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
  color?: string;
}

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = useTranslations('skills');

  // Données de compétences authentiques du guide de profil
  const skills: Skill[] = t('skills_list') as Skill[];

  const categories = [
    { id: 'all', name: t('categories.all') as string, icon: '🌟' },
    { id: 'Frontend', name: t('categories.frontend') as string, icon: '💻' },
    { id: 'Backend', name: t('categories.backend') as string, icon: '⚙️' },
    { id: 'Mobile', name: t('categories.mobile') as string, icon: '📱' },
    { id: 'Tools', name: t('categories.tools') as string, icon: '🛠️' },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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

  const skillVariants = {
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
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  const getLevelLabel = (level: number) => {
    if (level >= 90) return t('levels.expert') as string;
    if (level >= 80) return t('levels.advanced') as string;
    if (level >= 70) return t('levels.intermediate') as string;
    return t('levels.beginner') as string;
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            {t('title') as string}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('subtitle') as string}
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                  : 'border-gray-600 text-gray-400 hover:border-blue-500/50 hover:text-blue-400'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={skillVariants}
              whileHover="hover"
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{skill.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                </div>
                <span className="text-blue-400 font-medium">{skill.level}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <motion.div
                  className={`bg-gradient-to-r ${skill.color || 'from-blue-500 to-purple-600'} h-2 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{skill.category}</span>
                <span className="text-gray-300">
                  {getLevelLabel(skill.level)}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
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
              {t('learning_approach.title') as string}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              {t('learning_approach.description') as string}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
