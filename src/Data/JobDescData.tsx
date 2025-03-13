import { IconBriefcase, IconMapPin, IconPremiumRights, IconRecharging } from "@tabler/icons-react";

const card = [
  { name: "Location", icon: IconMapPin, value: "New York", id:"location" },
  { name: "Experience", icon: IconBriefcase, value: "Expert", id:"experience" },
  { name: "Annual Salary", icon: IconPremiumRights, value: "48 LPA", id:"packageOffered" },
  { name: "Job Type", icon: IconRecharging, value: "Full Time", id:"jobType" },
];

const skills = ["React","Django","PostgreSQL","Spring Boot","Java","Python","Node.js","MongoDB","Express"];

const desc = `
  <h4>About The Job</h4>
  <p>
    Here at UIHUT, we are a passionate, fun-loving, growing team. 
    We are looking for talented programmers who enjoy solving 
    technical challenges and are eager to learn and incorporate 
    new technologies into their skillset. This role offers an 
    exciting opportunity to work on innovative projects that 
    impact millions of users worldwide.
  </p>
  
  <h4>Responsibilities</h4>
  <ul>
    <li>Design, develop, and maintain scalable web applications.</li>
    <li>Collaborate with cross-functional teams to define and implement new features.</li>
    <li>Optimize code for performance and scalability.</li>
    <li>Troubleshoot and debug applications to ensure optimal functionality.</li>
    <li>Stay up-to-date with industry trends and emerging technologies.</li>
  </ul>
  
  <h4>Qualifications and Skill Sets</h4>
  <ul>
    <li>Proven experience in full-stack development.</li>
    <li>Proficiency in JavaScript, React, and Node.js.</li>
    <li>Experience with databases like PostgreSQL and MongoDB.</li>
    <li>Familiarity with backend frameworks such as Django or Spring Boot.</li>
    <li>Strong problem-solving skills and ability to work in a team-oriented environment.</li>
  </ul>
  
  <h4>Perks and Benefits</h4>
  <ul>
    <li>Competitive salary and performance-based bonuses.</li>
    <li>Flexible work hours and remote work options.</li>
    <li>Health insurance and wellness programs.</li>
    <li>Opportunities for career growth and skill development.</li>
    <li>Collaborative and inclusive work culture.</li>
  </ul>
`;

export { card, skills, desc };

