// console.log("hello world");
// var currentDate = new Date();
// let lessonTimeStart = new Date();
// let currentHours = currentDate.getHours();
// var currentMinutes = currentDate.getMinutes();
// var currentTime = currentHours + ":" + currentMinutes;
// console.log(currentTime);
//getDay = monday = 1, sunday = 0

// import data from './12R.json';
// console.log(data);

type kv = {[key in string]: string};
type arr = string[];

const k: kv = {
    "monday": "1",
    "tuesday": "2"
}

const a: arr = [
    "monday",
    "tuesday"
]

console.log(k["monday"]);
console.log(k["tuesday"]);