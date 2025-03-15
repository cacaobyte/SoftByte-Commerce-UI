export const clientColumns = [
    { key: "cliente1", label: "ID Cliente" },
    {
      key: "primerNombre",
      label: "Nombre Completo",
      render: (row) =>
        `${row.primerNombre} ${row.segundoNombre || ""} ${row.tercerNombre || ""} ${row.primerApellido} ${row.segundoApellido}`
          .replace(/\s+/g, " ")
          .trim(),
    },
    {
      key: "foto",
      label: "Foto",
      render: (row) => (
        <div className="w-16 h-16">
          <img
            src={row.foto || "https://via.placeholder.com/150"}
            alt={`Foto de ${row.primerNombre}`}
            className="w-full h-full rounded-full object-cover border border-gray-300"
          />
        </div>
      ),
    },
    { key: "dpi", label: "DPI" },
    { key: "cf", label: "CF" },
    {
      key: "fechaNacimiento",
      label: "Fecha de Nacimiento",
      render: (row) => new Date(row.fechaNacimiento).toLocaleDateString("es-ES"),
    },
    { key: "edad", label: "Edad" },
    { key: "celular", label: "Celular" },
    { key: "celular2", label: "Celular Secundario" },
    { key: "email", label: "Email" },
    { key: "direccion", label: "Dirección" },
    { key: "colonia", label: "Colonia" },
    { key: "zona", label: "Zona" },
    { key: "municipio", label: "Municipio" },
    { key: "departamento", label: "Departamento" },
    { key: "estadoCivil", label: "Estado Civil" },
    { key: "nacionalidad", label: "Nacionalidad" },
    { key: "profesion", label: "Profesión" },
    { key: "empresa", label: "Empresa" },
    { key: "nombreFactura", label: "Nombre Factura" },
    { key: "moneda", label: "Moneda" },
    {
      key: "descuento",
      label: "Descuento",
      render: (row) => `${row.descuento.toFixed(2)} %`,
    },
    {
      key: "activo",
      label: "Estado",
      render: (row) => (row.activo ? "Activo" : "Inactivo"),
    },
    {
      key: "notificar",
      label: "Notificar",
      render: (row) => (row.notificar ? "Sí" : "No"),
    },
    {
      key: "recorddate",
      label: "Fecha de Registro",
      render: (row) => new Date(row.recorddate).toLocaleString("es-ES"),
    },
    { key: "createby", label: "Creado por" },
    {
      key: "createdate",
      label: "Fecha de Creación",
      render: (row) => new Date(row.createdate).toLocaleString("es-ES"),
    },
    { key: "updateby", label: "Actualizado por" },
    {
      key: "updatedate",
      label: "Fecha de Actualización",
      render: (row) =>
        row.updatedate ? new Date(row.updatedate).toLocaleString("es-ES") : "No actualizado",
    },
  ];
  
  export const clientModalModel = [
    { key: "cliente1", label: "ID Cliente" },
    {
      key: "primerNombre",
      label: "Nombre Completo",
      render: (row) =>
        `${row.primerNombre} ${row.segundoNombre || ""} ${row.tercerNombre || ""} ${row.primerApellido} ${row.segundoApellido}`
          .replace(/\s+/g, " ")
          .trim(),
    },
    {
      key: "foto",
      label: "Foto",
      type: "image",
      render: (row) => (
        <div className="w-32 h-32 mx-auto mb-4">
          <img
            src={row.foto || "https://via.placeholder.com/150"}
            alt={`Foto de ${row.primerNombre}`}
            className="w-full h-full rounded-full object-cover border border-gray-300"
          />
        </div>
      ),
    },
    { key: "dpi", label: "DPI" },
    { key: "cf", label: "CF" },
    {
      key: "fechaNacimiento",
      label: "Fecha de Nacimiento",
      render: (row) => new Date(row.fechaNacimiento).toLocaleDateString("es-ES"),
    },
    { key: "edad", label: "Edad" },
    { key: "celular", label: "Celular" },
    { key: "celular2", label: "Celular Secundario" },
    { key: "email", label: "Email" },
    { key: "direccion", label: "Dirección" },
    { key: "colonia", label: "Colonia" },
    { key: "zona", label: "Zona" },
    { key: "municipio", label: "Municipio" },
    { key: "departamento", label: "Departamento" },
    { key: "estadoCivil", label: "Estado Civil" },
    { key: "nacionalidad", label: "Nacionalidad" },
    { key: "profesion", label: "Profesión" },
    { key: "empresa", label: "Empresa" },
    { key: "nombreFactura", label: "Nombre Factura" },
    { key: "moneda", label: "Moneda" },
    {
      key: "descuento",
      label: "Descuento",
      render: (row) => `${row.descuento.toFixed(2)} %`,
    },
    {
      key: "activo",
      label: "Estado",
      render: (row) => (row.activo ? "Activo" : "Inactivo"),
    },
    {
      key: "notificar",
      label: "Notificar",
      render: (row) => (row.notificar ? "Sí" : "No"),
    },
    {
      key: "recorddate",
      label: "Fecha de Registro",
      render: (row) => new Date(row.recorddate).toLocaleString("es-ES"),
    },
    { key: "createby", label: "Creado por" },
    {
      key: "createdate",
      label: "Fecha de Creación",
      render: (row) => new Date(row.createdate).toLocaleString("es-ES"),
    },
    { key: "updateby", label: "Actualizado por" },
    {
      key: "updatedate",
      label: "Fecha de Actualización",
      render: (row) =>
        row.updatedate ? new Date(row.updatedate).toLocaleString("es-ES") : "No actualizado",
    },
  ];
  
  export const photoModal =[
    { key: "cliente1", label: "ID Cliente" },
    { key: "activo", label: "Estado" },
    { key: "image", label: "Foto", type: "image" },
  ]