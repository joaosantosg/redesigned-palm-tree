import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

// ----------------------------------------------------------------------

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('pt-br');

// ----------------------------------------------------------------------

export type DatePickerFormat = Dayjs | Date | string | number | null | undefined;

/**
 * Docs: https://day.js.org/docs/en/display/format
 */
export const formatStr = {
  dateTime: 'DD/MM/YYYY HH:mm', // 17/04/2022 14:30
  date: 'DD/MM/YYYY', // 17/04/2022
  time: 'HH:mm', // 14:30
  split: {
    dateTime: 'DD/MM/YYYY HH:mm', // 17/04/2022 14:30
    date: 'DD/MM/YYYY', // 17/04/2022
  },
  paramCase: {
    dateTime: 'DD-MM-YYYY HH:mm', // 17-04-2022 14:30
    date: 'DD-MM-YYYY', // 17-04-2022
  },
};

export function today(format?: string) {
  return dayjs(new Date()).startOf('day').format(format);
}

// ----------------------------------------------------------------------

/** output: 17/04/2022 14:30
 */
export function fDateTime(date: DatePickerFormat, format?: string) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).format(format ?? formatStr.dateTime) : 'Data inválida';
}

// ----------------------------------------------------------------------

/** output: 17/04/2022
 */
export function fDate(date: DatePickerFormat, format?: string) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).format(format ?? formatStr.date) : 'Data inválida';
}

// ----------------------------------------------------------------------

/** output: 14:30
 */
export function fTime(date: DatePickerFormat, format?: string) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).format(format ?? formatStr.time) : 'Hora inválida';
}

// ----------------------------------------------------------------------

/** output: 1713250100
 */
export function fTimestamp(date: DatePickerFormat) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).valueOf() : 'Data inválida';
}

// ----------------------------------------------------------------------

/** output: há alguns segundos, há 2 anos
 */
export function fToNow(date: DatePickerFormat) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).toNow(true) : 'Data inválida';
}
