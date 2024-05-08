import Image from 'next/image';
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-gradient-to-r from-black to-amber-950 p-3 md:h-36">
        <div className="text-white text-3xl font-bold flex flex-col">
            
            <span>Atma</span>
            <span>Barbershop</span>
          </div>
          <Image
            src="/logo_hero.png"
            width={70} 
            height={70} 
            alt="Atma Barbershop logo"
            style={{ marginLeft: 'auto' }} 
          />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}