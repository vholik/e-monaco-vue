import type { UserRoles } from '@/entities/User'

export interface SelectOption {
    id: string
    name: string
    color?: string
    bgColor?: string
    role?: UserRoles
}
