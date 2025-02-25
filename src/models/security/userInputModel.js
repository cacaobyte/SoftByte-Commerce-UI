export const userModelInputs = [
    { key: "nombre", label: "Nombre", type: "text", required: true, minLength: 3, maxLength: 50, placeholder: "Ingrese su nombre" },

    // 🔹 Tipo con opciones de selección
    { 
        key: "tipo", 
        label: "Tipo", 
        type: "select", 
        required: true,
        options: [
            { value: "Admin", label: "Admin" },
            { value: "Manager", label: "Manager" },
            { value: "Employee", label: "Employee" },
            { value: "Guest", label: "Guest" }
        ]
    },

    { key: "correoElectronico", label: "Correo Electrónico", type: "email", required: true, placeholder: "ejemplo@correo.com", pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$" },
    
    { key: "telefono1", label: "Teléfono 1", type: "text", required: true, pattern: "^[0-9]{8,15}$", placeholder: "Ejemplo: 987654321" },
    { key: "telefono2", label: "Teléfono 2", type: "text", required: false, pattern: "^[0-9]{8,15}$", placeholder: "Opcional" },
    
    { key: "direccion", label: "Dirección", type: "text", required: true, minLength: 5, maxLength: 100 },
    { key: "documentoIdentificacion", label: "Documento de Identificación", type: "text", required: true, pattern: "^[0-9]{13}$", placeholder: "Ejemplo: 1234567890123" },
    { key: "fechaNacimiento", label: "Fecha de Nacimiento", type: "date", required: true },

    // 🔹 Tipo de Acceso (Temporal o Permanente)
    { 
        key: "tipoAcceso", 
        label: "Tipo de Acceso", 
        type: "select", 
        required: true,
        options: [
            { value: "permanent", label: "Permanente" },
            { value: "temporary", label: "Temporal" }
        ]
    },

    // 🔹 Campo para que el administrador ingrese la contraseña
    { key: "clave", label: "Clave", type: "password", required: true, minLength: 6, maxLength: 20, placeholder: "Mínimo 6 caracteres" },

    { key: "foto", label: "Foto", type: "file", required: false }
];
