interface Worker {
    id: number;
    name: string;
    surname: string;
    available: boolean;
    salary: number;
}

function getAllWorkers(): Worker[] {
    return [
        { id: 1, name: "Danylo", surname: "Romanovych", available: false, salary: 1000 },
        { id: 2, name: "Sergiy", surname: "Skoropadsky", available: true, salary: 1500 },
        { id: 3, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600 },
        { id: 4, name: "Yar", surname: "Vysneventsky", available: true, salary: 1300 }
    ];
}

interface logResult {
    workers_count: number;
    first_available_name: string;
    first_available_surname: string;
}

function logFirstAvailable(workers: Worker[] = getAllWorkers()): logResult {

    for (const worker of workers) {
        if (worker.available === true) {
            return {workers_count: workers.length, first_available_name: worker.name, first_available_surname: worker.surname}
        }
    }

    return {workers_count: workers.length, first_available_name: "Помилка", first_available_surname: "Помилка"}
}



function main(): void {
    let result = logFirstAvailable(getAllWorkers())
    console.log(`Всього ${result.workers_count} працівники(-ів)`)
    console.log(`Перший доступний працівник: ${result.first_available_name, result.first_available_surname}`)
}

main();