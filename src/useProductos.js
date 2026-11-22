import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { obtenerProductos, crearProducto } from './productoService'

// Consultar los productos
export function useProductos() {
  return useQuery({
    queryKey: ['productos'],
    queryFn: obtenerProductos
  })
}

// Añadir un producto
export function useAgregarProducto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: crearProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['productos']
      })
    }
  })
}