// --------------------------------------------
// 1. Basic Object Type Annotations
// --------------------------------------------

console.log("\n\n\n\n\n\n\n\n\n\n\n\n")

// Inline type annotation for an object
let person: { name: string; age: number; isStudent: boolean } = {
    name: "Umar",
    age: 20,
    isStudent: true
};

console.log(person);

// --------------------------------------------
// 2. Interfaces
// --------------------------------------------

// Defining an interface for a reusable object shape
interface Person {
    name: string;
    age: number;
    isStudent?: boolean; // optional property (covered later)
}

// Using the interface
let student: Person = {
    name: "Ali",
    age: 22,
    isStudent: true
};

let teacher: Person = {
    name: "Ahmed",
    age: 35
    // isStudent is omitted, allowed because it's optional
};

console.log(student);
console.log(teacher);

// --------------------------------------------
// 3. Type Aliases
// --------------------------------------------

// Type aliases can also define object shapes
type Animal = {
    species: string;
    age: number;
    name?: string;
};

let dog: Animal = {
    species: "Canine",
    age: 4,
    name: "Max"
};

console.log(dog);

// --------------------------------------------
// 4. Optional Properties
// --------------------------------------------

// Properties marked with ? can be omitted
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string; // optional
}

let product1: Product = {
    id: 101,
    name: "Laptop",
    price: 1200
    // description is missing – valid
};

let product2: Product = {
    id: 102,
    name: "Mouse",
    price: 25,
    description: "Wireless optical mouse"
};

console.log(product1);
console.log(product2);

// --------------------------------------------
// 5. Readonly Properties
// --------------------------------------------

// Readonly properties cannot be reassigned after initialization
interface Config {
    readonly apiUrl: string;
    timeout: number;
}

let config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};

// config.apiUrl = "https://new-api.com"; // Error: cannot assign to 'apiUrl' because it is read-only
config.timeout = 6000; // OK

console.log(config);

// --------------------------------------------
// 6. Index Signatures
// --------------------------------------------

// Use index signatures when you don't know property names in advance
interface StringDictionary {
    [key: string]: string;
}

let translations: StringDictionary = {
    hello: "Hola",
    goodbye: "Adiós",
    thanks: "Gracias"
};

console.log(translations);

// --------------------------------------------
// 7. Function Types in Objects (Methods)
// --------------------------------------------

interface Calculator {
    add: (a: number, b: number) => number;
    subtract(a: number, b: number): number; // alternative syntax
}

let calc: Calculator = {
    add: (x, y) => x + y,
    subtract: function(x, y) { return x - y; }
};

console.log(calc.add(10, 5));      // 15
console.log(calc.subtract(10, 5)); // 5

// --------------------------------------------
// 8. Nested Objects
// --------------------------------------------

interface Address {
    street: string;
    city: string;
    zip: string;
}

interface Employee {
    id: number;
    name: string;
    address: Address; // nested object
}

let employee: Employee = {
    id: 1001,
    name: "Muhammad Umar",
    address: {
        street: "123 Main St",
        city: "Karachi",
        zip: "74000"
    }
};

console.log(employee);

// --------------------------------------------
// 9. Object Destructuring (with type annotations)
// --------------------------------------------

function printPerson({ name, age }: Person): void {
    console.log(`Name: ${name}, Age: ${age}`);
}

printPerson({ name: "Sara", age: 28 });

// Destructuring with default values
function printAddress({ street, city, zip = "Unknown" }: Address): void {
    console.log(`Street: ${street}, City: ${city}, Zip: ${zip}`);
}

let addr: Address = { street: "456 Oak Ave", city: "Lahore", zip: "54000" };
printAddress(addr);

// --------------------------------------------
// 10. Spread Operator with Objects
// --------------------------------------------

interface Book {
    title: string;
    author: string;
    year?: number;
}

let book1: Book = { title: "1984", author: "George Orwell" };
let book2: Book = { ...book1, year: 1949 }; // copy and add new property

console.log(book1);
console.log(book2);

