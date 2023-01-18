export enum DayOfWeek {
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
    SUNDAY = "sunday"
}
export enum LessonType {
    MATEMAATIKA = "matemaatika",
    MUUSIKAAJALUGU = "muusikaajalugu",
    AJALUGU = "ajalugu",
    TARKVARA_ARENDUS = "tarkvara arendus",
    EESTI_KEEL = "eesti keel",
    ARDUINO = "arduino",
    MATIK = "matik",
    BIOLOOGIA = "bioloogia",
    YHISKONNAOPETUS = "ühiskonnaõpetus",
    KIRJANDUS = "kirjandus",
    FYYSIKA = "füüsika",
    FYYSIKA_YLESANDED = "füüsika ülesanded",
    KUNSTIAJALUGU = "kunstiajalugu"
}

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
export type VhkGroup = {[subject: string]: string}; // MATH : G1
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
}

console.log(JSON.stringify(TwelveRSchedule));
