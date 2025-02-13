'use client';
import { useEffect, useState } from 'react';
import UserService from '../../../service/SoftbyteCommerce/Users/userService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaShieldAlt } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'react-toastify';
import ProtectedPage from '../../../components/ProtectedPage';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const userService = new UserService();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Error al cargar el perfil. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-2 gap-6 mt-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return <p className="text-center mt-10 text-gray-500">No se pudo cargar el perfil.</p>;
  }

  return (
    <ProtectedPage>
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      <Card className="shadow-2xl border-none rounded-xl">
        <CardHeader className="relative bg-gradient-to-br from-blue-500 to-purple-700 text-white py-10 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_0%,_transparent_70%)] opacity-20"></div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative cursor-pointer group">
                {profile.fotoUrl ? (
                  <img
                    src={profile.fotoUrl}
                    alt="Foto de perfil"
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-md transition-all duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 flex items-center justify-center">
                    <FaIdCard className="text-gray-500 text-4xl" />
                  </div>
                )}
              </div>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md p-4 rounded-md">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-semibold">
                  Vista previa de la imagen
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center items-center">
                <img
                  src={profile.fotoUrl}
                  alt="Vista previa"
                  className="max-h-[400px] w-auto rounded-lg object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
          <CardTitle className="text-3xl font-bold mt-4">{profile.nombre}</CardTitle>
          <p className="text-gray-100">@{profile.userName}</p>
          <Badge className="mx-auto mt-2 px-3 py-1 text-sm bg-green-200 text-green-800 rounded-full">
            Activo
          </Badge>
        </CardHeader>
        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileDetail label="Correo electrónico" value={profile.correoElectronico} href={`mailto:${profile.correoElectronico}`} icon={<FaEnvelope />} />
          <ProfileDetail label="Teléfono principal" value={profile.telefono1 || 'N/A'} href={`tel:${profile.telefono1}`} icon={<FaPhone />} />
          <ProfileDetail label="Teléfono alterno" value={profile.telefono2 || 'N/A'} href={`tel:${profile.telefono2}`} icon={<FaPhone />} />
          <ProfileDetail label="Célula de trabajo" value={profile.celular || 'N/A'} icon={<FaShieldAlt />} />
          <ProfileDetail label="Dirección" value={profile.direccion || 'N/A'} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.direccion)}`} icon={<FaMapMarkerAlt />} />
          <ProfileDetail label="Documento de Identificación" value={profile.documentoIdentificacion || 'N/A'} icon={<FaIdCard />} />
        </CardContent>
      </Card>
    </div>
    </ProtectedPage>
  );
}

function ProfileDetail({ label, value, icon, href }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300">
      <div className="text-blue-600 text-2xl">{icon}</div>
      <div>
        <p className="text-gray-700 font-semibold">{label}</p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {value}
          </a>
        ) : (
          <p className="text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );
}
