import type { UserRoles } from '@/entities/User'
import type { info } from 'console'

export interface SelectOption {
    id: string
    name: string
    color?: string
    bgColor?: string
    role?: UserRoles
    info?: string
}
