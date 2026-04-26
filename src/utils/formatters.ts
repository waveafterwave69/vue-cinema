export const formatAgeLabel = (str: string) => {
    const age = str.replace(/\D/g, '')
    return age ? `${age}+` : ''
}

export const formatTimeToHoursAndMinutes = (time: number) => {
    const hours = Math.floor(time / 60)
    const minutes = time % 60

    return `${hours} ч. ${minutes} мин.`
}

export const firstLetterUpCase = (text: string) => {
    return text[0]?.toUpperCase() + text.slice(1)
}

export const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}
