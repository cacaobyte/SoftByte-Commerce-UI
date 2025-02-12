'use client';
import { useEffect, useState } from 'react';
import UserService from '../../../service/SoftbyteCommerce/Users/userService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaEnvelope, FaPhone, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const userService = new UserService();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Error al cargar el perfil. Inténtalo de nuevo más tarde.');
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <p className="text-center mt-10 text-gray-500">Cargando perfil...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader className="flex items-center gap-4">
          {profile.fotoUrl ? (
            <img
              src={profile.fotoUrl}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400" />
          )}
          <div>
            <CardTitle className="text-2xl font-bold">{profile.nombre}</CardTitle>
            <p className="text-gray-500">@{profile.userName}</p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 font-semibold">Correo electrónico</p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-gray-500" />
              {profile.correoElectronico}
            </p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Teléfono</p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-gray-500" />
              {profile.telefono1 || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Celular</p>
            <p>{profile.celular || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Dirección</p>
            <p>{profile.direccion || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Fecha de nacimiento</p>
            <p>{new Date(profile.fechaNacimiento).toLocaleDateString('es-ES')}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Tipo de acceso</p>
            <p>{profile.tipoAcceso}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
