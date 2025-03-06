const fields = [
  { label: "Job Title", placeholder: "Enter Job Title", options: ["Designer", "Developer", "Product Manager", "Marketing Specialist", "Data Analyst", "Sales Executive", "Content Writer", "Customer Support"] },
  { label: "Company", placeholder: "Enter Company Name", options: ["Google", "Microsoft", "Meta", "Netflix", "Adobe", "Facebook", "Amazon", "Apple", "Spotify"] },
  { label: "Experience", placeholder: "Enter Experience Level", options: ["Entry Level", "Intermediate", "Expert"] },
  { label: "Job Type", placeholder: "Enter Job Type", options: ["Full Time", "Contract", "Freelance", "Internship"] },
  { label: "Location", placeholder: "Enter Job Location", options: ["New York", "San Francisco", "London", "Berlin", "Tokyo", "Sydney", "Toronto", "Delhi"] },
  { label: "Salary", placeholder: "Enter Salary", options: ["50k/yr", "75k/yr", "100k/yr", "125k/yr", "150k/yr", "175k/yr", "200k/yr", "250k/yr"] }
];

const content = `
  <h4>About The Job</h4>
  <p>Write description here...</p>
  <h4>Responsibilities</h4>
  <ul>
    <li>Add responsibilities here...</li>
  </ul>
  <h4>Qualifications and Skill Sets</h4>
  <ul>
    <li>Add required qualification and skill set here...</li>
  </ul>
`;

export { fields, content };
