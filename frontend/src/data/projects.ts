export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  type: string;
  technologies: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  isPrivate?: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "gclims",
    number: "01",
    title: "GCLIMS",
    description:
      "A laboratory management system designed to simplify patient registration, testing workflows, records and report generation.",
    category: "Healthcare",
    type: "Independent Project",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    isPrivate: true,
    image: "/projects/gclims/Dashboard.png",
  },

  {
    id: "rentease",
    number: "02",
    title: "RentEase",
    description:
      "A rental platform concept focused on listings, users, rental workflows and digital transactions.",
    category: "Marketplace",
    type: "Independent Project",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "",
    image: "/projects/rentease/homepage.png",
  },

  {
    id: "cinemood",
    number: "03",
    title: "CineMood",
    description:
      "A movie discovery experience that helps users discover films through mood-based exploration.",
    category: "Entertainment",
    type: "Independent Project",
    technologies: ["React", "Vite", "TMDB API"],
    liveUrl: "",
    image: "/projects/cinemood/cinemood1.png",
  },
];