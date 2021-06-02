import * as yup from 'yup'

export const contactValidation = yup.object({
  name: yup.string().required('Nombre requerido'),
  email: yup
    .string()
    .email('Correo electrónico inválido')
    .required('Correo electrónico requerido'),
  phoneNumber: yup
    .string()
    .required('Número celular requerido')
    .length(10, 'Ingrese 10 números'),
  message: yup.string().required('Mensaje requerido')
})

export const loginValidation = yup.object({
  name: yup.string().required('Nombre requerido'),
  email: yup
    .string()
    .email('Correo electrónico inválido')
    .required('Correo electrónico requerido'),
  phoneNumber: yup
    .string()
    .required('Número celular requerido')
    .length(10, 'Ingrese 10 números')
})
