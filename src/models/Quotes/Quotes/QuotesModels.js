export const columnsQuotes = [
    {
      key: 'nombreCliente',
      accessorKey: 'nombreCliente',
      label: 'Cliente',
    },
    {
      key: 'correo',
      accessorKey: 'correo',
      label: 'Correo',
    },
    {
      key: 'tipoPago',
      accessorKey: 'tipoPago',
      label: 'Tipo de Pago',
    },
    {
      key: 'moneda',
      accessorKey: 'moneda',
      label: 'Moneda',
    },
    {
      key: 'subtotal',
      accessorKey: 'subtotal',
      label: 'Subtotal',
      cell: ({ row }) => `Q${row.original.total.toFixed(2)}`,
    },
    {
      key: 'descuentoTotal',
      accessorKey: 'descuentoTotal',
      label: 'Descuento',
      cell: ({ row }) => `Q${row.original.total.toFixed(2)}`,
    },   
    {
      key: 'total',
      accessorKey: 'total',
      label: 'Total',
      cell: ({ row }) => `Q${row.original.total.toFixed(2)}`,
    },
    {
      key: 'estado',
      accessorKey: 'estado',
      label: 'Estado',
    },
    {
      key: 'origen',
      accessorKey: 'origen',
      label: 'Bodega',
    },
    {
      key: 'fechaCreacion',
      accessorKey: 'fechaCreacion',
      label: 'Fecha de Creación',
    },
    {
      key: 'usuarioCreador',
      accessorKey: 'usuarioCreador',
      label: 'Creador',
    },
  ];

