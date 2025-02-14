"use client";
import DataTable from "../../components/DataTable/DataTable"; // Ajusta la ruta si es necesario
import { Edit, Trash, Eye } from "lucide-react";

export default function Page() {
  // Datos de prueba
  const sampleData = [
    {
      id: 1,
      bodega: "B001",
      descripcion: "Bodega Central",
      activo: true,
      creadoPor: "Admin",
      fechaCreacion: "2025-01-01",
      telefono: "123456789",
      departamento: "Guatemala",
      municipio: "Zona 1",
    },
    {
      id: 2,
      bodega: "B002",
      descripcion: "Bodega Secundaria",
      activo: false,
      creadoPor: "UserTest",
      fechaCreacion: "2025-01-15",
      telefono: "987654321",
      departamento: "Escuintla",
      municipio: "Puerto San José",
    },
    {
      id: 3,
      bodega: "B003",
      descripcion: "Bodega Norte",
      activo: true,
      creadoPor: "Admin",
      fechaCreacion: "2025-02-01",
      telefono: "456123789",
      departamento: "Chimaltenango",
      municipio: "Tecpán",
    },
    {
      id: 4,
      bodega: "B004",
      descripcion: "Bodega Sur",
      activo: false,
      creadoPor: "TestUser",
      fechaCreacion: "2025-02-10",
      telefono: "321654987",
      departamento: "Quetzaltenango",
      municipio: "Zona 3",
    },
  ];

  // Columnas de la tabla
  const columns = [
    { key: "bodega", label: "Bodega" },
    { key: "descripcion", label: "Descripción" },
    { key: "activo", label: "Activo" },
    { key: "creadoPor", label: "Creado por" },
    { key: "fechaCreacion", label: "Fecha de Creación", type: "date" },
    { key: "telefono", label: "Teléfono" },
    { key: "departamento", label: "Departamento" },
    { key: "municipio", label: "Municipio" },
  ];

  // Acciones para cada fila
  const actions = [
    {
      label: "Ver",
      variant: "outline",
      icon: Eye,
      onClick: (row) => alert(`Viendo detalles de: ${row.descripcion}`),
    },
    {
      label: "Editar",
      variant: "outline",
      icon: Edit,
      onClick: (row) => alert(`Editando: ${row.descripcion}`),
    },
    {
      label: "Eliminar",
      variant: "destructive",
      icon: Trash,
      onClick: (row) => alert(`Eliminando: ${row.descripcion}`),
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Prueba de DataTable</h1>
      <DataTable
        columns={columns}
        data={sampleData}
        searchField="descripcion"
        actions={actions}
        showActions={true}
      />
    </div>
  );
}
