export const contactClientModel = [
    { key: "cliente1", label: "ID Cliente" }, // 🔹 Se ajusta a "cliente1" en minúsculas
    {
      key: "nombreCompleto",
      label: "Nombre Completo",
    },
    {
      key: "foto",
      label: "Foto",
      type: "image",
    },
    { key: "celular", label: "Celular" }, // 🔹 Se ajusta a "celular" en minúsculas
    { key: "celular2", label: "Celular Secundario" }, // 🔹 Se ajusta a "celular2" en minúsculas
    { key: "email", label: "Correo Electrónico" }, // 🔹 Se ajusta a "email" en minúsculas
    { key: "nacionalidad", label: "Nacionalidad" }, // 🔹 Se ajusta a "nacionalidad" en minúsculas
    {
      key: "notificar",
      label: "Recibe Notificaciones",
      type: "boolean", // 🔹 Se define como "boolean" para que el modal renderice CheckCircle / XCircle
    },
  ];
  