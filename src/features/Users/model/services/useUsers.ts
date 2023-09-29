import axios from 'axios'

interface NewUser {
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
}
const createUser = async (newUser: NewUser): Promise<void> => {
    try {
        const response = await axios.post(
            'https://sea-lion-app-r5tih.ondigitalocean.app/authentication/signup',
            newUser,
        )

        if (response.status === 201) {
            console.log('Użytkownik został pomyślnie dodany.')
        } else {
            console.error(
                `Błąd podczas dodawania użytkownika. Status: ${response.status}`,
            )
        }
    } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error.message)
    }
}

const newUser: NewUser = {
    firstName: 'Imię',
    lastName: 'Nazwisko',
    email: 'jan.kowalski@gmail.com',
    password: 'silneHaslo',
    role: 'user',
}

createUser(newUser)
