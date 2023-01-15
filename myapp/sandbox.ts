//  number
//  string
//  boolean

interface bar {
    txt: string;
    num: number;
    abc?: any;
}

const foo: bar = {
    txt: "my string",
    num: 123,
    abc: 1.1
}

const a: number = 2;
foo.num = a;
console.log(foo);

// setTimeout(() => {
//     console.log("End of timeout")
// }, 3000);

async function main(): Promise<void> {
    var p = myDelay(1);
    console.log(await p);
    console.log("Hello world!");
}

// var p = myDelay(1);
// console.log(await p);
// console.log("Hello world!");

async function myDelay(ti: number): Promise<string> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("End of timeout")
        }, ti);
    })
}

main().then(() => {}).catch(() => {
    console.log("Error!!!!");
});
