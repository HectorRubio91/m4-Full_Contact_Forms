import { useEffect, useState } from 'react'

import ProductoForm from './productoForm'
import ProductoLista from './productoLista'

import {
  useProductos,
  useAgregarProducto,
  useEliminarProducto
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
  const eliminarMutation = useEliminarProducto()

  const [mostrarExito, setMostrarExito] = useState(false)
  const [errorEliminar, setErrorEliminar] = useState('')

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

  async function eliminarProducto(id) {
    setErrorEliminar('')

    const confirmar = window.confirm(
      '¿Estas seguro de que quieres eliminar este producto?'
    )

    if (!confirmar) {
      return
    }

    try {
      await eliminarMutation.mutateAsync(id)
    } catch (error) {
      setErrorEliminar(
        error.message || 'No se pudo eliminar el producto'
      )
    }
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
          <>
            {errorEliminar && (
              <p role="alert">
                Error al eliminar el producto: {errorEliminar}
              </p>
            )}

            <ProductoLista
              productos={productos}
              onDeleteProduct={eliminarProducto}
              eliminando={eliminarMutation.isPending}
            />
          </>
        )}
      </section>
    </main>
  )
}
