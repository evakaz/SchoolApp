"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainScreenType = exports.MainScreenCalculator = void 0;
const DayOfWeek_1 = require("./DayOfWeek]");
class MainScreenCalculator {
    getMainScreen(schedule, dayOfWeek, time, group) {
        if (time.hour < 0) {
            return {
                type: MainScreenType.ERROR,
                error: { title: "Invalid argument: hour" }
            };
        }
        if (time.min < 0) {
            return {
                type: MainScreenType.ERROR,
                error: { title: "Invalid argument: minutes" }
            };
        }
        const dayScheduleFromInput = schedule[dayOfWeek];
        if (!dayScheduleFromInput) { //if saturday and sunday???
            return {
                type: MainScreenType.ERROR,
                error: { title: "Undefined schedule for day: " + dayOfWeek }
            };
        }
        var daySchedule = dayScheduleFromInput;
        var currentLesson = "";
        var timeLeftTilEnd = {
            hour: 0,
            min: 0
        };
        var nextLessonOrder = 0;
        var currentTimeInMin = 0; //TODO: what if the next lesson is starting next day
        var numOfLessons = daySchedule.lessons.length;
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
        //check if the nextlesson doesnt exist by checking if current lesson is the last element in the array
        if (daySchedule.lessons[numOfLessons - 1].name == currentLesson) {
            var dayScheduleNext = schedule[(0, DayOfWeek_1.getNextDayOfWeek)(dayOfWeek)];
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
                dayScheduleNext = schedule[(0, DayOfWeek_1.getNextDayOfWeek)(dayOfWeek)];
                if (dayScheduleNext != undefined) {
                    daySchedule = dayScheduleNext;
                    nextLessonOrder = 0;
                    break;
                }
            }
        }
        // var nextDayOfWeek = getNextDayOfWeek(dayOfWeek);
        // while (daySchedule.lessons.length <= 0) {
        //     const dayScheduleNext = schedule[nextDayOfWeek];
        //     nextDayOfWeek = getNextDayOfWeek(dayOfWeek);
        //     if (dayScheduleNext) {
        //         daySchedule = dayScheduleNext;
        //         break;
        //     }
        //     nextLessonOrder = 0;
        // }
        const nextLesson = daySchedule.lessons[nextLessonOrder]; //TODO: what current lesson is last lesson?? //no lessons in array with that index
        const nextLessonTitle = nextLesson.name;
        const timeUntilNextLesson = getTimeUntilSth(time, nextLesson.start_time);
        var nextLessonRoom = "";
        if ("place" in nextLesson.room) {
            nextLessonRoom = nextLesson.room.place;
        }
        else if ("places" in nextLesson.room.places) {
            nextLessonRoom = nextLesson.room.places[group[1]];
        }
        const lunch = daySchedule.lunch;
        const lunchTimeIn = getTimeUntilSth(time, lunch.start_time);
        var lunchResult;
        var lunchRoom;
        if (lunchTimeIn.min > 0 && lunchTimeIn.hour > 0) {
            lunchResult = "Lunch in: " + formateTime(lunchTimeIn.hour) + ":" + formateTime(lunchTimeIn.min);
            if ("place" in lunch.room) {
                lunchRoom = lunch.room.place;
            }
        }
        else if (lunchTimeIn.hour == 0 && (lunchTimeIn.min < 0 && lunchTimeIn.min > -15)) {
            lunchResult = "Lunch is now!!!";
        }
        else {
            lunchResult = "Lunch is over.";
        }
        var resultCurrent;
        var resultCurrentPressed;
        if (currentLesson == null && timeUntilNextLesson.hour >= 3) {
            resultCurrent = "Nothing is happening now or any time soon. Relax!";
            resultCurrentPressed = "Chill out \U0001F60A";
        } //if there is no lesson and it's not coming in then next 24 hours
        else if (currentLesson == null && lunchResult == "Lunch is now!!!") {
            resultCurrent = "Lunch. Hurry!";
            resultCurrentPressed = lunchRoom;
        }
        else if (currentLesson == null) {
            resultCurrent = "No lesson now";
            resultCurrentPressed = ""; //TODO
        }
        else {
            resultCurrent = "Current lesson: " + currentLesson;
            resultCurrentPressed = "Time left: " + formateTime(timeLeftTilEnd.hour) + ":" + formateTime(timeLeftTilEnd.min);
        }
        return {
            type: MainScreenType.SUCCESS,
            current_button: { title: "" + resultCurrent, titleIfPressed: "" + resultCurrentPressed },
            lunch_button: { title: "" + lunchResult, titleIfPressed: "" + lunchRoom },
            next_button: { title: "Next lesson: " + nextLessonTitle + ". The lesson starts in: " + formateTime(timeUntilNextLesson.hour) + ":" + formateTime(timeUntilNextLesson.min),
                titleIfPressed: "Room: " + nextLessonRoom } //TODO based on group
        };
    }
}
exports.MainScreenCalculator = MainScreenCalculator;
function getTimeUntilSth(currentTime, timeUntilSth) {
    const result = Object.assign({}, timeUntilSth);
    result.min = result.hour * 60 + result.min - currentTime.hour * 60 - currentTime.min;
    result.hour = 0;
    while (result.min >= 60) {
        result.hour++;
        result.min -= 60;
    }
    return result;
}
function formateTime(time) {
    if (time >= 10) {
        return time;
    }
    //var minFormatted = min.toString();
    if (time <= 9 && time >= 0) {
        var timeFormatted = "0" + time;
        return timeFormatted;
    }
}
var MainScreenType;
(function (MainScreenType) {
    MainScreenType["SUCCESS"] = "success";
    MainScreenType["ERROR"] = "error";
})(MainScreenType = exports.MainScreenType || (exports.MainScreenType = {}));
//# sourceMappingURL=mainScreenCalculator.js.map