export const formatAgeLabel = (str: string) => {
    const age = str.replace(/\D/g, '')
    return age ? `${age}+` : ''
}

export const formatTimeToHoursAndMinutes = (time: number) => {
    const hours = Math.floor(time / 60)
    const minutes = time % 60

    return `${hours} ч. ${minutes} мин.`
}
