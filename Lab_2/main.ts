import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function input(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer: string): void => {
            resolve(answer);
        });
    });
}

interface Worker {
    id: number;
    name: string;
    surname: string;
    available: boolean;
    salary: number;
}

function getAllWorkers(): Worker[] {
    return [
        { id: 0, name: "Danylo", surname: "Romanovych", available: false, salary: 1000 },
        { id: 1, name: "Sergiy", surname: "Skoropadsky", available: true, salary: 1500 },
        { id: 2, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600 },
        { id: 3, name: "Yar", surname: "Vysneventsky", available: true, salary: 1300 },
        { id: 4, name: "Oleksandr", surname: "Kyrychenko", available: true, salary: 550 },
        { id: 5, name: "Mykyta", surname: "Konopelskiy", available: false, salary: 1150 },
        { id: 6, name: "Ivan", surname: "Pechenenko", available: true, salary: 5000 },
        { id: 7, name: "Evgen", surname: "Zyubanov", available: false, salary: 1 },
        { id: 8, name: "Illia", surname: "Tereshko", available: true, salary: 1000 },
        { id: 9, name: "Artem", surname: "Diachenko", available: true, salary: 1777 }
    ];
}

function getWorkerByID(id: number, workers: Worker[] = getAllWorkers()): Worker | undefined {
    return workers.find(worker => worker.id === id);
}

function PrintWorker(worker: Worker): void {
    console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}`);
}
