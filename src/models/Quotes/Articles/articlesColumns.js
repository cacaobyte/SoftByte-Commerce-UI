export const articlesColumns = [
  { key: "articulo1", label: "ID" },
  { key: "descripcion", label: "Artículo" },
  { key: "categoria", label: "Categoría" },
  { key: "cantidad", label: "Cantidad" },
  {
    key: "precio",
    label: "Precio",
    render: (row) => `$${row.precio?.toFixed(2) || "0.00"}`,
  },
  {
    key: "descuento",
    label: "Descuento",
    render: (row) => (row.descuento ? `$${row.descuento.toFixed(2)}` : "No disponible"),
  },
  {
    key: "subtotal",
    label: "Subtotal",
    render: (row) => `$${row.subtotal?.toFixed(2) || "0.00"}`,
  },
  {
    key: "impuesto",
    label: "Impuesto",
    render: (row) => (row.impuesto ? `$${row.impuesto.toFixed(2)}` : "No disponible"),
  },
  {
    key: "total",
    label: "Total",
    render: (row) => `$${row.total?.toFixed(2) || "0.00"}`,
  },
];
