'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children, pendingLabel }) {
	const { pending } = useFormStatus();
	return (
		<button
			className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
			disabled={pending}>
			{pending ? pendingLabel : children}
		</button>
	);
}

// useFormStatus() musi być użyty wewnątrz komponentu renderowanego wewnątrz formularza, a nie może być w komponecie w którym znajduje sie formularz.
// Dlatego musimy przekazać Button jako children do UpdateProfileForm, aby Button mógł korzystać z useFormStatus.
