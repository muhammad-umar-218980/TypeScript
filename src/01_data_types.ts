// Primitive Data Types 

let fullName:string = "Muhammad Umar"

let age:number = 20

let bigNum:bigint = 1234567890123456789012345678901234567890n

let isStudent:boolean = true

let score:null = null

let notDefined:undefined = undefined

let uniqueSymbol: symbol = Symbol("unique")

console.log("\n\n\n\n\n\n\n")
console.log(fullName)
console.log(age)
console.log(bigNum)
console.log(isStudent)
console.log(score)
console.log(notDefined)
console.log(uniqueSymbol)









// Non-Primitive Data Types

let hobbies:string[] = ["Reading", "Coding", "Gaming"] // Array of strings

let numbers:number[] = [1, 2, 3, 4, 5] // Array of numbers

let person:{ name: string; age: number; university: string } = {
    name: "Umar",
    age: 20,
    university : "NED University of Engineering and Technology"
} // Object with specific properties and types


// // NaN, Infinity, and -Infinity are special values of the number type.

let notANumber:number = NaN
let positiveInfinity:number = Infinity
let negativeInfinity:number = -Infinity

console.log(hobbies)
console.log(numbers)
console.log(person)
console.log(notANumber)
console.log(positiveInfinity)
console.log(negativeInfinity)






// any , unknown , void , never 
// These are additional types in TypeScript that provide more flexibility and control over type checking and are not in javaScript.


// any 
// The any type is a type that can represent any value, and it effectively turns off type checking for that variable. It allows you to assign any value to a variable of type any, and you can perform any operation on it without TypeScript raising an error. However, using any should be avoided whenever possible, as it defeats the purpose of using TypeScript's type system.
let anytype : any = "This can be any type"
anytype = 123
anytype = true
anytype = [1,2,3]
anytype = {name:"Umar"}

console.log(anytype);



// unknown
// The unknown type is a type-safe counterpart of any. It represents any value, but unlike any, you cannot perform operations on an unknown type without first asserting or narrowing its type. This means that you need to perform type checks or type assertions before using the value, which helps prevent runtime errors and encourages better type safety in your code.
let unknownType : unknown = "This can be any type"
unknownType = 123
unknownType = true
unknownType = [1,2,3]
unknownType = {name:"Umar"}

console.log(unknownType);














let unknownValue: unknown = "Hello";

// Error
// unknownValue.toUpperCase();

if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase());
}



// The main difference between any and unknown is that unknown is safer than any because you cannot perform operations on an unknown type without first asserting or narrowing its type. This helps prevent runtime errors and encourages better type safety in your code.


// IMPORTANT NOTE : Always try to avoid using any type in TypeScript as it defeats the purpose of using TypeScript and its type checking capabilities. Use unknown type instead of any type whenever possible.






// void 
// The void type is used to indicate that a function does not return a value. It is commonly used as the return type for functions that perform some action but do not produce a result. In TypeScript, a function with a void return type can still have side effects, such as logging to the console or modifying external variables, but it does not return any value to the caller.

let voidFunction = (): void => {
    console.log("This function does not return any value.");
}

voidFunction();

function printHello(name: string): void {
    console.log(`Hello, ${name}!`);
}

printHello("Alice");
printHello("Umar")










// never
// The never type is used to indicate that a function or expression will never return a value. It is typically used for functions that throw an error or have an infinite loop, as they will never reach a return statement. The never type is a subtype of every other type, which means that it can be assigned to any type, but no other type can be assigned to never.

function throwError(message: string): never {
    throw new Error(message);
}   


try {
    throwError("This function always throws an error and never returns a value.");
} catch (err) {
    console.log("Caught error:", err);
}



















//Infinite Loop
function infiniteLoop(): never {
    while (true) {
        console.log("Running...");
    }
}

// infiniteLoop();

