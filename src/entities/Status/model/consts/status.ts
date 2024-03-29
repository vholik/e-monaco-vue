import type { SelectOption } from '@/shared/ui/Select/types'
import { CompanyStatus } from '../types/status'

export const companyStatusMap = {
    [CompanyStatus.TO_BE_VERIFIED]: 'DO WERYFIKACJI',
    [CompanyStatus.CALL_BACK]: 'ZADZWOŃ',
    [CompanyStatus.UNREACHABLE]: 'NIE DODZ. SIĘ',

    [CompanyStatus.DOESNT_ANSWER]: 'NIE ODBIERA',
    [CompanyStatus.CANNOT_BE_CALLED]: 'NIE DA SIĘ DODZ.',
    [CompanyStatus.CONVERSATION]: 'ROZMOWA',
    [CompanyStatus.AGREEMENT]: 'UMOWA',
    [CompanyStatus.DOCUMENTS]: 'DOKUMENTY',
    [CompanyStatus.DECLARATION]: 'DEKLARACJA',
    [CompanyStatus.NEW_CLIENT]: 'NOWY KLIENT',
    [CompanyStatus.OUR_CLIENT]: 'NASZ KLIENT',
    [CompanyStatus.NEXT_CAMPAIGN]: 'NAST. KAMPANIA',
    [CompanyStatus.CHEAP_MUNICIPALITY]: 'TANIA GMINA',
    [CompanyStatus.LEASE_ONLY]: 'TYLKO LEASING',
    [CompanyStatus.DID_IT_THEMSELVES]: 'SAMI ZROBILI',
    [CompanyStatus.NOT_A_TARGET]: 'NIE TARGET',
    [CompanyStatus.FEW_VEHICLES]: 'MAŁO POJAZDÓW',
    [CompanyStatus.CALL_BACK_AGAIN]: 'ODDZWONI',
    [CompanyStatus.NOT_INTERESTED]: 'NIEZAINTERES.',
    [CompanyStatus.ACTIVITY]: 'DZIAŁALNOŚĆ',
    [CompanyStatus.DOESNT_EXIST]: 'NIE ISTNIEJE',
    [CompanyStatus.NO_NUMBER]: 'BRAK NUMERU',
    [CompanyStatus.OUR_MUNICIPALITY]: 'NASZA GMINA',
    [CompanyStatus.RESIGNED]: 'ZREZYGNOWAŁ',
    [CompanyStatus.SIGNED_AGREEMENT_AND_LEFT]: 'POD. UMOW. I ZWIAŁ',
    [CompanyStatus.PARTNER]: 'PARTNER',
    [CompanyStatus.OFFER]: 'OFERTA',
    [CompanyStatus.OTHER]: 'INNY',
    [CompanyStatus.LOCAL_PATRIOT]: 'LOKALNY PATRIOTA',
}

