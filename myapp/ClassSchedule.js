"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwelveRSchedule = exports.RoomType = exports.DayOfWeek = void 0;
const LessonType_1 = require("./LessonType");
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
var RoomType;
(function (RoomType) {
    RoomType["DEFAULT"] = "default";
    RoomType["GROUP"] = "group"; //create ENUM for groups
})(RoomType = exports.RoomType || (exports.RoomType = {}));
//TODO replace subject with enum
exports.TwelveRSchedule = {
    [DayOfWeek.MONDAY]: {
        lessons: [{
                name: LessonType_1.LessonType.MATEMAATIKA,
                order: 0,
                start_time: {
                    hour: 9,
                    min: 15
                },
                end_time: {
                    hour: 10,
                    min: 30
                },
                room: {
                    type: RoomType.GROUP,
                    places: {
                        "G1": "V136",
                        "G2": "AUD",
                        "G3": "V201"
                    }
                }
            },
            {
                name: LessonType_1.LessonType.MUUSIKAAJALUGU,
                order: 1,
                start_time: {
                    hour: 10,
                    min: 45
                },
                end_time: {
                    hour: 12,
                    min: 0
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: "AUD"
                }
            },
            {
                name: LessonType_1.LessonType.AJALUGU,
                order: 2,
                start_time: {
                    hour: 12,
                    min: 45
                },
                end_time: {
                    hour: 14,
                    min: 0
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: "V213"
                }
            }],
        lunch: {
            start_time: {
                hour: 12,
                min: 15
            },
            end_time: {
                hour: 12,
                min: 30
            },
            room: {
                type: RoomType.DEFAULT,
                place: "vene suur söögisaal"
            }
        }
    },
    [DayOfWeek.TUESDAY]: {
        lessons: [{
                name: LessonType_1.LessonType.TARKVARA_ARENDUS,
                order: 0,
                start_time: {
                    hour: 9,
                    min: 0
                },
                end_time: {
                    hour: 10,
                    min: 30
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: "V133"
                }
            },
            {
                name: LessonType_1.LessonType.EESTI_KEEL,
                order: 1,
                start_time: {
                    hour: 10,
                    min: 45
                },
                end_time: {
                    hour: 12,
                    min: 15
                },
                room: {
                    type: RoomType.GROUP,
                    places: {
                        "G1": "V214",
                        "G2": "V302",
                        "G3": "V133"
                    }
                }
            },
            {
                name: LessonType_1.LessonType.AJALUGU,
                order: 2,
                start_time: {
                    hour: 12,
                    min: 45
                },
                end_time: {
                    hour: 14,
                    min: 0
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: "V213"
                }
            }],
        lunch: {
            start_time: {
                hour: 12,
                min: 15
            },
            end_time: {
                hour: 12,
                min: 30
            },
            room: {
                type: RoomType.DEFAULT,
                place: "vene suur söögisaal"
            }
        }
    },
};
console.log(JSON.stringify(exports.TwelveRSchedule));
//# sourceMappingURL=ClassSchedule.js.map