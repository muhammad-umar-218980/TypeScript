console.log("\n\n\n\n\n\n\n\n\n\n\n\n")
// --------------------------------------------
// 1. What are Type Aliases?
// --------------------------------------------

// Type aliases create a new name for a type.
// They don't create new types; they just give a label to an existing type.
// Use the `type` keyword.

type MyString = string;
let username: MyString = "Umar";

// --------------------------------------------
// 2. Aliases for Primitive Types
// --------------------------------------------

type ID = string | number;
type Status = "active" | "inactive" | "pending";
type Age = number;

let userId: ID = "abc123";
let userStatus: Status = "active";
let userAge: Age = 25;

console.log(userId, userStatus, userAge);

// --------------------------------------------
// 3. Object Type Aliases
// --------------------------------------------

// Instead of writing inline object types repeatedly, use a type alias.
type Person = {
    name: string;
    age: number;
    email?: string; // optional
};

let person1: Person = {
    name: "Ali",
    age: 30,
    email: "ali@example.com"
};

let person2: Person = {
    name: "Sara",
    age: 25
};

console.log(person1);
console.log(person2);

// --------------------------------------------
// 4. Union Type Aliases
// --------------------------------------------

type Result = "success" | "error" | "loading";
type Value = string | number | boolean;

let responseStatus: Result = "success";
let mixedValue: Value = 42;
mixedValue = "hello";

// --------------------------------------------
// 5. Intersection Type Aliases
// --------------------------------------------

// Intersection combines multiple types into one using &
type HasName = { name: string };
type HasAge = { age: number };
type PersonWithAge = HasName & HasAge;

let person: PersonWithAge = {
    name: "Umar",
    age: 20
};

type Employee = {
    employeeId: number;
    department: string;
};

type EmployeePerson = Person & Employee;

let emp: EmployeePerson = {
    name: "Ahmed",
    age: 28,
    employeeId: 1001,
    department: "Engineering"
};

console.log(emp);

// --------------------------------------------
// 6. Type Alias for Functions
// --------------------------------------------

// Define a function signature
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (x, y) => x + y;
const multiply: MathOperation = (x, y) => x * y;

console.log(add(5, 3));     // 8
console.log(multiply(5, 3)); // 15

// --------------------------------------------
// 7. Type Alias for Arrays and Tuples
// --------------------------------------------

type StringArray = string[];
type NumberArray = number[];
type Tuple = [string, number, boolean]; // tuple

let fruits: StringArray = ["apple", "banana"];
let scores: NumberArray = [100, 95, 88];
let personTuple: Tuple = ["Umar", 20, true];

console.log(fruits, scores, personTuple);

// --------------------------------------------
// 8. Generic Type Aliases
// --------------------------------------------

// Type aliases can be generic
type Container<T> = { value: T };

let stringContainer: Container<string> = { value: "Hello" };
let numberContainer: Container<number> = { value: 42 };

type ApiResponse<T> = {
    data: T;
    status: number;
    error?: string;
};

interface User {
    id: number;
    name: string;
}

let userResponse: ApiResponse<User> = {
    data: { id: 1, name: "Umar" },
    status: 200
};

console.log(userResponse);

// Generic alias with constraints
type Lengthy<T extends { length: number }> = T;

function logLength<T extends { length: number }>(item: T): T {
    console.log(item.length);
    return item;
}

logLength("hello");
logLength([1, 2, 3]);
// logLength(123); // Error: number doesn't have length

// --------------------------------------------
// 9. Recursive Type Aliases
// --------------------------------------------

// Recursive types are possible for structures like linked lists, trees, etc.
type TreeNode = {
    value: number;
    left?: TreeNode;
    right?: TreeNode;
};

const tree: TreeNode = {
    value: 10,
    left: { value: 5 },
    right: { value: 15, left: { value: 12 } }
};

console.log(tree);

// Recursive type for JSON
type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONObject
    | JSONArray;

type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

let jsonData: JSONValue = {
    name: "Umar",
    age: 20,
    isStudent: true,
    hobbies: ["coding", "reading"],
    address: { city: "Karachi", zip: 74000 }
};

console.log(jsonData);

// --------------------------------------------
// 10. Type Aliases vs Interfaces
// --------------------------------------------

// Similarities: both can describe object shapes and can be extended.

// Differences:
// - Interfaces can be declared multiple times and merged (declaration merging)
// - Interfaces can be implemented by classes (implements)
// - Type aliases can represent union, intersection, primitive, tuple, etc.
// - Type aliases can't be reopened to add new properties (no declaration merging)
// - Use interface for objects that need to be extended/implemented; use type alias for unions, intersections, and when you need a name for a complex type.

interface Animal {
    name: string;
}

interface Animal {
    age?: number; // merging allowed
}

// Type alias cannot be merged:
type Person2 = { name: string };
// type Person2 = { age: number }; // Error: Duplicate identifier

// When to use which:
// - Use interface for public API's, object shapes that might be extended
// - Use type for unions, intersections, primitive aliases, mapped types, conditional types, etc.

// --------------------------------------------
// 11. Mapped Types with Type Aliases
// --------------------------------------------

// Type aliases can use mapped types to transform properties
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

interface Product {
    id: number;
    name: string;
    price: number;
}

type ReadonlyProduct = Readonly<Product>;
// Now all properties are readonly

type PartialProduct = Partial<Product>;
// All properties are optional

// --------------------------------------------
// 12. Conditional Types with Type Aliases
// --------------------------------------------

// Conditional types allow types to be selected based on a condition.
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// More practical: Extract return type from a function
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function sayHello(): string { return "Hello"; }
type HelloReturn = ReturnType<typeof sayHello>; // string

console.log("Conditional types example:", typeof ({} as A)); // boolean? Not needed in runtime.

// --------------------------------------------
// 13. Utility Types Already Built-in
// --------------------------------------------

// TypeScript provides many utility types that are essentially type aliases:
// Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, NonNullable, ReturnType, etc.
// These are all implemented as type aliases.

// Example using built-in:
type UserPartial = Partial<Person>;
type UserRequired = Required<Person>;
type UserPick = Pick<Person, "name" | "email">;

// --------------------------------------------
// 14. Self-Referencing Type Aliases (Recursive)
// --------------------------------------------

// Already shown above with TreeNode.

// --------------------------------------------
// Key Takeaway
// --------------------------------------------
// - Type aliases (`type`) give names to any type, including primitives, unions, intersections, objects, functions, tuples, and generics.
// - They are useful for avoiding repetition and making complex types readable.
// - Unlike interfaces, type aliases cannot be reopened or extended using declaration merging, but they can represent more than just object shapes.
// - Use type aliases for union/intersection types, function signatures, tuples, and generic helpers.
// - Use interfaces when you expect to extend the type via declaration merging or when implementing with classes.
// - Type aliases are powerful with advanced features like mapped types and conditional types.