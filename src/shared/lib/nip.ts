export function validateNip(input: string) {
    const pattern =
        /^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{2}-[A-Za-z0-9]{2}$/
    return pattern.test(input)
}
