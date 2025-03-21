export const articlesColumns = [
    { key: "articulo1", label: "ID" },
    { key: "descripcion", label: "Artículo" },
    { key: "categoria", label: "Categoría" },
    { key: "cantidad", label: "Cantidad" },
    {
      key: "precio",
      label: "Precio",
      render: (row) => `$${row.precio.toFixed(2)}`,
    },
    {
      key: "descuento",
      label: "Descuento",
      render: (row) => `$${row.descuento.toFixed(2)}`,
    },
    {
      key: "subtotal",
      label: "Subtotal",
      render: (row) => `$${row.subtotal.toFixed(2)}`,
    },
    {
      key: "impuesto",
      label: "Impuesto",
      render: (row) => `$${row.impuesto.toFixed(2)}`,
    },
    {
      key: "total",
      label: "Total",
      render: (row) => `$${row.total.toFixed(2)}`,
    },
    {
      key: "foto",
      label: "Imagen",
      render: (row) => (
        <div className="w-16 h-16 flex items-center justify-center">
          <img
            src={row.foto || "https://via.placeholder.com/150"}
            alt={`Imagen de ${row.descripcion}`}
            className="w-full h-full rounded-lg object-cover border border-gray-300"
          />
        </div>
      ),
    },
  ];
  