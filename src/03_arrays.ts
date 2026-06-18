// Arrays

// Arrays store multiple values of the same type in a single variable.
// TypeScript enforces type safety on array elements.


// Basic typed arrays

let fruits: string[] = ["Apple", "Banana", "Mango"];

let numbers: number[] = [10, 20, 30, 40, 50];


// Generic array syntax

let cities: Array<string> = ["Karachi", "Lahore", "Islamabad"];


// --------------------------------------
// Type Inference in Arrays
// --------------------------------------

// TypeScript automatically infers array types from initial values

const arr = [1, 2, 3, 4, "Umar"];
// inferred as (string | number)[]

const arr2 = [1, 2, 3, 4];
// inferred as number[]

const arr3 = ["Umar", "Ali", "Ahmed"];
// inferred as string[]

const arr4 = [1, 2, 3, 4, "Umar", true];
// inferred as (string | number | boolean)[]

const arr5 = [1, 2, 3, 4, "Umar", true, { name: "Umar" }];
// inferred as (string | number | boolean | { name: string })[]

const arr6 = [
    { name: "Umar", age: 20 },
    { name: "Ali", age: 25 },
    { name: "Ahmed", age: 30 }
];
// inferred as { name: string; age: number }[]


// --------------------------------------
// Accessing & Modifying Arrays
// --------------------------------------

console.log(fruits[0]); // Apple
console.log(numbers[2]); // 30

fruits[1] = "Orange";


// --------------------------------------
// Adding & Removing Elements
// --------------------------------------

fruits.push("Grapes");
numbers.push(60);

fruits.pop();
numbers.shift();

console.log(fruits.length);


// --------------------------------------
// Type Safety
// --------------------------------------

let students: string[] = ["Ali", "Ahmed", "Umar"];

// students.push(100);
// Error: number is not assignable to string


// --------------------------------------
// Union Type Arrays
// --------------------------------------

let mixedData: (string | number)[] = ["Umar", 20, "NED", 3];


// --------------------------------------
// Readonly Arrays
// --------------------------------------

let colors: readonly string[] = ["Red", "Green", "Blue"];

// colors.push("Yellow"); ❌ Not allowed


// --------------------------------------
// Iteration
// --------------------------------------

for (let fruit of fruits) {
    console.log(fruit);
}

numbers.forEach((num) => {
    console.log(num);
});


// --------------------------------------
// Array Methods
// --------------------------------------

let doubledNumbers = numbers.map((num) => num * 2);

let evenNumbers = numbers.filter((num) => num % 2 === 0);

let total = numbers.reduce((sum, num) => sum + num, 0);


// --------------------------------------
// Multi-Dimensional Arrays
// --------------------------------------

let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

if (matrix[1]) {
    console.log(matrix[1][2]);
}


// --------------------------------------
// Key Takeaway
// --------------------------------------
// Arrays store multiple values of a single type.
// TypeScript enforces type safety and prevents invalid data insertion.
// Arrays come with powerful built-in methods like map, filter, reduce.