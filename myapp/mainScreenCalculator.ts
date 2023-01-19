import {ClassSchedule, VhkDay, DayOfWeek, VhkTime, TwelveRSchedule, Room, VhkGroup} from "./ClassSchedule";

export class MainScreenCalculator {

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
        var currentTimeInMin: number = 0;
        var numOfLessons: number = daySchedule.lessons.length;
        for (let i = 0; i < numOfLessons; i++) {
            const lessonStart = daySchedule.lessons[i].start_time;
            const lessonEnd = daySchedule.lessons[i].end_time;
            if ((time.hour > lessonStart.hour
                && time.hour < daySchedule.lessons[i].end_time.hour) ||
                (time.hour == lessonStart.hour && time.min >= lessonStart.min && time.hour < lessonEnd.hour) ||
                (time.hour > lessonStart.hour && time.hour == lessonEnd.hour && time.min < daySchedule.lessons[i].end_time.min)) {
                currentLesson = daySchedule.lessons[i].name;
                timeLeftTilEnd = getTimeUntilSth(time, lessonEnd);
                nextLessonOrder = daySchedule.lessons[i].order + 1;
                break;
            }
        }
        const nextLesson = daySchedule.lessons[nextLessonOrder];
        const nextLessonTitle = nextLesson.name;
        const timeUntilNextLesson: VhkTime = getTimeUntilSth(time, nextLesson.start_time);
        var nextLessonRoom = "";
        if ("place" in nextLesson.room) {
            nextLessonRoom = nextLesson.room.place;
        }
        else if ("places" in nextLesson.room.places) {
            nextLessonRoom = nextLesson.room.places[group[1]];
        }
        const lunch = daySchedule.lunch;
        const lunchTimeIn: VhkTime = getTimeUntilSth(time, lunch.start_time);
        var lunchResult;
        var lunchRoom;
        if (lunchTimeIn.min > 0 && lunchTimeIn.hour > 0)
        {
            lunchResult = "Lunch in: " + formateTime(lunchTimeIn.hour) + ":" + formateTime(lunchTimeIn.min);
            if ("place" in lunch.room) {
                lunchRoom = lunch.room.place;
            }
        }
        else if (lunchTimeIn.hour == 0 && (lunchTimeIn.min < 0 && lunchTimeIn.min > -15))
        {
            lunchResult = "Lunch is now!!!";
        }
        else
        {
            lunchResult = "Lunch is over."
        }

        var resultCurrent;
        var resultCurrentPressed;
        if (currentLesson == null && timeUntilNextLesson.hour >= 24) {
            resultCurrent = "Nothing is happening now or any time soon. Relax!";
        } //if there is no lesson and it's not coming in then next 24 hours
        else {
            resultCurrent = "Current lesson: " + currentLesson;
            resultCurrentPressed = "Time left: " + formateTime(timeLeftTilEnd.hour) + ":" + formateTime(timeLeftTilEnd.min);
        }

        return {
            type: MainScreenType.SUCCESS,
            current_button: { title: "" + resultCurrent, titleIfPressed: "" + resultCurrentPressed}, //what if sunday?? //how to print minutes if theyre smaller than 10
            lunch_button: {title: "" + lunchResult, titleIfPressed: "" + lunchRoom},//TODO what if lunch was already???
            next_button: {title: "Next lesson: " + nextLessonTitle + ". The lesson starts in: " + formateTime(timeUntilNextLesson.hour) + ":" + formateTime(timeUntilNextLesson.min),
            titleIfPressed: "Room: " + nextLessonRoom} //TODO based on group
        };
    }
}

function getTimeUntilSth(currentTime : VhkTime, timeUntilSth : VhkTime) {
    const result = Object.assign({}, timeUntilSth);
    result.min = result.hour * 60 + result.min - currentTime.hour * 60 - currentTime.min;
    result.hour = 0;
    while (result.min >= 60) {
        result.hour++;
        result.min -= 60;
    }
    return result;
}

function formateTime(time: number) {
    if (time >= 10) {
        return time;
    }
    //var minFormatted = min.toString();
    if (time <= 9 && time >= 0) {
        var timeFormatted: String = "0" + time
        return timeFormatted;
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
    next_button: PrimaryButton;
}

export interface PrimaryButton {
    title: string,
    titleIfPressed: string
}

export type MainScreen = MainScreenSuccess | MainScreenError;