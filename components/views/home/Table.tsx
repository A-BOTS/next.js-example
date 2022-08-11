/**
 * external libs
 */
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
/**
 * utils
 */
import { sender } from './../../../utils/sender';
/**
 * context
 */
import { AlertContext } from './../../common/alert.context';
/**
 * data
 */
import { backServerUrl } from './../../../config';
/**
 * interfaces
 */
import { User } from '../../../types/interfaces';
/**
 * styles
 */
import styles from './../../../styles/home.module.scss';

const Table: React.FunctionComponent<{
	users: User[];
}> = ({ users }) => {
	const router = useRouter();
	const { showAlert } = useContext(AlertContext);
	const [locUsers, setLocUsers] = useState<User[]>(users);

	const trHandler: (id: number) => void = (id) => router.push(`/info/${id}`);
	const stopEvent: (e: React.SyntheticEvent<EventTarget>) => void = (e) => e.stopPropagation();

	const delUser: (id: number) => void = async (id) => {
		const delRequest = await sender(`${backServerUrl}/v1/contact/${id}/`, 'DELETE');

		if (delRequest?.res !== 'success') {
			showAlert('An error has occurred', 'error');
		} else {
			showAlert('User deleted', 'success');
			setLocUsers((pre) => pre.filter((usr) => usr.id !== id));
		}
	};

	return (
		<div className={`${styles.home__users} custom-scroll`}>
			<div className={styles.table}>
				<div className={styles.table__tr}>
					<div className={styles.table__info}>
						<p className={`${styles.table__td} ${styles.table__td_th} ${styles.table__td_first}`}>First Name</p>
						<p className={`${styles.table__td} ${styles.table__td_th}`}>Second Name</p>
						<p className={`${styles.table__td} ${styles.table__td_th}`}>Date of Birth</p>
						<p className={`${styles.table__td} ${styles.table__td_th}`}>Gender</p>
					</div>
					<p
						className={`${styles.table__td} ${styles.table__td_th} ${styles.table__td_last} ${styles.table__td_btns}`}
					>
						Actions
					</p>
				</div>

				{locUsers.map((user) => (
					<div key={user.id} className={styles.table__tr}>
						<div className={`${styles.table__info} ${styles.effect}`} onClick={() => trHandler(user.id)}>
							<p className={`${styles.table__td} ${styles.table__td_first}`}>{user.first_name}</p>
							<p className={styles.table__td}>{user.last_name}</p>
							<p className={styles.table__td}>{user.birth_date}</p>
							<p className={styles.table__td}>{user.gender}</p>
						</div>
						<div
							className={`${styles.table__td} ${styles.table__td_btns} ${styles.table__td_last}`}
							onClick={stopEvent}
						>
							<Link href={`/user/${user.id}`}>
								<a className={`${styles.table__link} ${styles.effect}`}>
									<FaPencilAlt />
								</a>
							</Link>

							<div
								className={`${styles.table__link} ${styles.table__link_trash} ${styles.effect}`}
								onClick={() => delUser(user.id)}
							>
								<FaRegTrashAlt />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Table;
