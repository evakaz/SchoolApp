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
        var resultCurrent;
        var resultCurrentPressed;
        var isRecess = false;
        if ((currentLesson == null || currentLesson == "") && (time.hour < daySchedule.lessons[numOfLessons - 1].end_time.hour)) {
            resultCurrent = "Recess! The next lesson is starting soon.";
            resultCurrentPressed = "\U0001F972"; //TODO: find next lesson
            var minNextLessonOrder = daySchedule.lessons.length;
            for (let i = 0; i < numOfLessons; i++) {
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
        if (daySchedule.lessons[numOfLessons - 1].name == currentLesson) {
            var dayScheduleNext = schedule[(0, DayOfWeek_1.getNextDayOfWeek)(dayOfWeek)]; //gets the first lesson of next day
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
        const nextLesson = daySchedule.lessons[nextLessonOrder];
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
        const lunchTimeIn = getTimeUntilSth(time, lunch.start_time, true);
        var lunchResult;
        var lunchRoom;
        if (lunchTimeIn.min > 0 && lunchTimeIn.hour > 0) {
            lunchResult = "Lunch in: " + formatNumberAsTwoDigit(lunchTimeIn.hour) + ":" + formatNumberAsTwoDigit(lunchTimeIn.min);
            if ("place" in lunch.room) {
                lunchRoom = lunch.room.place;
            }
        }
        else if (lunchTimeIn.hour == 0 && (lunchTimeIn.min < 0 && lunchTimeIn.min > -15)) {
            lunchResult = "Lunch is now!!!";
            lunchRoom = lunch.room.place;
        }
        else {
            lunchResult = "Lunch is over.";
            lunchRoom = "\U0001F37D";
        }
        if (currentLesson == null && timeUntilNextLesson.hour >= 24) {
            resultCurrent = "Nothing is happening now or any time soon. Relax!";
            resultCurrentPressed = "Chill out \U0001F60A";
        }
        else if (lunchResult == "Lunch is now!!!" && isRecess) {
            resultCurrent = "Lunch. Hurry!";
            resultCurrentPressed = lunchRoom;
        }
        else if (currentLesson == null) {
            resultCurrent = "No lesson now";
            resultCurrentPressed = ""; //TODO
        }
        else if (!isRecess) {
            resultCurrent = "Current lesson: " + currentLesson;
            resultCurrentPressed = "Time left: " + formatNumberAsTwoDigit(timeLeftTilEnd.hour) + ":" + formatNumberAsTwoDigit(timeLeftTilEnd.min);
        }
        else {
            console.log("Huh?");
        }
        return {
            type: MainScreenType.SUCCESS,
            current_button: { title: "" + resultCurrent, titleIfPressed: "" + resultCurrentPressed },
            lunch_button: { title: "" + lunchResult, titleIfPressed: "" + lunchRoom },
            next_button: { title: "Next lesson: " + nextLessonTitle + ". The lesson starts in: " + formatNumberAsTwoDigit(timeUntilNextLesson.hour) + ":" + formatNumberAsTwoDigit(timeUntilNextLesson.min),
                titleIfPressed: "Room: " + nextLessonRoom } //TODO based on group
        };
    }
}
exports.MainScreenCalculator = MainScreenCalculator;
//TODO
function getTimeUntilSth(currentTime, timeUntilSth, isLunch) {
    const result = Object.assign({}, timeUntilSth);
    result.min = result.hour * 60 + result.min - currentTime.hour * 60 - currentTime.min;
    if (result.min < 0 && !isLunch) {
        result.min = (24 * 60 - (currentTime.hour * 60 + currentTime.min)) + timeUntilSth.hour * 60 + timeUntilSth.min;
    }
    result.hour = 0;
    while (result.min >= 60) {
        result.hour++;
        result.min -= 60;
    }
    return result;
}
function formatNumberAsTwoDigit(num) {
    return (num >= 10) ? String(num) : "0" + num;
}
var MainScreenType;
(function (MainScreenType) {
    MainScreenType["SUCCESS"] = "success";
    MainScreenType["ERROR"] = "error";
})(MainScreenType = exports.MainScreenType || (exports.MainScreenType = {}));
//# sourceMappingURL=mainScreenCalculator.js.map