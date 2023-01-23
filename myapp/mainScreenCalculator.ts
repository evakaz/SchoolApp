import {ClassSchedule, VhkDay, VhkGroup, VhkTime} from "./ClassSchedule";
import {DayOfWeek, getNextDayOfWeek} from "./DayOfWeek]";

export class MainScreenCalculator {

    public getMainScreen(schedule: ClassSchedule, dayOfWeek: DayOfWeek, time: VhkTime, group: VhkGroup): MainScreen { //keyvalue
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
        var resultCurrent;
        var resultCurrentPressed;
        var isWeekend: boolean = false;
        const dayScheduleFromInput = schedule[dayOfWeek];
        if (!dayScheduleFromInput) { //if saturday and sunday???
            if (dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY) {
                isWeekend = true;
                var next;
                if (schedule[DayOfWeek.MONDAY].lessons[0]) {
                    
                }
                return {
                    type: MainScreenType.SUCCESS,
                    current_button: { title: "Nothing is happening now or any time soon. Relax!", titleIfPressed: "Chill out \U0001F60A"},
                    lunch_button: {title: "" + lunchResult, titleIfPressed: "" + lunchRoom},
                    next_button: {title: "Next lesson: " + next?.name + ". The lesson starts in: " + formatNumberAsTwoDigit(getTimeUntilSth(time, next?.start_time, false).hour) + ":" + formatNumberAsTwoDigit(timeUntilNextLesson.min),
                        titleIfPressed: "Room: " + nextLessonRoom} //TODO based on group
                };
            }
            else {
                return {
                    type: MainScreenType.ERROR,
                    error: {title: "Undefined schedule for day: " + dayOfWeek}
                }
            }
        }
        var daySchedule: VhkDay = dayScheduleFromInput;

        var currentLesson = "";
        var timeLeftTilEnd: VhkTime = {
                hour: 0,
                min: 0
            };
        var nextLessonOrder: number = 0;
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
        var isRecess: boolean = false;
        if ((currentLesson == null || currentLesson == "") && (time.hour < daySchedule.lessons[numOfLessons-1].end_time.hour)) {
            resultCurrent = "Recess! The next lesson is starting soon.";
            resultCurrentPressed = "\U0001F972";
            var minNextLessonOrder = daySchedule.lessons.length;
            for (let i = 0; i < numOfLessons; i++)
            {
                const lessonStart = daySchedule.lessons[i].start_time;
                if (((time.hour < lessonStart.hour) || (time.hour == lessonStart.hour && time.min < lessonStart.min)) &&
                    (daySchedule.lessons[i].order < minNextLessonOrder)) {
                    minNextLessonOrder = daySchedule.lessons[i].order;
                }
            }
            nextLessonOrder = minNextLessonOrder;
            isRecess = true;
        }
        //check if the nextlesson doesnt exist by checking if current lesson is the last element in the array
        if (daySchedule.lessons[numOfLessons-1].name == currentLesson)
        {
            var dayScheduleNext = schedule[getNextDayOfWeek(dayOfWeek)]; //gets the first lesson of next day
            if (dayScheduleNext != undefined) {
                daySchedule = dayScheduleNext;
                nextLessonOrder = 0;
            }
            else {
                throw new Error("Undefinied: " + dayScheduleNext);
            }
        }
        if (nextLessonOrder == undefined) {
            while (daySchedule.lessons.length == 0) {
                dayScheduleNext = schedule[getNextDayOfWeek(dayOfWeek)];
                if (dayScheduleNext != undefined) {
                    daySchedule = dayScheduleNext;
                    nextLessonOrder = 0;
                    break;
                }
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
        const lunchTimeIn: VhkTime = getTimeUntilSth(time, lunch.start_time, true);
        var lunchResult;
        var lunchRoom;
        if (lunchTimeIn.min > 0 && lunchTimeIn.hour > 0)
        {
            lunchResult = "Lunch in: " + formatNumberAsTwoDigit(lunchTimeIn.hour) + ":" + formatNumberAsTwoDigit(lunchTimeIn.min);
            if ("place" in lunch.room) {
                lunchRoom = lunch.room.place;
            }
        }
        else if (lunchTimeIn.hour == 0 && (lunchTimeIn.min < 0 && lunchTimeIn.min > -15))
        {
            lunchResult = "Lunch is now!!!";
            lunchRoom = lunch.room.place;
        }
        else
        {
            lunchResult = "Lunch is over.";
            lunchRoom = "\U0001F37D";
        }

        if (currentLesson == null && timeUntilNextLesson.hour >= 24 && !isWeekend) {
            resultCurrent = "Nothing is happening now or any time soon. Relax!";
            resultCurrentPressed = "Chill out \U0001F60A";
        }
        else if (lunchResult == "Lunch is now!!!" && isRecess) {
            resultCurrent = "Lunch. Hurry!"
            resultCurrentPressed = lunchRoom;
        }
        else if (currentLesson == null) {
            resultCurrent = "No lesson now";
            resultCurrentPressed = ""; //TODO
        }
        else if (!isRecess && !isWeekend) {
            resultCurrent = "Current lesson: " + currentLesson;
            resultCurrentPressed = "Time left: " + formatNumberAsTwoDigit(timeLeftTilEnd.hour) + ":" + formatNumberAsTwoDigit(timeLeftTilEnd.min);
        }
        else {
            console.log("Huh?")
        }

        return {
            type: MainScreenType.SUCCESS,
            current_button: { title: "" + resultCurrent, titleIfPressed: "" + resultCurrentPressed},
            lunch_button: {title: "" + lunchResult, titleIfPressed: "" + lunchRoom},
            next_button: {title: "Next lesson: " + nextLessonTitle + ". The lesson starts in: " + formatNumberAsTwoDigit(timeUntilNextLesson.hour) + ":" + formatNumberAsTwoDigit(timeUntilNextLesson.min),
            titleIfPressed: "Room: " + nextLessonRoom} //TODO based on group
        };
    }
}

function getTimeUntilSth(currentTime : VhkTime, timeUntilSth : VhkTime, isLunch?: boolean): VhkTime {
    const result = Object.assign({}, timeUntilSth);
    result.min = result.hour * 60 + result.min - currentTime.hour * 60 - currentTime.min;
    if (result.min < 0 && !isLunch) {
        result.min = (24 * 60 - (currentTime.hour * 60 + currentTime.min)) + timeUntilSth.hour*60 + timeUntilSth.min;
    }
    result.hour = 0;
    while (result.min >= 60) {
        result.hour++;
        result.min -= 60;
    }
    return result;
}

function formatNumberAsTwoDigit(num: number): string {
    return (num >= 10) ? String(num) : "0" + num;
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