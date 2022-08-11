/**
 * external libs
 */
import { type } from 'os';
import React, { createContext, useState, useCallback } from 'react';
import { FaCheck, FaRegTimesCircle } from 'react-icons/fa';
/**
 * styles
 */
import styles from './../../styles/alert.module.scss';

export const AlertContext: React.Context<{
	showAlert: (text: string, type: string, duration?: number) => true;
}> = createContext({ showAlert: (text, type, duration) => true });

const AlertContextProvider: React.FunctionComponent<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [info, setInfo] = useState<{ text: string; type: string }>({
		text: '',
		type: 'success',
	});

	const showAlert = useCallback(
		(text: string, type: string, duration = 5000) => {
			setInfo({
				text,
				type,
			});
			setOpenAlert(true);

			setTimeout(() => {
				setOpenAlert(false);
			}, duration);

			return true;
		},
		[setOpenAlert, setInfo]
	);

	return (
		<AlertContext.Provider value={{ showAlert }}>
			{openAlert && (
				<div className={`${styles.alert} ${styles.slideInRight}`} onClick={() => setOpenAlert(false)}>
					<div
						className={`${styles.alert__content} ${
							info.type === 'success' ? styles.alert__content_green : styles.alert__content_red
						}`}
					>
						{info.type === 'success' ? <FaCheck /> : <FaRegTimesCircle />}

						<span>{info.text}</span>
					</div>
				</div>
			)}
			{children}
		</AlertContext.Provider>
	);
};

export default AlertContextProvider;
