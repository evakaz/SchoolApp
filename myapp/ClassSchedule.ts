export enum DayOfWeek {
    MONDAY = "monday"
    // TUESDAY = "tuesday",
    // WEDNESDAY = "wednesday",
    // THURSDAY = "thursday",
    // FRIDAY = "friday"
}

export enum LessonType {
    MATEMAATIKA = "matemaatike"
}

export interface Day {
    lessons: Lesson[];
}

export interface LessonTime {
    hour: number;
    min: number;
}

export enum RoomType {
    DEFAULT = "default",
    GROUP = "group"
}

export type Room = RoomDefault | RoomGroup;

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
    start_time: LessonTime;
    end_time: LessonTime;
    room: Room;
}

type ClassSchedule = {[k in DayOfWeek]: Day};

const ex: ClassSchedule = {
    [DayOfWeek.MONDAY]: {
        lessons: [{
            name: LessonType.MATEMAATIKA,
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
                    "G1": "A123"
                }
            }
        }],
    }
}

console.log(JSON.stringify(ex));
