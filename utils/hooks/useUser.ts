/**
 * external libs
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
/**
 * interfaces
 */
import { User } from './../../types/interfaces';
/**
 * utils
 */
import { sender } from './../../utils/sender';
/**
 * data
 */
import { backServerUrl } from './../../config';

export const useUser = () => {
	const [usr, setUsr] = useState<User | null | false>(null);
	const router = useRouter();
	const id = router.query?.id;

	useEffect(() => {
		const getUserData: () => void = async () => {
			const usersData = await sender(`${backServerUrl}/v1/contact/${id}/`);

			if (usersData?.res === 'success' && usersData?.data) {
				setUsr(usersData.data);
			} else {
				setUsr(false);
			}
		};

		if (id && id !== 'create') getUserData();
		if (id === 'create') setUsr(false);
	}, [setUsr, id]);

	return usr;
};
