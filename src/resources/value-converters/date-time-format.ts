import * as moment from 'moment';
export class DateTimeFormatValueConverter
{
    toView(value) {
        return moment.utc(value).local().format('D-M-YYYY HH:mm');
     }
}