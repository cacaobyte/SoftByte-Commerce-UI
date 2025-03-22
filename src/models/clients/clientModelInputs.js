export const clientModelInputs = [
    { key: "PrimerNombre", label: "Primer Nombre", type: "text", required: true, minLength: 2, maxLength: 50, placeholder: "Ingrese el primer nombre" },
    { key: "SegundoNombre", label: "Segundo Nombre", type: "text", required: false, minLength: 2, maxLength: 50, placeholder: "Ingrese el segundo nombre" },
    { key: "TercerNombre", label: "Tercer Nombre", type: "text", required: false, minLength: 2, maxLength: 50, placeholder: "Ingrese el tercer nombre" },
    { key: "PrimerApellido", label: "Primer Apellido", type: "text", required: true, minLength: 2, maxLength: 50, placeholder: "Ingrese el primer apellido" },
    { key: "SegundoApellido", label: "Segundo Apellido", type: "text", required: false, minLength: 2, maxLength: 50, placeholder: "Ingrese el segundo apellido" },
  
    { key: "Dpi", label: "DPI", type: "text", required: true, pattern: "^[0-9]{13}$", placeholder: "Ejemplo: 1234567890123" },
    
    { key: "Celular", label: "Celular", type: "text", required: true, pattern: "^[0-9]{8,15}$", placeholder: "Ejemplo: 987654321" },
    { key: "Celular2", label: "Celular Secundario", type: "text", required: false, pattern: "^[0-9]{8,15}$", placeholder: "Opcional" },
  
    { key: "Email", label: "Correo Electrónico", type: "email", required: true, placeholder: "ejemplo@correo.com", pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$" },
  
    { key: "FechaNacimiento", label: "Fecha de Nacimiento", type: "date", required: true },
  
    { key: "Genero", label: "Género", type: "select", required: true, options: [
        { value: "Masculino", label: "Masculino" },
        { value: "Femenino", label: "Femenino" },
        { value: "Otro", label: "Otro" }
      ]
    },
  
    { key: "EstadoCivil", label: "Estado Civil", type: "select", required: true, options: [
        { value: "Soltero", label: "Soltero" },
        { value: "Casado", label: "Casado" },
        { value: "Divorciado", label: "Divorciado" },
        { value: "Viudo", label: "Viudo" }
      ]
    },
  
    { key: "Nacionalidad", label: "Nacionalidad", type: "text", required: true, maxLength: 50, placeholder: "Ingrese la nacionalidad" },
    { key: "Profesion", label: "Profesión", type: "text", required: false, maxLength: 50, placeholder: "Ingrese la profesión" },
    
    { key: "Empresa", label: "Empresa", type: "text", required: false, maxLength: 100, placeholder: "Ingrese el nombre de la empresa" },
  
    { key: "Direccion", label: "Dirección", type: "text", required: true, minLength: 5, maxLength: 100, placeholder: "Ingrese la dirección" },
    { key: "Colonia", label: "Colonia", type: "text", required: false, maxLength: 50, placeholder: "Ingrese la colonia" },
    { key: "Zona", label: "Zona", type: "text", required: false, maxLength: 10, placeholder: "Ingrese la zona" },
    { key: "Departamento", label: "Departamento", type: "text", required: true, maxLength: 50, placeholder: "Ingrese el departamento" },
    { key: "Municipio", label: "Municipio", type: "text", required: true, maxLength: 50, placeholder: "Ingrese el municipio" },
  
    { key: "Cf", label: "Contribuyente Final (CF)", type: "checkbox", required: false },
  
    { key: "Nit", label: "NIT", type: "text", required: true, pattern: "^[0-9-]+$", placeholder: "Ejemplo: 1234567-8" },
    { key: "NombreFactura", label: "Nombre Factura", type: "text", required: true, maxLength: 100, placeholder: "Ingrese el nombre para la factura" },
  
    { key: "Moneda", label: "Moneda", type: "select", required: true, options: [
        { value: "GTQ", label: "Quetzal (GTQ)" },
        { value: "USD", label: "Dólar (USD)" },
        { value: "EUR", label: "Euro (EUR)" }
      ]
    },
  
    { key: "Descuento", label: "Descuento (%)", type: "number", required: false, min: 0, max: 100, placeholder: "Ingrese el porcentaje de descuento" },
  
    { key: "Edad", label: "Edad", type: "number", required: false, min: 0, max: 120, placeholder: "Ingrese la edad" },
  
    { key: "Activo", label: "Estado Activo", type: "checkbox", required: false },
  
    { key: "Notificar", label: "Recibir Notificaciones", type: "checkbox", required: false },
  
    { key: "foto", label: "Foto", type: "file", required: false }

  ];
  