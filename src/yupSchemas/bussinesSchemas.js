import * as yup from 'yup'

const NameExpression = /^\S/
const RfcExpression = /^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/

export const createBussinesSchema = yup.object({
  email: yup
    .string()
    .email('El correo electronico ingresado es invalido')
    .required('El correo electronico es requerido')
    .trim(),
  bussinesName: yup
    .string()
    .min(3, 'El negocio debe tener minimo 3 caracteres')
    .max(30, 'El negocio debe tener un maximo de 30 caracteres')
    .matches(NameExpression, 'No esta permitido ingresar caracteres especiales')
    .required('El nombre del negocio es requerido'),
  bussinesRfc: yup
    .string()
    .min(12, 'El RFC debe tener minimo 12 caracteres')
    .matches(RfcExpression, 'Ingrese un RFC valido')
    .required('El RFC es requerido')
})

export const updateBussinesSchema = yup.object({
  email: yup
    .string()
    .email('El correo electronico ingresado es invalido')
    .required('El correo electronico es requerido')
    .trim(),
  bussinesName: yup
    .string()
    .min(3, 'El negocio debe tener minimo 3 caracteres')
    .max(30, 'El negocio debe tener un maximo de 30 caracteres')
    .matches(NameExpression, 'No esta permitido ingresar caracteres especiales')
    .required('El nombre del negocio es requerido'),
  bussinesRfc: yup
    .string()
    .min(12, 'El RFC debe tener minimo 12 caracteres')
    .matches(RfcExpression, 'Ingrese un RFC valido')
    .required('El RFC es requerido')
})