// Merging objects
let details = { genre: "Dystopian", pages: 328 };
let fullBook = { ...book2, ...details };
console.log(fullBook);

// --------------------------------------------
// 11. Utility Types
// --------------------------------------------

// Partial<T> – makes all properties optional
type PartialPerson = Partial<Person>;
let partialPerson: PartialPerson = { name: "Zara" }; // only name provided

// Required<T> – makes all properties required
// (Since Person has optional isStudent, Required will make it mandatory)
type RequiredPerson = Required<Person>;
let reqPerson: RequiredPerson = {
    name: "John",
    age: 30,
    isStudent: false // must provide
};

// Pick<T, K> – pick a subset of properties
type NameAndAge = Pick<Person, "name" | "age">;
let picked: NameAndAge = { name: "Ali", age: 25 };

// Omit<T, K> – omit properties
type PersonWithoutAge = Omit<Person, "age">;
let omitted: PersonWithoutAge = { name: "Ahmed", isStudent: true };

console.log(partialPerson);
console.log(reqPerson);
console.log(picked);
console.log(omitted);

// --------------------------------------------
// 12. Record Type
// --------------------------------------------

// Record<K, T> – creates an object type with keys K and values T
type Role = "admin" | "user" | "guest";
type UserPermissions = Record<Role, string[]>;

let permissions: UserPermissions = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"]
};

console.log(permissions);

// --------------------------------------------
// 13. Object Type vs object vs {}
// --------------------------------------------

// - `object` is a type that represents any non-primitive value (e.g., not string, number, boolean, etc.)
let obj1: object = { name: "test" };
// obj1 = "hello"; // Error: string is not assignable to object
obj1 = [1, 2, 3]; // OK: array is an object

// - `{}` (empty object type) is similar but can be assigned almost anything except null/undefined
let obj2: {} = { name: "test" };
obj2 = "hello"; // OK (string is assignable to {})
obj2 = 123;     // OK
// obj2 = null; // Error (if strictNullChecks)

console.log(obj1);
console.log(obj2);

// - `Object` (capital) is the type of the global Object constructor; it's rarely used.
// Prefer `object` or specific interface/type.

// --------------------------------------------
// 14. Type Inference with Objects
// --------------------------------------------

// TypeScript infers the shape automatically
let user = {
    username: "umar123",
    email: "umar@example.com"
};
// inferred as { username: string; email: string }

// user.age = 20; // Error: age does not exist on inferred type

console.log(user);

// --------------------------------------------
// 15. `keyof` Operator
// --------------------------------------------

// keyof gives a union of property names of a type
type PersonKeys = keyof Person; // "name" | "age" | "isStudent"
let key: PersonKeys = "name"; // OK

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

let p: Person = { name: "Sara", age: 24 };
let nameValue = getProperty(p, "name"); // inferred as string
console.log(nameValue);

// --------------------------------------------
// 16. Object Methods and `this` (basic example)
// --------------------------------------------

interface Counter {
    count: number;
    increment(): number;
    decrement(): number;
}

let counter: Counter = {
    count: 0,
    increment() {
        this.count++;
        return this.count;
    },
    decrement() {
        this.count--;
        return this.count;
    }
};

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1

// --------------------------------------------
// 17. ReadonlyArray and Readonly utility
// --------------------------------------------

// Readonly utility can make object properties readonly
interface Settings {
    theme: string;
    language: string;
}

let settings: Readonly<Settings> = {
    theme: "dark",
    language: "en"
};

// settings.theme = "light"; // Error: cannot assign because it's readonly

console.log(settings);

// --------------------------------------------
// Key Takeaway
// --------------------------------------------
// - Objects in TypeScript can be shaped using inline annotations, interfaces, or type aliases.
// - Use optional (?), readonly, and index signatures for flexibility.
// - Leverage utility types (Partial, Required, Pick, Omit, Readonly) to transform types.
// - `keyof` and mapped types enable powerful generic operations.
// - Type inference works well with object literals.
// - Prefer interfaces for object shapes and type aliases for unions/intersections.
// - Use `object` when you need to accept any non-primitive value.