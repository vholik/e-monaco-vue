import type { User } from '@/entities/User'

export interface CampaignSummary {
    ownerId: string | null
    suma_leadow: string
    pozostalo: string
    owner?: User
    przerobiono: string
    nie_odbiera: string
    nastepna_kampania: string
    rozmowy: string
    nowy_klient: string
    mala_oszczednosc: string
    brak_kontaktu: string
    dzialalnosc: string
    lokalny_patriota: string
    nie_target: string
    niezainteresowani: string
    tylko_leasing: string
    zrezygnowali: string
    negatywni: string
    inne: string
}
