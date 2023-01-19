"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfWeek = exports.getNextDayOfWeek = exports.getDayOfWeek = void 0;
//enum, func get
function getDayOfWeek(dayOfWeek) {
    switch (dayOfWeek) {
        case 1: return DayOfWeek.MONDAY;
        case 2: return DayOfWeek.TUESDAY;
        case 3: return DayOfWeek.WEDNESDAY;
        case 4: return DayOfWeek.THURSDAY;
        case 5: return DayOfWeek.FRIDAY;
        case 6: return DayOfWeek.SATURDAY;
        case 0: return DayOfWeek.SUNDAY;
        default:
            throw new Error("Invalid day of week");
    }
}
exports.getDayOfWeek = getDayOfWeek;
function getNextDayOfWeek(dayOfWeek) {
    switch (dayOfWeek) {
        case DayOfWeek.MONDAY: return DayOfWeek.TUESDAY;
        case DayOfWeek.TUESDAY: return DayOfWeek.WEDNESDAY;
        case DayOfWeek.WEDNESDAY: return DayOfWeek.THURSDAY;
        case DayOfWeek.THURSDAY: return DayOfWeek.FRIDAY;
        case DayOfWeek.FRIDAY: return DayOfWeek.SATURDAY;
        case DayOfWeek.SATURDAY: return DayOfWeek.SUNDAY;
        case DayOfWeek.SUNDAY: return DayOfWeek.MONDAY;
        default:
            throw new Error("Invalid day of week");
    }
}
exports.getNextDayOfWeek = getNextDayOfWeek;
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["MONDAY"] = "monday";
    DayOfWeek["TUESDAY"] = "tuesday";
    DayOfWeek["WEDNESDAY"] = "wednesday";
    DayOfWeek["THURSDAY"] = "thursday";
    DayOfWeek["FRIDAY"] = "friday";
    DayOfWeek["SATURDAY"] = "saturday";
    DayOfWeek["SUNDAY"] = "sunday";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
//# sourceMappingURL=DayOfWeek%5D.js.map