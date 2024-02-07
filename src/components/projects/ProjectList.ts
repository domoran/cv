import { ref, PropType } from "vue";
import { Company } from "./model";
import jsYaml from "js-yaml";

export class ProjectList {
    public companies = ref<Array<Company> | null>(null);
    public error = ref<any | undefined>()

    constructor() {
        fetch('/lebenslauf.yaml')
        .then(async (response) => await response.text())
        .then(yamlText => {
            const parsedYaml = jsYaml.load(yamlText) as Array<Company>;
            this.companies.value = parsedYaml.map( (c => { return {
                company: c.company || "",
                tag: c.tag || "", 
                position: c.position || "",
                achievements: c.achievements || [], 
                time: c.time || [], 
                projects: !c.projects ? [] : c.projects.map( p => { return {
                    name: p.name || "", 
                    customer: p.customer || "", 
                    industry: p.industry || "", 
                    time: p.time, 
                    description: p.description || "",
                    technologies: p.technologies || [],
                    tasks: p.tasks || [],
                }})
            }}))
        }).catch(error => {
            this.error.value = error
        });
    }

    filter (keyword: string|PropType<string>, category:string|undefined = undefined) {
        if (this.companies.value == null) return []

        let searchVal:string
        if (typeof(keyword) == 'string') {
            searchVal = keyword.toLowerCase()
        } else {
            searchVal = keyword.toString().toLowerCase()
        }
        
        return this.companies.value.filter(company => {
            // Filter projects based on the keyword
            const filteredProjects = company.projects.filter(project =>
                project.technologies.some(tech => tech.toLowerCase().includes(searchVal)) ||
                project.tasks.some(task => task.toLowerCase().includes(searchVal)) ||
                project.name.toLowerCase().includes(searchVal) ||
                project.description.toLowerCase().includes(searchVal) ||
                project.name.toLowerCase().includes(searchVal) ||
                (project.time && project.time.start && project.time.start.toLowerCase().includes(searchVal)) ||
                (project.time && project.time.end && project.time.end.toLowerCase().includes(searchVal))
            );

            const searchValInAchievements = company.achievements.some(achievement => achievement.toLowerCase().includes(searchVal))
            const categoryMatch = !category || (category.toLowerCase() == company.tag.toLowerCase());
            const positionMatch = company.position.toLowerCase().includes(searchVal)
            const timeMatch = (company.time && company.time.start && company.time.start.toLowerCase().includes(searchVal)) ||
                            (company.time && company.time.end && company.time.end.toLowerCase().includes(searchVal))
            const companyMatch = company.company.toLowerCase().includes(searchVal)
                            
            return (companyMatch || positionMatch || timeMatch || searchValInAchievements || filteredProjects.length > 0) && categoryMatch;
        }).filter(company => company.projects.length > 0 || company.achievements.length > 0);

    }
}

export default new ProjectList()