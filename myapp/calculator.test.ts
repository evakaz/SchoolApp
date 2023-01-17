import {Calculator, MainScreenType} from "./calculator";
import {DayOfWeek, TwelveRSchedule} from "./ClassSchedule";

describe('Input validation', () => {
    test('test negative hour', () => {
        const calc = new Calculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: -1, min: 0}, {});
        expect(r).toEqual({type: MainScreenType.ERROR, error: {title: "Invalid argument: hour"}})
    });

    test('test positive hour', () => {
        const calc = new Calculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 1, min: 0}, {});
        expect(r).toEqual({type: MainScreenType.ERROR, error: {title: "Invalid argument: hour"}})
    });

});

describe('MainScreen', () => {
    test('test get main screen', () => {
        const calc = new Calculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 10, min: 10}, {});
        expect(r).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 0:20"},
            lunch_button: {title: "Lunch in: ", titleIfPressed: ""},
            next_button: {title: "Next lesson: muusikaajalugu. The lesson starts in: 0:25"},
                titleIfPressed: "Room: AUD"})
    });
});