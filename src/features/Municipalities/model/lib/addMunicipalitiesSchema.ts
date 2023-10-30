import * as yup from 'yup'

export const addMunicipalityValidationSchema = yup.object().shape({
    name: yup.string().required('Pole jest obowiązkowe'),
    taxIncrease: yup
        .number()
        .integer()
        .min(0, 'Pole musi być powyżej 0')
        .nullable(),
    tractorRate: yup
        .number()
        .integer()
        .min(0, 'Pole musi być powyżej 0')
        .nullable(),
    trailerRate: yup
        .number()
        .integer()
        .min(0, 'Pole musi być powyżej 0')
        .nullable(),
    kitRate: yup
        .number()
        .integer()
        .min(0, 'Pole musi być powyżej 0')
        .nullable(),
    otherRate: yup
        .number()
        .integer()
        .min(0, 'Pole musi być powyżej 0')
        .nullable(),
})
