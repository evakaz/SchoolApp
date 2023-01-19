import {LessonType} from "./LessonType";
import {DayOfWeek} from "./DayOfWeek]";

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
}

console.log(JSON.stringify(TwelveRSchedule));
