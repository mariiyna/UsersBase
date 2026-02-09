import dayjs from 'dayjs'

export const formatData = (date: string | Date | null | undefined): string => {
  if (!date) {
    return 'Неизвестно'
  }
  return dayjs(date).format('DD.MM.YYYY')
}