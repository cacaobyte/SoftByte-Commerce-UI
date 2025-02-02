// Models/Sidebar/SidebarModel.js
export const sidebarItems = [
  {
    title: "Dashboard",
    icon: "RiDashboard3Fill",
    route: "/dashboard",
    submenus: [
      { title: "Resumen", route: "/dashboard/overview" },
      { title: "Reportes", route: "/dashboard/reports" },
      { title: "Estadísticas", route: "/dashboard/statistics" },
    ],
  },
  {
    title: "Ventas",
    icon: "FcSalesPerformance",
    route: "/ventas",
    submenus: [
      { title: "Nueva Venta", route: "/ventas/nueva" },
      { title: "Historial de Ventas", route: "/ventas/historial" },
      { title: "Facturas", route: "/ventas/facturas" },
      { title: "Devoluciones", route: "/ventas/devoluciones" },
    ],
  },
  {
    title: "Productos",
    icon: "box",
    route: "/productos",
    submenus: [
      { title: "Catálogo", route: "/productos/catalogo" },
      { title: "Categorías", route: "/productos/categorias" },
      { title: "Subcategorías", route: "/productos/subcategorias" },
      { title: "Etiquetas", route: "/productos/etiquetas" },
      { title: "Clasificación", route: "/productos/clasificacion" },
    ],
  },
  {
    title: "Inventario",
    icon: "warehouse",
    route: "/inventario",
    submenus: [
      { title: "Artículos", route: "/Articles/ViewArticles" },
      { title: "Nuevo artículo", route: "/Articles/CreateArticles" },
      { title: "Recuento", route: "/inventario/tomar-inventario" },
      { title: "Bodegas", route: "/Warehouse/warehouse" },
      { title: "Nueva bodega", route: "/Warehouse/newWarehouse" },
      { title: "Asignaciones", route: "/Warehouse/assignWarehouse" },
    ],
  },
  
  {
    title: "Clientes",
    icon: "users",
    route: "/clientes",
    submenus: [
      { title: "Lista de Clientes", route: "/clientes/lista" },
      { title: "Créditos", route: "/clientes/creditos" },
      { title: "Contactos", route: "/clientes/contactos" },
      { title: "Estadísticas", route: "/clientes/estadisticas" },
    ],
  },
  {
    title: "Notificaciones",
    icon: "bell",
    route: "/notificaciones",
    submenus: [],
    badge: 5,
  },
  {
    title: "Configuración",
    icon: "settings",
    route: "/configuracion",
    submenus: [
      { title: "Perfil", route: "/configuracion/perfil" },
      { title: "Seguridad", route: "/configuracion/seguridad" },
      { title: "Tienda", route: "/configuracion/tienda" },
      { title: "Impuestos", route: "/configuracion/impuestos" },
    ],
  },
  {
    title: "Reportes",
    icon: "chart",
    route: "/reportes",
    submenus: [
      { title: "Reporte de Ventas", route: "/reportes/ventas" },
      { title: "Reporte de Inventario", route: "/reportes/inventario" },
      { title: "Reporte de Clientes", route: "/reportes/clientes" },
      { title: "Reporte de Proveedores", route: "/reportes/proveedores" },
    ],
  },
  {
    title: "Cajas",
    icon: "cashRegister",
    route: "/cajas",
    submenus: [
      { title: "Apertura de Caja", route: "/cajas/apertura" },
      { title: "Cierre de Caja", route: "/cajas/cierre" },
      { title: "Movimientos", route: "/cajas/movimientos" },
      { title: "Historial de Cajas", route: "/cajas/historial" },
    ],
  },
  {
    title: "Soporte",
    icon: "help",
    route: "/soporte",
    submenus: [
      { title: "FAQs", route: "/soporte/faqs" },
      { title: "Tickets", route: "/soporte/tickets" },
      { title: "Contacto", route: "/soporte/contacto" },
      { title: "Guías", route: "/soporte/guias" },
    ],
  },
  {
    title: "Usuarios",
    icon: "FaUsersViewfinder",
    route: "/admin/usuarios",
    submenus: [
      { title: "Administrar Roles", route: "/admin/usuarios/roles" },
      { title: "Permisos", route: "/admin/usuarios/permisos" },
      { title: "Lista de Usuarios", route: "/admin/usuarios/lista" },
    ],
  },
  {
    title: "Facturación",
    icon: "billing",
    route: "/facturacion",
    submenus: [
      { title: "Emitir Factura", route: "/facturacion/emitir" },
      { title: "Facturas Pendientes", route: "/facturacion/pendientes" },
      { title: "Historial de Facturación", route: "/facturacion/historial" },
    ],
  },
];
