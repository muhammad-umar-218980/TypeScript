// Type Inference

// Type Inference is the process by which TypeScript automatically determines the type of a variable based on its value or usage. This allows developers to write code without explicitly specifying types while still benefiting from type checking, IntelliSense, and autocompletion.

let message = "Hello, TypeScript!"; // inferred as string

function add(a: number, b: number) {
    return a + b; // return type inferred as number
}

let result = add(5, 10); // inferred as number

// result = result.toString();
// Error: result is inferred as a number, but result.toString() returns a string. A string cannot be assigned to a number variable.


// Type inference with primitive data types

let age = 20; // inferred as number

let isStudent = true; // inferred as boolean

let bigNum = 123456789n; // inferred as bigint


// Type inference with arrays

let fruits = ["Apple", "Banana", "Mango"];
// inferred as string[]

let numbers = [1, 2, 3, 4, 5];
// inferred as number[]


// Type inference with objects

let user = {
    name: "Muhammad Umar",
    age: 20
};
// inferred as:
// {
//     name: string;
//     age: number;
// }


// Type inference with const and let

const framework = "React";
// inferred as the literal type "React"

let language = "TypeScript";
// inferred as string


console.log(message);
console.log(result);
console.log(age);
console.log(isStudent);
console.log(bigNum);
console.log(fruits);
console.log(numbers);
console.log(user);
console.log(framework);
console.log(language);


// Key Takeaway:
// TypeScript can often determine types automatically.
// Explicit type annotations are not always required, but they can improve readability and help prevent mistakes.