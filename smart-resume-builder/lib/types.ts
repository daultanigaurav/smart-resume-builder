export interface PersonalInfo {
    name: string
    email: string
    phone: string
    location: string
    title: string
    summary: string
  }
  
  export interface Education {
    institution: string
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate: string
    description: string
  }
  
  export interface Experience {
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    description: string
  }
  
  export interface Project {
    name: string
    description: string
    technologies: string
    url: string
    startDate: string
    endDate: string
  }
  
  export interface ResumeData {
    personal: PersonalInfo
    education: Education[]
    experience: Experience[]
    skills: string[]
    projects: Project[]
  }
  