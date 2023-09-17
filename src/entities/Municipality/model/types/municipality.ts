import type { Company } from '@/entities/Company'

export interface Municipality {
    id: string
    name: string
    taxIncrease: number
    tractorRate: number
    trailerRate: number
    otherRate: number
    companies: Company[]
    kitRate: number
}
