export const isValidDateFormat = (dateString: string) => {
    const datePattern = /^\d{1,2}\.\d{1,2}\.\d{4}$/

    if (!datePattern.test(dateString)) {
        return false
    }

    const [, month] = dateString.split('.').map(Number)

    if (month < 1 || month > 12) {
        return false
    }

    return true
}
