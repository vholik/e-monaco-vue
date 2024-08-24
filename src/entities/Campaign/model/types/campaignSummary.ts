import type { User } from '@/entities/User'

export interface CampaignSummary {
    ownerId: string | null
    owner?: User
    nowyKlient: number
    szansa: number
    wTrakcie: number
    negat: number
    naPozniej: number
    pozostalo: number
    przerobiono: number
    suma: number
    brakKontaktu: number
    dzialalnosc: number
    lokalnyPatriota: number
    nieIstnieje: number
    nieZainteresowani: number
    nieTarget: number
    tylkoLeasing: number
    malaOszczednosc: number
    nastepnaKampania: number
    zrezygnowali: number
}
