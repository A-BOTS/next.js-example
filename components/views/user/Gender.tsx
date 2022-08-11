/**
 * external libs
 */
import Select, { SingleValue } from 'react-select';

interface GenderOptions {
	value: string;
	label: string;
}

const options = [
	{ value: 'male', label: 'male' },
	{ value: 'female', label: 'female' },
];

const Gender: React.FunctionComponent<{
	pChange: (newval: string) => void;
	val: string;
}> = ({ pChange, val }) => {
	const dHandler = (newValue: SingleValue<GenderOptions>) => {
		if (newValue) {
			pChange(newValue.value);
		}
	};

	return (
		<Select
			options={options}
			value={val ? { value: val, label: val } : null}
			onChange={dHandler}
			placeholder={'Select a gender'}
			classNamePrefix='gender'
		/>
	);
};

export default Gender;
