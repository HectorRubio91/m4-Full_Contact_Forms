const API_URL = '/api/productos'

export async function obtenerProductos() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Error al obtener los productos')
  }

  return response.json()
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

  return response.json()
}