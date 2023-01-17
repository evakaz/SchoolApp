import {ClassSchedule, VhkDay, DayOfWeek, VhkTime, TwelveRSchedule, Room, VhkGroup} from "./ClassSchedule";

export class Calculator {

    public getMainScreen(schedule: ClassSchedule, dayOfWeek: DayOfWeek, time: VhkTime, group: VhkGroup ): MainScreen { //keyvalue

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

        const daySchedule: VhkDay | undefined = schedule[dayOfWeek];
        if (!daySchedule) {
            return {
                type: MainScreenType.ERROR,
                error: { title: "Undefined schedule for day: " + dayOfWeek }
            }
        }
        var currentLesson = "";
        var timeLeftTilEnd: VhkTime = {
                hour: 0,
                min: 0
            };
        var nextLessonOrder: number = 0;
        var numOfLessons: number = daySchedule.lessons.length; //pass currentDay argument to determine {monday} etc
        for (let i = 0; i < numOfLessons; i++) {
            if (time.hour >= daySchedule.lessons[i].start_time.hour //same here
                && time.min >= daySchedule.lessons[i].start_time.min
                && time.hour < daySchedule.lessons[i].end_time.hour
                && time.min < daySchedule.lessons[i].end_time.min) {
                currentLesson = daySchedule.lessons[i].name;
                timeLeftTilEnd = {
                    hour: daySchedule.lessons[i].end_time.hour - time.hour,
                    min: daySchedule.lessons[i].end_time.hour - time.hour
                };
                nextLessonOrder = daySchedule.lessons[i].order + 1;
            }
        }
        var nextLesson = daySchedule.lessons[nextLessonOrder];
        var nextLessonTitle = nextLesson.name;
        var timeUntilNextLesson : VhkTime = {
            hour: nextLesson.start_time.hour - time.hour,
            min: nextLesson.start_time.min - time.min
        };

        return {
            type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: " + currentLesson, titleIfPressed: "Time left: " + timeLeftTilEnd.hour + ":" + timeLeftTilEnd.min}, //what if sunday??
            lunch_button: {title: "Lunch in: ", titleIfPressed: ""},//TODO what if lunch was already???
            next_button: {title: "Next lesson: " + nextLessonTitle + ". The lesson starts in: " + timeUntilNextLesson.hour + ":" + timeUntilNextLesson.min,
            titleIfPressed: "Room: " + nextLesson.room} //TODO based on group
        };
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
    title: string,
    titleIfPressed: string
}

export type MainScreen = MainScreenSuccess | MainScreenError;