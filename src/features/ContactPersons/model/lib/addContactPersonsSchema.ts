import * as yup from 'yup'

export const addPersonsModalValidationSchema = yup
    .object()
    .shape({
        firstName: yup.string(),
        lastName: yup.string(),
        role: yup.string(),
        phone: yup.string().nullable(),
        email: yup.string().nullable(),
        companyId: yup.string().required('Pole jest obowiązkowe'),
        top: yup.boolean().default(false),
    })
    .test({
        test: function (values) {
            const { phone, email } = values
            if (!phone && !email) {
                return false
            }
            return true
        },
    })
