import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';
const FULL_DATE_FORMAT = `${DATE_FORMAT} HH:mm`;

export const getDateFormat = (date: string) => dayjs(date).format();

export const dateFormat = (date: string) => dayjs(date).format(DATE_FORMAT);

export const getFullDateFormat = (date: string) => dayjs(date).format(FULL_DATE_FORMAT);

export const getPaymentDate = (date: string, hour: number) => dayjs(date).add(hour, 'hours').format(FULL_DATE_FORMAT);
