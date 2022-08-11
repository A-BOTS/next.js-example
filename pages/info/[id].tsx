/**
 * external libs
 */
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
/**
 * components
 */
import Page from './../../components/layouts/Page';
import InvoView from './../../components/views/info/InvoView';
/**
 * hooks
 */
import { useUser } from './../../utils/hooks/useUser';
/**
 * styles
 */
import styles from '../../styles/info.module.scss';

const Info: NextPage = () => {
	const user = useUser();

	if (user === null) return null;

	return (
		<Page
			title='User info'
			description='uTest - the best web app'
			keywords='web app'
			pageTitle='User information'
		>
			<div className={`${styles.info} container`}>
				{user ? (
					<InvoView user={user} />
				) : (
					<p className={styles.info__subdata}>
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

export default dynamic(() => Promise.resolve(Info), {
	ssr: false,
});
