"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwelveRSchedule = exports.RoomType = void 0;
const LessonType_1 = require("./LessonType");
const DayOfWeek_1 = require("./DayOfWeek");
var RoomType;
(function (RoomType) {
    RoomType["DEFAULT"] = "default";
    RoomType["GROUP"] = "group"; //create ENUM for groups
})(RoomType = exports.RoomType || (exports.RoomType = {}));
//TODO replace subject with enum
exports.TwelveRSchedule = {
    [DayOfWeek_1.DayOfWeek.MONDAY]: {
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
    [DayOfWeek_1.DayOfWeek.TUESDAY]: {
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
                name: LessonType_1.LessonType.ARDUINO,
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
                    place: "V216"
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
    [DayOfWeek_1.DayOfWeek.WEDNESDAY]: {
        lessons: [{
                name: LessonType_1.LessonType.MATIK,
                order: 0,
                start_time: {
                    hour: 8,
                    min: 45
                },
                end_time: {
                    hour: 10,
                    min: 0
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: "Kelder"
                }
            },
            {
                name: LessonType_1.LessonType.BIOLOOGIA,
                order: 1,
                start_time: {
                    hour: 10,
                    min: 15
                },
                end_time: {
                    hour: 11,
                    min: 30
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: "V212"
                }
            },
            {
                name: LessonType_1.LessonType.MATEMAATIKA,
                order: 2,
                start_time: {
                    hour: 11,
                    min: 45
                },
                end_time: {
                    hour: 13,
                    min: 0
                },
                room: {
                    type: RoomType.GROUP,
                    places: {
                        "G1": "V136",
                        "G2": "V212",
                        "G3": "V201"
                    }
                }
            },
            {
                name: LessonType_1.LessonType.YHISKONNAOPETUS,
                order: 3,
                start_time: {
                    hour: 13,
                    min: 15
                },
                end_time: {
                    hour: 14,
                    min: 15
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: "V212"
                }
            }],
        lunch: {
            start_time: {
                hour: 11,
                min: 30
            },
            end_time: {
                hour: 11,
                min: 45
            },
            room: {
                type: RoomType.DEFAULT,
                place: "vene suur söögisaal"
            }
        }
    },
    [DayOfWeek_1.DayOfWeek.THURSDAY]: {
        lessons: [{
                name: LessonType_1.LessonType.KIRJANDUS,
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
                    type: RoomType.GROUP,
                    places: {
                        "G1": "V136",
                        "G2": "V213"
                    }
                }
            },
            {
                name: LessonType_1.LessonType.AJALUGU,
                order: 1,
                start_time: {
                    hour: 10,
                    min: 45
                },
                end_time: {
                    hour: 11,
                    min: 45
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: "V136"
                }
            },
            {
                name: LessonType_1.LessonType.FYYSIKA,
                order: 2,
                start_time: {
                    hour: 12,
                    min: 15
                },
                end_time: {
                    hour: 13,
                    min: 15
                },
                room: {
                    type: RoomType.GROUP,
                    places: {
                        "G1": "V216",
                        "G2": "V201"
                    }
                }
            },
            {
                name: LessonType_1.LessonType.MATEMAATIKA,
                order: 3,
                start_time: {
                    hour: 13,
                    min: 30
                },
                end_time: {
                    hour: 14,
                    min: 30
                },
                room: {
                    type: RoomType.GROUP,
                    places: {
                        "G1": "V136",
                        "G2": "V212",
                        "G3": "V208"
                    }
                }
            }],
        lunch: {
            start_time: {
                hour: 11,
                min: 45
            },
            end_time: {
                hour: 12,
                min: 0
            },
            room: {
                type: RoomType.DEFAULT,
                place: "vene suur söögisaal"
            }
        }
    },
    [DayOfWeek_1.DayOfWeek.FRIDAY]: {
        lessons: [{
                name: LessonType_1.LessonType.FYYSIKA_YLESANDED,
                order: 0,
                start_time: {
                    hour: 10,
                    min: 30
                },
                end_time: {
                    hour: 12,
                    min: 0
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: "V136"
                }
            },
            {
                name: LessonType_1.LessonType.KUNSTIAJALUGU,
                order: 1,
                start_time: {
                    hour: 12,
                    min: 30
                },
                end_time: {
                    hour: 13,
                    min: 45
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: "V212"
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
    [DayOfWeek_1.DayOfWeek.SATURDAY]: {
        lessons: [{
                name: LessonType_1.LessonType.NADALAVAHETUS,
                order: 0,
                start_time: {
                    hour: 0,
                    min: 0
                },
                end_time: {
                    hour: 0,
                    min: 0
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: ""
                }
            }],
        lunch: {
            start_time: {
                hour: 0,
                min: 0
            },
            end_time: {
                hour: 0,
                min: 0
            },
            room: {
                type: RoomType.DEFAULT,
                place: ""
            }
        }
    },
    [DayOfWeek_1.DayOfWeek.SUNDAY]: {
        lessons: [{
                name: LessonType_1.LessonType.NADALAVAHETUS,
                order: 0,
                start_time: {
                    hour: 0,
                    min: 0
                },
                end_time: {
                    hour: 0,
                    min: 0
                },
                room: {
                    type: RoomType.DEFAULT,
                    place: ""
                }
            }],
        lunch: {
            start_time: {
                hour: 0,
                min: 0
            },
            end_time: {
                hour: 0,
                min: 0
            },
            room: {
                type: RoomType.DEFAULT,
                place: ""
            }
        }
    }
};
//console.log(JSON.stringify(TwelveRSchedule));
//# sourceMappingURL=ClassSchedule.js.map