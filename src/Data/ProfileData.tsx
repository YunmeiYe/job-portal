import { IconBriefcase, IconMapPin } from "@tabler/icons-react";

const fields = [
  { label: "Job Title", placeholder: "Enter Job Title", options: ["Designer", "Developer", "Product Manager", "Marketing Specialist", "Data Analyst", "Sales Executive", "Content Writer", "Customer Support"], value: "Software Engineer", leftSection: IconBriefcase },
  { label: "Company", placeholder: "Enter Company Name", options: ["Google", "Microsoft", "Meta", "Netflix", "Adobe", "Facebook", "Amazon", "Apple", "Spotify"], value: "Google", leftSection: IconBriefcase },
  { label: "Location", placeholder: "Enter Job Location", options: ["New York", "San Francisco", "London", "Berlin", "Tokyo", "Sydney", "Toronto", "Delhi"], value: "New York", leftSection: IconMapPin },
];

export { fields };