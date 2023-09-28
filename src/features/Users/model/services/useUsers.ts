// import axios library
import axios from 'axios'

// define interface for user data
interface UserData {
    // define the structure based on the actual response
    // adjust it based on the actual response from the server
    id: number
    name: string
    email: string
    // ... other fields
}

// define function to fetch user data
const fetchUsers = async (): Promise<UserData[]> => {
    try {
        // make GET request to /users endpoint
        const response = await axios.get(
            'https://sea-lion-app-r5tih.ondigitalocean.app/users',
        )

        // check if the response status is 200 (OK)
        if (response.status === 200) {
            // parse the response data as an array of UserData
            const userData: UserData[] = response.data
            return userData
        } else {
            // handle other response statuses
            console.error(`Unexpected response status: ${response.status}`)
            return []
        }
    } catch (error) {
        // handle errors during the request
        console.error('Error fetching user data:', error.message)
        return []
    }
}

// example usage
fetchUsers()
    .then((userData) => {
        console.log('User data:', userData)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
