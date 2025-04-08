export const departamentModelInputs = [
  {
    key: "nombreDepartamento",
    label: "Nombre del Departamento",
    type: "text",
    required: true,
    minLength: 2,
    maxLength: 100,
    placeholder: "Ej. Finanzas",
  },
  {
    key: "descripcion",
    label: "Descripción",
    type: "text",
    required: false,
    maxLength: 255,
    placeholder: "Breve descripción",
  },
  {
    key: "ubicacionFisica",
    label: "Ubicación Física",
    type: "select",
    required: true,
    options: [
      { value: "Oficina", label: "Oficina" },
      { value: "Remoto", label: "Remoto" },
      { value: "Edificio Central", label: "Edificio Central" },
      { value: "Sucursal", label: "Sucursal" },
      { value: "Otro", label: "Otro" },
    ],
  },
  {
    key: "correoContacto",
    label: "Correo de Contacto",
    type: "email",
    required: true,
    placeholder: "correo@ejemplo.com",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validación básica de correo
  },
  {
    key: "telefono",
    label: "Teléfono",
    type: "text",
    required: false,
    maxLength: 15,
    placeholder: "Ej. 45671234"
  },
  {
    key: "extensionTelefonica",
    label: "Extensión Telefónica",
    type: "text",
    required: false,
    maxLength: 10,
  },
  {
    key: "estado",
    label: "Estado",
    type: "select",
    required: true,
    options: [
      { value: "Activo", label: "Activo" },
      { value: "Inactivo", label: "Inactivo" },
    ],
  },
  {
    key: "observaciones",
    label: "Observaciones",
    type: "text",
    required: false,
    maxLength: 250,
    placeholder: "Observaciones adicionales o notas importantes",
  },
];
