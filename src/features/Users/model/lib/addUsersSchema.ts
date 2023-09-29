import * as yup from 'yup'

export const addUsersModalValidationSchema = yup.object().shape({
    firstName: yup.string().required('Pole jest obowiązkowe'),
    lastName: yup.string().required('Pole jest obowiązkowe'),
    email: yup
        .string()
        .email('Podaj poprawny adres e-mail')
        .required('Pole jest obowiązkowe'),
    password: yup
        .string()
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .required('Pole jest obowiązkowe'),
    role: yup.string().required('Pole jest obowiązkowe'),
})
