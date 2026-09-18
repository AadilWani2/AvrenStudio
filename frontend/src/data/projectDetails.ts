export type ProjectDetail = {
  id: string;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  images: string[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  gclims: {
    id: "gclims",
    overview:
      "GCLIMS is a laboratory management system designed to organize patient registration, laboratory tests, records and report generation in one workflow.",
    challenge:
      "The goal was to replace a fragmented manual workflow with a more organized digital system that could be used efficiently by laboratory staff.",
    solution:
      "The system brings patient information and laboratory tests into a single workflow while maintaining patient history through a unique phone-based identifier.",
    features: [
      "Patient registration",
      "Laboratory test management",
      "Patient history",
      "Report generation",
      "Responsive dashboard",
      "Secure authentication",
    ],
    images: [
      "/projects/gclims/Dashboard.png",
      "/projects/gclims/patient entry.png",
      "/projects/gclims/reports log.png",
      "/projects/gclims/billing.png",
    ],
  },

  rentease: {
    id: "rentease",
    overview:
      "RentEase is a rental platform project focused on connecting users with rental listings through a structured digital workflow.",
    challenge:
      "The project required a straightforward way to organize listings, users and rental interactions while keeping the experience simple.",
    solution:
      "The platform combines a modern frontend with a backend API and database-driven architecture to support the core rental workflow.",
    features: [
      "Rental listings",
      "User workflows",
      "Listing management",
      "Database integration",
      "Responsive interface",
    ],
    images: [
      "/projects/rentease/homepage.png",
      "/projects/rentease/curated section.png",
      "/projects/rentease/curated2.png",
    ],
  },

  cinemood: {
    id: "cinemood",
    overview:
      "CineMood is a movie discovery experience that explores a different approach to finding films through mood-based discovery.",
    challenge:
      "Traditional movie discovery often starts with a title, genre or actor. CineMood explores discovery from the user's current mood.",
    solution:
      "The application combines a focused interface with movie data to create a more engaging discovery experience.",
    features: [
      "Mood-based discovery",
      "Movie search",
      "Movie information",
      "TMDB integration",
      "Responsive interface",
    ],
    images: [
      "/projects/cinemood/cinemood1.png",
      "/projects/cinemood/cinemood2.png",
      "/projects/cinemood/cinemood3.png",
      "/projects/cinemood/cinemood4.png",
      "/projects/cinemood/cinemood5.png",
      "/projects/cinemood/cinemood6.png",
      "/projects/cinemood/cinemood7.png",
      "/projects/cinemood/cinemood8.png",
      "/projects/cinemood/cinemood9.png",
    ],
  },
};
