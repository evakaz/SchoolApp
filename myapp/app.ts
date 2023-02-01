const express = require('express');
import {TwelveRSchedule, VhkGroup, VhkTime} from "./ClassSchedule";
import {MainScreenCalculator} from "./mainScreenCalculator";
import {DayOfWeek, getDayOfWeek} from "./DayOfWeek";

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/getMainScreen', (req: any, res: any) => {
    console.log(req.body);
    const request: MainScreenRequest = req.body as MainScreenRequest;

    if (!request.grade || !request.group) {
        res.status().send(400);
        return;
    }

    const date = new Date();
//    const dayOfWeek = getDayOfWeek(date.getDay());
    const dayOfWeek = DayOfWeek.MONDAY;
    var schedule = TwelveRSchedule;
    // let currentDate: VhkTime = {
    //     hour: date.getHours(),
    //     min: date.getMinutes()
    // };
    let currentDate: VhkTime = {
        hour: 10,
        min: 10
    };

    let calc = new MainScreenCalculator();
    let resp = calc.getMainScreen(schedule, dayOfWeek, currentDate, request.group);

    res.json(resp);
    console.log("The data was fetched")
})

app.get('/getForSelectGrade', (req: any, res: any) => {
    res.json({item: ["10", "11", "12"]});
})

app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})

export interface MainScreenRequest {
    grade: string;
    group: VhkGroup;
}