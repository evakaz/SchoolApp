"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwelveRSchedule = exports.RoomType = exports.LessonType = exports.DayOfWeek = void 0;
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
var LessonType;
(function (LessonType) {
    LessonType["MATEMAATIKA"] = "matemaatika";
    LessonType["MUUSIKAAJALUGU"] = "muusikaajalugu";
    LessonType["AJALUGU"] = "ajalugu";
    LessonType["TARKVARA_ARENDUS"] = "tarkvara arendus";
    LessonType["EESTI_KEEL"] = "eesti keel";
    LessonType["ARDUINO"] = "arduino";
    LessonType["MATIK"] = "matik";
    LessonType["BIOLOOGIA"] = "bioloogia";
    LessonType["YHISKONNAOPETUS"] = "\u00FChiskonna\u00F5petus";
    LessonType["KIRJANDUS"] = "kirjandus";
    LessonType["FYYSIKA"] = "f\u00FC\u00FCsika";
    LessonType["FYYSIKA_YLESANDED"] = "f\u00FC\u00FCsika \u00FClesanded";
    LessonType["KUNSTIAJALUGU"] = "kunstiajalugu";
})(LessonType = exports.LessonType || (exports.LessonType = {}));
var RoomType;
(function (RoomType) {
    RoomType["DEFAULT"] = "default";
    RoomType["GROUP"] = "group"; //create ENUM for groups
})(RoomType = exports.RoomType || (exports.RoomType = {}));
//TODO replace subject with enum
exports.TwelveRSchedule = {
    [DayOfWeek.MONDAY]: {
        lessons: [{
                name: LessonType.MATEMAATIKA,
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
                name: LessonType.MUUSIKAAJALUGU,
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
            }],
        lunch: {
            start_time: {
                hour: 12,
                min: 30
            },
            end_time: {
                hour: 13,
                min: 15
            },
            room: {
                type: RoomType.DEFAULT,
                place: "vene suur söögisaal"
            }
        }
    }
};
console.log(JSON.stringify(exports.TwelveRSchedule));
//# sourceMappingURL=ClassSchedule.js.map