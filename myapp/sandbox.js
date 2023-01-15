"use strict";
//  number
//  string
//  boolean
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const foo = {
    txt: "my string",
    num: 123,
    abc: 1.1
};
const a = 2;
foo.num = a;
console.log(foo);
// setTimeout(() => {
//     console.log("End of timeout")
// }, 3000);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var p = myDelay(1);
        console.log(yield p);
        console.log("Hello world!");
    });
}
// var p = myDelay(1);
// console.log(await p);
// console.log("Hello world!");
function myDelay(ti) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve("End of timeout");
            }, ti);
        });
    });
}
main().then(() => { }).catch(() => {
    console.log("Error!!!!");
});
//# sourceMappingURL=sandbox.js.map