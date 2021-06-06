/* eslint-disable no-useless-escape */
import * as yup from 'yup'

export const contactValidation = yup.object({
  name: yup
    .string()

    .required('Nombre requerido')
    .matches(/^[a-zA-ZÀ-ÿñÑ\s]*$/, 'El nombre contiene caractéres invalidos')
    .min(3, 'Nombre debe contener por lo menos 3 letras'),
  email: yup
    .string()
    .email('Correo electrónico inválido')
    .required('Correo electrónico requerido'),
  phoneNumber: yup
    .string()
    .required('Número celular requerido')
    .length(10, 'Ingrese 10 números'),
  message: yup
    .string()
    .required('Mensaje requerido')
    .trim()
    .min(6, 'Mensaje debe contener por lo menos 6 letras')
})

export const loginValidation = yup.object({
  name: yup
    .string()
    .required('Nombre requerido')
    .matches(/^[a-zA-ZÀ-ÿñÑ\s]*$/, 'El nombre contiene caractéres invalidos')
    .min(3, 'Nombre debe contener por lo menos 3 letras'),
  email: yup
    .string()
    .email('Correo electrónico inválido')
    .required('Correo electrónico requerido'),
  phoneNumber: yup
    .string()
    .required('Número celular requerido')
    .length(10, 'Ingrese 10 números')
})
