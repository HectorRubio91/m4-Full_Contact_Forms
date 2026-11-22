import { productosRespuesta, productoRespuesta } from './productoBase'

const API_URL = '/api/productos'

export async function obtenerProductos() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Error al obtener los productos')
  }

  const data = await response.json()

  const resultado = productosRespuesta.safeParse(data)

  if (!resultado.success) {
    throw new Error(
      'La API ha devuelto una lista de productos no valida: ' +
      resultado.error.issues[0].message
    )
  }

  return resultado.data
}

export async function crearProducto(producto) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al guardar el producto')
  }

  const data = await response.json()

  const resultado = productoRespuesta.safeParse(data)

  if (!resultado.success) {
    throw new Error(
      'La API ha devuelto un producto no valido: ' +
      resultado.error.issues[0].message
    )
  }

  return resultado.data
}