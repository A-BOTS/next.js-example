/**
 * external libs
 */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
/**
 * utils
 */
import { frontServerUrl } from '../../config';
/**
 * styles
 */
import styles from '../../styles/page.module.scss';

const Page: React.FunctionComponent<{
	title: string;
	description: string;
	keywords: string;
	children: React.ReactNode;
	pageTitle: string;
}> = ({ title, description, keywords, pageTitle, children }) => {
	return (
		<>
			<header className={styles.header}>
				<Head>
					<title>{`A-BOTS - ${title}`}</title>
					{process.env.NODE_ENV === 'development' ? <meta name='robots' content='noindex, nofollow' /> : null}
					<meta name='keywords' content={keywords || ''} />
					<meta name='description' content={description || ''} />
					<meta name='format-detection' content='telephone=no' />
					<meta name='theme-color' content='#000000' />

					<link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
					<link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
					<link rel='manifest' href='/manifest.json' />
					<link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
					<link rel='shortcut icon' href='/favicon.ico' />

					<meta name='twitter:card' content='summary' />
					<meta name='twitter:url' content={frontServerUrl} />
					<meta name='twitter:title' content='A-BOTS' />
					<meta name='twitter:description' content={description || ''} />
					<meta name='twitter:image' content={`${frontServerUrl}/icons/android-chrome-192x192.png`} />
					<meta name='twitter:creator' content='@alexd' />

					<meta property='og:type' content='website' />

					<meta
						name='viewport'
						content='initial-scale=1.0, maximum-scale=1.0, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
					/>

					<meta property='og:url' content={`${frontServerUrl}/`} key='ogurl' />

					<meta property='og:image' content={`${frontServerUrl}/icons/oglogo.png`} key='ogimage' />
					<meta property='og:image:secure_url' content={`${frontServerUrl}/oglogo.jpg`} />
					<meta property='og:image:type' content='image/jpeg' />
					<meta property='og:image:width' content='152' />
					<meta property='og:image:height' content='152' />
					<meta property='og:site_name' content='A-BOTS' key='ogsitename' />
					<meta property='og:title' content={`A-BOTS - ${title}`} key='ogtitle' />
					<meta property='og:description' content={description || ''} key='ogdesc' />
					<link rel='icon' href='/favicon.ico' />
					<link rel='canonical' href={`${frontServerUrl}/`} />
				</Head>

				<div className='container'>
					<Link href='/'>
						<a className={`${styles.logo} ${styles.effect}`}>
							<img src='/logo.svg' alt='A-BOTS' className={styles.logo__img} />
						</a>
					</Link>
				</div>
			</header>

			<main className={styles.main}>
				<h1 className={`${styles.main__title} container`}>{pageTitle}</h1>
				{children}
			</main>

			<footer className={styles.footer}>
				<div className={`${styles.footer__container} container`}>
					<Link href='/'>
						<a className={`${styles.logo} ${styles.effect}`}>
							<img src='/logo_white.svg' alt='A-BOTS' className={styles.logo__img} />
						</a>
					</Link>

					<p className={styles.footer__conf}>2022 © A-BOTS</p>
				</div>
			</footer>
		</>
	);
};

export default Page;
