export enum Category {
    BusinessAnalyst = "Business analyst",
    Developer = "Developer",
    Designer = "Designer",
    QualityAssurance = "QA",
    ScrumMaster = "Scrum master"
}


export interface Worker {
    id: number;
    name: string;
    surname: string;
    available: boolean;
    salary: number;
    category: Category;
}


export interface logResult {
    workers_count: number;
    first_available_name: string;
    first_available_surname: string;
}


export interface workerData {
    name: string;
    surname: string;
    salary: number;
}