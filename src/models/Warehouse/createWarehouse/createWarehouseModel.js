const createWarehouseModel = (departments, municipalities, regions, handleDepartmentChange) => [
    { name: "descripcion", label: "Descripción", type: "text", required: true },
    { 
        name: "departamento", 
        label: "Departamento", 
        type: "select", 
        required: true, 
        options: departments.map(dep => ({ label: dep, value: dep })),
        onChange: (value) => handleDepartmentChange(value)
    },
    { 
        name: "municipio", 
        label: "Municipio", 
        type: "select", 
        required: true, 
        options: municipalities.map(mun => ({ label: mun, value: mun })),
        disabled: municipalities.length === 0
    },
    { name: "direccion", label: "Dirección", type: "text" },
    { name: "telefono", label: "Teléfono", type: "number" },
    { 
        name: "region", 
        label: "Región", 
        type: "select", 
        required: true, 
        options: regions 
    },
    { name: "correo", label: "Correo Electrónico", type: "email" },
    { name: "bodegacentral", label: "Es Bodega Principal", type: "checkbox" }
];

export default createWarehouseModel;
