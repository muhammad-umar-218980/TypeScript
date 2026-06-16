// Primitive Data Types 

let fullName:string = "Muhammad Umar"

let age:number = 20

let bigNum:bigint = 1234567890123456789012345678901234567890n

let isStudent:boolean = true

let score:null = null

let notDefined:undefined = undefined

let uniqueSymbol: symbol = Symbol("unique")


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


// NaN , Infinity , -Infinity are also considered as primitive data types in JavaScript and TypeScript. They represent special numeric values.

let notANumber:number = NaN
let positiveInfinity:number = Infinity
let negativeInfinity:number = -Infinity

console.log(hobbies)
console.log(numbers)
console.log(person)
console.log(notANumber)
console.log(positiveInfinity)
console.log(negativeInfinity)
