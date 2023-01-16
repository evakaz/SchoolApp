import {Calculator, MainScreenType} from "./calculator";
import {DayOfWeek, liveClassSchedule} from "./ClassSchedule";

describe('Input validation', () => {
    test('test negative hour', () => {
        const calc = new Calculator();
        const r = calc.getMainScreen(liveClassSchedule, DayOfWeek.MONDAY, {hour: -1, min: 0}, null);
        expect(r).toEqual({type: MainScreenType.ERROR, error: {title: "Invalid argument: hour"}})
    });

    test('test positive hour', () => {
        const calc = new Calculator();
        const r = calc.getMainScreen(liveClassSchedule, DayOfWeek.MONDAY, {hour: 1, min: 0}, null);
        expect(r).toEqual({type: MainScreenType.ERROR, error: {title: "Invalid argument: hour"}})
    });

});