/**
 * external libs
 */
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
/**
 * styles
 */
import styles from './../../../styles/user.module.scss';

registerLocale('ru', ru);

const BirthDate: React.FunctionComponent<{
	pChange: (newval: string) => void;
	val: string;
}> = ({ pChange, val }) => {
	const dHandler: (d: Date | null) => void = (d) => {
		if (d) {
			const month: number = d.getMonth() + 1;
			const day: number = d.getDate();
			pChange(`${d.getFullYear()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
		}
	};

	return (
		<DatePicker
			locale='ru'
			selected={val ? new Date(val) : null}
			onChange={dHandler}
			dateFormat='yyyy-MM-dd'
			className={`${styles.user__input} ${styles.user__input_dp}`}
		/>
	);
};

export default BirthDate;
