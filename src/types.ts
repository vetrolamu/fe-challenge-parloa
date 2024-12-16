export type CandidateStats = {
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number
}

export type CandidateData = {
    id: string,
    name: string,
    dob: string, // ISO date format
    lair_address: string,
    lair_secret_password: string,
    classname: string,
    race: string,
    level: number,
    height: number, // cm
    hitpoints: number,
    image: string,
    stats: CandidateStats
}

export type Candidate = CandidateData & {
    age: number,
}