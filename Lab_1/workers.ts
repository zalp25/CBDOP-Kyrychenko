import { Category, type Worker, type logResult, type workerData } from "./types";


export function getAllWorkers(): Worker[] {
    return [
        { id: 0, name: "Danylo", surname: "Romanovych", available: false, salary: 1000, category: Category.QualityAssurance },
        { id: 1, name: "Sergiy", surname: "Skoropadsky", available: true, salary: 1500, category: Category.Developer },
        { id: 2, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600, category: Category.ScrumMaster },
        { id: 3, name: "Yar", surname: "Vysneventsky", available: true, salary: 1300, category: Category.BusinessAnalyst },
        { id: 4, name: "Oleksandr", surname: "Kyrychenko", available: true, salary: 550, category: Category.Developer },
        { id: 5, name: "Mykyta", surname: "Konopelskiy", available: false, salary: 1150, category: Category.Designer },
        { id: 6, name: "Ivan", surname: "Pechenenko", available: true, salary: 5000, category: Category.Developer },
        { id: 7, name: "Evgen", surname: "Zyubanov", available: false, salary: 1, category: Category.BusinessAnalyst },
        { id: 8, name: "Illia", surname: "Tereshko", available: true, salary: 1000, category: Category.ScrumMaster }
    ];
}


export function getWorkersSurnamesByCategory(category: Category = Category.Designer): Array<string> {
    const workers: Worker[] = getAllWorkers();
    const surnames: Array<string> = [];

    for (const worker of workers) {
        if (worker.category === category) {
            surnames.push(worker.surname);
        }
    }

    return surnames;
}


export function logFirstAvailable(workers: Worker[] = getAllWorkers()): logResult {

    for (const worker of workers) {
        if (worker.available === true) {
            return {
                workers_count: workers.length,
                first_available_name: worker.name,
                first_available_surname: worker.surname
            };
        }
    }

    return {
        workers_count: workers.length,
        first_available_name: "Помилка",
        first_available_surname: "Помилка"
    };
}


export function logWorkersNames(workers: string[]): void {
    console.log(workers);
}


export function getWorkerByID(id: number, workers: Worker[] = getAllWorkers()): workerData {
    const worker: Worker | undefined = workers.find((worker: Worker) => worker.id === id);

    if (worker !== undefined) {
        return {
            name: worker.name,
            surname: worker.surname,
            salary: worker.salary
        };
    }

    return {
        name: "Немає такого працівника",
        surname: "",
        salary: 0
    };
}