"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainScreenType = exports.MainScreenCalculator = void 0;
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
        const daySchedule = schedule[dayOfWeek];
        if (!daySchedule) {
            return {
                type: MainScreenType.ERROR,
                error: { title: "Undefined schedule for day: " + dayOfWeek }
            };
        }
        var currentLesson = "";
        var timeLeftTilEnd = {
            hour: 0,
            min: 0
        };
        var nextLessonOrder = 0;
        var currentTimeInMin = 0;
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
        const lunchTimeIn = getTimeUntilSth(time, lunch.start_time);
        var lunchResult;
        var lunchRoom;
        if (lunchTimeIn.min > 0 && lunchTimeIn.hour > 0) {
            lunchResult = "Lunch in: " + lunchTimeIn.hour + ":" + lunchTimeIn.min;
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
        if (currentLesson == null && timeUntilNextLesson.hour >= 24) {
            resultCurrent = "Nothing is happening now or any time soon. Relax!";
        } //if there is no lesson and it's not coming in then next 24 hours
        else {
            resultCurrent = "Current lesson: " + currentLesson;
            resultCurrentPressed = "Time left: " + timeLeftTilEnd.hour + ":" + timeLeftTilEnd.min;
        }
        return {
            type: MainScreenType.SUCCESS,
            current_button: { title: "" + resultCurrent, titleIfPressed: "" + resultCurrentPressed },
            lunch_button: { title: "" + lunchResult, titleIfPressed: "" + lunchRoom },
            next_button: { title: "Next lesson: " + nextLessonTitle + ". The lesson starts in: " + timeUntilNextLesson.hour + ":" + timeUntilNextLesson.min,
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
var MainScreenType;
(function (MainScreenType) {
    MainScreenType["SUCCESS"] = "success";
    MainScreenType["ERROR"] = "error";
})(MainScreenType = exports.MainScreenType || (exports.MainScreenType = {}));
//# sourceMappingURL=mainScreenCalculator.js.map