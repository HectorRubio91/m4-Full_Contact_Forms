import { z } from 'zod'

export const productoBase = z.object({
  name: z.string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(40, 'El nombre no puede superar los 40 caracteres')
    .regex(
      /^[\p{L}]+(?: [\p{L}]+)*$/u,
      'El nombre solo puede contener letras y espacios simples'
    )
    .refine(
    value => !/\s{2,}/.test(value),
    'No puedes utilizar varios espacios seguidos'
    ),

  quantity: z.preprocess(
    value => value === '' || Number.isNaN(value) ? undefined : value,
    z.number({
      error: issue => issue.input === undefined
        ? 'La cantidad es obligatoria'
        : 'La cantidad debe ser un numero'
    })
      .int('La cantidad debe ser un numero entero')
      .positive('La cantidad debe ser mayor que 0')
  ),

  category: z.enum(
    ['Alimentacion', 'Limpieza', 'Higiene', 'Animales', 'Otros'],
    'Selecciona una categoria valida'
  )
})

// Esquema de un producto recibido desde la API
export const productoRespuesta = productoBase.extend({
  id: z.number().int().positive()
})

// Esquema de una lista de productos recibida desde la API
export const productosRespuesta = z.array(productoRespuesta)