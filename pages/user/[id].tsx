/**
 * external libs
 */
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
/**
 * components
 */
import Page from './../../components/layouts/Page';
import UserView from './../../components/views/user/UserView';
/**
 * hooks
 */
import { useUser } from './../../utils/hooks/useUser';
/**
 * styles
 */
import styles from '../../styles/user.module.scss';

const User: NextPage = () => {
	const user = useUser();
	const router = useRouter();
	const id = router.query?.id;

	if (user === null) return null;

	return (
		<Page
			title={`User ${id === 'create' ? 'create' : 'uodate'}`}
			description='uTest - the best web app'
			keywords='web app'
			pageTitle={`${id === 'create' ? 'Creating a new user' : 'Editing user data'}`}
		>
			<div className={`${styles.user} container`}>
				{user || id === 'create' ? (
					<UserView user={user} />
				) : (
					<p className={styles.user__subdata}>
						User does not exist.{' '}
						<Link href='/'>
							<a className={`${styles.link} ${styles.effect}`}>Return</a>
						</Link>
					</p>
				)}
			</div>
		</Page>
	);
};

export default dynamic(() => Promise.resolve(User), {
	ssr: false,
});
