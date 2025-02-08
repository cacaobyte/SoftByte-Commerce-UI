"use client";
import { useEffect, useState } from "react";
import CategoriesService from "../../../service/SoftbyteCommerce/Sales/categories/categoriesService";
import DataTable from "../../../components/shared/DataTable/DataTable";
import { Eye, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "../../../components/shared/Modal/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categoriesColumns = [
  {
    id: "nombre",
    label: "Nombre",
    key: "nombre",
    accessor: "nombre",
  },
  {
    id: "descripcion",
    label: "Descripción",
    key: "descripcion",
    accessor: "descripcion",
  },
  {
    id: "fechaCreacion",
    label: "Fecha de Creación",
    key: "fechaCreacion",
    accessor: (row) => {
      if (!row.fechaCreacion) return "No disponible";
      const fecha = new Date(row.fechaCreacion);
      return `${fecha.getDate().toString().padStart(2, "0")} de ${fecha.toLocaleString("es-ES", {
        month: "long",
      })} del ${fecha.getFullYear()}`;
    },
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryToToggle, setCategoryToToggle] = useState(null);
  const service = new CategoriesService();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await service.getAllCategories();
        const formattedData = response.data.map((category) => ({
          ...category,
          fechaCreacion: category.fechaCreacion
            ? new Date(category.fechaCreacion).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).replace(" de ", " del ")
            : "No disponible",
        }));
        setCategories(formattedData);
      } catch (error) {
        toast.error("Error al obtener las categorías");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleViewSubcategories = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const handleToggleStatus = (row) => {
    setCategoryToToggle(row);
    setConfirmModalOpen(true);
  };

  const handleConfirmToggle = async () => {
    setConfirmLoading(true);
    try {
      await service.putInactiveCategory(categoryToToggle.idCategoria);
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.idCategoria === categoryToToggle.idCategoria
            ? { ...cat, estatus: !cat.estatus }
            : cat
        )
      );
      toast.success(`Categoría ${categoryToToggle.estatus ? "desactivada" : "activada"} correctamente.`);
      setConfirmModalOpen(false);
    } catch (error) {
      toast.error("Error al cambiar el estado de la categoría.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const actions = [
    {
      label: "Ver",
      icon: Eye,
      variant: "ghost",
      onClick: handleViewSubcategories,
    },
    {
      label: "Editar",
      icon: Edit,
      variant: "outline",
      onClick: (row) => alert(`Editar categoría: ${row.nombre}`),
    },
    {
      label: (row) => (row.estatus ? "Desactivar" : "Activar"),
      icon: (row) => (row.estatus ? <ToggleLeft size={16} /> : <ToggleRight size={16} />),
      variant: "destructive",
      onClick: handleToggleStatus,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold">Categorías</h1>
        <p className="mt-2 text-lg text-gray-300">
          Explora y administra las categorías disponibles en el sistema.
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Listado de Categorías</h2>
        <DataTable
          columns={categoriesColumns}
          data={categories}
          loading={loading}
          searchField="nombre"
          showActions={true}
          actions={actions}
        />
      </div>

      {/* Modal para mostrar subcategorías */}
      {selectedCategory && (
        <Dialog open={true} onOpenChange={handleCloseModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subcategorías de {selectedCategory.nombre}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {selectedCategory.subcategoria && selectedCategory.subcategoria.length > 0 ? (
                <ul className="list-disc pl-5">
                  {selectedCategory.subcategoria.map((sub) => (
                    <li key={sub.idSubcategoria}>
                      <strong>{sub.nombre}:</strong> {sub.descripcion}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay subcategorías disponibles.</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleCloseModal}>Cerrar</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmToggle}
        title={`¿${categoryToToggle?.estatus ? "Desactivar" : "Activar"} Categoría?`}
        description={`¿Estás seguro de querer ${
          categoryToToggle?.estatus ? "desactivar" : "activar"
        } la categoría "${categoryToToggle?.nombre}"?`}
        confirmText={categoryToToggle?.estatus ? "Desactivar" : "Activar"}
        loading={confirmLoading}
      />
    </div>
  );
}
