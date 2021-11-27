import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    dateNow(): Date {
        return dayjs().toDate();
    }
    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }
    compareInHours(start: Date, end: Date): number {
        const end_date_utc = this.convertToUtc(end);
        const start_date_utc = this.convertToUtc(start);
        return dayjs(end_date_utc).diff(start_date_utc, 'hours');
    }
}

export { DayjsDateProvider };
