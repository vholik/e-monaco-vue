import type { Company } from '@/entities/Company'

export interface Rate {
    id: string
    year: number
    tractorRate: number
    trailerRate: number
    otherRate: number
}

export interface Municipality {
    id: string
    name: string
    companies: Company[]
    currentYearRate: Rate
    kitRate: number
}
