export const userModelInputs = [
    { key: "nombre", label: "Nombre", type: "text" },

    // 🔹 Tipo con opciones de selección
    { 
        key: "tipo", 
        label: "Tipo", 
        type: "select", 
        options: [
            { value: "Admin", label: "Admin" },
            { value: "Manager", label: "Manager" },
            { value: "Employee", label: "Employee" },
            { value: "Guest", label: "Guest" }
        ]
    },

    { key: "correoElectronico", label: "Correo Electrónico", type: "text" },
    { key: "telefono1", label: "Teléfono 1", type: "text" },
    { key: "telefono2", label: "Teléfono 2", type: "text" },
    { key: "direccion", label: "Dirección", type: "text" },
    { key: "documentoIdentificacion", label: "Documento de Identificación", type: "text" },
    { key: "fechaNacimiento", label: "Fecha de Nacimiento", type: "date" },

    // 🔹 Tipo de Acceso (Temporal o Permanente)
    { 
        key: "tipoAcceso", 
        label: "Tipo de Acceso", 
        type: "select", 
        options: [
            { value: "permanent", label: "Permanente" },
            { value: "temporary", label: "Temporal" }
        ]
    },

    // 🔹 Campo para que el administrador ingrese la contraseña
    { key: "clave", label: "Clave", type: "password" },

    { key: "foto", label: "Foto", type: "file" }
];
