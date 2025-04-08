export const departamentModelInputs = [
    {
      key: "nombreDepartamento",
      label: "Nombre del Departamento",
      type: "text",
      required: true,
      minLength: 2,
      maxLength: 100,
      placeholder: "Ej. Finanzas"
    },
    {
      key: "descripcion",
      label: "Descripción",
      type: "text",
      required: false,
      maxLength: 255,
      placeholder: "Breve descripción"
    },
    {
      key: "codigoDepartamento",
      label: "Código",
      type: "text",
      required: false,
      maxLength: 20,
      placeholder: "Ej. DPT-01"
    },
    {
      key: "ubicacionFisica",
      label: "Ubicación Física",
      type: "text",
      required: false,
      maxLength: 100
    },
    {
      key: "correoContacto",
      label: "Correo de Contacto",
      type: "email",
      required: false,
      placeholder: "correo@ejemplo.com"
    },
    {
      key: "extensionTelefonica",
      label: "Extensión Telefónica",
      type: "text",
      required: false,
      maxLength: 10
    },
    {
      key: "estado",
      label: "Estado",
      type: "select",
      required: true,
      options: [
        { value: "Activo", label: "Activo" },
        { value: "Inactivo", label: "Inactivo" }
      ]
    },
    {
      key: "observaciones",
      label: "Observaciones",
      type: "text",
      required: false,
      maxLength: 250,
      placeholder: "Observaciones adicionales o notas importantes"
    }
  ];
  