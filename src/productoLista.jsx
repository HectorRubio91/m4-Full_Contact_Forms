export default function ProductoLista({
  productos,
  onDeleteProduct,
  eliminando
}) {
  return (
    <section>
      <h2>Productos guardados</h2>

      {productos.length === 0 ? (
        <p>No hay productos en la lista.</p>
      ) : (
        <ul>
          {productos.map(producto => (
            <li key={producto.id}>
              <strong>{producto.name}</strong>
              {' - '}
              Cantidad: {producto.quantity}
              {' - '}
              Categoria: {producto.category}
              {' '}

              <button
                type="button"
                onClick={() => onDeleteProduct(producto.id)}
                disabled={eliminando}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}