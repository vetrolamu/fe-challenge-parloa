export enum ExperienceLevel {
    Junior = 'Junior',
    Mid = 'Mid Level',
    Senior = 'Senior',
}

export type CandidateData = {
    id: string,
    name: string,
    image: string
    dateOfBirth: string, // yyyy-MM-dd
    profession: string,
    address: string,
    level: ExperienceLevel, 
    experience: number,
}

export type Candidate = CandidateData & {
    age: number,
}