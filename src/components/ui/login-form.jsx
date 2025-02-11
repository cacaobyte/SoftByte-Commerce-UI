'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SecurityService from '../../service/SoftbyteCommerce/Security/securityService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Importar react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos de toastify

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const securityService = new SecurityService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await securityService.login({
        UserNameOrEmail: email,
        Password: password,
      });

      const token = response?.data?.token;

      if (token) {
        document.cookie = `token=${token}; path=/; max-age=5400`;
        toast.success('Inicio de sesión exitoso', { position: 'top-center' });
        router.push('/');
      } else {
        throw new Error('Token no recibido.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Credenciales incorrectas. Verifica tu usuario o contraseña.', { position: 'top-center' });
      } else {
        toast.error('Ocurrió un error inesperado. Intenta de nuevo.', { position: 'top-center' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-8 md:p-10 bg-white rounded-lg shadow-lg"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email or Username</Label>
          <Input
            id="email"
            type="text"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-500 hover:text-black"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </form>
  );
}
