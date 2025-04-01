// Models/Sidebar/SidebarModel.js
export const sidebarItems = [
  {
    title: "Home",
    icon: "bell",
    route: "/Home/welcome",
    submenus: [
      { title: "Panel General", route: "/Home/welcome" },
      { title: "Mi Empresa", route: "/Home/company" },
    ],
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
      { title: "Nueva Venta", route: "/sale/newSale" },
      { title: "Historial de Ventas", route: "/sale/invoice" },
      { title: "Facturas", route: "/sale/invoice" },
      { title: "Devoluciones", route: "/sale/returns" },
    ],
  },
  {
    title: "Cotizaciones",
    icon: "quote",
    route: "/quotes",
    submenus: [
      { title: "Nueva Cotizacion", route: "/sale/quotes/newQuotes" },
      { title: "Todas Las Cotizacion", route: "/sale/quotes/quotes" },
      { title: "Mi Tienda", route: "/sale/quotes/quotesStores" },
      { title: "Mis Cotizaciones", route: "/sale/quotes/myQuotes" },
      { title: "Estadisticas Cotizaciones", route: "/sale/quotes/quoteStatistics" },
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
      { title: "Lista de Clientes", route: "/clients/clientList/" },
      { title: "Clientes", route: "/clients/clients/" },
      { title: "Créditos", route: "/clientes/creditos" },
      { title: "Contactos", route: "/clients/contact/" },
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
      { title: "Perfil", route: "/setting/profile/" },
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
    title: "Recursos Humanos",
    icon: "rrhh",
    route: "/RRHH",
    submenus: [
      { title: "Recursos Humanos", route: "/RRHH" },
      { title: "Planilla", route: "/Planilla" },
      { title: "Boletas", route: "/Boletas" },
      { title: "Horas Extras", route: "/Extras" },
      { title: "Asistencia", route: "/Asistencia" }, 
      { title: "Permisos y Vacaciones", route: "/Permisos" }, 
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
  {
    title: "Gestión de Accesos",
    icon: "FaUsersViewfinder",
    route: "/admin/usuarios",
    submenus: [
      { title: "Perfiles de Usuario", route: "/Security/role/" },
      { title: "Opciones", route: "/Security/option" },
      { title: "Menu", route: "/Security/grouper" },
      { title: "Lista de Usuarios", route: "/Security/user/" },
      { title: "Asignar rol a usuario", route: "/Security/rolUsuario" },
      // { title: "Asignar rol a opción", route: "/Security/rolOption" },
      { title: "Asignar opción a usuario", route: "/Security/optionUser" },
      { title: "estado usuarios", route: "/Security/statusUsers" },
        // { title: "Asignar  acción a opción", route: "/Security/actionOption" },
     // { title: "Historial de Cambios", route: "/Security/historyChanges" },
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
];
