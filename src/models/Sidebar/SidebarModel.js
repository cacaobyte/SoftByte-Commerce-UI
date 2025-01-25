// Models/Sidebar/SidebarModel.js
export const sidebarItems = [
  {
    title: "Dashboard",
    icon: "home",
    route: "/dashboard",
    submenus: [
      { title: "Resumen", route: "/dashboard/overview" },
      { title: "Reportes", route: "/dashboard/reports" },
      { title: "Estadísticas", route: "/dashboard/statistics" },
    ],
  },
  {
    title: "Ventas",
    icon: "cash",
    route: "/ventas",
    submenus: [
      { title: "Nueva Venta", route: "/ventas/nueva" },
      { title: "Historial de Ventas", route: "/ventas/historial" },
      { title: "Facturas", route: "/ventas/facturas" },
    ],
  },
  {
    title: "Productos",
    icon: "box",
    route: "/productos",
    submenus: [
      { title: "Catálogo", route: "/productos/catalogo" },
      { title: "Inventario", route: "/productos/inventario" },
      { title: "Categorías", route: "/productos/categorias" },
      { title: "Proveedores", route: "/productos/proveedores" },
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
    ],
  },
  {
    title: "Usuarios",
    icon: "usersAdmin",
    route: "/admin/usuarios",
    submenus: [
      { title: "Administrar Roles", route: "/admin/usuarios/roles" },
      { title: "Permisos", route: "/admin/usuarios/permisos" },
    ],
  },
];
