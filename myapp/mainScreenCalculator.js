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
        const daySchedule2 = schedule[dayOfWeek];
        if (!daySchedule2) {
            return {
                type: MainScreenType.ERROR,
                error: { title: "Undefined schedule for day: " + dayOfWeek }
            };
        }
        const daySchedule = Object.assign({}, daySchedule2);
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
        var timeUntilNextLesson = {
            hour: 0,
            min: 0
        };
        timeUntilNextLesson = getTimeUntilSth(time, nextLesson.start_time);
        var nextLessonRoom = "";
        if ("place" in nextLesson.room) {
            nextLessonRoom = nextLesson.room.place;
        }
        else if ("places" in nextLesson.room.places) {
            nextLessonRoom = nextLesson.room.places[group[1]];
        }
        const lunch = daySchedule.lunch;
        var lunchTime = {
            hour: 0,
            min: 0
        };
        lunchTime = getTimeUntilSth(time, lunch.start_time);
        return {
            type: MainScreenType.SUCCESS,
            current_button: { title: "Current lesson: " + currentLesson, titleIfPressed: "Time left: " + timeLeftTilEnd.hour + ":" + timeLeftTilEnd.min },
            lunch_button: { title: "Lunch in: ", titleIfPressed: "" },
            next_button: { title: "Next lesson: " + nextLessonTitle + ". The lesson starts in: " + timeUntilNextLesson.hour + ":" + timeUntilNextLesson.min,
                titleIfPressed: "Room: " + nextLessonRoom } //TODO based on group
        };
    }
}
exports.MainScreenCalculator = MainScreenCalculator;
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