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



enum Category {
    BusinessAnalyst = "Business analyst",
    Developer = "Developer",
    Designer = "Designer",
    QualityAssurance = "QA",
    ScrumMaster = "Scrum master"
}


interface Worker {
    id: number;
    name: string;
    surname: string;
    available: boolean;
    salary: number;
    category: Category;
}


function validateWorker(worker: Worker): boolean {
    return (
        Number.isInteger(worker.id) &&
        worker.id >= 0 &&
        worker.name.trim() !== "" &&
        worker.surname.trim() !== "" &&
        Number.isFinite(worker.salary) &&
        worker.salary >= 0 &&
        typeof worker.available === "boolean" &&
        Object.values(Category).includes(worker.category)
    );
}


function getAllWorkers(): Worker[] {
    return [
        { id: 0, name: "Danylo", surname: "Romanovych", available: false, salary: 1000, category: Category.QualityAssurance },
        { id: 1, name: "Sergiy", surname: "Skoropadsky", available: true, salary: 1500, category: Category.Developer },
        { id: 2, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600, category: Category.ScrumMaster },
        { id: 3, name: "Yar", surname: "Vysneventsky", available: true, salary: 1300, category: Category.BusinessAnalyst },
        { id: 4, name: "Oleksandr", surname: "Kyrychenko", available: true, salary: 550, category: Category.Developer },
        { id: 5, name: "Mykyta", surname: "Konopelskiy", available: false, salary: 1150, category: Category.Designer },
        { id: 6, name: "Ivan", surname: "Pechenenko", available: true, salary: 5000, category: Category.Developer },
        { id: 7, name: "Evgen", surname: "Zyubanov", available: false, salary: 1, category: Category.BusinessAnalyst },
        { id: 8, name: "Illia", surname: "Tereshko", available: true, salary: 1000, category: Category.ScrumMaster },
        { id: 9, name: "Artem", surname: "Diachenko", available: true, salary: 1777, category: Category.QualityAssurance }
    ];
}


function getWorkersSurnamesByCategory(
    category: Category = Category.Designer,
    workers: Worker[] = getAllWorkers()
): Array<string> {
    const surnames: Array<string> = [];

    for (const worker of workers) {
        if (worker.category === category) {
            surnames.push(worker.surname);
        }
    }

    return surnames;
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


function logWorkersNames(workers: string[]): void {
    console.log(workers);
}


interface workerData {
    name: string;
    surname: string;
    salary: number;
}


function getWorkerByID(id: number, workers: Worker[] = getAllWorkers()): workerData {
    const worker: Worker | undefined = workers.find(
        (worker: Worker): boolean => worker.id === id
    );

    if (worker !== undefined) {
        return {name: worker.name, surname: worker.surname, salary: worker.salary};
    }

    return {name: "Немає такого працівника", surname: "", salary: 0};
}


function createCustomerID(name: string, id: number): string {
    const customer: string = name + String(id);
    return customer;
}


// Завдання 1.4 - 3
let idGenerator: (name: string, id: number) => string = (name: string, id: number): string => {
    return name + String(id);
};


function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Ім'я замовника: ${name}`);

    if (age !== undefined) {
        console.log(`Вік замовника: ${age}`);
    }

    if (city !== undefined) {
        console.log(`Місто замовника: ${city}`);
    }
}


function checkoutWorkers(customer: string, workers: Worker[], ...workerIDs: number[]): string[] {
    console.log(`Замовник: ${customer}`);

    const availableWorkers: string[] = [];

    workerIDs.forEach((workerID: number): void => {
        const worker: workerData = getWorkerByID(workerID, workers);

        if (worker.salary !== 0) {
            const foundWorker: Worker | undefined = workers.find(
                (worker: Worker): boolean => worker.id === workerID
            );

            if (foundWorker !== undefined && foundWorker.available === true) {
                availableWorkers.push(`${worker.name} ${worker.surname}`);
            }
        }
    });

    return availableWorkers;
}



