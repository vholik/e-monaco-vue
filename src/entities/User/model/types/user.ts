import type { UserRoles } from './roles'

export interface User {
    id: string
    firstName: string
    lastName: string
    role: UserRoles
    email: string
    password: string
    refreshToken: string
    // TODO: change type
    contactHistories: unknown[]
}
