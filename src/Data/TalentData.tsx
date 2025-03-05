import { IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const searchFields = [
  { title: "Job Title", icon: IconSearch, options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'] },
  { title: "Location", icon: IconMapPin, options: ["New York", "San Francisco", "London", "Berlin", "Tokyo", "Sydney", "Toroto", "Delhi"] },
  {
    title: "skills", icon: IconRecharging, options: ["HTML", "CSS", "JavaScript", "React", "Angular",
      "Node.js", "Python", "Java", "Ruby", "PHP", "SQL", "MongODB", "PostgreSQL", "Git", "API Development", "Testing and Debugging", "Agile Methodologies", "DevOps", "AWS", "Azure", "Google Cloud"]
  },
]

const talents = [
  {
    name: "Jarrod Wood",
    role: "Software Engineer",
    company: "Google",
    topSkills: ["React", "SpringBoot", "MongoDB"],
    about: "As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.",
    expectedSalary: "$100k - $150k",
    location: "New York, United States",
    avatar: "src/assets/avatar2.png"
  },
  {
    name: "Sophia Patel",
    role: "Data Scientist",
    company: "Microsoft",
    topSkills: ["Python", "Machine Learning", "TensorFlow"],
    about: "A Data Scientist at Microsoft with a strong focus on predictive analytics and AI-driven solutions. Skilled in Python, TensorFlow, and data visualization, I love turning raw data into actionable insights. Passionate about machine learning and automation, I strive to build models that enhance business decision-making.",
    expectedSalary: "$120k - $170k",
    location: "San Francisco, United States",
    avatar: "src/assets/avatar.png"
  },
  {
    name: "Liam Chen",
    role: "Product Manager",
    company: "Amazon",
    topSkills: ["Agile", "Product Strategy", "User Research"],
    about: "An experienced Product Manager at Amazon, driving product innovation and strategy. I work closely with cross-functional teams to develop user-centric solutions and improve product experiences. Passionate about Agile methodologies and leveraging user research to make data-driven decisions.",
    expectedSalary: "$110k - $160k",
    location: "Seattle, United States",
    avatar: "src/assets/avatar2.png"
  },
  {
    name: "Elena Rodriguez",
    role: "UX Designer",
    company: "Adobe",
    topSkills: ["Figma", "Wireframing", "User Research"],
    about: "A UX Designer at Adobe dedicated to crafting intuitive and visually appealing user experiences. I specialize in wireframing, prototyping, and user research to design seamless digital interactions. Passionate about creating accessible and inclusive designs.",
    expectedSalary: "$90k - $130k",
    location: "Berlin, Germany",
    avatar: "src/assets/avatar1.png"
  },
  {
    name: "Noah Kim",
    role: "Cybersecurity Analyst",
    company: "Tesla",
    topSkills: ["Network Security", "Ethical Hacking", "Cloud Security"],
    about: "A Cybersecurity Analyst at Tesla ensuring robust security protocols for sensitive data and critical infrastructure. Skilled in ethical hacking, cloud security, and network protection, I am dedicated to safeguarding systems against potential threats.",
    expectedSalary: "$100k - $140k",
    location: "Toronto, Canada",
    avatar: "src/assets/avatar2.png"
  },
  {
    name: "Isla Fernandez",
    role: "Marketing Specialist",
    company: "Meta",
    topSkills: ["SEO", "Social Media Marketing", "Content Strategy"],
    about: "As a Marketing Specialist at Meta, I develop and execute creative campaigns that enhance brand visibility. I have experience in social media marketing, content strategy, and SEO to drive audience engagement and business growth.",
    expectedSalary: "$80k - $120k",
    location: "Sydney, Australia",
    avatar: "src/assets/avatar.png"
  },
]

export { searchFields, talents }