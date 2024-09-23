import { isValidDateFormat } from '@/shared/lib/date'
import { validateNip } from '@/shared/lib/nip'
import * as yup from 'yup'

yup.addMethod(yup.string, 'nip', function (errorMessage) {
    return this.test(`nip`, errorMessage, function (value) {
        return value ? validateNip(value) : true
    })
})

export const addCompanyValidationSchema = yup.object().shape({
    nextContactDate: yup.date().nullable(),
    ownerId: yup.string().nullable(),
    comment: yup.string().max(500, 'Pole musi mieć poniżej 500 znaków'),
    // @ts-ignore
    nip: yup.string().nip('NIP musi mieć format XXX-XXX-XX-XX').nullable(),
    name: yup.string().required('Pole gmina jest obowiązkowe'),
    status: yup.string().nullable(),
    municipalityId: yup.string().required('Pole gmina jest obowiązkowe'),

    tractorAmount: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? 0 : value))
        .integer()
        .min(0, 'Pole musi być powyżej 0')
        .default(0),

    trailerAmount: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? 0 : value))
        .integer()
        .min(0, 'Pole musi być powyżej 0')
        .default(0),

    otherAmount: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? 0 : value))
        .integer()
        .min(0, 'Pole musi być powyżej 0')
        .default(0),

    activation: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? 0 : value))
        .integer()
        .min(0, 'Pole musi być powyżej 0')
        .default(0),

    rentalFee: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? 0 : value))
        .min(0, 'Pole musi być powyżej 0')
        .default(0),

    statement: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? 0 : value))
        .min(0, 'Pole musi być powyżej 0')
        .default(0),

    firstName: yup.string().nullable().optional(),
    lastName: yup.string().nullable().optional(),
    email: yup
        .string()
        .email('Nieprawidłowy format email')
        .nullable()
        .optional(),
    phone: yup.string().nullable().optional(),
    role: yup.string().nullable().optional(),
})
