import Image from 'next/image';
import { LoginForm } from '../../../components/ui/login-form';

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center p-12 lg:p-20">
        <div className="flex items-center justify-center lg:justify-start mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/Logo_CacaoByte_S.A.png"
              alt="CacaoByte Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="text-xl font-bold">CacaoByte S.A.</span>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image
          src="https://www.aauniv.com/s/blog/wp-content/uploads/2021/10/carreras-negocios-para-estudiar-en-linea-1280x720.jpg"
          alt="Background Image"
          fill
          priority
          className="absolute inset-0 object-cover"
        />
      </div>
    </div>
  );
}
