import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';
const FULL_DATE_FORMAT = `${DATE_FORMAT} HH:mm`;
const TIME_ZONE_FORMAT_HOUR = -5;

export const getDateFormat = (date: string) => dayjs(date).format();

export const dateFormat = (date: string) => dayjs(date).format(DATE_FORMAT);

export const getFullDateFormat = (date: string) => dayjs(date).format(FULL_DATE_FORMAT);

export const getPaymentDate = (date: string, hour = TIME_ZONE_FORMAT_HOUR) =>
  dayjs(date).add(hour, 'hours').format(FULL_DATE_FORMAT);

export const timeFormatDate = (date: string) =>
  dayjs(date).add(5, 'hours').format(FULL_DATE_FORMAT);

export const uszFormatPrice = (price: number) => {
  const formatPrice = new Intl.NumberFormat('uz-Uz', {
    style: 'decimal',
  }).format(price);

  return formatPrice;
};
