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



// КЛАСИ

class UniversityLibrarian implements Librarian {
    name!: string;
    email!: string;
    departament!: string;

    assistCustomer(custName: string): void {
        console.log(`${this.name} is assisting ${custName}`);
    }
}

abstract class ReferenceItem {
    // title: string;
    // year: number;

    static readonly department: string = "Mystery";
    private _publisher: string = "";
    constructor (public title: string, protected readonly year: number) {
        console.log("Creating a new ReferenceItem ...");
    }

    // constructor (newTitle: string, newYear: number) {
    //     console.log("Creating a new ReferenceItem ...");
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
    }

    abstract printCitation(): void;
}

class Encyclopedia extends ReferenceItem {
    constructor(title: string, year: number, public edition: number) {
        console.log("Creating a new Encyclopedia ...");
        super(title, year);
    }
    
    printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}



// ЗМІННІ

const logPrize: PrizeLogger = prize => 
    console.log(`Prize: ${prize}`);
logPrize("prize1");

const favoriteAuthor: Author = {
    name: "Oleksamdr",
    email: "kyrychenko@knu.ua",
    numBooksPublished: 1
};

const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = "Mykhailo";
favoriteLibrarian.assistCustomer("Ivan");

// const ref = new ReferenceItem("Kolobok", 1860);
// ref.printItem();
// ref.publisher = "Me";
// console.log(ref.publisher);

const refBook = new Encyclopedia("Name", 2000, 1);
refBook.printItem();
refBook.printCitation();

// const favoriteLibrarian: Librarian = {
//     name: "Ivan",
//     email: "pechenenko@knu.ua",
//     departament: "Mystery",
//     assistCustomer(custName: string): void{
//         console.log(`${this.name} is assisting ${custName}`);
//     }

// }



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