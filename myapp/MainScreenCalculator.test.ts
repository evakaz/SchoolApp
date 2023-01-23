import {MainScreenCalculator, MainScreenType} from "./mainScreenCalculator";
import {TwelveRSchedule} from "./ClassSchedule";
import {DayOfWeek} from "./DayOfWeek]";

describe('Input validation', () => {
    test('test negative hour', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: -1, min: 0}, {});
        expect(r).toEqual({type: MainScreenType.ERROR, error: {title: "Invalid argument: hour"}})
    });

    test('test negative min', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 12, min: -2}, {});
        expect(r).toEqual({type: MainScreenType.ERROR, error: {title: "Invalid argument: minutes"}})
    });
    test('schedule not found', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.SUNDAY, {hour: 12, min: 12}, {});
        expect(r).toEqual({type: MainScreenType.ERROR, error: {title: "Undefined schedule for day: sunday"}})
    })


});

describe('MainScreen', () => {
    test('test get main screen', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 10, min: 10}, {"matemaatika": "G1"});
        expect(r).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 00:20"},
            lunch_button: {title: "Lunch in: 02:05", titleIfPressed: "vene suur söögisaal"},
            next_button: {title: "Next lesson: muusikaajalugu. The lesson starts in: 00:35",
                titleIfPressed: "Room: AUD"}})
    });
    test('test get main screen the same start hour', () => {
        const calc2 = new MainScreenCalculator(); // 10: 30 1:1 //11:45 11
        const r2 = calc2.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 9, min: 20}, {"matemaatika": "G1"});
        expect(r2).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 01:10"},
            lunch_button: {title: "Lunch in: 02:55", titleIfPressed: "vene suur söögisaal"},
            next_button: {title: "Next lesson: muusikaajalugu. The lesson starts in: 01:25",
                titleIfPressed: "Room: AUD"}})
    });
    test('test get main screen the same end hour', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 10, min: 29}, {"matemaatika": "G1"});
        expect(r).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 00:01"},
            lunch_button: {title: "Lunch in: 01:46", titleIfPressed: "vene suur söögisaal"},
            next_button: {title: "Next lesson: muusikaajalugu. The lesson starts in: 00:16",
                titleIfPressed: "Room: AUD"}})
    });
    //TODO
    // test('main screen school break', () => {
    //     const calc = new MainScreenCalculator();
    //     const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 10, min: 29}, {"matemaatika": "G1"});
    //     expect(r).toEqual({type: MainScreenType.SUCCESS,
    //         current_button: { title: "Current lesson: matemaatika", titleIfPressed: "Time left: 00:01"},
    //         lunch_button: {title: "Lunch in: 01:46", titleIfPressed: "vene suur söögisaal"},
    //         next_button: {title: "Next lesson: muusikaajalugu. The lesson starts in: 00:16",
    //             titleIfPressed: "Room: AUD"}})
    // })
    //TODO
    test('main screen last lesson', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 12, min: 50}, {});
        expect(r).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: ajalugu", titleIfPressed: "Time left: 01:10"},
            lunch_button: {title: "Lunch is over.", titleIfPressed: "\U0001F37D"},
            next_button: {title: "Next lesson: tarkvara arendus. The lesson starts in: 20:10",
                titleIfPressed: "Room: V133"}})
    });
    test('main screen recess', () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 12, min: 40}, {});
        expect(r).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Recess! The next lesson is starting soon.", titleIfPressed: "\U0001F972"},
            lunch_button: {title: "Lunch is over.", titleIfPressed: "\U0001F37D"},
            next_button: {title: "Next lesson: ajalugu. The lesson starts in: 00:05",
                titleIfPressed: "Room: V213"}})
    });
    test("main screen weekend", () => {
        const c = new MainScreenCalculator();
        const r = c.getMainScreen(TwelveRSchedule, DayOfWeek.SATURDAY, {hour: 9, min: 0}, {});
        expect(r).toEqual({type: MainScreenType.SUCCESS,
        current_button: {title: "Nothing is happening now or any time soon. Relax!", titleIfPressed: "Chill out \U0001F60A"},
        next_button: {title: "Next lesson: matemaatika. The lesson starts in: ", titleIfPresssed: ""}
        })
    })
});

describe("Lunch Tests", () => {
    test("test lunch now", () => {
        const calc = new MainScreenCalculator();
        const r = calc.getMainScreen(TwelveRSchedule, DayOfWeek.MONDAY, {hour: 12, min: 20}, {"matemaatika": "G1"});
        expect(r).toEqual({type: MainScreenType.SUCCESS,
            current_button: { title: "Lunch. Hurry!", titleIfPressed: "vene suur söögisaal"},
            lunch_button: {title: "Lunch is now!!!", titleIfPressed: "vene suur söögisaal"},
            next_button: {title: "Next lesson: ajalugu. The lesson starts in: 00:25",
                titleIfPressed: "Room: V213"}})
    });
});