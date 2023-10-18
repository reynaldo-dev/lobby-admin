import * as moment from 'moment';
import 'moment/locale/es';

export function getFormattedDate(dateTime: string): string {
  moment.locale('es');

  let momentObj = moment(dateTime);

  let formattedDate: string = momentObj.format(
    'D [de] MMMM [del] YYYY, h:mm a'
  );

  return formattedDate;
}
