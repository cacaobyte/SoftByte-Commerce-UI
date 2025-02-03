"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2, PlusCircle } from "lucide-react";
import WarehouseService from "../../../service/SoftbyteCommerce/Sales/Warehouse/warehouseService";
import RegionsService from "../../../service/SoftbyteCommerce/Sales/Warehouse/regionsService"; // Importa el servicio de regiones
import { Checkbox } from "@/components/ui/checkbox"; // Importar checkbox de ShadCN

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

    const [regions, setRegions] = useState([]); // Estado para almacenar las regiones
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await regionsService.getRegions();
                setRegions(response.data);
            } catch (error) {
                console.error("Error al obtener las regiones:", error);
            }
        };

        fetchRegions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWarehouse((prev) => ({
            ...prev,
            [name]: value,
        }));
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

                        <div>
                            <Label>Departamento</Label>
                            <Input
                                type="text"
                                name="departamento"
                                value={warehouse.departamento}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label>Municipio</Label>
                            <Input
                                type="text"
                                name="municipio"
                                value={warehouse.municipio}
                                onChange={handleChange}
                                required
                            />
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
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Seleccione una región</option>
                                {regions.map((region) => (
                                    <option key={region.idRegion} value={region.nombre}>
                                        {region.nombre}
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

                        <div className="flex justify-between space-x-4 mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setWarehouse({
                                    descripcion: "",
                                    departamento: "",
                                    municipio: "",
                                    direccion: "",
                                    telefono: "",
                                    region: "",
                                    correo: "",
                                    bodegacentral: false,
                                })}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" className="w-full flex items-center justify-center" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : "Crear Bodega"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NewWarehousePage;
