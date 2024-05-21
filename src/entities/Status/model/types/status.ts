export enum CompanyStatus {
    TO_BE_VERIFIED = 'to_be_verified', // DO WERYFIKACJI
    CALL_BACK = 'call_back', // ZADZWOŃ
    UNREACHABLE = 'unreachable', // BRAK KONTAKTU
    CONVERSATION = 'conversation', // ROZMOWY
    AGREEMENT = 'agreement', // UMOWA
    DOCUMENTS = 'documents', // DOKUMENTY
    NEW_CLIENT = 'new_client', // NOWY KLIENT
    OUR_CLIENT = 'our_client', // NASZ KLIENT
    NEXT_CAMPAIGN = 'next_campaign', // NASTĘPNA KAMPANIA
    LEASE_ONLY = 'lease_only', // TYLKO LEASING
    NOT_A_TARGET = 'not_a_target', // NIE TARGET
    NOT_INTERESTED = 'not_interested', // NIEZAINTERESOWANI
    ACTIVITY = 'activity', // DZIAŁALNOŚĆ
    RESIGNED = 'resigned', // ZREZYGNOWALI
    OFFER = 'offer', // OFERTA
    OTHER = 'other', // INNE
    LOCAL_PATRIOT = 'local_patriot', // LOKALNY PATRIOTA
    CANNOT_BE_CALLED = 'cannot_be_called', // NIE ODBIERA
    SMALL_SAVINGS = 'small_savings', // MAŁA OSZCZĘDNOŚĆ
}
