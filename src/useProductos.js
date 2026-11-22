import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import {
  obtenerProductos,
  crearProducto,
  eliminarProducto
} from './productoService'

// Clave compartida para las consultas de productos
export const PRODUCTOS_QUERY_KEY = ['productos']

// Consultar los productos
export function useProductos() {
  return useQuery({
    queryKey: PRODUCTOS_QUERY_KEY,
    queryFn: obtenerProductos
  })
}

// Añadir un producto
export function useAgregarProducto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: crearProducto,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: PRODUCTOS_QUERY_KEY
      })
    }
  })
}

// Eliminar un producto
export function useEliminarProducto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: eliminarProducto,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: PRODUCTOS_QUERY_KEY
      })
    }
  })
}