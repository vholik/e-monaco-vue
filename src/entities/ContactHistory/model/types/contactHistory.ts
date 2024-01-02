import type { Company } from '@/entities/Company'
import type { User } from '@/entities/User'

export enum ContactResult {
    OK = 'ok',
    NOK = 'nok',
    NDS = 'nds',
    NK = 'nk',
    ZP = 'zp',
    ODZ = 'odz',
}

export interface ContactHistory {
    id: string
    contactDate: Date
    contactResult: ContactResult
    owner: User
    comment?: string
    company: Company
    createdAt: Date
}
