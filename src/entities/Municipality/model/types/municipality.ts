export interface Municipality {
    id: string
    name: string
    taxIncrease: number
    tractorRate: number
    trailerRate: number
    otherRate: number
    // TODO change type
    companies: unknown[]
}
