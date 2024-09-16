import type { User } from '@/entities/User'

export interface CampaignSummary {
    ownerId: string | null
    owner?: User
    suma: number
    pozostalo: number
    nieOdbiera: number
    przerobiono: number
    malaOszczednosc: number
    odpada: number
    nadajeSie: number
    nastepnaKampania: number
    negat: number
    rozmowy: number
    proces: number
    nowyKlient: number
    brakKontaktu: number
    dzialalnosc: number
    nieIstnieje: number
    nieTarget: number
    tylkoLeasing: number
    nieZainteresowani: number
    lokalnyPatriota: number
}
