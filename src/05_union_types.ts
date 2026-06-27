// --------------------------------------------
// 1. What are Union Types?
// --------------------------------------------

console.log("\n\n\n\n\n\n\n\n\n\n\n\n")

// Union types allow a variable to hold values of multiple types.
// Defined using the pipe (|) symbol.

let id: string | number;
id = "abc123"; // OK
id = 456;      // OK
// id = true;  // Error: boolean not assignable

console.log(id);

// --------------------------------------------
// 2. Union with Primitive Types
// --------------------------------------------

let status: "active" | "inactive" | "pending"; // string literal union
status = "active";
status = "pending";
// status = "deleted"; // Error

let flexibleValue: string | number | boolean;
flexibleValue = "Hello";
flexibleValue = 42;
flexibleValue = false;
console.log(flexibleValue);

// --------------------------------------------
// 3. Union with Arrays and Objects
// --------------------------------------------

let mixedArray: (string | number)[] = ["Umar", 20, "Ahmed", 25];
mixedArray.push("Ali");
mixedArray.push(30);
// mixedArray.push(true); // Error: boolean not allowed

console.log(mixedArray);

// Union of object types
interface Cat {
    type: "cat";
    meow(): void;
}

interface Dog {
    type: "dog";
    bark(): void;
}

type Pet = Cat | Dog;

function makeSound(pet: Pet) {
    if (pet.type === "cat") {
        pet.meow();
    } else {
        pet.bark();
    }
}

// --------------------------------------------
// 4. Type Narrowing (Type Guards)
// --------------------------------------------

// Type narrowing helps TypeScript understand the specific type in a union.

function printId(id: string | number) {
    if (typeof id === "string") {
        console.log(`String ID: ${id.toUpperCase()}`);
    } else {
        console.log(`Number ID: ${id.toFixed(2)}`);
    }
}

printId("abc123");
printId(456.789);

// Using instanceof for class types
class Vehicle {
    constructor(public wheels: number) {}
}

class Bike extends Vehicle {
    ride() { console.log("Riding bike"); }
}

class Car extends Vehicle {
    drive() { console.log("Driving car"); }
}

function useVehicle(vehicle: Bike | Car) {
    if (vehicle instanceof Bike) {
        vehicle.ride();
    } else {
        vehicle.drive();
    }
}

useVehicle(new Bike(2));
useVehicle(new Car(4));

// --------------------------------------------
// 5. Discriminated Unions (Tagged Unions)
// --------------------------------------------

// A common pattern: use a literal type as a discriminant property.

interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape): number {
    switch (shape.kind) {
        case "square":
            return shape.size ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "circle":
            return Math.PI * shape.radius ** 2;
        default:
            // Exhaustiveness check
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

const square: Square = { kind: "square", size: 5 };
const rect: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const circle: Circle = { kind: "circle", radius: 3 };

console.log(area(square)); // 25
console.log(area(rect));   // 24
console.log(area(circle)); // ~28.27

// --------------------------------------------
// 6. Union with Literal Types
// --------------------------------------------

type Direction = "north" | "south" | "east" | "west";
let move: Direction = "north"; // OK
// move = "up"; // Error

type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type Weekend = "Saturday" | "Sunday";
type Day = Weekday | Weekend;

function isWeekend(day: Day): boolean {
    return day === "Saturday" || day === "Sunday";
}

console.log(isWeekend("Monday")); // false
console.log(isWeekend("Sunday")); // true

// --------------------------------------------
// 7. Union Types with Functions
// --------------------------------------------

// Union types in function parameters
function formatInput(input: string | number): string {
    if (typeof input === "string") {
        return input.trim();
    } else {
        return input.toFixed(2);
    }
}

console.log(formatInput("  Hello  ")); // "Hello"
console.log(formatInput(42.567));      // "42.57"

// Union as return type
function getValue(flag: boolean): string | number {
    return flag ? "Yes" : 42;
}

let result = getValue(true); // inferred as string | number
console.log(result);

// --------------------------------------------
// 8. Union with `undefined` and `null`
// --------------------------------------------

// Common for optional values
function greet(name: string | undefined | null): void {
    if (name) {
        console.log(`Hello, ${name}!`);
    } else {
        console.log("Hello, stranger!");
    }
}

greet("Umar");
greet(undefined);
greet(null);

// --------------------------------------------
// 9. Union with `any` and `unknown`
// --------------------------------------------

// Union with unknown forces type checking
let value: unknown | string = "hello"; // unknown takes precedence?
value = 123; // OK
// But we must narrow before using
if (typeof value === "string") {
    console.log(value.toUpperCase());
}

// Union with any: any overrides type checking
let anything: any | number = "text";
anything = 100;
if(typeof anything === "string") {
    anything.toUpperCase(); // No error, but runtime error if not a string
}


// Prefer unknown over any for safer unions.

// --------------------------------------------
// 10. Intersection Types (Brief Introduction)
// --------------------------------------------

// Intersection types combine multiple types into one using &.
// They are opposite of unions: a value must satisfy all types.
type Person = { name: string; age: number };
type Employee = { employeeId: number; department: string };
type EmployeePerson = Person & Employee;

let emp: EmployeePerson = {
    name: "Umar",
    age: 30,
    employeeId: 1001,
    department: "IT"
};

console.log(emp);

// --------------------------------------------
// 11. Type Guards with `in` Operator
// --------------------------------------------

// Using 'in' to check for property existence
function describePet(pet: Cat | Dog) {
    if ("meow" in pet) {
        pet.meow(); // TypeScript knows it's Cat
    } else {
        pet.bark(); // TypeScript knows it's Dog
    }
}

// Since we need actual implementations, let's define them:
const myCat: Cat = {
    type: "cat",
    meow() { console.log("Meow!"); }
};

const myDog: Dog = {
    type: "dog",
    bark() { console.log("Woof!"); }
};

describePet(myCat);
describePet(myDog);

// --------------------------------------------
// 12. Union of Function Types
// --------------------------------------------

// A union of function types is rarely used directly; usually you'd use overloads.
// But here's an example:

type StringProcessor = (input: string) => string;
type NumberProcessor = (input: number) => number;
type Processor = StringProcessor | NumberProcessor;

// But to use it, you need to narrow
function useProcessor(processor: Processor, value: string | number) {
    if (typeof value === "string" && typeof processor === "function") {
        // But we can't guarantee processor accepts string
        // More practical to use overloads or generics.
    }
}

// Better: use function overloads (not covered here)

// --------------------------------------------
// 13. Exhaustiveness Checking with `never`
// --------------------------------------------

// In the area function earlier, we used `never` to ensure all cases are handled.
// This is a great way to catch missing cases when you add new union members.

// --------------------------------------------
// Key Takeaway
// --------------------------------------------
// - Union types (|) allow a variable to be one of several types.
// - Use type narrowing (typeof, instanceof, in, discriminant properties) to work with unions safely.
// - Discriminated unions with a common literal property make pattern matching robust.
// - `never` is useful for exhaustiveness checking in switch statements.
// - Avoid union with `any`; prefer `unknown` for safer type guards.
// - Union types are essential for handling dynamic data (e.g., API responses).
// - Combine with intersection types (&) when you need all properties combined.