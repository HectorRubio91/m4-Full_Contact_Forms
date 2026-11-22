import { useEffect, useState } from 'react'

import ProductoForm from './productoForm'
import ProductoLista from './productoLista'

import {
  useProductos,
  useAgregarProducto
} from './useProductos'

export default function App() {
  const {
    data: productos = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useProductos()

  const agregarMutation = useAgregarProducto()

  const [mostrarExito, setMostrarExito] = useState(false)

  // Ocultar el mensaje de exito despues de 3 segundos
  useEffect(() => {
    if (!mostrarExito) {
      return
    }

    const temporizador = setTimeout(() => {
      setMostrarExito(false)
    }, 3000)

    return () => clearTimeout(temporizador)
  }, [mostrarExito])

  async function agregarProducto(producto) {
    setMostrarExito(false)
    await agregarMutation.mutateAsync(producto)
    setMostrarExito(true)
  }

  return (
    <main>
      <h1>Mi Lista de la Compra</h1>

      <ProductoForm onAddProduct={agregarProducto} />

      {mostrarExito && (
        <p role="status">
          Producto añadido correctamente.
        </p>
      )}

      <section>
        {isLoading && (
          <p>Cargando productos...</p>
        )}

        {isError && (
          <div>
            <p role="alert">
              Error al cargar los productos: {error.message}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? 'Reintentando...' : 'Reintentar'}
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <ProductoLista productos={productos} />
        )}
      </section>
    </main>
  )
}
