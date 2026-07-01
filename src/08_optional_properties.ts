console.log("\n\n\n\n\n\n\n\n\n\n\n\n")
// --------------------------------------------
// 1. What are Optional Properties?
// --------------------------------------------

// Optional properties are properties that may or may not exist on an object.
// They are marked with a `?` after the property name.
// When accessing optional properties, TypeScript forces you to handle the possibility of `undefined`.

// --------------------------------------------
// 2. Optional Properties in Interfaces & Types
// --------------------------------------------

// Using in an interface
interface User {
    id: number;
    name: string;
    email?: string;        // optional
    age?: number;          // optional
    isActive?: boolean;    // optional
}

let user1: User = { id: 1, name: "Umar" };                      // OK (email, age, isActive omitted)
let user2: User = { id: 2, name: "Ali", email: "ali@example.com" }; // OK
let user3: User = { id: 3, name: "Sara", age: 25, isActive: false }; // OK

console.log(user1);
console.log(user2);
console.log(user3);

// Using in a type alias
type Product = {
    id: number;
    name: string;
    price?: number;        // optional
    description?: string;  // optional
};

let product: Product = { id: 101, name: "Laptop" };
// We can later add optional properties if needed, but the type system doesn't require them.

// --------------------------------------------
// 3. Optional Properties vs Properties with `undefined` Type
// --------------------------------------------

// A property with `undefined` type must explicitly be set to undefined,
// while an optional property can be omitted entirely.

interface WithOptional {
    optional?: string;
}

interface WithUndefined {
    requiredUndefined: string | undefined;
}

let obj1: WithOptional = {}; // OK, property omitted
let obj2: WithUndefined = { requiredUndefined: undefined }; // Must be present

// obj2 = {}; // Error: missing required property

// --------------------------------------------
// 4. Accessing Optional Properties - Type Narrowing
// --------------------------------------------

// TypeScript forces you to check for undefined before using optional properties.

function printEmail(user: User) {
    // console.log(user.email.toUpperCase()); // Error: Object is possibly 'undefined'
    if (user.email) {
        console.log(user.email.toUpperCase());
    } else {
        console.log("No email provided");
    }
}

printEmail(user1); // "No email provided"
printEmail(user2); // "ALI@EXAMPLE.COM"

// Using optional chaining (`?.`) is a concise way to access optional properties
// without explicit checks (introduced in ES2020).

console.log(user1.email?.toUpperCase()); // undefined (no error)
console.log(user2.email?.toUpperCase()); // ALI@EXAMPLE.COM

// Combine with nullish coalescing (`??`) to provide a default:

let emailDisplay = user1.email?.toUpperCase() ?? "No email";
console.log(emailDisplay); // "No email"

emailDisplay = user2.email?.toUpperCase() ?? "No email";
console.log(emailDisplay); // "ALI@EXAMPLE.COM"

// --------------------------------------------
// 5. Optional Parameters in Functions
// --------------------------------------------

// Function parameters can also be optional using `?`.
// Optional parameters must be listed after required parameters.

function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet("Umar"));                  // "Hello, Umar!"
console.log(greet("Ali", "Good morning"));   // "Good morning, Ali!"

