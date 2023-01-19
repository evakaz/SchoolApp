"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainScreenCalculator_1 = require("./mainScreenCalculator");
const ClassSchedule_1 = require("./ClassSchedule");
const DayOfWeek_1 = require("./DayOfWeek]");
describe('Input validation', () => {
    test('test negative hour', () => {
        const calc = new mainScreenCalculator_1.MainScreenCalculator();
        const r = calc.getMainScreen(ClassSchedule_1.TwelveRSchedule, DayOfWeek_1.DayOfWeek.MONDAY, { hour: -1, min: 0 }, {});
        expect(r).toEqual({ type: mainScreenCalculator_1.MainScreenType.ERROR, error: { title: "Invalid argument: hour" } });
    });
    test('test positive hour', () => {
        const calc = new mainScreenCalculator_1.MainScreenCalculator();
        const r = calc.getMainScreen(ClassSchedule_1.TwelveRSchedule, DayOfWeek_1.DayOfWeek.MONDAY, { hour: 1, min: 0 }, {});
        expect(r).toEqual({ type: mainScreenCalculator_1.MainScreenType.ERROR, error: { title: "Invalid argument: hour" } });
    });
});
describe('MainScreen', () => {
    test('test get main screen', () => {
        const calc = new mainScreenCalculator_1.MainScreenCalculator();
        const r = calc.getMainScreen(ClassSchedule_1.TwelveRSchedule, DayOfWeek_1.DayOfWeek.MONDAY, { hour: 10, min: 10 }, { "matemaatika": "G1" });
        expect(r).toEqual({ type: mainScreenCalculator_1.MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 00:20" },
            lunch_button: { title: "Lunch in: 02:05", titleIfPressed: "vene suur söögisaal" },
            next_button: { title: "Next lesson: muusikaajalugu. The lesson starts in: 00:35",
                titleIfPressed: "Room: AUD" } });
    });
    test('test get main screen the same start hour', () => {
        const calc2 = new mainScreenCalculator_1.MainScreenCalculator(); // 10: 30 1:1 //11:45 11
        const r2 = calc2.getMainScreen(ClassSchedule_1.TwelveRSchedule, DayOfWeek_1.DayOfWeek.MONDAY, { hour: 9, min: 20 }, { "matemaatika": "G1" });
        expect(r2).toEqual({ type: mainScreenCalculator_1.MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 01:10" },
            lunch_button: { title: "Lunch in: 02:55", titleIfPressed: "vene suur söögisaal" },
            next_button: { title: "Next lesson: muusikaajalugu. The lesson starts in: 01:25",
                titleIfPressed: "Room: AUD" } });
    });
    test('test get main screen the same end hour', () => {
        const calc = new mainScreenCalculator_1.MainScreenCalculator();
        const r = calc.getMainScreen(ClassSchedule_1.TwelveRSchedule, DayOfWeek_1.DayOfWeek.MONDAY, { hour: 10, min: 29 }, { "matemaatika": "G1" });
        expect(r).toEqual({ type: mainScreenCalculator_1.MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 00:01" },
            lunch_button: { title: "Lunch in: 01:46", titleIfPressed: "vene suur söögisaal" },
            next_button: { title: "Next lesson: muusikaajalugu. The lesson starts in: 00:16",
                titleIfPressed: "Room: AUD" } });
    });
    test('main screen school break', () => {
        const calc = new mainScreenCalculator_1.MainScreenCalculator();
        const r = calc.getMainScreen(ClassSchedule_1.TwelveRSchedule, DayOfWeek_1.DayOfWeek.MONDAY, { hour: 10, min: 29 }, { "matemaatika": "G1" });
        expect(r).toEqual({ type: mainScreenCalculator_1.MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 00:01" },
            lunch_button: { title: "Lunch in: 01:46", titleIfPressed: "vene suur söögisaal" },
            next_button: { title: "Next lesson: muusikaajalugu. The lesson starts in: 00:16",
                titleIfPressed: "Room: AUD" } });
    });
    //TODO
    test('main screen last lesson', () => {
        const calc = new mainScreenCalculator_1.MainScreenCalculator();
        const r = calc.getMainScreen(ClassSchedule_1.TwelveRSchedule, DayOfWeek_1.DayOfWeek.MONDAY, { hour: 12, min: 50 }, {});
        expect(r).toEqual({ type: mainScreenCalculator_1.MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 00:01" },
            lunch_button: { title: "Lunch in: 01:46", titleIfPressed: "vene suur söögisaal" },
            next_button: { title: "Next lesson: muusikaajalugu. The lesson starts in: 00:16",
                titleIfPressed: "Room: AUD" } });
    });
});
describe("Lunch Tests", () => {
    test("test lunch now", () => {
        const calc = new mainScreenCalculator_1.MainScreenCalculator();
        const r = calc.getMainScreen(ClassSchedule_1.TwelveRSchedule, DayOfWeek_1.DayOfWeek.MONDAY, { hour: 12, min: 20 }, { "matemaatika": "G1" });
        expect(r).toEqual({ type: mainScreenCalculator_1.MainScreenType.SUCCESS,
            current_button: { title: "Lunch. Hurry!", titleIfPressed: "vene suur söögisaal" },
            lunch_button: { title: "Lunch is now!!!", titleIfPressed: "vene suur söögisaal" },
            next_button: { title: "Next lesson: ajalugu. The lesson starts in: 0:25",
                titleIfPressed: "Room: V213" } });
    });
});
//# sourceMappingURL=MainScreenCalculator.test.js.map