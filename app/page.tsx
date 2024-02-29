import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='relative min-h-screen flex-col p-6'>
      <Image
        src="/bg_hero.png"
        layout='fill'
        objectFit='cover'
        className='absolute z-0'
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <div className='absolute top-6 left-16 flex items-center'>
        <Image
          src="/logo_hero.png" 
          alt="Atma Barbershop Logo"
          width={40} 
          height={40} 
        />
        <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"  
        />
        <p className="text-2xl text-white ml-2">Atma Barbershop</p>
      </div>
      <nav className='fixed top-6 right-6'>
        <div className='flex items-start justify-end'>
          <p>
            <Link
              href="/login"
              className="flex items-end gap-5 self-start rounded-lg bg-white bg-opacity-10 px-6 py-3 text-sm font-medium text-white border border-white hover:bg-blue-400 md:text-base"
            >
              <span>Log in</span>
            </Link>
          </p>
        </div>
      </nav>
      <div className='absolute bottom-96 left-40'>
        <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
          <p className={`text-2xl font-anton text-white md:text-1xl md:leading-normal`}>
            <span className="text-2xl">221711738-Sandi Kurniawan</span>{' '}
            <a href="" className="">
              <br></br><span className="text-6xl font-anton font-bold">Our Barbershop</span>
            </a>
            <br></br><span className="text-6xl font-anton font-bold">Admin Dashboard</span>
          </p>
        </div>
      </div>
    </main>
  );
}