// Default parameters can achieve similar behavior and are often preferred:
function greetWithDefault(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

console.log(greetWithDefault("Sara"));               // "Hello, Sara!"
console.log(greetWithDefault("Ahmed", "Hi"));        // "Hi, Ahmed!"

// Optional parameters vs default parameters:
// - Optional: caller may omit; inside function you must handle undefined.
// - Default: if omitted, a default value is used, so it's never undefined.

// --------------------------------------------
// 6. Optional Properties in Classes
// --------------------------------------------

class Person {
    name: string;
    age?: number;        // optional field
    email?: string;      // optional field

    constructor(name: string, age?: number, email?: string) {
        this.name = name;
        if(age !== undefined) {
            this.age = age;
        }
        if(email) this.email = email;
    }

    getInfo(): string {
        let info = this.name;
        if (this.age !== undefined) {
            info += `, Age: ${this.age}`;
        }
        if (this.email) {
            info += `, Email: ${this.email}`;
        }
        return info;
    }
}

let p1 = new Person("Umar");
let p2 = new Person("Ali", 25);
let p3 = new Person("Sara", 30, "sara@example.com");

console.log(p1.getInfo()); // "Umar"
console.log(p2.getInfo()); // "Ali, Age: 25"
console.log(p3.getInfo()); // "Sara, Age: 30, Email: sara@example.com"

// --------------------------------------------
// 7. Optional Properties in Destructuring
// --------------------------------------------

// When destructuring, you can assign default values for optional properties.

function displayUser({ id, name, email = "N/A" }: User): void {
    console.log(`ID: ${id}, Name: ${name}, Email: ${email}`);
}

displayUser(user1); // "ID: 1, Name: Umar, Email: N/A"
displayUser(user2); // "ID: 2, Name: Ali, Email: ali@example.com"

// You can also destructure with default values for the entire object:
function processUser(user: User) {
    const { id, name, email } = user;
    // ...
}

// --------------------------------------------
// 8. Optional Properties in Index Signatures
// --------------------------------------------

// When an interface has an index signature, you can still have optional properties
// but they must be compatible with the index type.

interface Dictionary {
    [key: string]: string;
    // Optional property must be assignable to string
    default?: string;   // OK, because string matches string index
    // count?: number;  // Error: number is not assignable to string index
}

let dict: Dictionary = {
    hello: "world",
    default: "en"
};

// --------------------------------------------
// 9. Making All Properties Optional with `Partial<T>`
// --------------------------------------------

// The built-in utility type `Partial<T>` makes all properties of T optional.

interface UserWithAllRequired {
    id: number;
    name: string;
    email: string;
    age: number;
}

type PartialUser = Partial<UserWithAllRequired>;

let partialUser: PartialUser = {
    name: "Umar"
    // other fields omitted, allowed
};

console.log(partialUser);

// --------------------------------------------
// 10. When to Use Optional Properties
// --------------------------------------------

// Use optional properties when:
// - A property may not always exist (e.g., optional user fields in a profile).
// - You have configuration objects with many optional settings.
// - You're extending a base interface and adding new optional fields.
// - You want to allow gradual object construction.

// Avoid overusing optional properties if the property is logically required,
// as it weakens type safety.

// --------------------------------------------
// 11. Common Pitfalls
// --------------------------------------------

// Pitfall 1: Forgetting to check for undefined before using optional property.
// ✅ Always use optional chaining or explicit checks.

// Pitfall 2: Using optional property as if it's always present.
// ⚠️ This can lead to runtime errors.

// Pitfall 3: Confusing optional with `undefined` type.
// - Optional: property can be omitted or set to undefined.
// - `undefined` type: property must be present, but may have undefined value.
// Use `?` for truly optional fields.

// Pitfall 4: Using `!` (non-null assertion) to ignore errors.
// // const emailLength = user.email!.length; // Risk if email is undefined.
// Use it only when you are absolutely sure the value is not undefined.

// --------------------------------------------
// 12. Optional Chaining and Nullish Coalescing (Recap)
// --------------------------------------------

// Optional chaining (`?.`) allows safe access to nested optional properties.
// Nullish coalescing (`??`) provides a default value only for `null` or `undefined`.

interface Address {
    street: string;
    city: string;
    zip?: string;
}

interface Customer {
    name: string;
    address?: Address;
}

let customer: Customer = { name: "Umar" };
let zipCode = customer.address?.zip ?? "Unknown";
console.log(zipCode); // "Unknown"

// With nested optional properties:
customer = { name: "Ali", address: { street: "Main St", city: "Karachi" } };
zipCode = customer.address?.zip ?? "Not provided";
console.log(zipCode); // "Not provided"

// --------------------------------------------
// Key Takeaway
// --------------------------------------------
// - Optional properties are marked with `?` and can be omitted or set to `undefined`.
// - They are common in interfaces, types, classes, and function parameters.
// - Always handle optional values safely using type narrowing, optional chaining (`?.`), or default values.
// - Optional parameters in functions must come after required ones; default parameters are often a better choice.
// - Use built-in utility type `Partial<T>` to make all properties optional.
// - Be cautious: optional properties can lead to runtime errors if not checked, but they provide flexibility for partial objects and configuration.
// - Prefer optional properties over properties with `undefined` type when the property is not always needed.