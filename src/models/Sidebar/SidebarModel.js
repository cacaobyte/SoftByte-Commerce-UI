// Models/Sidebar/SidebarModel.js
export const sidebarItems = [
  {
    title: "Home",
    icon: "bell",
    route: "/Home/elcome",
    submenus: [],
  },
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
    title: "Clasificación Productos",
    icon: "box",
    route: "/productos",
    submenus: [
     // { title: "Catálogo", route: "/productos/catalogo" },
      { title: "Categorías", route: "/product/categories/" },
      { title: "Subcategorías", route: "/product/subcategories" },
      { title: "Etiquetas", route: "/product/tags" },
      { title: "Clasificación", route: "/product/classification" },
    ],
  },
  {
    title: "Inventario",
    icon: "warehouse",
    route: "/inventario",
    submenus: [
      { title: "Artículos", route: "/Inventory/Articles/ViewArticles" },
      { title: "Nuevo artículo", route: "/Inventory/Articles/CreateArticles" },
   //   { title: "Recuento", route: "/inventario/tomar-inventario" },//Pendiente
      { title: "Regiones", route: "/Inventory/Regions/" },
      { title: "Bodegas", route: "/Inventory/Warehouse/warehouse" },
  //    { title: "Asignaciones", route: "/Inventory/Warehouse/assignWarehouse" },//Pendiente
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
      { title: "FAQs", route: "/support/faqs/" },
      { title: "Contacto", route: "/support/contact" },
      { title: "Guías", route: "/support/guia" },
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
