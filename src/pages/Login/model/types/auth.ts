export interface AuthData {
    email: string
    password: string
}

export interface AuthReponse {
    accessToken: string
    refreshToken: string
}
