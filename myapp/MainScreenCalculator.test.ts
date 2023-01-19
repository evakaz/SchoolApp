import {MainScreenCalculator, MainScreenType} from "./mainScreenCalculator";
import {ClassSchedule, DayOfWeek, TwelveRSchedule} from "./ClassSchedule";

describe('Input validation', () => {
    test('test negative hour', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: -1, min: 0}, {});
        expect(r).toEqual({type: MainScreenType.ERROR, error: {title: "Invalid argument: hour"}})
    });

    test('test positive hour', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 1, min: 0}, {});
        expect(r).toEqual({type: MainScreenType.ERROR, error: {title: "Invalid argument: hour"}})
    });

});

describe('MainScreen', () => {
    test('test get main screen', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 10, min: 10}, {"matemaatika": "G1"});
        expect(r).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 0:20"},
            lunch_button: {title: "Lunch in: 2:05", titleIfPressed: "vene suur söögisaal"},
            next_button: {title: "Next lesson: muusikaajalugu. The lesson starts in: 0:35",
                titleIfPressed: "Room: AUD"}})
    });
    test('test get main screen the same start hour', () => {
        const calc2 = new MainScreenCalculator(); // 10: 30 1:1 //11:45 11
        const r2 = calc2.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 9, min: 20}, {"matemaatika": "G1"});
        expect(r2).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 1:10"},
            lunch_button: {title: "Lunch in: 2:55", titleIfPressed: "vene suur söögisaal"},
            next_button: {title: "Next lesson: muusikaajalugu. The lesson starts in: 1:25",
                titleIfPressed: "Room: AUD"}})
    });
    test('test get main screen the same end hour', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 10, min: 29}, {"matemaatika": "G1"});
        expect(r).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 0:01"},
            lunch_button: {title: "Lunch in: 1:46", titleIfPressed: "vene suur söögisaal"},
            next_button: {title: "Next lesson: muusikaajalugu. The lesson starts in: 0:16",
                titleIfPressed: "Room: AUD"}})
    });
});

describe("Lunch Tests", () => {
    test("test lunch now", () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 12, min: 20}, {"matemaatika": "G1"});
        expect(r).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: ", titleIfPressed: "Time left:"},
            lunch_button: {title: "Lunch is now!!!", titleIfPressed: "vene suur söögisaal"},
            next_button: {title: "Next lesson: ajalugu. The lesson starts in: 0:25",
                titleIfPressed: "Room: V213"}})
    })
})