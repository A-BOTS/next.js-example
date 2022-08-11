import * as yup from 'yup';

export const userSchema = yup.object().shape({
	first_name: yup.string().max(256, 'Maximum name length 256 characters').required('Name must be entered'),
	last_name: yup.string().max(256, 'Maximum last name length 256 characters').required('Last name must be entered'),
	birth_date: yup.string().required('You must select a date of birth'),
	gender: yup.string().required('You must select a gender'),
	job: yup.string().max(256, 'The maximum length of the profession name is 256 characters').required('Place of work required'),
	biography: yup.string().max(1024, 'Maximum biography text length 1024 characters').required('You must enter information about yourself'),
});
