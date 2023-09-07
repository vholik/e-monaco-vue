import * as yup from 'yup'

export const addCompanyValidationSchema = yup.object().shape({
    nextContactDate: yup.date(),
    comment: yup.string().max(500, 'Maksymalnie 500 liter'),
    nip: yup.string(),
    name: yup.string(),
})
