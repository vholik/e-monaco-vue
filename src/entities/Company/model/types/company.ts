import type { ContactHistory } from '@/entities/ContactHistory'
import type { ContactPerson } from '@/entities/ContactPerson'
import type { Municipality } from '@/entities/Municipality'
import type { CompanyStatus } from '@/entities/Status'
import type { User } from '@/entities/User'

export interface Company {
    id: string
    nextContactDate: string
    contactHistories: ContactHistory[]
    owner: User
    comment?: string
    nip?: string
    name: string
    status: CompanyStatus
    municipality: Municipality
    tractorAmount?: number
    trailerAmount?: number
    tractor?: number
    trailer?: number
    otherAmount?: number
    activation?: number
    rentalFee?: number
    statement?: number
    contactPersons: ContactPerson[]
    markDeleted: boolean
    frugality: number
    theirstaxes: number
    ourtaxes: number
    supply: number
    taxincrease: number
    kitrate: number
    year: number
    full_name: string
    role: string
    phone: string
    email: string
    last_contact_date: string
    last_contact_comment: string
    campaignId: string | null
}
