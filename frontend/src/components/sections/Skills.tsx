'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Données de compétences par défaut (fallback)
  const defaultSkills: Skill[] = [
    // Frontend
    { id: '1', name: 'HTML5', category: 'Frontend', level: 85, icon: '🌐' },
    { id: '2', name: 'CSS3', category: 'Frontend', level: 80, icon: '🎨' },
    { id: '3', name: 'JavaScript', category: 'Frontend', level: 75, icon: '🟨' },
    { id: '4', name: 'Responsive Design', category: 'Frontend', level: 80, icon: '📱' },
    { id: '5', name: 'UX/UI', category: 'Frontend', level: 70, icon: '✨' },
    
    // Backend
    { id: '6', name: 'Node.js', category: 'Backend', level: 75, icon: '🟢' },
    { id: '7', name: 'Express.js', category: 'Backend', level: 70, icon: '🚂' },
    { id: '8', name: 'SQL', category: 'Backend', level: 75, icon: '🗄️' },
    { id: '9', name: 'NoSQL', category: 'Backend', level: 60, icon: '📊' },
    { id: '10', name: 'REST APIs', category: 'Backend', level: 75, icon: '🔗' },
    
    // Mobile
    { id: '11', name: 'Flutter', category: 'Mobile', level: 80, icon: '📱' },
    { id: '12', name: 'Dart', category: 'Mobile', level: 75, icon: '🎯' },
    { id: '13', name: 'Riverpod', category: 'Mobile', level: 70, icon: '🔄' },
    { id: '14', name: 'Isar DB', category: 'Mobile', level: 70, icon: '💾' },
    
    // Tools & Others
    { id: '15', name: 'Git/GitHub', category: 'Tools', level: 90, icon: '📝' },
    { id: '16', name: 'Docker', category: 'Tools', level: 70, icon: '🐳' },
    { id: '17', name: 'CI/CD', category: 'Tools', level: 75, icon: '⚡' },
    { id: '18', name: 'HiveOS', category: 'Tools', level: 80, icon: '🖥️' },
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/skills/public');
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        } else {
          setSkills(defaultSkills);
        }
      } catch (error) {
        console.log('Using default skills data');
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = [
    { id: 'all', name: 'Toutes', icon: '🌟' },
    { id: 'Frontend', name: 'Frontend', icon: '💻' },
    { id: 'Backend', name: 'Backend', icon: '⚙️' },
    { id: 'Mobile', name: 'Mobile', icon: '📱' },
    { id: 'Tools', name: 'Outils', icon: '🛠️' },
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

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Chargement des compétences...</p>
          </div>
        </div>
      </section>
    );
  }

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
            Mes Compétences
          </motion.h2>
                        <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Stack technique en cours de maîtrise : Formation AEC Développement Web + projets personnels. 
                Collaboration IA-Humain pour développement rapide et efficace.
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
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{skill.category}</span>
                <span className="text-gray-300">
                  {skill.level >= 90 ? 'Expert' : 
                   skill.level >= 80 ? 'Avancé' : 
                   skill.level >= 70 ? 'Intermédiaire' : 'Débutant'}
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
              Approche d'Apprentissage
            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                  Je privilégie l&apos;apprentissage continu et l&apos;expérimentation pratique.
                  Chaque projet est une opportunité d&apos;approfondir mes compétences et
                  d&apos;explorer de nouvelles technologies. Collaboration IA-Humain pour développement rapide.
                </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
