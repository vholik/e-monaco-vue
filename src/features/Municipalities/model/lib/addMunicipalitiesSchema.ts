import * as yup from 'yup'

export const addMunicipalityValidationSchema = yup.object().shape({
    name: yup.string().required('Pole jest obowiązkowe'),
    tractorRate: yup
        .number()
        .typeError('Pole jest oboiązkowe')
        .min(0, 'Pole musi być powyżej 0')
        .required('Pole jest obowiązkowe'),
    trailerRate: yup
        .number()
        .typeError('Pole jest oboiązkowe')
        .min(0, 'Pole musi być powyżej 0')
        .required('Pole jest obowiązkowe'),
    otherRate: yup
        .number()
        .typeError('Pole jest oboiązkowe')
        .min(0, 'Pole musi być powyżej 0')
        .required('Pole jest obowiązkowe'),
    year: yup
        .number()
        .typeError('Pole jest oboiązkowe')
        .min(0, 'Pole musi być powyżej 0')
        .required('Pole jest obowiązkowe'),
    minTrailerRate: yup
        .number()
        .typeError('Pole jest oboiązkowe')
        .min(0, 'Pole musi być powyżej 0')
        .required('Pole jest obowiązkowe'),
    minTractorRate: yup
        .number()
        .typeError('Pole jest oboiązkowe')
        .min(0, 'Pole musi być powyżej 0')
        .required('Pole jest obowiązkowe'),
})
