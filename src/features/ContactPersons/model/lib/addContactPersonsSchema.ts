import * as yup from 'yup'

export const addContactPersonsModalValidationSchema = yup.object().shape({
    firstName: yup.string().required('Pole jest obowiązkowe'),
    lastName: yup.string().required('Pole jest obowiązkowe'),
    role: yup.string().required('Pole jest obowiązkowe'),
    phone: yup.string().required('Pole jest obowiązkowe'),
    email: yup
        .string()
        .email('Podaj poprawny adres e-mail')
        .required('Pole jest obowiązkowe'),
})
