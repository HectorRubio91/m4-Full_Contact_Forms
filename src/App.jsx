import ProductoForm from './ProductoForm'

export default function App() {
  async function agregarProducto(producto) {
    console.log('Producto validado:', producto)
  }

  return (
    <main>
      <h1>Mi Lista de la Compra</h1>

      <ProductoForm onAddProduct={agregarProducto} />
    </main>
  )
}
