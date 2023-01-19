"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClassSchedule_1 = require("./ClassSchedule");
const mainScreenCalculator_1 = require("./mainScreenCalculator");
const DayOfWeek_1 = require("./DayOfWeek]");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;
const resp = {
    item: [{
            title: "Hello world!",
            background_color: "#CCCCCC"
        }, {
            title: "Hello dog!",
            background_color: "#888888"
        }]
};
// function getDayOfWeek(dayOfWeek: number): DayOfWeek {
//     switch (dayOfWeek) {
//         case 1: return DayOfWeek.MONDAY;
//         case 2: return DayOfWeek.TUESDAY;
//         case 3: return DayOfWeek.WEDNESDAY;
//         case 4: return DayOfWeek.THURSDAY;
//         case 5: return DayOfWeek.FRIDAY;
//         case 6: return DayOfWeek.SATURDAY;
//         case 0: return DayOfWeek.SUNDAY;
//         default:
//             throw new Error("Invalid day of week")
//     }
// }
app.post('/getMainScreen', (req, res) => {
    console.log(req);
    const date = new Date();
    const dayOfWeek = (0, DayOfWeek_1.getDayOfWeek)(date.getDay());
    let group = { "matemaatika": "G1" };
    var schedule = ClassSchedule_1.TwelveRSchedule;
    let currentDate = {
        hour: date.getHours(),
        min: date.getMinutes()
    };
    let calc = new mainScreenCalculator_1.MainScreenCalculator();
    let resp = calc.getMainScreen(schedule, dayOfWeek, currentDate, group);
    res.json(resp);
});
app.get('/getForSelectGrade', (req, res) => {
    res.json({ item: ["10", "11", "12"] });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map