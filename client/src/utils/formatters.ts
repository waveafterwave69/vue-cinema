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

export const formatAge = (age: number) => {
    const lastDigit = Number(String(age).at(-1))

    if (age >= 11 && age <= 15) {
        return `${age} лет`
    }

    if (lastDigit === 1) {
        return `${age} год`
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${age} года`
    }

    return `${age} лет`
}
