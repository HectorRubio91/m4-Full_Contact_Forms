import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productoBase } from './productoBase'

export default function ProductoForm({ onAddProduct }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(productoBase),
    defaultValues: {
      name: '',
      quantity: 1,
      category: 'Alimentacion'
    }
  })

  async function enviarProducto(data) {
    try {
      await onAddProduct(data)
      reset()
    } catch (error) {

    }
  }

  return (
    <form onSubmit={handleSubmit(enviarProducto)} noValidate>
      <h2>Añadir producto</h2>

      <div>
        <label htmlFor="name">Nombre del producto</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />

        {errors.name && (
          <p id="name-error" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="quantity">Cantidad</label>
        <input
          id="quantity"
          type="number"
          {...register('quantity', { valueAsNumber: true })}
          aria-invalid={!!errors.quantity}
          aria-describedby={errors.quantity ? 'quantity-error' : undefined}
        />

        {errors.quantity && (
          <p id="quantity-error" role="alert">
            {errors.quantity.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          {...register('category')}
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? 'category-error' : undefined}
        >
          <option value="Alimentacion">Alimentacion</option>
          <option value="Limpieza">Limpieza</option>
          <option value="Higiene">Higiene</option>
          <option value="Animales">Animales</option>
          <option value="Otros">Otros</option>
        </select>

        {errors.category && (
          <p id="category-error" role="alert">
            {errors.category.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Añadir producto'}
      </button>
    </form>
  )
}