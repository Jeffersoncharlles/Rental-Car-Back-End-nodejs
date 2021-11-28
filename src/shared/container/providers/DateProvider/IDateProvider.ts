interface IDateProvider {
    compareInHours(start: Date, end: Date): number;
    convertToUtc(date: Date): string;
    dateNow(): Date;
    compareInDays(start: Date, end: Date): number;
}

export { IDateProvider };
