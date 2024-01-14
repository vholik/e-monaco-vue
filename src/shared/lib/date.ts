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

export function formatDateLikeFacebook(date: Date): string | undefined {
    const now = new Date()
    // @ts-ignore
    const diffInMilliseconds = now - date
    const seconds = Math.floor(diffInMilliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days >= 7) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }

        // @ts-ignore
        return date.toLocaleDateString('pl-PL', options)
    } else if (days >= 2) {
        return `${days} dni temu`
    } else if (days === 1) {
        const hoursAgo = hours % 24
        if (hoursAgo === 0) {
            return `Wczoraj`
        } else {
            return `Wczoraj`
        }
    } else if (hours >= 2) {
        return `${hours} godzin temu`
    } else if (hours === 1) {
        return `Godzinę temu`
    } else if (minutes >= 4) {
        return `${minutes} minut temu`
    } else if (minutes === 1) {
        return `Minutę temu`
    } else {
        return `Właśnie teraz`
    }
}
