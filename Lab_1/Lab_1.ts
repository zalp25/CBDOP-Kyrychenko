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


function getWorkersSurnamesByCategory(category: Category): Array<string> {
    const workers: Worker[] = getAllWorkers();
    const surnames: Array<string> = [];
    for (const worker of workers){
        if (worker.category === category){
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
    id: number;
}

function getWorkerByID(id: number, workers: Worker[] = getAllWorkers()): workerData {
    const worker = workers.find((worker) => worker.id === id);

    if (worker !== undefined) {
        return {name: worker.name, surname: worker.surname, id: worker.id};
    }

    return {name: "Немає такого працівника", surname: "", id: id};
}


async function main(): Promise<void> {
    while (true){
        console.log("\n\n1. Вивід загальної кількості працівників та першого вільного працівника: logFirstAvailable()");
        console.log("2. Пошук працівників по категорії: getWorkersSurnamesByCategory()");
        console.log("3. Стрілочна ф-ія, всі Developer'и: (worker) => {");
        console.log("4. Пошук працівника по ID: getWorkerByID()");
        console.log("БУДЬ-ЯКИЙ ІНШИЙ ВВІД. Завершити виконання програми");

        let choice: string = await input("\nВиберіть пункт в меню(1, 2, ...): ");

        switch (choice) {
            case "1":
                let result = logFirstAvailable(getAllWorkers());

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
                        return;
                }

                const surnames: Array<string> = getWorkersSurnamesByCategory(category);
                console.log(`Користувачі, які відносять до ${category}:`);
                logWorkersNames(surnames)
                break;

            case "3":
                let workers = getAllWorkers();

                console.log("\nВсі працівники категорії Developer: ");

                workers.forEach((worker) => {
                    if (worker.category === Category.Developer) {
                        console.log(worker.name, worker.surname);
                    }
                });
                break;

            case "4":
                let chosen_id: number = Number(await input("\nВведіть ID користувача для пошуку: "));
                let userData = getWorkerByID(chosen_id)
                console.log(`Користувач з айді "${userData.id}": ${userData.name} ${userData.surname}`)
                break;

            default:
                rl.close();
                break;
        }
    }
}

main();