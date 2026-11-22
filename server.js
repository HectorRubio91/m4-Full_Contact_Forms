import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { productoBase } from './src/productoBase.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const archivoProductos = path.join(__dirname, 'data', 'productos.json')

function leerProductos() {
  const data = fs.readFileSync(archivoProductos, 'utf-8')
  return JSON.parse(data)
}

function guardarProductos(productos) {
  fs.writeFileSync(archivoProductos, JSON.stringify(productos, null, 2))
}

app.get('/api/productos', (req, res) => {
  try {
    const productos = leerProductos()
    res.json(productos)
  } catch (error) {
    res.status(500).json({ message: 'Error al leer los productos' })
  }
})

app.post('/api/productos', (req, res) => {
  const result = productoBase.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      message: 'Los datos del producto no son validos',
      errors: result.error.issues
    })
  }

  try {
    const productos = leerProductos()

    const nuevoProducto = {
      id: productos.length > 0
        ? Math.max(...productos.map(producto => producto.id)) + 1
        : 1,
      ...result.data
    }

    productos.push(nuevoProducto)
    guardarProductos(productos)

    res.status(201).json(nuevoProducto)
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el producto' })
  }
})

app.delete('/api/productos/:id', (req, res) => {
  try {
    const productos = leerProductos()
    const id = Number(req.params.id)

    const indice = productos.findIndex(
      producto => producto.id === id
    )

    if (indice === -1) {
      return res.status(404).json({
        message: 'No se ha encontrado el producto'
      })
    }

    const productoEliminado = productos[indice]

    productos.splice(indice, 1)
    guardarProductos(productos)

    res.json(productoEliminado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el producto'
    })
  }
})

app.listen(PORT, () => {
  console.log(`API funcionando en http://localhost:${PORT}`)
})