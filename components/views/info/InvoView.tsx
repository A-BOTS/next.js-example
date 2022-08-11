/**
 * external libs
 */
import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import styles from './../../../styles/info.module.scss';

const InvoView: React.FunctionComponent<{
	user: User;
}> = ({ user }) => {
	const router = useRouter();
	const { showAlert } = useContext(AlertContext);

	const delUser: (id: number) => void = async (id) => {
		const delRequest = await sender(`${backServerUrl}/v1/contact/${id}/`, 'DELETE');

		if (delRequest?.res !== 'success') {
			showAlert('An error has occurred', 'error');
		} else {
			showAlert('User deleted', 'success');
			router.replace('/');
		}
	};

	return (
		<div className={styles.info__content}>
			<div className={styles.info__data}>
				<div className={styles.info__part}>
					<p className={styles.info__label}>First name</p>
					<p className={styles.info__value}>{user.first_name}</p>
				</div>

				<div className={styles.info__part}>
					<p className={styles.info__label}>Second name</p>
					<p className={styles.info__value}>{user.last_name}</p>
				</div>

				<div className={styles.info__part}>
					<p className={styles.info__label}>Date of Birth</p>
					<p className={styles.info__value}>{user.birth_date}</p>
				</div>

				<div className={styles.info__part}>
					<p className={styles.info__label}>Gender</p>
					<p className={styles.info__value}>{user.gender}</p>
				</div>

				<div className={styles.info__part}>
					<p className={styles.info__label}>Profession</p>
					<p className={styles.info__value}>{user.job}</p>
				</div>

				<div className={styles.info__part}>
					<p className={styles.info__label}>Biography</p>
					<p className={styles.info__value}>{user.biography}</p>
				</div>

				<div className={`${styles.info__check}  ${user.is_active ? styles.active : ''}`}>
					<p className={styles.info__label}>{user.is_active ? 'Active' : 'Inactive'}</p>
				</div>
			</div>

			<div className={styles.info__btns}>
				<Link href={`/user/${user.id}`}>
					<a className={`${styles.buttonlink} ${styles.effect}`}>Edit</a>
				</Link>

				<div
					className={`${styles.buttonlink} ${styles.table__link_trash} ${styles.effect}`}
					onClick={() => delUser(user.id)}
				>
					Delete
				</div>
			</div>
		</div>
	);
};

export default InvoView;
