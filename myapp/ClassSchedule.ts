import {LessonType} from "./LessonType";
import {DayOfWeek} from "./DayOfWeek";

export interface VhkDay {
    lessons: Lesson[];
    lunch: Lunch;
}

export interface VhkTime {
    hour: number; //check if valid?
    min: number;
}

export enum RoomType {
    DEFAULT = "default",
    GROUP = "group" //create ENUM for groups
}

export type Room = RoomDefault | RoomGroup; //create ENUM for rooms

export interface RoomDefault {
    type: RoomType.DEFAULT;
    place: string;
}

export interface RoomGroup {
    type: RoomType.GROUP;
    places: {[key in string]: string};
}

export interface Lesson {
    name: LessonType;
    order: number, //TODO
    start_time: VhkTime;
    end_time: VhkTime;
    room: Room;
}

export interface Lunch {
    start_time: VhkTime;
    end_time: VhkTime;
    room: RoomDefault;
}

export type ClassSchedule = {[k in DayOfWeek]?: VhkDay};
export type VhkGroup = {[subject: string]: string}; // MATH : G1 //add to interface!
//TODO replace subject with enum

export const TwelveRSchedule: ClassSchedule = {
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

        },
        {
            name: LessonType.AJALUGU,
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
            name: LessonType.TARKVARA_ARENDUS,
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
            name: LessonType.EESTI_KEEL,
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
            name: LessonType.ARDUINO,
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
    [DayOfWeek.WEDNESDAY]: {
        lessons: [{
            name: LessonType.MATIK,
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
            name: LessonType.BIOLOOGIA,
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
            name: LessonType.MATEMAATIKA,
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
            name: LessonType.YHISKONNAOPETUS,
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
    [DayOfWeek.THURSDAY]: {
        lessons: [{
            name: LessonType.KIRJANDUS,
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
            name: LessonType.AJALUGU,
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
            name: LessonType.FYYSIKA,
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
            name: LessonType.MATEMAATIKA,
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
    [DayOfWeek.FRIDAY]: {
        lessons: [{
            name: LessonType.FYYSIKA_YLESANDED,
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
            name: LessonType.KUNSTIAJALUGU,
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
    [DayOfWeek.SATURDAY]: {
        lessons: [{
            name: LessonType.NADALAVAHETUS,
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
    [DayOfWeek.SUNDAY]: {
        lessons: [{
            name: LessonType.NADALAVAHETUS,
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
}

//console.log(JSON.stringify(TwelveRSchedule));
