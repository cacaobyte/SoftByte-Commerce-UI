"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2, PlusCircle } from "lucide-react";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import RegionsService from "../../../service/SoftbyteCommerce/Sales/Warehouse/regionsService"; // Servicio de regiones
import { Checkbox } from "@/components/ui/checkbox";
import GT from "territory-gt"; // 📌 Importar librería de departamentos y municipios

const NewWarehousePage = () => {
    const warehouseService = new WarehouseService();
    const regionsService = new RegionsService();

    const [warehouse, setWarehouse] = useState({
        descripcion: "",
        departamento: "",
        municipio: "",
        direccion: "",
        telefono: "",
        region: "",
        correo: "",
        bodegacentral: false, // Es Bodega Principal
    });

    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Obtener departamentos desde `territory-gt`
        setDepartments(GT.departamentos());

        // Obtener regiones desde el servicio
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        try {
            const response = await regionsService.getRegions();
            setRegions(response.data);
        } catch (error) {
            console.error("Error al obtener regiones:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWarehouse((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Si cambia el departamento, actualizar municipios dinámicamente
        if (name === "departamento") {
            setMunicipalities(GT.municipios(value) || []);
            setWarehouse((prev) => ({ ...prev, municipio: "" })); // Reset municipio al cambiar departamento
        }
    };

    const handleCheckboxChange = () => {
        setWarehouse((prev) => ({
            ...prev,
            bodegacentral: !prev.bodegacentral,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await warehouseService.createWarehouse(warehouse);
            toast.success(response.data.message);

            setWarehouse({
                descripcion: "",
                departamento: "",
                municipio: "",
                direccion: "",
                telefono: "",
                region: "",
                correo: "",
                bodegacentral: false,
            });
        } catch (error) {
            toast.error("Error al crear la bodega. Verifica los datos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md shadow-lg rounded-lg bg-white p-6">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Nueva Bodega</CardTitle>
                    <PlusCircle className="text-blue-500" size={24} />
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Descripción</Label>
                            <Input
                                type="text"
                                name="descripcion"
                                value={warehouse.descripcion}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Select para Departamento */}
                        <div>
                            <Label>Departamento</Label>
                            <select
                                name="departamento"
                                value={warehouse.departamento}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="" disabled>Seleccione un departamento</option>
                                {departments.map((dep, index) => (
                                    <option key={index} value={dep}>
                                        {dep}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Select para Municipio */}
                        <div>
                            <Label>Municipio</Label>
                            <select
                                name="municipio"
                                value={warehouse.municipio}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                                disabled={!warehouse.departamento}
                            >
                                <option value="" disabled>Seleccione un municipio</option>
                                {municipalities.map((mun, index) => (
                                    <option key={index} value={mun}>
                                        {mun}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Dirección</Label>
                            <Input
                                type="text"
                                name="direccion"
                                value={warehouse.direccion}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Teléfono</Label>
                            <Input
                                type="text"
                                name="telefono"
                                value={warehouse.telefono}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Select para Región */}
                        <div>
                            <Label>Región</Label>
                            <select
                                name="region"
                                value={warehouse.region}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="" disabled>Seleccione una región</option>
                                {regions.map((reg, index) => (
                                    <option key={index} value={reg.nombre}>
                                        {reg.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Correo Electrónico</Label>
                            <Input
                                type="email"
                                name="correo"
                                value={warehouse.correo}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Checkbox para "Es Bodega Principal" */}
                        <div className="flex items-center space-x-2 mt-4">
                            <Checkbox
                                id="bodegacentral"
                                checked={warehouse.bodegacentral}
                                onCheckedChange={handleCheckboxChange}
                            />
                            <Label htmlFor="bodegacentral">Es Bodega Principal</Label>
                        </div>

                        <Button type="submit" className="w-full flex items-center justify-center" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : "Crear Bodega"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NewWarehousePage;
