export function validatePhone(input: string): boolean {
    const pattern = /^[0-9]{9}$/
    return pattern.test(input)
}
