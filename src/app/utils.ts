/**
 * Method to get the current date in the format such as: "17 Sep 2014" if the date is longer than 24h from the current date
 * or "18h" or "1min" or "30sec" if the date is less than 24h from the current date
 */
export const getFormattedDate = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 24) {
    return `${date.getDate()} ${date.toLocaleString('default', {
        month: 'short'
        })} ${date.getFullYear()}`
  } else if (minutes > 60) {
    return `${hours}h`
  } else if (seconds > 60) {
    return `${minutes}min`
  } else {
    return `${seconds}sec`
  }
}
