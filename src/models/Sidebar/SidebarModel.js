export const sidebarItems = [
    {
      title: "Dashboard",
      icon: "FaHome", // Pasaremos el nombre del icono como string
      route: "/dashboard",
      submenus: [
        { title: "Resumen", route: "/dashboard/overview" },
        { title: "Reportes", route: "/dashboard/reports" },
      ],
    },
    {
      title: "Usuarios",
      icon: "FaUser",
      route: "/usuarios",
      submenus: [],
    },
    {
      title: "Notificaciones",
      icon: "FaBell",
      route: "/notificaciones",
      submenus: [],
      badge: 3, // Notificaciones o indicadores
    },
    {
      title: "Configuración",
      icon: "FaCog",
      route: "/configuracion",
      submenus: [
        { title: "Perfil", route: "/configuracion/perfil" },
        { title: "Seguridad", route: "/configuracion/seguridad" },
      ],
    },
  ];
  