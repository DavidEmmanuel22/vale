import * as yup from 'yup'

export const validateVale = yup.object({
    folio: yup
        .string()
        .required('El folio del vale es requerido')
        .length(24, 'El folio debe tener exactamente 24 digitos'),
    amount: yup
        .number('La cantidad a cobrar debe ser numerica')
        .required('La cantidad a cobrar es requerida')
        .positive('El monto a cobrar debe ser mayor a 0'),
    concept: yup
        .string()
        .required('El concepto de la venta es necesario')
        .min(3, 'El concepto de la venta debe tener minimo 3 caracteres')
        .max(500, 'El concepto de la venta debe tener menos de 500 caracteres')
})
