const message: string = 'hello world!';
console.log(message);

// boolean
let b: boolean;
b = true;
b = false;

// number
let n: number;
n = 31;
n = 0x000f;
n = 0b1111;

// string
let s: string;
s = 'hi';
s = 'hello ${n}';
s = `hello ${n}`;

// array
let l: number[]; // Array<number>
l = [1, 2, 3, 4];

// tuple
let t: [string, number];
t = ['hi', 31];

// enum
enum Color { Red, Green, Blue };
let color: Color = Color.Red;
let coloeName: string = Color[Color.Green]; // Green

// any
let a: any;
a = 31;
a = 'hi';
a = [a, 2, 3];

// void --반환 타입이 없는 함수에서 주로 사용
function helloWorld(): void { }

// null & undefined --자체 타입을 가지지만, 모든 타입의 서브타입이기도 함
let undef: undefined = undefined;
let nul: null = null;

// never --보통 반환되는 함수가 없는 exception에 쓰임
function someError(): never {
    throw new Error();
}

// type assertion --컴파일러에게 타입을 알려준다.
let some: any = 'hello';
let strLength: number = (some as string).length; // as를 써서 알려주기를 권장
console.log(strLength);

let strLength2: number = some.length; // 근데.. 안 해도 빌드는 잘 되는구나;;
console.log(strLength2);

// 함수에서 타입 정하기
function sum(x: number, y: number): number {
    return x + y;
}

// interface -- interface로 추상화할 수 있다.
interface Shape {
    getArea(): number;
}

class Circle implements Shape {
    radius: number;

    // 생성자
    constructor(radius: number) {
        this.radius = radius;
    }

    getArea(): number {
        // return Math.PI * Math.pow(this.radius, 2);
        // return Math.PI * this.radius ** 2;
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle implements Shape {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.height;
    }
}

const shapes: Shape[] = [new Circle(2), new Rectangle(2, 3)];
shapes.forEach(shape => console.log(shape.getArea()));

// interface 확장 --부모 interface로 추상화 가능하다.
// --interface지만 객체를 가질 수 있다.
interface Person {
    name: string;
    age?: number;
}

interface Developer extends Person {
    skills: string[];
}

const person: Person = {
    name: 'pkk',
    age: 31
};

const developer: Developer = {
    skills: ['c++', 'opengl'],
    name: "pkk"
}

const people: Person[] = [person, developer];

// 다른 파일 import하기
import * as mylib from './mylib';
{
    let a = 10;
    let b = 3;
    console.log(mylib.sum(a, b));
    console.log(mylib.sub(a, b));
    console.log(mylib.mul(a, b));
}