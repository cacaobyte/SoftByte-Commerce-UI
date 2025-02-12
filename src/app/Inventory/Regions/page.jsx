"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import RegionsService from "../../../service/SoftbyteCommerce/Sales/Warehouse/regionsService";
import "leaflet/dist/leaflet.css";
import DataTable from "../../../components/shared/DataTable/DataTable";
import { regionsColumns } from "../../../models/Warehouse/regions/regionsModel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Info, CheckCircle, XCircle } from "lucide-react";
import { useHasMounted } from '../../../hooks/useHasMounted';
import LoadingScreen from "../../../components/UseHasMounted/LoadingScreen"

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export default function RegionsPage() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultIcon, setDefaultIcon] = useState(null);
  const hasMounted = useHasMounted();

  // Carga dinámica del icono de Leaflet
  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require("leaflet");
      const icon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        shadowSize: [41, 41],
      });
      setDefaultIcon(icon);
    }
  }, []);

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

  const handleViewMap = (region) => {
    setSelectedRegion(region);
    setModalOpen(true);
  };

  const actions = [
    {
      label: "Ver Mapa",
      icon: Eye,
      variant: "ghost",
      onClick: handleViewMap,
    },
  ];

  if(!hasMounted) {
    return  <div className="">
    <div className=""><LoadingScreen message="Preparando tu experiencia..."/></div>
  </div>;
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold">Regiones de Guatemala</h1>
        <p className="mt-2 text-lg text-gray-300">
          Explora y visualiza las distintas regiones del país, su ubicación geográfica y detalles relevantes.
        </p>
      </div>

      <div className="mt-4 h-[400px] w-full border rounded-lg overflow-hidden shadow-md bg-white">
        {defaultIcon && (
          <MapContainer center={[14.6349, -90.5069]} zoom={7} className="h-full w-full relative z-10">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {regions.map((region) => (
              <Marker key={region.idRegion} position={[region.latitud, region.longitud]} icon={defaultIcon}>
                <Popup>
                  <strong>{region.nombre}</strong>
                  <br />
                  {region.descripcion}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Listado de Regiones</h2>
        <DataTable columns={regionsColumns} data={regions} searchField="nombre" showActions={true} actions={actions} />
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <MapPin className="inline mr-2 text-blue-500" size={20} />
              {selectedRegion?.nombre}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="h-[300px] w-full rounded-lg overflow-hidden">
              {selectedRegion && defaultIcon && (
                <MapContainer center={[selectedRegion.latitud, selectedRegion.longitud]} zoom={10} className="h-full w-full">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[selectedRegion.latitud, selectedRegion.longitud]} icon={defaultIcon}>
                    <Popup>
                      <strong>{selectedRegion.nombre}</strong>
                      <br />
                      {selectedRegion.descripcion}
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <p>
                <Info className="inline mr-2 text-gray-600" /> <strong>Descripción:</strong> {selectedRegion?.descripcion}
              </p>
              <p>
                <MapPin className="inline mr-2 text-gray-600" /> <strong>Código:</strong> {selectedRegion?.codigo}
              </p>
              <p>
                <Info className="inline mr-2 text-gray-600" /> <strong>Tipo:</strong> {selectedRegion?.tipoRegion}
              </p>
              <p>
                {selectedRegion?.estatus ? (
                  <CheckCircle className="inline mr-2 text-green-500" />
                ) : (
                  <XCircle className="inline mr-2 text-red-500" />
                )}
                <strong>Estatus:</strong> {selectedRegion?.estatus ? "Activo" : "Inactivo"}
              </p>
            </div>
          </div>
          <div className="mt-4 text-right">
            <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