async function main(): Promise<void> {

    const workers: Worker[] = getAllWorkers();

    for (const worker of workers) {
        if (!validateWorker(worker)) {
            console.log(`Помилка: некоректні дані працівника з ID ${worker.id}`);
            rl.close();
            return;
        }
    }

    while (true){
        console.log("\n\n1. Вивід загальної кількості працівників та першого вільного працівника: logFirstAvailable()");
        console.log("2. Пошук працівників по категорії: getWorkersSurnamesByCategory()");
        console.log("3. Стрілочна ф-ія, всі Developer'и: (worker) => {");
        console.log("4. Пошук працівника по ID: getWorkerByID()");
        console.log("5. Конкатенація імені та айді: createCustomerID()");
        console.log("6. Створення ID через idGenerator");
        console.log("7. Створення замовника: createCustomer()");
        console.log("8. Пошук доступних працівників для замовника: checkoutWorkers()");
        console.log("9. Виклик функцій зі значеннями за замовчуванням");
        console.log("БУДЬ-ЯКИЙ ІНШИЙ ВВІД. Завершити виконання програми");

        const choice: string = await input("\nВиберіть пункт в меню(1, 2, ...): ");

        switch (choice) {
            case "1":
                const result: logResult = logFirstAvailable(workers);

                console.log(`\nВсього ${result.workers_count} працівники(-ів)`);
                console.log(`Перший доступний працівник: ${result.first_available_name} ${result.first_available_surname}`);
                break;

            case "2":
                console.log("\n\n1. Business analyst");
                console.log("2. Developer");
                console.log("3. Designer");
                console.log("4. QA");
                console.log("5. Scrum master");
                console.log("БУДЬ-ЯКИЙ ІНШИЙ ВВІД. Повернутись у меню");

                const chosen_category: string = await input("\nВиберіть категорію працівника(1, 2, ...): ");
                let category: Category;

                switch (chosen_category) {
                    case "1":
                    case "Business analyst":
                        category = Category.BusinessAnalyst;
                        break;

                    case "2":
                    case "Developer":
                        category = Category.Developer;
                        break;

                    case "3":
                    case "Designer":
                        category = Category.Designer;
                        break;

                    case "4":
                    case "QA":
                        category = Category.QualityAssurance;
                        break;

                    case "5":
                    case "Scrum master":
                        category = Category.ScrumMaster;
                        break;

                    default:
                        console.log("Повернення у меню");
                        continue;
                }

                const surnames: Array<string> = getWorkersSurnamesByCategory(category, workers);
                console.log(`Користувачі, які відносять до ${category}:`);
                logWorkersNames(surnames);
                break;

            case "3":
                console.log("\nВсі працівники категорії Developer: ");

                workers.forEach((worker: Worker): void => {
                    if (worker.category === Category.Developer) {
                        console.log(worker.name, worker.surname);
                    }
                });
                break;

            case "4":
                const chosen_id: number = Number(await input("\nВведіть ID користувача для пошуку: "));

                if (Number.isNaN(chosen_id) || chosen_id < 0) {
                    console.log("ID повинен бути невід'ємним числом");
                    break;
                }

                const userData: workerData = getWorkerByID(chosen_id, workers);

                console.log(`Користувач з айді "${chosen_id}": ${userData.name} ${userData.surname}`);
                console.log(`Заробітна плата: ${userData.salary}`);
                break;

            case "5":
                const customerName: string = await input("\nВведіть ім'я клієнта: ");

                if (customerName.trim() === "") {
                    console.log("Ім'я клієнта не може бути порожнім");
                    break;
                }

                const customerId: number = Number(await input("Введіть ID клієнта: "));

                if (Number.isNaN(customerId) || customerId < 0) {
                    console.log("ID повинен бути невід'ємним числом");
                    break;
                }

                console.log(createCustomerID(customerName, customerId));

                // Мої дані (Завдання 1.4 - 2):
                const myID: string = createCustomerID("Олександр Кииченко", 6);
                console.log(`Мої дані: ${myID}`);
                break;

            case "6":
                // Завдання 1.4 - 4:
                idGenerator = createCustomerID;

                console.log(`Результат idGenerator: ${idGenerator("Олександр Кииченко", 6)}`);
                break;

            case "7":
                createCustomer("Олександр Кииченко");
                createCustomer("Олександр Кииченко", 20);
                createCustomer("Олександр Кииченко", 20, "Київ");
                break;

            case "8":
                const myWorkers: string[] = checkoutWorkers("Олександр Кииченко", workers, 1, 4, 6);

                console.log("Доступні працівники:");

                myWorkers.forEach((worker: string): void => {
                    console.log(worker);
                });
                break;

            case "9":
                console.log("\nВиклик getWorkersSurnamesByCategory() без параметра:");
                const defaultCategoryWorkers: Array<string> = getWorkersSurnamesByCategory();

                defaultCategoryWorkers.forEach((worker: string): void => {
                    console.log(worker);
                });

                console.log("\nВиклик logFirstAvailable() без параметра:");
                const defaultResult: logResult = logFirstAvailable();

                console.log(`Всього ${defaultResult.workers_count} працівники(-ів)`);
                console.log(`Перший доступний працівник: ${defaultResult.first_available_name} ${defaultResult.first_available_surname}`);
                break;

            default:
                rl.close();
                return;
        }
    }
}

main();