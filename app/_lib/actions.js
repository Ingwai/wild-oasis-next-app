'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';
import { ca } from 'date-fns/locale';

export async function createBookingAction(bookingData, formData) {
	const session = await auth();
	if (!session) throw new Error('You must be logged in!');

	const newBookingData = {
		...bookingData,
		guestId: session.user.guestId,
		numGuests: Number(formData.get('numGuests')),
		observations: formData.get('observations').slice(0, 500),
		extrasPrice: 0,
		totalPrice: bookingData.cabinPrice,
		isPaid: false,
		hasBreakfast: false,
		status: 'unconfirmed',
	};

	const { error } = await supabase.from('bookings').insert([newBookingData]);

	if (error) {
		throw new Error('Booking could not be created');
	}
	revalidatePath(`/cabin/${bookingData.cabinId}`);
	redirect('/cabins/thanks');
}

export async function deleteBookingAction(bookingId) {
	const session = await auth();
	if (!session) throw new Error('You must be logged in!');

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingsIds = guestBookings.map(booking => booking.id);

	if (!guestBookingsIds.includes(bookingId)) throw new Error('You are not allowed to delete this booking');

	const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

	if (error) {
		console.error(error);
		throw new Error('Booking could not be deleted');
	}
	revalidatePath('/account/reservations');
}

export async function updateBookingAction(formData) {
	const session = await auth();
	if (!session) throw new Error('You must be logged in!');

	const bookingId = Number(formData.get('bookingId'));
	const numGuests = Number(formData.get('numGuests'));
	const observations = formData.get('observations').slice(0, 500);

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingsIds = guestBookings.map(booking => booking.id);

	if (!guestBookingsIds.includes(bookingId)) throw new Error('You are not allowed to delete this booking');
	const updateData = { numGuests, observations };
	const { error } = await supabase.from('bookings').update(updateData).eq('id', bookingId);

	if (error) {
		throw new Error('Booking could not be updated');
	}
	revalidatePath('/account/reservations/');
	revalidatePath(`/account/reservations/edit/${bookingId}`);
	redirect('/account/reservations');
}

export async function updateGuestAction(formData) {
	const session = await auth();
	if (!session) throw new Error('You must be logged in!');

	const nationalID = formData.get('nationalID');
	const [nationality, countryFlag] = formData.get('nationality').split('%');
	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('Please provide a valid national ID');

	const updateData = { nationality, countryFlag, nationalID };

	const { error } = await supabase.from('guests').update(updateData).eq('id', session.user.guestId);

	if (error) {
		throw new Error('Guest could not be updated');
	}
	revalidatePath('/account/reservations');
}

export async function signInAction() {
	await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
	await signOut({ redirectTo: '/' });
}
