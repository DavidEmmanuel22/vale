import * as yup from 'yup'

const MIN_FIRST_NAME = 2
const MAX_FIRST_NAME = 35

const MIN_LAST_NAME = 2
const MAX_LAST_NAME = 35

export const updateUserSelfSchema = yup.object({
  firstName: yup
    .string()
    .required('El nombre es requerido')
    .min(
      MIN_FIRST_NAME,
      `El nombre debe tener al menos ${MIN_FIRST_NAME} caracteres`
    )
    .max(
      MAX_FIRST_NAME,
      `El nombre debe tener maximo ${MAX_FIRST_NAME} caracteres`
    ),
  lastName: yup
    .string()
    .required('El apellido es requerido')
    .min(
      MIN_LAST_NAME,
      `El apellido debe tener al menos ${MIN_LAST_NAME} caracteres`
    )
    .max(
      MAX_LAST_NAME,
      `El apellido debe tener maximo ${MAX_LAST_NAME} caracteres`
    )
})
