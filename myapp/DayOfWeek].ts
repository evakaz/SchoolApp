//enum, func get
export function getDayOfWeek(dayOfWeek: number): DayOfWeek {
    switch (dayOfWeek) {
        case 1: return DayOfWeek.MONDAY;
        case 2: return DayOfWeek.TUESDAY;
        case 3: return DayOfWeek.WEDNESDAY;
        case 4: return DayOfWeek.THURSDAY;
        case 5: return DayOfWeek.FRIDAY;
        case 6: return DayOfWeek.SATURDAY;
        case 0: return DayOfWeek.SUNDAY;
        default:
            throw new Error("Invalid day of week")
    }
}

export function getNextDayOfWeek(dayOfWeek: DayOfWeek): DayOfWeek {
    switch (dayOfWeek) {
        case DayOfWeek.MONDAY: return DayOfWeek.TUESDAY;
        case DayOfWeek.TUESDAY: return DayOfWeek.WEDNESDAY;
        case DayOfWeek.WEDNESDAY: return DayOfWeek.THURSDAY;
        case DayOfWeek.THURSDAY: return DayOfWeek.FRIDAY;
        case DayOfWeek.FRIDAY: return DayOfWeek.SATURDAY;
        case DayOfWeek.SATURDAY: return DayOfWeek.SUNDAY;
        case DayOfWeek.SUNDAY: return DayOfWeek.MONDAY;
        default:
            throw new Error("Invalid day of week")
    }
}

export enum DayOfWeek {
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
    SUNDAY = "sunday"
}