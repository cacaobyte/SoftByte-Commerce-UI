"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import RegionsService from "../../../service/SoftbyteCommerce/Sales/Warehouse/regionsService";
import DynamicForm from "@/components/shared/Forms/DynamicForm";
import GT from "territory-gt";
import createWarehouseModel from "@/models/Warehouse/createWarehouse/createWarehouseModel";
import { toast } from "react-toastify";

const NewWarehousePage = ({ onClose }) => {
    const warehouseService = new WarehouseService();
    const regionsService = new RegionsService();

    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [warehouseData, setWarehouseData] = useState({
        departamento: "",
        municipio: "",
    });

    useEffect(() => {
        setDepartments(GT.departamentos());
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        try {
            const response = await regionsService.getRegions();
            setRegions(response.data.map((reg) => ({ label: reg.nombre, value: reg.nombre })));
        } catch (error) {
            console.error("Error al obtener regiones:", error);
        }
    };

    const handleDepartmentChange = (department) => {
        const newMunicipalities = GT.municipios(department) || [];
        setMunicipalities(newMunicipalities);
        setWarehouseData((prev) => ({
            ...prev,
            departamento: department,
            municipio: newMunicipalities.length > 0 ? newMunicipalities[0] : "",
        }));
    };

    useEffect(() => {
        if (warehouseData.departamento) {
            handleDepartmentChange(warehouseData.departamento);
        }
    }, [warehouseData.departamento]);

    const warehouseModel = createWarehouseModel(departments, municipalities, regions, handleDepartmentChange);

    const handleSubmit = async (formData) => {
        try {
            await warehouseService.createWarehouse(formData);
            toast.success("Bodega creada con éxito.");
            onClose(); // Cierra el modal después de guardar
        } catch (error) {
            toast.error("Error al crear la bodega.");
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <DynamicForm
                model={warehouseModel}
                title=""
                onSubmit={handleSubmit}
                initialValues={warehouseData}
                columns={2}
            />
        </div>
    );
};

export default NewWarehousePage;
