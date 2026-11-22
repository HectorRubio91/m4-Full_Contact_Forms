import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const archivoProductos = path.join(__dirname, 'data', 'productos.json')

const productoBase = z.object({
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

  category: z.enum(['Alimentacion', 'Limpieza', 'Higiene', 'Animales', 'Otros'])
})

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

app.listen(PORT, () => {
  console.log(`API funcionando en http://localhost:${PORT}`)
})