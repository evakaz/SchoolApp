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
                let endLessonInMin = lessonEnd.hour * 60 + lessonEnd.min;
                currentTimeInMin = time.hour * 60 + time.min;
                timeLeftTilEnd.min = endLessonInMin - currentTimeInMin;
                while (timeLeftTilEnd.min >= 60) {
                    timeLeftTilEnd.hour++;
                    timeLeftTilEnd.min -= 60;
                }
                timeLeftTilEnd = {
                    hour: timeLeftTilEnd.hour,
                    min: timeLeftTilEnd.min
                };
                //end
                nextLessonOrder = daySchedule.lessons[i].order + 1;
            }
        }
        const nextLesson = daySchedule.lessons[nextLessonOrder];
        const nextLessonTitle = nextLesson.name;
        var timeUntilNextLesson : VhkTime = {
            hour: 0,
            min: 0
        };
        timeUntilNextLesson.min = nextLesson.start_time.hour * 60 + nextLesson.start_time.min - currentTimeInMin;
        while (timeUntilNextLesson.min >= 60) {
            timeUntilNextLesson.hour++;
            timeUntilNextLesson.min -= 60;
        }
        //end
        var nextLessonRoom = "";
        if ("place" in nextLesson.room) {
            nextLessonRoom = nextLesson.room.place;
        }
        else if ("places" in nextLesson.room.places) {
            nextLessonRoom = nextLesson.room.places[group[1]];
        }
        var timeUntilLunch : VhkTime = {
            hour: 0,
            min: 0
        };


        return {
            type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: " + currentLesson, titleIfPressed: "Time left: " + timeLeftTilEnd.hour + ":" + timeLeftTilEnd.min}, //what if sunday?? //how to print minutes if theyre smaller than 10
            lunch_button: {title: "Lunch in: ", titleIfPressed: ""},//TODO what if lunch was already???
            next_button: {title: "Next lesson: " + nextLessonTitle + ". The lesson starts in: " + timeUntilNextLesson.hour + ":" + timeUntilNextLesson.min,
            titleIfPressed: "Room: " + nextLessonRoom} //TODO based on group
        };
    }
}

//let endLessonInMin = lessonEnd.hour * 60 + lessonEnd.min;
//                 currentTimeInMin = time.hour * 60 + time.min;
//                 timeLeftTilEnd.min = endLessonInMin - currentTimeInMin;
//                 while (timeLeftTilEnd.min >= 60) {
//                     timeLeftTilEnd.hour++;
//                     timeLeftTilEnd.min -= 60;
//                 }
//                 timeLeftTilEnd = {
//                     hour: timeLeftTilEnd.hour,
//                     min: timeLeftTilEnd.min
//                 };
/*function getTimeUntilSth(currentTime : VhkTime, timeUntilSth : VhkTime) {
    timeUntilSth.min = timeUntilSth.hour * 60
}
*/
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