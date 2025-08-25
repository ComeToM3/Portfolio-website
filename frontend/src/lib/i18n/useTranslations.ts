import { useParams } from 'next/navigation';

const messages = {
  fr: {
    hero: {
      title: 'Johan',
      subtitle: 'Dominguez',
      description: 'Développeur Junior Full-Stack | Ergonomie du Travail & Kinésiologie | HTML•CSS•JS•SQL•Flutter•Express | Leadership Collaboratif & Résolution Problèmes',
      tagline: 'Unique Tech Junior - Soft Skills Exceptionnelles',
      cta_primary: 'Voir mes projets',
      cta_secondary: 'Me contacter',
      scroll_down: 'Faites défiler',
      profile_photo: 'Photo de profil',
      stats: {
        projects_completed: '6+',
        projects_label: 'Projets réalisés',
        leadership_years: '15+',
        leadership_label: 'Années leadership',
        tech_stack: '8+',
        tech_stack_label: 'Technologies maîtrisées',
        soft_skills: '6+',
        soft_skills_label: 'Soft skills expertes'
      }
    },
    navigation: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      contact: 'Contact',
      admin: 'Admin',
      mobile_app: 'App Mobile',
      download: 'Télécharger'
    },
    about: {
      title: 'À propos de moi',
      subtitle: 'Un parcours unique, une vision innovante',
      description: '🚀 **JUNIOR TECH UNIQUE** : Quand la créativité rencontre l\'apprentissage technique.\n\nFormation AEC Développement Web + 15 ans de musique + compétition athlétique + kinésiologie + artisanat =\n\nUn junior avec des soft skills exceptionnelles et une approche créative de la résolution de problèmes.',
      highlights: {
        tech: {
          title: 'Développeur Junior Full-Stack',
          description: 'Formation AEC Développement Web + projets personnels. Stack complète : HTML5, CSS3, JavaScript ES6+, Node.js, Express.js, Flutter/Dart. Collaboration IA-Humain pour développement rapide.',
          skills: ['HTML5/CSS3', 'JavaScript', 'Node.js', 'Flutter']
        },
        music: {
          title: 'Musicien Professionnel (15+ ans)',
          description: 'Performance solo et en groupe, composition et arrangement. Enseignement musical et gestion de projets artistiques. Excellence sous pression et créativité sous contrainte.',
          skills: ['Performance', 'Composition', 'Enseignement', 'Leadership']
        },
        athlete: {
          title: 'Kinésiologue & Athlète',
          description: 'Baccalauréat en Kinésiologie (UQAM). Approche scientifique rigoureuse, accompagnement humain, méthodologie structurée. Discipline sportive et bien-être physique/mental.',
          skills: ['Approche scientifique', 'Accompagnement', 'Méthodologie', 'Discipline']
        },
        pastry: {
          title: 'Pâtissier & Leadership',
          description: 'Diplôme professionnel en pâtisserie. Leadership improvisé et gestion de crise exceptionnelle. Formation d\'équipes et optimisation workflows sous pression.',
          skills: ['Leadership', 'Gestion crise', 'Formation', 'Optimisation']
        }
      },
      timeline: {
        title: 'Parcours Professionnel',
        experiences: [
          {
            year: '2024 - Présent',
            title: 'Pâtissier Professionnel & Leadership',
            company: 'Boulangerie Louise, Montréal',
            description: 'Leadership improvisé du secteur pâtisserie, formation de nouveaux employés, gestion de crise exceptionnelle. 100% respect des délais malgré obstacles.'
          },
          {
            year: '2023',
            title: 'Formation AEC Développement Web',
            company: 'Collège Ahuntsic, Montréal',
            description: 'Stack complète : HTML5, CSS3, JavaScript ES6+, Node.js, Express.js, bases de données SQL/NoSQL. Méthodologies agiles et Git/GitHub.'
          },
          {
            year: '2019 - Présent',
            title: 'Service Client & Soft Skills',
            company: 'Caribou Gourmand, Montréal',
            description: 'Excellence service client, gestion opérations sous pression, formation d\'équipes. Résistance stress exceptionnelle et communication multi-niveaux.'
          },
          {
            year: '2018 - 2019',
            title: 'Entraîneur en Kinésiologie',
            company: 'Nautilus Plus, Îles-des-Sœurs',
            description: 'Élaboration programmes personnalisés, conseils santé et bien-être. Approche scientifique rigoureuse et accompagnement humain.'
          },
          {
            year: '2009 - Présent',
            title: 'Musicien Professionnel & Athlète',
            company: 'Performance & Compétition',
            description: '15+ années musique professionnelle, performance solo/groupe, composition. Pratique sportive régulière, discipline et persévérance.'
          }
        ]
      },
      philosophy: {
        title: 'Ma Philosophie',
        quote: 'Dans chaque discipline que j\'ai explorée - musique, artisanat, cuisine, échecs - j\'ai appris que l\'excellence naît de la passion, de la discipline et de l\'apprentissage constant. Mon parcours de résilience m\'a enseigné la persévérance, l\'adaptabilité et la capacité de transformer les défis en opportunités. Je transporte cette mentalité dans mon apprentissage tech.'
      }
    },
    skills: {
      title: 'Compétences',
      subtitle: 'Technologies et outils maîtrisés',
      categories: {
        all: 'Toutes',
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobile',
        tools: 'Outils'
      },
      levels: {
        beginner: 'Débutant',
        intermediate: 'Intermédiaire',
        advanced: 'Avancé',
        expert: 'Expert'
      },
      learning_approach: {
        title: 'Approche d\'Apprentissage',
        description: 'Formation AEC Développement Web + projets personnels + collaboration IA-Humain. Maîtrise rapide de nouvelles technologies et développement d\'applications complètes avec architecture moderne.'
      },
      skills_list: [
        { id: '1', name: 'HTML5 Sémantique', level: 85, category: 'Frontend', icon: '🌐', color: 'from-orange-500 to-red-500' },
        { id: '2', name: 'CSS3 Avancé', level: 80, category: 'Frontend', icon: '🎨', color: 'from-blue-500 to-purple-500' },
        { id: '3', name: 'JavaScript (ES6+)', level: 75, category: 'Frontend', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
        { id: '4', name: 'Responsive Design', level: 80, category: 'Frontend', icon: '📱', color: 'from-green-400 to-blue-500' },
        { id: '5', name: 'UX/UI Intuitive', level: 70, category: 'Frontend', icon: '✨', color: 'from-pink-400 to-purple-500' },
        { id: '6', name: 'Node.js', level: 75, category: 'Backend', icon: '🟢', color: 'from-green-500 to-emerald-500' },
        { id: '7', name: 'Express.js', level: 70, category: 'Backend', icon: '⚡', color: 'from-gray-600 to-gray-800' },
        { id: '8', name: 'SQL Databases', level: 75, category: 'Backend', icon: '🗄️', color: 'from-blue-600 to-indigo-600' },
        { id: '9', name: 'NoSQL', level: 60, category: 'Backend', icon: '📊', color: 'from-purple-500 to-pink-500' },
        { id: '10', name: 'Web APIs', level: 75, category: 'Backend', icon: '🔗', color: 'from-cyan-500 to-blue-500' },
        { id: '11', name: 'Flutter', level: 80, category: 'Mobile', icon: '📱', color: 'from-blue-400 to-cyan-500' },
        { id: '12', name: 'Dart', level: 75, category: 'Mobile', icon: '🎯', color: 'from-blue-600 to-indigo-600' },
        { id: '13', name: 'Riverpod', level: 70, category: 'Mobile', icon: '🔄', color: 'from-green-400 to-blue-500' },
        { id: '14', name: 'Isar Database', level: 70, category: 'Mobile', icon: '💾', color: 'from-purple-400 to-pink-500' },
        { id: '15', name: 'TensorFlow Lite', level: 60, category: 'Mobile', icon: '🧠', color: 'from-orange-500 to-red-500' },
        { id: '16', name: 'Git/GitHub', level: 90, category: 'Tools', icon: '📝', color: 'from-orange-600 to-red-600' },
        { id: '17', name: 'Docker', level: 70, category: 'Tools', icon: '🐳', color: 'from-blue-500 to-cyan-400' },
        { id: '18', name: 'CI/CD Pipeline', level: 75, category: 'Tools', icon: '⚡', color: 'from-green-500 to-blue-500' },
        { id: '19', name: 'HiveOS Mining', level: 80, category: 'Tools', icon: '🖥️', color: 'from-gray-600 to-black' },
        { id: '20', name: 'Linux Administration', level: 70, category: 'Tools', icon: '🐧', color: 'from-yellow-500 to-orange-500' },
        { id: '21', name: 'Web Server Config', level: 70, category: 'Tools', icon: '🌐', color: 'from-blue-500 to-purple-500' }
      ]
    },
    projects: {
      title: 'Projets',
      subtitle: 'Mes réalisations récentes',
      categories: {
        all: 'Tous',
        web: 'Web',
        mobile: 'Mobile',
        backend: 'Backend',
        tools: 'Outils'
      },
      featured: 'Projets Vedettes',
      other_projects: 'Autres Projets',
      view_project: 'Voir le projet',
      view_live: 'Voir en ligne',
      view_code: 'Voir le code',
      download: 'Télécharger',
      technologies: 'Technologies utilisées',
      screenshot: 'Screenshot du projet',
      philosophy_title: 'Philosophie de Développement',
      philosophy_text: 'Collaboration IA-Humain pour développement rapide et efficace. Architecture moderne avec tests complets et documentation. Approche durable et optimisation des performances.',
      projects_list: [
        {
          id: '1',
          title: 'Todo AI App - Flutter',
          description: 'Complete mobile application developed with AI collaboration . Modern architecture: Riverpod, Isar DB, TensorFlow Lite, FLChart. AI classification, behavioral coaching, comprehensive tests.',
          category: 'Mobile',
          technologies: ['Flutter', 'Dart', 'Riverpod', 'Isar DB', 'TensorFlow Lite', 'FLChart'],
          githubUrl: 'https://github.com/ComeToM3/todo-ai-app',
          liveUrl: 'https://hordearii.ca/apps',
          featured: true
        },
        {
          id: '2',
          title: 'Sustainable Web Infrastructure',
          description: 'Web hosting on HiveOS Standard mining rig with Docker. Server configuration, portfolio site, application pages. Sustainable approach: using rig in summer for web hosting.',
          category: 'Backend',
          technologies: ['Docker', 'HiveOS', 'Nginx', 'Linux', 'CI/CD', 'PM2'],
          githubUrl: 'https://github.com/ComeToM3/Portfolio-website',
          liveUrl: 'https://hordearii.ca',
          featured: true
        },
        {
          id: '3',
          title: 'Professional Web Portfolio',
          description: 'Modern portfolio with Next.js, TypeScript and Tailwind CSS. Responsive design, Framer Motion animations, PWA, internationalization. Optimized for performance and SEO.',
          category: 'Web',
          technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'PWA'],
          githubUrl: 'https://github.com/ComeToM3/Portfolio-website',
          liveUrl: 'https://hordearii.ca',
          featured: true
        },
        {
          id: '4',
          title: 'Portfolio Backend API',
          description: 'Complete REST API with Node.js, Express.js, PostgreSQL, Prisma. JWT authentication, security middleware, unit tests. Scalable architecture and complete documentation.',
          category: 'Backend',
          technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT'],
          githubUrl: 'https://github.com/ComeToM3/Portfolio-website',
          liveUrl: 'https://api.hordearii.ca',
          featured: false
        },
        {
          id: '5',
          title: 'Professional Git Management',
          description: 'Enterprise Git workflow with commit conventions, feature branches, pull requests, semantic versioning. GitHub Actions CI/CD pipeline for automated deployment.',
          category: 'Tools',
          technologies: ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'Semantic Versioning'],
          githubUrl: 'https://github.com/ComeToM3/Portfolio-website',
          featured: false
        },
        {
          id: '6',
          title: 'Learning Projects',
          description: 'Diverse personal projects: web applications, automation scripts, technological experiments. Continuous learning and active technology watch.',
          category: 'Web',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Flutter'],
          githubUrl: 'https://github.com/ComeToM3',
          featured: false
        }
      ]
    },
    contact: {
      title: 'Contactez-moi',
      subtitle: 'Prêt à collaborer avec un junior unique ?',
      description: 'N\'hésitez pas à me contacter pour discuter de vos projets et voir comment mes soft skills exceptionnelles et ma collaboration IA-Humain peuvent contribuer à votre équipe.',
      form: {
        name: 'Nom complet',
        email: 'Adresse email',
        subject: 'Sujet',
        message: 'Message',
        send: 'Envoyer le message',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès !',
        error: 'Erreur lors de l\'envoi du message.'
      },
      info: {
        title: 'Informations de Contact',
        location: 'Localisation',
        location_value: 'Montréal, Québec, Canada',
        availability: 'Disponibilité',
        availability_value: 'Disponible pour des missions',
        response_time: 'Temps de réponse',
        response_time_value: 'Sous 24h'
      }
    },
    footer: {
      description: 'Développeur full stack passionné par l\'innovation et la créativité. Collaboration IA-Humain pour des solutions exceptionnelles.',
      quick_links: 'Navigation',
      contact_info: 'Contact',
      availability: 'Disponible pour missions',
      rights_reserved: 'Tous droits réservés.',
      privacy_policy: 'Politique de Confidentialité',
      terms_of_service: 'Conditions d\'Utilisation',
      links: {
        home: 'Accueil',
        about: 'À propos',
        skills: 'Compétences',
        projects: 'Projets',
        contact: 'Contact'
      }
    },
    admin: {
      dashboard: 'Tableau de bord',
      profile: 'Profil',
      skills: 'Compétences',
      projects: 'Projets',
      messages: 'Messages',
      analytics: 'Analytics',
      view_site: 'Voir le site',
      logout: 'Déconnexion',
      sidebar: {
        dashboard: 'Dashboard',
        dashboard_desc: 'Vue d\'ensemble',
        profile: 'Profile',
        profile_desc: 'Informations personnelles',
        skills: 'Skills',
        skills_desc: 'Compétences techniques',
        projects: 'Projects',
        projects_desc: 'Gestion des projets',
        messages: 'Messages',
        messages_desc: 'Messages de contact',
        analytics: 'Analytics',
        analytics_desc: 'Statistiques du site'
      },
      stats: {
        visitors: 'Visiteurs',
        skills: 'Compétences',
        projects: 'Projets',
        messages: 'Messages',
        growth_rate: 'ce mois',
        recent_update: 'Mise à jour récente',
        active: 'Actifs',
        response_time: 'Réponse'
      },
      activity: {
        title: 'Activité Récente',
        new_visitor: 'Nouveau visiteur sur la page Skills',
        new_message: 'Nouveau message de contact reçu',
        skill_updated: 'Compétence Flutter mise à jour à 85%',
        project_added: 'Nouveau projet "Todo AI App" ajouté',
        visitor_projects: 'Visiteur sur la page Projects'
      },
      actions: {
        title: 'Actions Rapides',
        add_skill: 'Ajouter une compétence',
        create_project: 'Créer un projet',
        view_messages: 'Voir les messages'
      },
      performance: {
        title: 'Performance',
        loading_time: 'Temps de chargement',
        conversion_rate: 'Taux de conversion'
      },
      system: {
        title: 'Système',
        version: 'Version',
        last_update: 'Dernière mise à jour',
        status: 'Statut',
        operational: 'Opérationnel'
      }
    }
  },
  en: {
    hero: {
      title: 'Johan',
      subtitle: 'Dominguez',
      description: 'Junior Full-Stack Developer | Workplace Ergonomics & Kinesiology Specialist | HTML•CSS•JS•SQL•Flutter•Express | Collaborative Leadership & Problem Solving',
      tagline: 'Unique Tech Junior - Exceptional Soft Skills',
      cta_primary: 'View my projects',
      cta_secondary: 'Contact me',
      scroll_down: 'Scroll down',
      profile_photo: 'Profile photo',
      stats: {
        projects_completed: '6+',
        projects_label: 'Projects completed',
        leadership_years: '15+',
        leadership_label: 'Years of leadership',
        tech_stack: '8+',
        tech_stack_label: 'Technologies mastered',
        soft_skills: '6+',
        soft_skills_label: 'Expert soft skills'
      }
    },
    navigation: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      admin: 'Admin',
      mobile_app: 'Mobile App',
      download: 'Download'
    },
    about: {
      title: 'About Me',
      subtitle: 'A unique journey, an innovative vision',
      description: '🚀 **UNIQUE TECH JUNIOR**: Where creativity meets technical learning.\n\nAEC Web Development training + 15 years of music + athletic competition + kinesiology + craftsmanship =\n\nA junior with exceptional soft skills and a creative approach to problem-solving.',
      highlights: {
        tech: {
          title: 'Junior Full-Stack Developer',
          description: 'AEC Web Development training + personal projects. Complete stack: HTML5, CSS3, JavaScript ES6+, Node.js, Express.js, Flutter/Dart. Human-AI collaboration for rapid development.',
          skills: ['HTML5/CSS3', 'JavaScript', 'Node.js', 'Flutter']
        },
        music: {
          title: 'Professional Musician (15+ years)',
          description: 'Solo and group performance, composition and arrangement. Music teaching and artistic project management. Excellence under pressure and creativity under constraints.',
          skills: ['Performance', 'Composition', 'Teaching', 'Leadership']
        },
        athlete: {
          title: 'Kinesiologist & Athlete',
          description: 'Bachelor\'s degree in Kinesiology (UQAM). Rigorous scientific approach, human accompaniment, structured methodology. Sports discipline and physical/mental well-being.',
          skills: ['Scientific approach', 'Accompaniment', 'Methodology', 'Discipline']
        },
        pastry: {
          title: 'Pastry Chef & Leadership',
          description: 'Professional diploma in pastry. Improvised leadership and exceptional crisis management. Team training and workflow optimization under pressure.',
          skills: ['Leadership', 'Crisis management', 'Training', 'Optimization']
        }
      },
      timeline: {
        title: 'Professional Journey',
        experiences: [
          {
            year: '2024 - Present',
            title: 'Professional Pastry Chef & Leadership',
            company: 'Boulangerie Louise, Montreal',
            description: 'Improvised leadership of the pastry sector, training new employees, exceptional crisis management. 100% respect for deadlines despite obstacles.'
          },
          {
            year: '2023',
            title: 'AEC Web Development Training',
            company: 'Collège Ahuntsic, Montreal',
            description: 'Complete stack: HTML5, CSS3, JavaScript ES6+, Node.js, Express.js, SQL/NoSQL databases. Agile methodologies and Git/GitHub.'
          },
          {
            year: '2019 - Present',
            title: 'Customer Service & Soft Skills',
            company: 'Caribou Gourmand, Montreal',
            description: 'Customer service excellence, operations management under pressure, team training. Exceptional stress resistance and multi-level communication.'
          },
          {
            year: '2018 - 2019',
            title: 'Kinesiology Trainer',
            company: 'Nautilus Plus, Îles-des-Sœurs',
            description: 'Personalized program development, health and wellness advice. Rigorous scientific approach and human accompaniment.'
          },
          {
            year: '2009 - Present',
            title: 'Professional Musician & Athlete',
            company: 'Performance & Competition',
            description: '15+ years of professional music, solo/group performance, composition. Regular sports practice, discipline and perseverance.'
          }
        ]
      },
      philosophy: {
        title: 'My Philosophy',
        quote: 'In every discipline I\'ve explored - music, craftsmanship, cooking, chess - I\'ve learned that excellence comes from passion, discipline, and constant learning. My journey of resilience has taught me perseverance, adaptability, and the ability to turn challenges into opportunities. I carry this mindset into my tech learning.'
      }
    },
    skills: {
      title: 'Skills',
      subtitle: 'Technologies and tools mastered',
      categories: {
        all: 'All',
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobile',
        tools: 'Tools'
      },
      levels: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        expert: 'Expert'
      },
      learning_approach: {
        title: 'Learning Approach',
        description: 'AEC Web Development training + personal projects + Human-AI collaboration. Rapid mastery of new technologies and development of complete applications with modern architecture.'
      },
      skills_list: [
        { id: '1', name: 'HTML5 Semantic', level: 85, category: 'Frontend', icon: '🌐', color: 'from-orange-500 to-red-500' },
        { id: '2', name: 'CSS3 Advanced', level: 80, category: 'Frontend', icon: '🎨', color: 'from-blue-500 to-purple-500' },
        { id: '3', name: 'JavaScript (ES6+)', level: 75, category: 'Frontend', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
        { id: '4', name: 'Responsive Design', level: 80, category: 'Frontend', icon: '📱', color: 'from-green-400 to-blue-500' },
        { id: '5', name: 'UX/UI Intuitive', level: 70, category: 'Frontend', icon: '✨', color: 'from-pink-400 to-purple-500' },
        { id: '6', name: 'Node.js', level: 75, category: 'Backend', icon: '🟢', color: 'from-green-500 to-emerald-500' },
        { id: '7', name: 'Express.js', level: 70, category: 'Backend', icon: '⚡', color: 'from-gray-600 to-gray-800' },
        { id: '8', name: 'SQL Databases', level: 75, category: 'Backend', icon: '🗄️', color: 'from-blue-600 to-indigo-600' },
        { id: '9', name: 'NoSQL', level: 60, category: 'Backend', icon: '📊', color: 'from-purple-500 to-pink-500' },
        { id: '10', name: 'Web APIs', level: 75, category: 'Backend', icon: '🔗', color: 'from-cyan-500 to-blue-500' },
        { id: '11', name: 'Flutter', level: 80, category: 'Mobile', icon: '📱', color: 'from-blue-400 to-cyan-500' },
        { id: '12', name: 'Dart', level: 75, category: 'Mobile', icon: '🎯', color: 'from-blue-600 to-indigo-600' },
        { id: '13', name: 'Riverpod', level: 70, category: 'Mobile', icon: '🔄', color: 'from-green-400 to-blue-500' },
        { id: '14', name: 'Isar Database', level: 70, category: 'Mobile', icon: '💾', color: 'from-purple-400 to-pink-500' },
        { id: '15', name: 'TensorFlow Lite', level: 60, category: 'Mobile', icon: '🧠', color: 'from-orange-500 to-red-500' },
        { id: '16', name: 'Git/GitHub', level: 90, category: 'Tools', icon: '📝', color: 'from-orange-600 to-red-600' },
        { id: '17', name: 'Docker', level: 70, category: 'Tools', icon: '🐳', color: 'from-blue-500 to-cyan-400' },
        { id: '18', name: 'CI/CD Pipeline', level: 75, category: 'Tools', icon: '⚡', color: 'from-green-500 to-blue-500' },
        { id: '19', name: 'HiveOS Mining', level: 80, category: 'Tools', icon: '🖥️', color: 'from-gray-600 to-black' },
        { id: '20', name: 'Linux Administration', level: 70, category: 'Tools', icon: '🐧', color: 'from-yellow-500 to-orange-500' },
        { id: '21', name: 'Web Server Config', level: 70, category: 'Tools', icon: '🌐', color: 'from-blue-500 to-purple-500' }
      ]
    },
    projects: {
      title: 'Projects',
      subtitle: 'My recent achievements',
      categories: {
        all: 'All',
        web: 'Web',
        mobile: 'Mobile',
        backend: 'Backend',
        tools: 'Tools'
      },
      featured: 'Featured Projects',
      other_projects: 'Other Projects',
      view_project: 'View project',
      view_live: 'View live',
      view_code: 'View code',
      download: 'Download',
      technologies: 'Technologies used',
      screenshot: 'Project screenshot',
      philosophy_title: 'Development Philosophy',
      philosophy_text: 'Human-AI collaboration for rapid and effective development. Modern architecture with comprehensive tests and documentation. Sustainable approach and performance optimization.',
      projects_list: [
        {
          id: '1',
          title: 'Todo AI App - Flutter',
          description: 'Complete mobile application developed with AI collaboration . Modern architecture: Riverpod, Isar DB, TensorFlow Lite, FLChart. AI classification, behavioral coaching, comprehensive tests.',
          category: 'Mobile',
          technologies: ['Flutter', 'Dart', 'Riverpod', 'Isar DB', 'TensorFlow Lite', 'FLChart'],
          githubUrl: 'https://github.com/ComeToM3/todo-ai-app',
          liveUrl: 'https://hordearii.ca/apps',
          featured: true
        },
        {
          id: '2',
          title: 'Sustainable Web Infrastructure',
          description: 'Web hosting on HiveOS Standard mining rig with Docker. Server configuration, portfolio site, application pages. Sustainable approach: using rig in summer for web hosting.',
          category: 'Backend',
          technologies: ['Docker', 'HiveOS', 'Nginx', 'Linux', 'CI/CD', 'PM2'],
          githubUrl: 'https://github.com/ComeToM3/Portfolio-website',
          liveUrl: 'https://hordearii.ca',
          featured: true
        },
        {
          id: '3',
          title: 'Professional Web Portfolio',
          description: 'Modern portfolio with Next.js, TypeScript and Tailwind CSS. Responsive design, Framer Motion animations, PWA, internationalization. Optimized for performance and SEO.',
          category: 'Web',
          technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'PWA'],
          githubUrl: 'https://github.com/ComeToM3/Portfolio-website',
          liveUrl: 'https://hordearii.ca',
          featured: true
        },
        {
          id: '4',
          title: 'Portfolio Backend API',
          description: 'Complete REST API with Node.js, Express.js, PostgreSQL, Prisma. JWT authentication, security middleware, unit tests. Scalable architecture and complete documentation.',
          category: 'Backend',
          technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT'],
          githubUrl: 'https://github.com/ComeToM3/Portfolio-website',
          liveUrl: 'https://api.hordearii.ca',
          featured: false
        },
        {
          id: '5',
          title: 'Professional Git Management',
          description: 'Enterprise Git workflow with commit conventions, feature branches, pull requests, semantic versioning. GitHub Actions CI/CD pipeline for automated deployment.',
          category: 'Tools',
          technologies: ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'Semantic Versioning'],
          githubUrl: 'https://github.com/ComeToM3/Portfolio-website',
          featured: false
        },
        {
          id: '6',
          title: 'Learning Projects',
          description: 'Diverse personal projects: web applications, automation scripts, technological experiments. Continuous learning and active technology watch.',
          category: 'Web',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Flutter'],
          githubUrl: 'https://github.com/ComeToM3',
          featured: false
        }
      ]
    },
    contact: {
      title: 'Contact Me',
      subtitle: 'Ready to collaborate with a unique junior?',
      description: 'Don\'t hesitate to contact me to discuss your projects and see how my exceptional soft skills and human-AI collaboration can contribute to your team.',
      form: {
        name: 'Full name',
        email: 'Email address',
        subject: 'Subject',
        message: 'Message',
        send: 'Send message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending message.'
      },
      info: {
        title: 'Contact Information',
        location: 'Location',
        location_value: 'Montreal, Quebec, Canada',
        availability: 'Availability',
        availability_value: 'Available for missions',
        response_time: 'Response time',
        response_time_value: 'Within 24h'
      }
    },
    footer: {
      description: 'Full‑stack developer passionate about innovation and creativity. Human‑AI collaboration for exceptional solutions.',
      quick_links: 'Navigation',
      contact_info: 'Contact',
      availability: 'Available for missions',
      rights_reserved: 'All rights reserved.',
      privacy_policy: 'Privacy Policy',
      terms_of_service: 'Terms of Service',
      links: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact'
      }
    },
    admin: {
      dashboard: 'Dashboard',
      profile: 'Profile',
      skills: 'Skills',
      projects: 'Projects',
      messages: 'Messages',
      analytics: 'Analytics',
      view_site: 'View Site',
      logout: 'Logout',
      sidebar: {
        dashboard: 'Dashboard',
        dashboard_desc: 'Overview',
        profile: 'Profile',
        profile_desc: 'Personal information',
        skills: 'Skills',
        skills_desc: 'Technical skills',
        projects: 'Projects',
        projects_desc: 'Project management',
        messages: 'Messages',
        messages_desc: 'Contact messages',
        analytics: 'Analytics',
        analytics_desc: 'Site statistics'
      },
      stats: {
        visitors: 'Visitors',
        skills: 'Skills',
        projects: 'Projects',
        messages: 'Messages',
        growth_rate: 'this month',
        recent_update: 'Recent update',
        active: 'Active',
        response_time: 'Response'
      },
      activity: {
        title: 'Recent Activity',
        new_visitor: 'New visitor on Skills page',
        new_message: 'New contact message received',
        skill_updated: 'Flutter skill updated to 85%',
        project_added: 'New project "Todo AI App" added',
        visitor_projects: 'Visitor on Projects page'
      },
      actions: {
        title: 'Quick Actions',
        add_skill: 'Add a skill',
        create_project: 'Create a project',
        view_messages: 'View messages'
      },
      performance: {
        title: 'Performance',
        loading_time: 'Loading time',
        conversion_rate: 'Conversion rate'
      },
      system: {
        title: 'System',
        version: 'Version',
        last_update: 'Last update',
        status: 'Status',
        operational: 'Operational'
      }
    }
  }
};

// Fonction pour accéder aux propriétés imbriquées d'un objet
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' && current !== null && key in current 
      ? (current as Record<string, unknown>)[key] 
      : undefined;
  }, obj as unknown);
}

export function useTranslations(namespace: string) {
  const params = useParams();
  const locale = params?.locale as string || 'fr';
  
  const t = (key: string) => {
    const namespaceMessages = messages[locale as keyof typeof messages]?.[namespace as keyof typeof messages.fr];
    if (!namespaceMessages) return key;
    
    // Essayer d'abord la clé directe
    if (namespaceMessages[key as keyof typeof namespaceMessages] !== undefined) {
      return namespaceMessages[key as keyof typeof namespaceMessages];
    }
    
    // Si pas trouvé, essayer avec la fonction imbriquée
    const nestedValue = getNestedValue(namespaceMessages, key);
    return nestedValue !== undefined ? nestedValue : key;
  };
  
  return t;
}
