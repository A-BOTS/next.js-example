/**
 * external libs
 */
import React from 'react';
import Link from 'next/link';
/**
 * components
 */
import Table from './Table';
/**
 * interfaces
 */
import { User } from '../../../types/interfaces';
/**
 * styles
 */
import styles from './../../../styles/home.module.scss';

const HomeView: React.FunctionComponent<{
	users: User[];
}> = ({ users }) => {
	return (
		<>
			<div className={styles.home__create}>
				<Link href='/user/create'>
					<a className={`${styles.buttonlink} ${styles.effect}`}>Add user</a>
				</Link>
			</div>

			<Table users={users} />
		</>
	);
};

export default HomeView;
