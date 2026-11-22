import { z } from 'zod'

export const productoBase = z.object({
  name: z.string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(40, 'El nombre no puede superar los 40 caracteres')
    .regex(
      /^[a-zA-ZñÑ ]+$/,
      'El nombre solo puede contener letras y espacios'
    )
    .refine(
      value => !/\s{2,}/.test(value),
      'No puedes utilizar varios espacios seguidos'
    ),

  quantity: z.number()
    .int('La cantidad debe ser un numero entero')
    .positive('La cantidad debe ser mayor que 0'),

  category: z.enum(
    ['Alimentacion', 'Limpieza', 'Higiene', 'Animales', 'Otros'],
    'Selecciona una categoria valida'
  )
})