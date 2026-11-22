import {
  productosRespuesta,
  productoRespuesta
} from './productoBase'

const API_URL = '/api/productos'

// Obtener el mensaje de error aunque la respuesta no sea JSON
async function obtenerMensajeError(response, mensajePorDefecto) {
  const texto = await response.text()

  try {
    const data = JSON.parse(texto)
    return data.message || mensajePorDefecto
  } catch {
    return texto || mensajePorDefecto
  }
}

// Obtener todos los productos
export async function obtenerProductos() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    const mensaje = await obtenerMensajeError(
      response,
      'Error al obtener los productos'
    )

    throw new Error(mensaje)
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

// Guardar un producto nuevo
export async function crearProducto(producto) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })

  if (!response.ok) {
    const mensaje = await obtenerMensajeError(
      response,
      'Error al guardar el producto'
    )

    throw new Error(mensaje)
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

// Eliminar un producto
export async function eliminarProducto(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    const mensaje = await obtenerMensajeError(
      response,
      'Error al eliminar el producto'
    )

    throw new Error(mensaje)
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