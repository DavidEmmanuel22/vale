import * as yup from 'yup'

export const mailValidation = yup.object({
  message: yup.string().required('Mensaje requerido').trim()
})
