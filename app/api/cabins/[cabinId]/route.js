import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';

export async function GET(request, { params }) {
	const { cabinId } = params;
	try {
		Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)]);
		return Response.json({ cabin, bookedDates });
	} catch (error) {
		return Response.json({ message: 'Cabin not found' }, { status: 404 });
	}
}
