interface IDateProvider {
    compareInHours(start: Date, end: Date): number;
    convertToUtc(date: Date): string;
    dateNow(): Date;
}

export { IDateProvider };
