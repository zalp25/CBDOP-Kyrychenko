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
    QualityAssurance  = "QA",
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
        { id: 8, name: "Illia", surname: "Tereshko", available: true, salary: 1000, category: Category.ScrumMaster }
    ];
}


function getWorkersSurnamesByCategory(category: Category = Category.Designer): Array<string> {
    const workers: Worker[] = getAllWorkers();
    const surnames: Array<string> = [];

    for (const worker of workers) {
        if (worker.category === category) {
            surnames.push(worker.surname)
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
    const worker: Worker | undefined = workers.find((worker) => worker.id === id);

    if (worker !== undefined) {
        return {name: worker.name, surname: worker.surname, salary: worker.salary};
    }

    return {name: "Немає такого працівника", surname: "", salary: 0};
}


function createCustomerID(name: string, id: number): string {
    let customer: string = name + String(id);
    return customer;
}


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


function checkoutWorkers(customer: string, ...workerIDs: number[]): string[] {
    console.log(`Замовник: ${customer}`);

    const availableWorkers: string[] = [];

    workerIDs.forEach((workerID) => {
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



async function main(): Promise<void> {
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

        let choice: string = await input("\nВиберіть пункт в меню(1, 2, ...): ");

        switch (choice) {
            case "1":
                let result: logResult = logFirstAvailable();

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

                let chosen_category: string = await input("\nВиберіть категорію працівника(1, 2, ...): ");
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

                const surnames: Array<string> = getWorkersSurnamesByCategory(category);
                console.log(`Користувачі, які відносять до ${category}:`);
                logWorkersNames(surnames)
                break;

            case "3":
                let workers: Worker[] = getAllWorkers();

                console.log("\nВсі працівники категорії Developer: ");

                workers.forEach((worker) => {
                    if (worker.category === Category.Developer) {
                        console.log(worker.name, worker.surname);
                    }
                });
                break;

            case "4":
                let chosen_id: number = Number(await input("\nВведіть ID користувача для пошуку: "));
                let userData: workerData = getWorkerByID(chosen_id);

                console.log(`Користувач з айді "${chosen_id}": ${userData.name} ${userData.surname}`);
                console.log(`Заробітна плата: ${userData.salary}`);
                break;

            case "5":
                let customerName: string = await input("\nВведіть ім'я клієнта: ");
                let customerId: number = Number(await input("Введіть ID клієнта: "));

                console.log(createCustomerID(customerName, customerId));

                // Мої дані (Завдання 1.4 - 2):
                let myID: string = createCustomerID("Олександр Кииченко", 6);
                console.log(`Мої дані: ${myID}`);
                break;

            case "6":
                idGenerator = createCustomerID;

                console.log(`Результат idGenerator: ${idGenerator("Олександр Кииченко", 6)}`);
                break;

            case "7":
                createCustomer("Олександр Кииченко");
                createCustomer("Олександр Кииченко", 20);
                createCustomer("Олександр Кииченко", 20, "Київ");
                break;

            case "8":
                const myWorkers: string[] = checkoutWorkers("Олександр Кииченко", 1, 4, 6);

                console.log("Доступні працівники:");

                myWorkers.forEach((worker) => {
                    console.log(worker);
                });
                break;

            case "9":
                console.log("\nВиклик getWorkersSurnamesByCategory() без параметра:");
                const defaultCategoryWorkers: Array<string> = getWorkersSurnamesByCategory();

                defaultCategoryWorkers.forEach((worker) => {
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