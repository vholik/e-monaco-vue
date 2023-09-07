import { CompanyStatus } from '../types/status'

export const companyStatusMap = {
    [CompanyStatus.TO_BE_VERIFIED]: 'DO WERYFIKACJI',
    [CompanyStatus.CALL_BACK]: 'ZADZWOŃ',
    [CompanyStatus.UNREACHABLE]: 'NIE DODZWONIONO SIĘ',
    [CompanyStatus.CONVERSATION]: 'ROZMOWA',
    [CompanyStatus.AGREEMENT]: 'UMOWA',
    [CompanyStatus.DOCUMENTS]: 'DOKUMENTY',
    [CompanyStatus.DECLARATION]: 'DEKLARACJA',
    [CompanyStatus.NEW_CLIENT]: 'NOWY KLIENT',
    [CompanyStatus.OUR_CLIENT]: 'NASZ KLIENT',
    [CompanyStatus.NEXT_CAMPAIGN]: 'NASTĘPNA KAMPANIA',
    [CompanyStatus.CHEAP_MUNICIPALITY]: 'TANIA GMINA',
    [CompanyStatus.LEASE_ONLY]: 'TYLKO LEASING',
    [CompanyStatus.DID_IT_THEMSELVES]: 'SAMI ZROBILI',
    [CompanyStatus.NOT_A_TARGET]: 'NIE TARGET',
    [CompanyStatus.FEW_VEHICLES]: 'MAŁO POJAZDÓW',
    [CompanyStatus.CALL_BACK_AGAIN]: 'ODDZWONI',
    [CompanyStatus.NOT_INTERESTED]: 'NIEZAINTERESOWANY',
    [CompanyStatus.ACTIVITY]: 'DZIAŁALNOŚĆ',
    [CompanyStatus.DOESNT_EXIST]: 'NIE ISTNIEJE',
    [CompanyStatus.NO_NUMBER]: 'BRAK NUMERU',
    [CompanyStatus.OUR_MUNICIPALITY]: 'NASZA GMINA',
    [CompanyStatus.RESIGNED]: 'ZREZYGNOWAŁ',
    [CompanyStatus.SIGNED_AGREEMENT_AND_LEFT]: 'PODPISAŁ UMOWĘ I ZWIAŁ',
    [CompanyStatus.PARTNER]: 'PARTNER',
    [CompanyStatus.OTHER]: 'INNY',
}
