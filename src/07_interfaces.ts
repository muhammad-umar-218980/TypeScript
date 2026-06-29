console.log("\n\n\n\n\n\n\n\n\n\n\n\n")

// --------------------------------------------
// 1. Basic Interface Declaration
// --------------------------------------------

// An interface describes the shape of an object.
// It defines the property names and their types.

interface Person {
    name: string;
    age: number;
}

let user: Person = {
    name: "Umar",
    age: 20
};

console.log(user);

// --------------------------------------------
// 2. Optional Properties
// --------------------------------------------

// Mark a property as optional using the `?` modifier.

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string; // optional
}

let product1: Product = { id: 1, name: "Laptop", price: 1200 };
let product2: Product = {
    id: 2,
    name: "Mouse",
    price: 25,
    description: "Wireless optical mouse"
};

console.log(product1, product2);

// --------------------------------------------
// 3. Readonly Properties
// --------------------------------------------

// Use `readonly` to prevent reassignment after initialization.

interface Config {
    readonly apiUrl: string;
    timeout: number;
}

let config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};

// config.apiUrl = "new-url"; // Error: Cannot assign to 'apiUrl' because it is read-only
config.timeout = 6000; // OK

console.log(config);

// --------------------------------------------
// 4. Function Types in Interfaces
// --------------------------------------------

// Interfaces can describe function signatures.

interface Calculator {
    (a: number, b: number): number; // function call signature
}

let add: Calculator = (x, y) => x + y;
let subtract: Calculator = (x, y) => x - y;

console.log(add(10, 5));    // 15
console.log(subtract(10, 5)); // 5

// Alternatively, define a method within an object interface.
interface MathOperations {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

let math: MathOperations = {
    add: (x, y) => x + y,
    subtract: (x, y) => x - y
};

console.log(math.add(7, 3)); // 10

// --------------------------------------------
// 5. Indexable Types (Index Signatures)
// --------------------------------------------

// Use index signatures when you don't know property names in advance.
// They define the type for keys (string or number) and their values.

interface StringDictionary {
    [key: string]: string;
}

let translations: StringDictionary = {
    hello: "Hola",
    goodbye: "Adiós",
    thanks: "Gracias"
};

console.log(translations);

interface NumberDictionary {
    [key: number]: string;
}

let numberMap: NumberDictionary = {
    0: "Zero",
    1: "One",
    2: "Two"
};

console.log(numberMap[1]); // "One"

// You can mix index signatures with known properties, but all properties must conform to the index signature type.
interface MixedDictionary {
    [key: string]: string;
    id: string;   // OK, string matches string index
    // age: number; // Error: number is not assignable to string
}

// --------------------------------------------
// 6. Extending Interfaces
// --------------------------------------------

// Interfaces can extend one or more other interfaces using `extends`.

interface Animal {
    name: string;
    age: number;
}

interface Dog extends Animal {
    breed: string;
    bark(): void;
}

let myDog: Dog = {
    name: "Max",
    age: 4,
    breed: "Labrador",
    bark() {
        console.log("Woof!");
    }
};

console.log(myDog);

// Extending multiple interfaces:
interface Movable {
    speed: number;
    move(): void;
}

interface Flying {
    fly(): void;
}

interface Bird extends Animal, Movable, Flying {
    wingSpan: number;
}

let eagle: Bird = {
    name: "Eagle",
    age: 2,
    speed: 50,
    wingSpan: 2.5,
    move() { console.log("Walking"); },
    fly() { console.log("Flying"); }
};

console.log(eagle);

// --------------------------------------------
// 7. Interface Declaration Merging
// --------------------------------------------

// Unlike type aliases, interfaces can be declared multiple times.
// They will be merged into a single interface.

interface Box {
    width: number;
}

interface Box {
    height: number;
}

// Now Box has both width and height.
let box: Box = {
    width: 10,
    height: 20
};

console.log(box);

// Declaration merging also works with functions and other interfaces.

// --------------------------------------------
// 8. Interfaces for Function Overloads
// --------------------------------------------

// Interfaces can declare multiple call signatures for overloads.

interface Multiplier {
    (x: number, y: number): number;
    (x: string, y: string): string;
}

let multiply: Multiplier = (x: any, y: any) : any => {
    if (typeof x === "number" && typeof y === "number") {
        return x * y;
    }
    if (typeof x === "string" && typeof y === "string") {
        return x.concat(y);
    }
    throw new Error("Invalid arguments");
};

console.log(multiply(3, 4));       // 12
console.log(multiply("Hello, ", "World!")); // "Hello, World!"

// --------------------------------------------
// 9. Hybrid Types (Object + Function)
// --------------------------------------------

// Interfaces can describe objects that are also callable (function with properties).

interface Counter {
    (start: number): number; // callable
    interval: number;
    reset(): void;
}

function createCounter(): Counter {
    let count = 0;
    const counter = ((start: number) => {
        count = start;
        return count;
    }) as Counter;
    counter.interval = 1000;
    counter.reset = () => { count = 0; };
    return counter;
}

let counter = createCounter();
console.log(counter(5));      // 5
console.log(counter.interval); // 1000
counter.reset();
console.log(counter(0));      // 0

// --------------------------------------------
// 10. Class Implements Interface
// --------------------------------------------

// Interfaces can be implemented by classes using the `implements` keyword.
// The class must satisfy the interface shape.

interface Vehicle {
    brand: string;
    speed: number;
    accelerate(): void;
    brake(): void;
}

class Car implements Vehicle {
    constructor(public brand: string, public speed: number) {}

