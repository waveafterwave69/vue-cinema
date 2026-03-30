export const formatAgeLabel = (str: string) => {
    const age = str.replace(/\D/g, '')
    return age ? `${age}+` : ''
}
