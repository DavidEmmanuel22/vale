import * as yup from 'yup'

const MIN_FIRST_NAME = 2
const MAX_FIRST_NAME = 35

const MIN_LAST_NAME = 2
const MAX_LAST_NAME = 35

export const updateUserSelfSchema = yup.object({
  firstName: yup
    .string()
    .trim('No se permiten espacios al inicio o final')
    .required()
    .min(
      MIN_FIRST_NAME,
      `El nombre debe tener al menos ${MIN_FIRST_NAME} caracteres`
    )
    .max(
      MAX_FIRST_NAME,
      `El nombre debe tener al menos ${MAX_FIRST_NAME} caracteres`
    ),
  lastName: yup
    .string()
    .trim('No se permiten espacios al inicio o final')
    .required()
    .min(
      MIN_LAST_NAME,
      `El apellido debe tener al menos ${MIN_LAST_NAME} caracteres`
    )
    .max(
      MAX_LAST_NAME,
      `El apellido debe tener al menos ${MAX_LAST_NAME} caracteres`
    )
})