    accelerate() {
        this.speed += 10;
        console.log(`${this.brand} accelerated to ${this.speed} km/h`);
    }

    brake() {
        this.speed -= 10;
        console.log(`${this.brand} braked to ${this.speed} km/h`);
    }
}

let myCar = new Car("Toyota", 0);
myCar.accelerate(); // Toyota accelerated to 10 km/h
myCar.brake();      // Toyota braked to 0 km/h

// Implementing multiple interfaces:
interface Drivable {
    drive(): void;
}

interface Electric {
    charge(): void;
}

class Tesla implements Vehicle, Drivable, Electric {
    constructor(public brand: string, public speed: number, public battery: number) {}

    accelerate() { this.speed += 15; }
    brake() { this.speed -= 10; }
    drive() { console.log("Driving Tesla"); }
    charge() { console.log("Charging battery"); }
}

let tesla = new Tesla("Tesla", 0, 100);
tesla.drive();
tesla.charge();

// --------------------------------------------
// 11. Interfaces vs Type Aliases – Quick Recap
// --------------------------------------------

// - Interfaces are primarily for objects, can be extended and merged.
// - Type aliases can do everything interfaces can, plus unions, intersections, primitives, tuples, etc.
// - When in doubt, use interface for object shapes that might need extension; use type alias for unions or complex combinations.
// - Both can be used interchangeably in many cases.

// Example of a type alias for union that an interface cannot represent:
type Status = "active" | "inactive" | "pending";

// Interface cannot create union types directly.

// --------------------------------------------
// 12. Extending from a Class with Interfaces
// --------------------------------------------

// Interfaces can extend the instance type of a class.
// This is useful when you want to describe the shape of an object that inherits from a class.

class Base {
    baseProperty: string = "base";
}

interface DerivedInterface extends Base {
    derivedProperty: number;
}

class Derived extends Base implements DerivedInterface {
    derivedProperty: number = 123;
}

let derivedObj = new Derived();
console.log(derivedObj.baseProperty);    // "base"
console.log(derivedObj.derivedProperty); // 123

// --------------------------------------------
// 13. Generic Interfaces
// --------------------------------------------

// Interfaces can be generic to work with different types.

interface Repository<T> {
    get(id: number): T | undefined;
    save(item: T): void;
}

class UserRepository implements Repository<Person> {
    private data: Person[] = [];

    get(id: number): Person | undefined {
        return this.data.find(p => p.age === id); // simplified lookup
    }

    save(item: Person): void {
        this.data.push(item);
    }
}

let repo = new UserRepository();
repo.save({ name: "Umar", age: 20 });
console.log(repo.get(20)); // { name: "Umar", age: 20 }

// --------------------------------------------
// 14. Using Interfaces with `readonly` Arrays
// --------------------------------------------

interface ReadOnlyUser {
    readonly id: number;
    name: string;
}

let userRead: ReadOnlyUser = { id: 1, name: "Ali" };
// userRead.id = 2; // Error

// Also for arrays:
interface ReadOnlyArray<T> {
    readonly [index: number]: T;
    readonly length: number;
    // ... other readonly methods
}

// But we have built-in ReadonlyArray<T> type.

// --------------------------------------------
// Key Takeaway
// --------------------------------------------
// - Interfaces define the shape of objects and are a core way to enforce contracts in TypeScript.
// - Use `?` for optional, `readonly` for immutable properties.
// - Extend interfaces with `extends` to compose types.
// - Declaration merging allows multiple interface declarations to combine.
// - Classes can implement interfaces, ensuring they adhere to a contract.
// - Interfaces can also describe function types, indexable types, and hybrid types.
// - Prefer interfaces for object shapes that you expect to be extended or implemented.
// - Use type aliases for unions, tuples, primitives, and complex type manipulations.