'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  featured: boolean;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Données de projets par défaut (fallback)
  const defaultProjects: Project[] = [
    {
      id: '1',
      title: 'Portfolio Hordearii',
      description: 'Portfolio professionnel moderne avec Next.js, TypeScript et Tailwind CSS. Design responsive avec animations Framer Motion.',
      category: 'Web',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      featured: true,
      githubUrl: 'https://github.com/ComeToM3/Portfolio-website',
      liveUrl: 'https://hordearii.ca'
    },
    {
      id: '2',
      title: 'Application Mobile Flutter',
      description: 'Application mobile cross-platform développée avec Flutter et Dart. Interface utilisateur moderne et performances optimisées.',
      category: 'Mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Provider'],
      featured: true,
      githubUrl: 'https://github.com/ComeToM3/flutter-app',
      liveUrl: 'https://play.google.com/store/apps/details?id=com.hordearii.app'
    },
    {
      id: '3',
      title: 'API REST Node.js',
      description: 'API REST complète avec Express.js, PostgreSQL et Prisma. Authentification JWT et documentation Swagger.',
      category: 'Backend',
      technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT'],
      featured: true,
      githubUrl: 'https://github.com/ComeToM3/api-backend',
      liveUrl: 'https://api.hordearii.ca'
    },
    {
      id: '4',
      title: 'Dashboard Analytics',
      description: 'Dashboard d\'analytics en temps réel avec React et Chart.js. Visualisation de données et rapports interactifs.',
      category: 'Web',
      technologies: ['React', 'Chart.js', 'Socket.io', 'Node.js'],
      featured: false,
      githubUrl: 'https://github.com/ComeToM3/analytics-dashboard'
    },
    {
      id: '5',
      title: 'E-commerce Platform',
      description: 'Plateforme e-commerce complète avec panier, paiements et gestion des commandes.',
      category: 'Web',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
      featured: false,
      githubUrl: 'https://github.com/ComeToM3/ecommerce-platform'
    },
    {
      id: '6',
      title: 'App de Musique',
      description: 'Application de streaming musical avec interface moderne et fonctionnalités avancées.',
      category: 'Mobile',
      technologies: ['React Native', 'Expo', 'Spotify API', 'Redux'],
      featured: false,
      githubUrl: 'https://github.com/ComeToM3/music-app'
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/projects/public');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.log('Using default projects data');
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = [
    { id: 'all', name: 'Tous', icon: '🌟' },
    { id: 'Web', name: 'Web', icon: '🌐' },
    { id: 'Mobile', name: 'Mobile', icon: '📱' },
    { id: 'Backend', name: 'Backend', icon: '⚙️' },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Chargement des projets...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
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
            Mes Projets
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Une sélection de mes projets les plus récents, démontrant mes compétences 
            en développement web, mobile et backend.
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

        {/* Featured Projects */}
        {selectedCategory === 'all' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-16"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-white text-center mb-8"
            >
              Projets Vedettes
            </motion.h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.filter(p => p.featured).slice(0, 3).map((project) => (
                <motion.div
                  key={project.id}
                  variants={projectVariants}
                  whileHover="hover"
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">🚀</span>
                      </div>
                      <p className="text-white/80 text-sm">Image du projet</p>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                      {project.featured && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                          Vedette
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white text-center py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                          Voir le projet
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover="hover"
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-xl">💻</span>
                  </div>
                  <p className="text-white/80 text-xs">Image du projet</p>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                  {project.featured && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                      Vedette
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 2).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 2 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                      +{project.technologies.length - 2}
                    </span>
                  )}
                </div>

                {/* Project Links */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white text-center py-2 px-3 rounded-lg transition-colors duration-300 text-sm"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded-lg transition-colors duration-300 text-sm"
                    >
                      Voir
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Summary */}
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
              Approche de Développement
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              Chaque projet est une opportunité d&apos;innovation et d&apos;apprentissage. 
              Je privilégie le code propre, les performances optimales et l&apos;expérience 
              utilisateur exceptionnelle.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
