import * as yup from 'yup'

export const addPersonsModalValidationSchema = yup.object().shape({
    firstName: yup.string().required('Pole jest obowiązkowe'),
    lastName: yup.string(),
    role: yup.string(),
    phone: yup.string().required('Pole jest obowiązkowe'),
    email: yup
        .string()
        .email('Podaj poprawny adres e-mail')
        .required('Pole jest obowiązkowe'),
    top: yup.boolean().default(false),
})
