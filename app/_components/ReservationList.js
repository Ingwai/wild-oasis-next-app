'use client';

import React, { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { deleteBookingAction } from '../_lib/actions';

const ReservationList = ({ bookings }) => {
	const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (curBookings, bookingId) => {
		return curBookings.filter(booking => booking.id !== bookingId);
	});

	async function handleDelete(bookingId) {
		optimisticDelete(bookingId);
		await deleteBookingAction(bookingId);
	}

	return (
		<ul className='space-y-6'>
			{optimisticBookings.map(booking => (
				<ReservationCard onDelete={handleDelete} booking={booking} key={booking.id} />
			))}
		</ul>
	);
};

export default ReservationList;
