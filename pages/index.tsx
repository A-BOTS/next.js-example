/**
 * external libs
 */
import type { NextPage } from 'next';
/**
 * components
 */
import Page from './../components/layouts/Page';
import HomeView from './../components/views/home/HomeView';
/**
 * utils
 */
import { sender } from './../utils/sender';
/**
 * data
 */
import { backServerUrl } from './../config';
/**
 * interfaces
 */
import { User } from './../types/interfaces';
/**
 * styles
 */
import styles from '../styles/home.module.scss';

const Home: NextPage<{
	users: User[] | null;
}> = ({ users }) => (
	<Page title='Home' description='uTest - the best web app' keywords='web app' pageTitle='List of users'>
		<div className={`${styles.home} container`}>
			<p className={`${styles.home__subdata} ${styles.home__subdata_mb}`}>
			This page is supposed to be seo-friendly, so I use ssr
			</p>

			{!!users && users.length > 0 ? (
				<HomeView users={users} />
			) : (
				<p className={styles.home__subdata}>User list is empty</p>
			)}
		</div>
	</Page>
);

export async function getServerSideProps() {
	const usersData = await sender(`${backServerUrl}/v1/contact/`);

	if (usersData?.res !== 'success' || !usersData?.data) {
		return {
			props: {
				users: null,
			},
		};
	}

	return {
		props: {
			users: usersData.data.map((user: User) => {
				const { id, first_name, last_name, birth_date, gender } = user;
				return { id, first_name, last_name, birth_date, gender };
			}),
		},
	};
}

export default Home;
