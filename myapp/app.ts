import {DayOfWeek, TwelveRSchedule, VhkTime} from "./ClassSchedule";
import {MainScreenCalculator} from "./mainScreenCalculator";

const express = require('express')
const app = express()
const port = 3000

const resp: VhkMainScreenResponse = {
    item: [{
        title: "Hello world!",
        background_color: "#CCCCCC"
    }, {
        title: "Hello dog!",
        background_color: "#888888"
    }]
}

function getDayOfWeek(dayOfWeek: number): DayOfWeek {
    switch (dayOfWeek) {
        case 1: return DayOfWeek.MONDAY;
        case 2: return DayOfWeek.TUESDAY;
        case 3: return DayOfWeek.WEDNESDAY;
        case 4: return DayOfWeek.THURSDAY;
        case 5: return DayOfWeek.FRIDAY;
        case 6: return DayOfWeek.SATURDAY;
        case 0: return DayOfWeek.SUNDAY;
        default:
            throw new Error("Invalid day of week")
    }
}

app.post('/getMainScreen', (req: any, res: any) => {
    console.log(req);
    const date = new Date();
    const dayOfWeek = getDayOfWeek(date.getDay());
    let group = {"matemaatika": "G1"};
    var schedule = TwelveRSchedule;
    let currentDate: VhkTime = {
        hour: date.getHours(),
        min: date.getMinutes()
    };
    let calc = new MainScreenCalculator();
    let resp = calc.getMainScreen(schedule, dayOfWeek, currentDate, group);

    res.json(resp);
})

app.get('/getForSelectGrade', (req: any, res: any) => {
    res.json({item: ["10", "11", "12"]});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

interface VhkMainScreenResponse {
    item: Item[];
}

interface Item {
    title: string;
    background_color: string;
}