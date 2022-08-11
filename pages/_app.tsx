/**
 * external libs
 */
import type { AppProps } from 'next/app';
/**
 * context
 */
import AlertContextProvider from './../components/common/alert.context';
/**
 * styles
 */
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AlertContextProvider>
			<Component {...pageProps} />
		</AlertContextProvider>
	);
}

export default MyApp;
