// Models/Sidebar/SidebarModel.js
export const sidebarItems = [
    {
      title: "Dashboard",
      icon: "home",
      route: "/dashboard",
      submenus: [
        { title: "Resumen", route: "/dashboard/overview" },
        { title: "Reportes", route: "/dashboard/reports" },
      ],
    },
    {
      title: "Usuarios",
      icon: "users",
      route: "/usuarios",
      submenus: [],
    },
    {
      title: "Notificaciones",
      icon: "bell",
      route: "/notificaciones",
      submenus: [],
      badge: 3,
    },
    {
      title: "Configuración",
      icon: "settings",
      route: "/configuracion",
      submenus: [
        { title: "Perfil", route: "/configuracion/perfil" },
        { title: "Seguridad", route: "/configuracion/seguridad" },
      ],
    },
  ];
  