import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    compareInDays(start: Date, end: Date): number {
        const endConvert = this.convertToUtc(end);
        const startConvert = this.convertToUtc(start);
        const compare = dayjs(endConvert).diff(startConvert, 'day', true);
        return compare;
    }
    dateNow(): Date {
        return dayjs().toDate();
    }
    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }
    compareInHours(start: Date, end: Date): number {
        const endConvert = this.convertToUtc(end);
        const startConvert = this.convertToUtc(start);
        const compare = dayjs(endConvert).diff(startConvert, 'hours', true);
        return compare;
    }
    addDays(days: number): Date {
        return dayjs().add(days, 'days').toDate();
    }
}

export { DayjsDateProvider };
