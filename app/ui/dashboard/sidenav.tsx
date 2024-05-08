import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon,  ArrowUturnLeftIcon } from '@heroicons/react/24/outline';  // Import ArrowLeftIcon
import { signOut } from '@/app/auth';
import Image from 'next/image';
import { kanit } from '@/app/ui/fonts';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-amber-950 p-4 md:h-40"
        href="/"
      >
        <div className={`${kanit.className} antialiased text-[2rem] leading-[3rem] font-bold text-black dark:text-white`}>
        Atma Barbershop
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div className="flex-none">
          <a href="/"> 
            <a className="flex h-[48px] items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-amber-950 flex-none justify-start px-2">
              <ArrowUturnLeftIcon className="w-6" />
              <div className="hidden md:block">Back</div>
            </a>
          </a>
          <form
           action={async () => {
            'use server';
            await signOut();
          }}
          >
           <Link href={'/login'}>
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
          </Link>
          
          </form>
        </div>
      </div>
    </div>
  );
}