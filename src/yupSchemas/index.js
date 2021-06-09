import * as yup from 'yup'

const MIN_FIRST_NAME = 2
const MAX_FIRST_NAME = 35

const MIN_LAST_NAME = 2
const MAX_LAST_NAME = 35

export const updateUserSelfSchema = yup.object({
  firstName: yup
    .string()
    .trim('Sin espacios al principio')
    .required('El nombre es requerido')
    .min(
      MIN_FIRST_NAME,
      `El nombre debe tener al menos ${MIN_FIRST_NAME} caracteres`
    )
    .max(
      MAX_FIRST_NAME,
      `El nombre debe tener maximo ${MAX_FIRST_NAME} caracteres`
    )
    .matches(/^[a-zA-ZÀ-ÿñÑ\s]*$/, 'Nombre invalido'),
  lastName: yup
    .string()
    .trim()
    .required('El apellido es requerido')
    .min(
      MIN_LAST_NAME,
      `El apellido debe tener al menos ${MIN_LAST_NAME} caracteres`
    )
    .max(
      MAX_LAST_NAME,
      `El apellido debe tener maximo ${MAX_LAST_NAME} caracteres`
    )
    .matches(/^[a-zA-ZÀ-ÿñÑ\s]*$/, 'Apellido invalido')
})

export const addCreditSchema = yup.object({
  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('El correo electrónico es invalido'),
  credits: yup
    .number()
    .positive('Credito es requerido')
    .required('El crédito es requerido')
})
