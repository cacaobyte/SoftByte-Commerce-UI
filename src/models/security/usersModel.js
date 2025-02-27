// 📌 Definición de las columnas para la DataTable
// 📌 Definición de las columnas para la DataTable
export const usersColumns = [
    { key: "userName", label: "usuario", type: "string" },
    { key: "usuario", label: "Nombre", type: "string" },
        { 
        key: "fotoUrl", 
        label: "Foto", 
        type: "image",
        render: (row) => (
            <div className="w-16 h-16 mx-auto mb-2">
                <img
                    src={row.fotoUrl || "https://via.placeholder.com/150"}
                    alt={`Foto de ${row.userName}`}
                    className="w-full h-full rounded-full object-cover border border-gray-300 shadow-sm"
                />
            </div>
        ),
    },
    { key: "estado", label: "Activo", type: "boolean" },
    { key: "celular", label: "Bodega", type: "string" },
    { key: "correoElectronico", label: "Correo Electrónico", type: "string" },
    { key: "tipo", label: "Tipo", type: "string" },
    { key: "telefono1", label: "Teléfono 1", type: "string" },
    { key: "telefono2", label: "Teléfono 2", type: "string" },
    { key: "fechaNacimiento", label: "Fecha de Nacimiento", type: "date" },
    { key: "createdBy", label: "Creado Por", type: "string" },
    { key: "createDate", label: "Fecha de Creación", type: "date" },

];
