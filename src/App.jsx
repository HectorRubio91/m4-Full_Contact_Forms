import ProductoForm from './ProductoForm'
import ProductoLista from './ProductoLista'
import { useProductos, useAgregarProducto } from './useProductos'

export default function App() {
  const {
    data: productos = [],
    isLoading,
    isError,
    error
  } = useProductos()

  const agregarMutation = useAgregarProducto()

  async function agregarProducto(producto) {
    await agregarMutation.mutateAsync(producto)
  }

  return (
    <main>
      <h1>Mi Lista de la Compra</h1>

      <ProductoForm onAddProduct={agregarProducto} />

      {agregarMutation.isSuccess && (
        <p role="status">Producto añadido correctamente.</p>
      )}

      {agregarMutation.isError && (
        <p role="alert">{agregarMutation.error.message}</p>
      )}

      <section>
        {isLoading && <p>Cargando productos...</p>}

        {isError && (
          <p role="alert">
            Error al cargar los productos: {error.message}
          </p>
        )}

        {!isLoading && !isError && (
          <ProductoLista productos={productos} />
        )}
      </section>
    </main>
  )
}
