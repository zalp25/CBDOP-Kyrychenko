import { getAllWorkers, getWorkerByID } from "./workers";
import type { Worker, workerData } from "./types";


export function createCustomerID(name: string, id: number): string {
    let customer: string = name + String(id);
    return customer;
}


export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Ім'я замовника: ${name}`);

    if (age !== undefined) {
        console.log(`Вік замовника: ${age}`);
    }

    if (city !== undefined) {
        console.log(`Місто замовника: ${city}`);
    }
}


export function checkoutWorkers(customer: string, ...workerIDs: number[]): string[] {
    console.log(`Замовник: ${customer}`);

    const availableWorkers: string[] = [];

    workerIDs.forEach((workerID: number) => {
        const worker: workerData = getWorkerByID(workerID);

        if (worker.salary !== 0) {
            const foundWorker: Worker | undefined = getAllWorkers().find((worker) => worker.id === workerID);

            if (foundWorker !== undefined && foundWorker.available === true) {
                availableWorkers.push(`${worker.name} ${worker.surname}`);
            }
        }
    });

    return availableWorkers;
}