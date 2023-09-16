import { isValidDateFormat } from '@/shared/lib/date'
import * as yup from 'yup'

export const addCompanyValidationSchema = yup.object().shape({
    nextContactDate: yup
        .mixed()
        .test('isValidDate', 'Data jest nieprawidłowa', (value) => {
            if (!value) return true
            return isValidDateFormat(value as string)
        }),
    ownerIds: yup.array().of(yup.string().required()).nullable(),
    comment: yup.string(),
    nip: yup
        .string()
        .matches(/^\d{10}$/i, 'NIP musi mieć 10 cyfr')
        .nullable(),
    name: yup.string().required('Pole jest obowiązkowe'),
    status: yup.string().nullable(),
    municipalityId: yup.string().required('Pole jest obowiązkowe'),
    tractorAmount: yup.number().integer().min(0).nullable(),
    trailerAmount: yup.number().integer().min(0).nullable(),
    otherAmount: yup.number().integer().min(0).nullable(),
    activation: yup.number().integer().min(0).nullable(),
    rentalFee: yup.number().min(0).nullable(),
    statement: yup.number().min(0).nullable(),
    contactPersonsIds: yup.array().of(yup.string()).nullable(),
})
