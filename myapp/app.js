"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const ClassSchedule_1 = require("./ClassSchedule");
const mainScreenCalculator_1 = require("./mainScreenCalculator");
const DayOfWeek_1 = require("./DayOfWeek");
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/getMainScreen', (req, res) => {
    console.log(req.body);
    const request = req.body;
    if (!request.grade || !request.group) {
        res.status().send(400);
        return;
    }
    const date = new Date();
    //    const dayOfWeek = getDayOfWeek(date.getDay());
    const dayOfWeek = DayOfWeek_1.DayOfWeek.MONDAY;
    var schedule = ClassSchedule_1.TwelveRSchedule;
    // let currentDate: VhkTime = {
    //     hour: date.getHours(),
    //     min: date.getMinutes()
    // };
    let currentDate = {
        hour: 10,
        min: 10
    };
    let calc = new mainScreenCalculator_1.MainScreenCalculator();
    let resp = calc.getMainScreen(schedule, dayOfWeek, currentDate, request.group);
    res.json(resp);
});
app.get('/getForSelectGrade', (req, res) => {
    res.json({ item: ["10", "11", "12"] });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map