export const options: SelectOption[] = [
    {
        id: CompanyStatus.TO_BE_VERIFIED,
        name: companyStatusMap[CompanyStatus.TO_BE_VERIFIED],
        bgColor: 'var(--status-green-bg-color)',
        color: 'var(--status-green-color)',
    },
    {
        id: CompanyStatus.CALL_BACK,
        name: companyStatusMap[CompanyStatus.CALL_BACK],
        bgColor: 'var(--status-orange-bg-color)',
        color: 'var(--status-orange-color)',
    },
    {
        id: CompanyStatus.UNREACHABLE,
        name: companyStatusMap[CompanyStatus.UNREACHABLE],
        bgColor: 'var(--status-orange-bg-color)',
        color: 'var(--status-orange-color)',
    },
    {
        id: CompanyStatus.CONVERSATION,
        name: companyStatusMap[CompanyStatus.CONVERSATION],
        bgColor: 'var( --status-red-bg-color)',
        color: 'var( --status-red-color)',
    },
    {
        id: CompanyStatus.AGREEMENT,
        name: companyStatusMap[CompanyStatus.AGREEMENT],
        bgColor: 'var(--status-blue-bg-color)',
        color: 'var(--status-blue-color)',
    },
    {
        id: CompanyStatus.DOCUMENTS,
        name: companyStatusMap[CompanyStatus.DOCUMENTS],
        bgColor: 'var(--status-grey-bg-color)',
        color: 'var(--status-grey-color)',
    },
    {
        id: CompanyStatus.DECLARATION,
        name: companyStatusMap[CompanyStatus.DECLARATION],
        bgColor: 'var(--status-green-bg-color)',
        color: 'var(--status-green-color)',
    },
    {
        id: CompanyStatus.NEW_CLIENT,
        name: companyStatusMap[CompanyStatus.NEW_CLIENT],
        bgColor: 'var(--status-orange-bg-color)',
        color: 'var(--status-orange-color)',
    },
    {
        id: CompanyStatus.OUR_CLIENT,
        name: companyStatusMap[CompanyStatus.OUR_CLIENT],
        bgColor: 'var( --status-red-bg-color)',
        color: 'var( --status-red-color)',
    },
    {
        id: CompanyStatus.NEXT_CAMPAIGN,
        name: companyStatusMap[CompanyStatus.NEXT_CAMPAIGN],
        bgColor: 'var(--status-blue-bg-color)',
        color: 'var(--status-blue-color)',
    },
    {
        id: CompanyStatus.CHEAP_MUNICIPALITY,
        name: companyStatusMap[CompanyStatus.CHEAP_MUNICIPALITY],
        bgColor: 'var(--status-grey-bg-color)',
        color: 'var(--status-grey-color)',
    },
    {
        id: CompanyStatus.LEASE_ONLY,
        name: companyStatusMap[CompanyStatus.LEASE_ONLY],
        bgColor: 'var(--status-green-bg-color)',
        color: 'var(--status-green-color)',
    },
    {
        id: CompanyStatus.DID_IT_THEMSELVES,
        name: companyStatusMap[CompanyStatus.DID_IT_THEMSELVES],
        bgColor: 'var(--status-orange-bg-color)',
        color: 'var(--status-orange-color)',
    },
    {
        id: CompanyStatus.NOT_A_TARGET,
        name: companyStatusMap[CompanyStatus.NOT_A_TARGET],
        bgColor: 'var(--status-blue-bg-color)',
        color: 'var(--status-blue-color)',
    },
    {
        id: CompanyStatus.FEW_VEHICLES,
        name: companyStatusMap[CompanyStatus.FEW_VEHICLES],
        bgColor: 'var(--status-grey-bg-color)',
        color: 'var(--status-grey-color)',
    },
    {
        id: CompanyStatus.OFFER,
        name: companyStatusMap[CompanyStatus.OFFER],
        bgColor: 'var(--status-grey-bg-color)',
        color: 'var(--status-grey-color)',
    },
    {
        id: CompanyStatus.CALL_BACK_AGAIN,
        name: companyStatusMap[CompanyStatus.CALL_BACK_AGAIN],
        bgColor: 'var(--status-green-bg-color)',
        color: 'var(--status-green-color)',
    },
    {
        id: CompanyStatus.NOT_INTERESTED,
        name: companyStatusMap[CompanyStatus.NOT_INTERESTED],
        bgColor: 'var(--status-orange-bg-color)',
        color: 'var(--status-orange-color)',
    },
    {
        id: CompanyStatus.ACTIVITY,
        name: companyStatusMap[CompanyStatus.ACTIVITY],
        bgColor: 'var(--status-blue-bg-color)',
        color: 'var(--status-blue-color)',
    },
    {
        id: CompanyStatus.DOESNT_EXIST,
        name: companyStatusMap[CompanyStatus.DOESNT_EXIST],
        bgColor: 'var( --status-red-bg-color)',
        color: 'var( --status-red-color)',
    },
    {
        id: CompanyStatus.NO_NUMBER,
        name: companyStatusMap[CompanyStatus.NO_NUMBER],
        bgColor: 'var(--status-orange-bg-color)',
        color: 'var(--status-orange-color)',
    },
    {
        id: CompanyStatus.OUR_MUNICIPALITY,
        name: companyStatusMap[CompanyStatus.OUR_MUNICIPALITY],
        bgColor: 'var(--status-blue-bg-color)',
        color: 'var(--status-blue-color)',
    },
    {
        id: CompanyStatus.RESIGNED,
        name: companyStatusMap[CompanyStatus.RESIGNED],
        bgColor: 'var(--status-grey-bg-color)',
        color: 'var(--status-grey-color)',
    },
    {
        id: CompanyStatus.SIGNED_AGREEMENT_AND_LEFT,
        name: companyStatusMap[CompanyStatus.SIGNED_AGREEMENT_AND_LEFT],
        bgColor: 'var( --status-red-bg-color)',
        color: 'var( --status-red-color)',
    },
    {
        id: CompanyStatus.PARTNER,
        name: companyStatusMap[CompanyStatus.PARTNER],
        bgColor: 'var(--status-green-bg-color)',
        color: 'var(--status-green-color)',
    },
    {
        id: CompanyStatus.OTHER,
        name: companyStatusMap[CompanyStatus.OTHER],
        bgColor: 'var(--status-blue-bg-color)',
        color: 'var(--status-blue-color)',
    },
    {
        id: CompanyStatus.LOCAL_PATRIOT,
        name: companyStatusMap[CompanyStatus.LOCAL_PATRIOT],
        bgColor: 'var(--status-blue-bg-color)',
        color: 'var(--status-blue-color)',
    },
    {
        id: CompanyStatus.DOESNT_ANSWER,
        name: companyStatusMap[CompanyStatus.DOESNT_ANSWER],
        bgColor: 'var(--status-red-bg-color)',
        color: 'var(--status-red-color)',
    },
    {
        id: CompanyStatus.CANNOT_BE_CALLED,
        name: companyStatusMap[CompanyStatus.CANNOT_BE_CALLED],
        bgColor: 'var(--status-red-bg-color)',
        color: 'var(--status-orange-color)',
    },
]
