import { Suspense } from 'react';
import CabinList from '@/app/_components/CabinList';
import Spinner from '@/app/_components/Spinner';
import Filter from '@/app/_components/Filter';
import ReservationReminder from '../_components/ReservationReminder';

// export const revalidate = 0; // wtedy wyłączamy cashowanie i wtedy mamy renderowanie dynamiczne
// export const revalidate = 3600; // renderowanie przyrostowe po 1h jest akualizowana dana
// jeśli używamy searchParams to renderowanie jest zawsze dynamiczne i nie trzeba ustawiać revalidate bo nic to nie zmieni
// partial pre rendering (PPR)

export const metadata = {
	title: 'Cabins',
};

export default function Page({ searchParams }) {
	const filter = searchParams?.capacity ?? 'all';
	return (
		<div>
			<h1 className='text-4xl mb-5 text-accent-400 font-medium'>Our Luxury Cabins</h1>
			<p className='text-primary-200 text-lg mb-10'>
				Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites. Imagine waking up to beautiful
				mountain views, spending your days exploring the dark forests around, or just relaxing in your private hot tub
				under the stars. Enjoy nature&apos;s beauty in your own little home away from home. The perfect spot for a
				peaceful, calm vacation. Welcome to paradise.
			</p>
			<div className='mb-10 flex justify-end'>
				<Filter />
			</div>
			<Suspense fallback={<Spinner />} key={filter}>
				<CabinList filter={filter} />
				<ReservationReminder />
			</Suspense>
		</div>
	);
}
