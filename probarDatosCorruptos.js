import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { productosRespuesta } from './src/productoBase.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const archivoProductos = path.join(
  __dirname,
  'data',
  'productos.json'
)

const API_URL = 'http://localhost:3000/api/productos'

async function probarDatosCorruptos() {
  // Guardar el contenido original
  const contenidoOriginal = fs.readFileSync(
    archivoProductos,
    'utf-8'
  )

  try {
    // Introducir temporalmente un producto corrupto
    const productosCorruptos = [
      {
        id: 1,
        name: 'Leche',
        quantity: 'abc',
        category: 'Alimentacion'
      }
    ]

    fs.writeFileSync(
      archivoProductos,
      JSON.stringify(productosCorruptos, null, 2)
    )

    // Consultar la API
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error('No se pudo consultar la API')
    }

    const data = await response.json()

    // Validar la respuesta recibida
    const resultado = productosRespuesta.safeParse(data)

    if (resultado.success) {
      console.log('ERROR: No se ha detectado el dato corrupto')
      process.exitCode = 1
    } else {
      console.log('Dato corrupto detectado correctamente')
      console.log(resultado.error.issues)
    }
  } catch (error) {
    console.error('Error durante la prueba:', error.message)
    process.exitCode = 1
  } finally {
    // Restaurar el contenido original
    fs.writeFileSync(archivoProductos, contenidoOriginal)
    console.log('Archivo productos.json restaurado')
  }
}

probarDatosCorruptos()