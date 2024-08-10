type Skill = {
    name: string;
    score: number;
  };
  
  type Experience = {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  };
  
  type Education = {
    degree: string;
    major: string;
    university?: string;
    school?: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  };
  
  type Certification = {
    name: string;
    date: string;
  };
  
  type Resume = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    experiences: Array<Experience>;
    education: Array<Education>;
    certifications: Array<Certification>;
    description: string;
    references: Array<string>;
    linkedin: string;
    skills: Array<Skill>;
  };