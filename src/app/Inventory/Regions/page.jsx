"use client";
import { useEffect, useState } from "react";
import RegionsService from "../../../service/SoftbyteCommerce/Sales/Warehouse/regionsService";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DataTable from "../../../components/shared/DataTable/DataTable";
import { regionsColumns } from "../../../models/Warehouse/regions/regionsModel";  

export default function RegionsPage() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      const service = new RegionsService();
      try {
        const response = await service.getRegions();
        setRegions(response.data || []);
      } catch (error) {
        console.error("Error al obtener las regiones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900">Regiones de Guatemala</h1>
      <p className="text-gray-600">
        Aquí puedes ver un listado de las regiones de Guatemala junto con su ubicación en el mapa.
      </p>

      {/* Mapa con Leaflet */}
      <div className="mt-4 h-[400px] w-full">
        <MapContainer center={[14.6349, -90.5069]} zoom={7} className="h-full w-full rounded-lg">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {regions.map((region) => (
            <Marker key={region.idRegion} position={[region.latitud, region.longitud]}>
              <Popup>
                <strong>{region.nombre}</strong>
                <br />
                {region.descripcion}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Tabla de regiones con DataTable */}
      <div className="mt-6">
        <DataTable
          columns={regionsColumns}  
          data={regions}
          searchField="nombre"
          showActions={false}
        />
      </div>
    </div>
  );
}
