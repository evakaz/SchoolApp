import {ClassSchedule, VhkDay, DayOfWeek, VhkTime, liveClassSchedule, Room} from "./ClassSchedule";

export class Calculator {

    public getMainScreen(schedule: ClassSchedule, dayOfWeek: DayOfWeek, time: VhkTime, group: string | null): MainScreen {

        if (time.hour < 0) {
            return {
                type: MainScreenType.ERROR,
                error: { title: "Invalid argument: hour" }
            }
        }
        if (time.min < 0) {
            return {
                type: MainScreenType.ERROR,
                error: { title: "Invalid argument: minutes" }
            }
        }

        const day: VhkDay = schedule[dayOfWeek];
        if (!day) {
            const result: MainScreenError = {
                type: MainScreenType.ERROR,
                error: { title: "Undefined schedule for day: " + dayOfWeek }
            }
            return result;
        }
        let currentDate = 0;
        var currentLesson = "";
        /*var currentRoom: Room = {
            TODO
        };*/
        let numOfLessons: number = liveClassSchedule.monday.lessons.length; //pass currentDay argument to determine {monday} etc
        for (let i = 0; i > numOfLessons; i++) {
            if (currentDate >= liveClassSchedule.monday.lessons[i].start_time.hour && currentDate >= liveClassSchedule.monday.lessons[i].start_time.min
                && currentDate < liveClassSchedule.monday.lessons[i].end_time.hour && currentDate < liveClassSchedule.monday.lessons[i].end_time.min) {
                currentLesson = liveClassSchedule.monday.lessons[i].name;
                //currentRoom = liveClassSchedule.monday.lessons[i].room; //TODO
            }
        }

        const result: MainScreenSuccess = {
            type: MainScreenType.SUCCESS,
            current_button: { title: "tttt" }
        }

        return result;
    }
}

export enum MainScreenType {
    SUCCESS = "success",
    ERROR = "error"
}

export interface MainScreenError {
    type: MainScreenType.ERROR;
    error: {
        title: string;
    };
}

export interface MainScreenSuccess {
    type: MainScreenType.SUCCESS;
    current_button: PrimaryButton;
    lunch_button?: PrimaryButton;
    next_button?: PrimaryButton;
}

export interface PrimaryButton {
    title: string;
}

export type MainScreen = MainScreenSuccess | MainScreenError;