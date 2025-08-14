import { PrismaClient, UserRole, SkillCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Créer un utilisateur admin
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'johan_dominguez@hotmail.com' },
    update: {},
    create: {
      email: 'johan_dominguez@hotmail.com',
      name: 'Johan Dominguez',
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Créer des compétences
  const skills = [
    // Frontend
    { name: 'HTML5', category: SkillCategory.FRONTEND, level: 95, order: 1 },
    { name: 'CSS3', category: SkillCategory.FRONTEND, level: 90, order: 2 },
    { name: 'JavaScript', category: SkillCategory.FRONTEND, level: 85, order: 3 },
    { name: 'React', category: SkillCategory.FRAMEWORKS, level: 80, order: 4 },
    { name: 'Next.js', category: SkillCategory.FRAMEWORKS, level: 75, order: 5 },
    { name: 'TypeScript', category: SkillCategory.LANGUAGES, level: 70, order: 6 },
    { name: 'Tailwind CSS', category: SkillCategory.FRONTEND, level: 85, order: 7 },
    
    // Backend
    { name: 'Node.js', category: SkillCategory.BACKEND, level: 80, order: 8 },
    { name: 'Express.js', category: SkillCategory.BACKEND, level: 75, order: 9 },
    { name: 'PostgreSQL', category: SkillCategory.DATABASE, level: 70, order: 10 },
    { name: 'Prisma', category: SkillCategory.DATABASE, level: 65, order: 11 },
    
    // DevOps & Tools
    { name: 'Git', category: SkillCategory.TOOLS, level: 85, order: 12 },
    { name: 'Docker', category: SkillCategory.DEVOPS, level: 60, order: 13 },
    { name: 'Linux', category: SkillCategory.DEVOPS, level: 75, order: 14 },
    
    // Autres
    { name: 'Flutter', category: SkillCategory.FRAMEWORKS, level: 70, order: 15 },
    { name: 'Python', category: SkillCategory.LANGUAGES, level: 60, order: 16 },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { 
        name_userId: { 
          name: skill.name, 
          userId: adminUser.id 
        } 
      },
      update: skill,
      create: {
        ...skill,
        userId: adminUser.id,
      },
    });
  }

  console.log('✅ Skills created');

  // Créer des projets
  const projects = [
    {
      title: 'Todo AI App',
      description: 'Application de gestion de tâches avec intelligence artificielle pour optimiser la productivité.',
      image: '/projects/todo-ai-app.jpg',
      technologies: ['React', 'Node.js', 'OpenAI API', 'PostgreSQL'],
      githubUrl: 'https://github.com/ComeToM3/todo-ai-app',
      liveUrl: 'https://todo-ai-app.vercel.app',
      featured: true,
      order: 1,
    },
    {
      title: 'Portfolio Hordearii',
      description: 'Portfolio professionnel moderne avec design responsive et animations fluides.',
      image: '/projects/portfolio-hordearii.jpg',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      githubUrl: 'https://github.com/ComeToM3/Portfolio-website',
      liveUrl: 'https://hordearii.ca',
      featured: true,
      order: 2,
    },
    {
      title: 'Infrastructure Web',
      description: 'Configuration complète d\'infrastructure web avec Docker, Nginx et monitoring.',
      image: '/projects/infrastructure-web.jpg',
      technologies: ['Docker', 'Nginx', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/ComeToM3/infrastructure-web',
      featured: false,
      order: 3,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { 
        title_userId: { 
          title: project.title, 
          userId: adminUser.id 
        } 
      },
      update: project,
      create: {
        ...project,
        userId: adminUser.id,
      },
    });
  }

  console.log('✅ Projects created');

  // Créer quelques messages de contact de test
  const contactMessages = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Bonjour Johan, j\'ai vu votre portfolio et je suis impressionné par vos compétences. Seriez-vous disponible pour discuter d\'un projet ?',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      message: 'Salut ! Votre projet Todo AI App est vraiment intéressant. Avez-vous de l\'expérience avec d\'autres frameworks ?',
    },
  ];

  for (const message of contactMessages) {
    await prisma.contactMessage.create({
      data: message,
    });
  }

  console.log('✅ Contact messages created');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
