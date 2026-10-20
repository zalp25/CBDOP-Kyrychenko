// ВВІД В КОНСОЛЬ, мб видалю

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



// ІНТЕРФЕЙСИ

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    departament: string;
    assistCustomer(custName: string): void;
}

interface PrizeLogger {
    (prize: string): void;
}

interface Worker {
    id: number;
    name: string;
    surname: string;
    available: boolean;
    salary: number;
    markPrize: PrizeLogger;
}



// ЗМІННІ / ЗМІННІ-ФУНКЦІЇ

const logPrize: PrizeLogger = prize => 
    console.log(`Prize received: ${prize}`);

logPrize("Employee of the Month");

const favoriteAuthor: Author = {
    name: "Oleksamdr",
    email: "kyrychenko@knu.ua",
    numBooksPublished: 1
};

const favoriteLibrarian: Librarian = {
    name: "Ivan",
    email: "pechenenko@knu.ua",
    departament: "Mistics",
    assistCustomer(custName: string): void{
        console.log(`${this.name} helped ${custName}`);
    }

}

// ФУНКЦІЇ

function getAllWorkers(): Worker[] {
    return [
        { id: 0, name: "Sergiy", surname: "Skoropadsky", available: true, salary: 1500, markPrize: logPrize },
        { id: 1, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600, markPrize: logPrize },
        { id: 2, name: "Yar", surname: "Vysneventsky", available: true, salary: 1300, markPrize: logPrize },
        { id: 3, name: "Oleksandr", surname: "Kyrychenko", available: true, salary: 550, markPrize: logPrize },
        { id: 4, name: "Mykyta", surname: "Konopelskiy", available: false, salary: 1150, markPrize: logPrize },
        { id: 5, name: "Ivan", surname: "Pechenenko", available: true, salary: 5000, markPrize: logPrize },
        { id: 6, name: "Evgen", surname: "Zyubanov", available: false, salary: 1, markPrize: logPrize },
        { id: 7, name: "Illia", surname: "Tereshko", available: true, salary: 1000, markPrize: logPrize },
        { id: 8, name: "Artem", surname: "Diachenko", available: true, salary: 1777, markPrize: logPrize }
    ];
}

function getWorkerByID(id: number, workers: Worker[] = getAllWorkers()): Worker | undefined {
    return workers.find(worker => worker.id === id);
}

function PrintWorker(worker: Worker): void {
    console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}`);
}

console.log(logPrize);