import Pagination from '@/app/ui/reservations/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/reservations/table';
import { CreateReservation } from '@/app/ui/reservations/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchReservationsPages } from '@/app/lib/data';
import { ReservationsTableSkeleton, SearchSkeleton } from '@/app/ui/skeletons';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchReservationsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={lusitana.className + " text-2xl"}>
          Reservation Page <br />
          221711738 <br />
          Sandi Kurniawan
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Suspense fallback={<SearchSkeleton/>}>
        <Search placeholder="Search reservations..." />
        </Suspense>
        <CreateReservation />
      </div>
      <Suspense fallback={<ReservationsTableSkeleton/>}>
        <Table key={query + currentPage} query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}