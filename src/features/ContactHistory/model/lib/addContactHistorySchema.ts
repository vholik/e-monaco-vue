import * as yup from 'yup'

export const addCompanyHistorySchema = yup.object().shape({
    contactDate: yup.date().nullable(),
    comment: yup.string().nullable(),
    result: yup.string().nullable(),
})
