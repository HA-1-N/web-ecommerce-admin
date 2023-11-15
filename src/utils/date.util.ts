import dayjs from 'dayjs';

export const formatDate = (date: any, format: string, valueReturn = null) => {
  if (date) {
    return dayjs(date).format(format);
  }

  return valueReturn;
};
