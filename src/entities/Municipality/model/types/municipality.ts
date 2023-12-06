import type { Company } from '@/entities/Company'

export interface Rate {
    id: string
    year: number
    tractorRate: number
    trailerRate: number
    otherRate: number
    minTrailerRate: number
    minTractorRate: number
}

export interface Municipality {
    id: string
    name: string
    companies: Company[]
    currentYearRate: Rate
    kitrate: number
    taxincrease: number
}
