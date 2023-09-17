import { isValidDateFormat } from '@/shared/lib/date'
import { validateNip } from '@/shared/lib/nip'
import * as yup from 'yup'

yup.addMethod(yup.string, 'nip', function (errorMessage) {
    return this.test(`nip`, errorMessage, function (value) {
        return value ? validateNip(value) : true
    })
})

export const addCompanyValidationSchema = yup.object().shape({
    nextContactDate: yup.date(),
    ownerId: yup.string().nullable(),
    comment: yup.string(),
    // @ts-ignore
    nip: yup.string().nip('NIP musi mieć format XXX-XXX-XX-XX').nullable(),
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
