export interface Time {
    start: string
    end: string
}

export interface Project {
    name: string
    customer: string
    industry: string
    time: Time
    description: string
    technologies: Array<string>
    tasks: Array<string>
}

export interface Company {
    company: string
    tag: string
    position: string
    projects: Array<Project>
    achievements: Array<string>
    time: Time
}
