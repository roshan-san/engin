import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create job roles
  const jobRoles = await Promise.all([
    prisma.jobRole.create({
      data: { name: 'Software Engineer' },
    }),
    prisma.jobRole.create({
      data: { name: 'Product Manager' },
    }),
    prisma.jobRole.create({
      data: { name: 'UI/UX Designer' },
    }),
    prisma.jobRole.create({
      data: { name: 'Marketing Specialist' },
    }),
  ]);

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
        peru: 'John Doe',
        username: 'johndoe',
        bio: 'Full-stack developer with 5 years of experience',
        type: 'Founder',
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
        areasofinterest: ['AI', 'Web Development', 'Cloud Computing'],
        availableFor: 'Full-time',
        location: 'San Francisco, CA',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        experiences: {
          create: [
            {
              company: 'Tech Corp',
              role: 'Senior Software Engineer',
              startDate: new Date('2020-01-01'),
              endDate: new Date('2023-12-31'),
              description: 'Led development of multiple web applications',
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        avatar: 'https://i.pravatar.cc/150?img=2',
        peru: 'Jane Smith',
        username: 'janesmith',
        bio: 'Product manager passionate about user experience',
        type: 'Investor',
        skills: ['Product Management', 'Agile', 'User Research'],
        areasofinterest: ['FinTech', 'E-commerce', 'Mobile Apps'],
        availableFor: 'Part-time',
        location: 'New York, NY',
        linkedin: 'https://linkedin.com/in/janesmith',
        github: 'https://github.com/janesmith',
        experiences: {
          create: [
            {
              company: 'Product Co',
              role: 'Product Manager',
              startDate: new Date('2019-06-01'),
              endDate: new Date('2023-12-31'),
              description: 'Managed multiple product lines and teams',
            },
          ],
        },
      },
    }),
  ]);

  // Create startups
  const startups = await Promise.all([
    prisma.startup.create({
      data: {
        name: 'TechStart',
        description: 'Revolutionary AI-powered platform for businesses',
        problem: 'Businesses struggle with data analysis and decision making',
        solution: 'AI-powered analytics platform that provides actionable insights',
        industry: 'Artificial Intelligence',
        location: 'San Francisco, CA',
        teamSize: 10,
        patent: 'US1234567',
        funding: 1000000,
        founderId: users[0].id,
        jobs: {
          create: [
            {
              title: 'Frontend Developer',
              description: 'Build beautiful and responsive user interfaces',
              requirements: '3+ years of React experience',
              skills: ['React', 'TypeScript', 'CSS'],
              experience: 'Mid-level',
              equity: 0.5,
              type: 'Full-time',
            },
            {
              title: 'Backend Developer',
              description: 'Develop robust backend services',
              requirements: '3+ years of Node.js experience',
              skills: ['Node.js', 'PostgreSQL', 'AWS'],
              experience: 'Mid-level',
              equity: 0.5,
              type: 'Full-time',
            },
          ],
        },
      },
    }),
    prisma.startup.create({
      data: {
        name: 'EcoTech',
        description: 'Sustainable technology solutions for a greener future',
        problem: 'Companies need help reducing their carbon footprint',
        solution: 'AI-powered energy optimization platform',
        industry: 'CleanTech',
        location: 'New York, NY',
        teamSize: 8,
        patent: 'US7654321',
        funding: 750000,
        founderId: users[1].id,
        jobs: {
          create: [
            {
              title: 'UI/UX Designer',
              description: 'Design intuitive and beautiful interfaces',
              requirements: '2+ years of design experience',
              skills: ['Figma', 'UI/UX', 'Prototyping'],
              experience: 'Mid-level',
              equity: 0.3,
              type: 'Full-time',
            },
          ],
        },
      },
    }),
  ]);

  // Create investments
  await Promise.all([
    prisma.investment.create({
      data: {
        userId: users[1].id,
        startupId: startups[0].id,
        amount: 50000,
      },
    }),
    prisma.investment.create({
      data: {
        userId: users[0].id,
        startupId: startups[1].id,
        amount: 25000,
      },
    }),
  ]);

  // Create connections
  await Promise.all([
    prisma.connection.create({
      data: {
        senderId: users[0].id,
        receiverId: users[1].id,
        status: 'accepted',
      },
    }),
    prisma.connection.create({
      data: {
        senderId: users[1].id,
        receiverId: users[0].id,
        status: 'pending',
      },
    }),
  ]);

  // Create collaborations
  await Promise.all([
    prisma.collaboration.create({
      data: {
        userId: users[0].id,
        startupId: startups[1].id,
        roleId: jobRoles[0].id, // Software Engineer
      },
    }),
    prisma.collaboration.create({
      data: {
        userId: users[1].id,
        startupId: startups[0].id,
        roleId: jobRoles[1].id, // Product Manager
      },
    }),
  ]);

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 