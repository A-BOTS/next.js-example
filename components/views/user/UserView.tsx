/**
 * external libs
 */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
/**
 * components
 */
import BirthDate from './BirthDate';
import Gender from './Gender';
/**
 * utils
 */
import { sender } from './../../../utils/sender';
import { userSchema } from './../../../utils/yup.schemes';
/**
 * context
 */
import { AlertContext } from './../../common/alert.context';
/**
 * data
 */
import { backServerUrl } from './../../../config';
/**
 * interfaces
 */
import { User } from '../../../types/interfaces';
/**
 * styles
 */
import styles from './../../../styles/user.module.scss';

const UserView: React.FunctionComponent<{
	user: User | false;
}> = ({ user }) => {
	const {
		register,
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm<User>({
		mode: 'onBlur',
		resolver: yupResolver(userSchema),
	});

	const router = useRouter();
	const { showAlert } = useContext(AlertContext);

	const subForm: SubmitHandler<User> = async (data) => {
		const usrRes =
			user && user.id
				? await sender(`${backServerUrl}/v1/contact/${user.id}/`, 'PUT', { ...data, id: user.id })
				: await sender(`${backServerUrl}/v1/contact/`, 'POST', data);

		if (usrRes?.res !== 'success') {
			const dataRes: { [key: string]: string[] } = usrRes?.data?.data;

			if (dataRes && typeof dataRes === 'object' && Object.keys(dataRes).length > 0) {
				Object.keys(dataRes).forEach((key) => {
					const errorsField: string[] = dataRes[key];
					const fields: string[] = [
						'first_name',
						'last_name',
						'birth_date',
						'gender',
						'job',
						'biography',
						'is_active',
					];

					if (errorsField && Array.isArray(errorsField) && errorsField.length > 0) {
						if (fields.includes(key)) {
							// @ts-ignore
							setError(key, { type: 'manual', message: errorsField[0] });
						}
					}
				});
			}
		} else {
			showAlert(`${user && user.id ? 'Data changed' : 'User created'}`, 'success');
			router.replace('/');
		}
	};

	return (
		<form noValidate className={styles.user__form} autoComplete='off' onSubmit={handleSubmit(subForm)}>
			<div className={styles.user__part}>
				<label htmlFor='first_name' className={styles.user__label}>
					First name
				</label>
				<input
					id='first_name'
					defaultValue={user ? user.first_name : ''}
					placeholder='Enter your first name'
					{...register('first_name')}
					className={styles.user__input}
				/>

				{!!errors.first_name?.message && <p className={styles.user__err}>{errors.first_name.message}</p>}
			</div>

			<div className={styles.user__part}>
				<label htmlFor='last_name' className={styles.user__label}>
					Second name
				</label>
				<input
					id='last_name'
					defaultValue={user ? user.last_name : ''}
					placeholder='Enter your second name'
					{...register('last_name')}
					className={styles.user__input}
				/>

				{!!errors.last_name?.message && <p className={styles.user__err}>{errors.last_name.message}</p>}
			</div>

			<div className={styles.user__part}>
				<p className={styles.user__label}>Birth date</p>

				<Controller
					name='birth_date'
					control={control}
					defaultValue={user ? user.birth_date : ''}
					render={({ field }) => (
						<BirthDate pChange={(newval: string) => field.onChange(newval)} val={field.value} />
					)}
				/>

				{!!errors.birth_date?.message && <p className={styles.user__err}>{errors.birth_date.message}</p>}
			</div>

			<div className={styles.user__part}>
				<p className={styles.user__label}>Пол</p>

				<Controller
					name='gender'
					control={control}
					defaultValue={user ? user.gender : ''}
					render={({ field }) => (
						<Gender pChange={(newval: string) => field.onChange(newval)} val={field.value} />
					)}
				/>

				{!!errors.gender?.message && <p className={styles.user__err}>{errors.gender.message}</p>}
			</div>

			<div className={styles.user__part}>
				<label htmlFor='job' className={styles.user__label}>
					Профессия
				</label>
				<input
					id='job'
					defaultValue={user ? user.last_name : ''}
					placeholder='Specify a profession'
					{...register('job')}
					className={styles.user__input}
				/>

				{!!errors.job?.message && <p className={styles.user__err}>{errors.job.message}</p>}
			</div>

			<div className={styles.user__part}>
				<label htmlFor='biography' className={styles.user__label}>
					Биография
				</label>
				<textarea
					id='biography'
					defaultValue={user ? user.last_name : ''}
					placeholder='Tell us about yourself'
					{...register('biography')}
					className={`${styles.user__input} ${styles.user__input_ta}`}
				/>

				{!!errors.biography?.message && <p className={styles.user__err}>{errors.biography.message}</p>}
			</div>

			<div className={styles.user__part}>
				<p className={styles.user__label}>Activity</p>

				<Controller
					name='is_active'
					control={control}
					defaultValue={user ? user.is_active : false}
					render={({ field }) => (
						<div
							className={`${styles.user__check} ${field.value ? styles.active : ''} ${styles.effect}`}
							onClick={() => field.onChange(!field.value)}
						>
							<span>{field.value ? 'Active' : 'Inactive'}</span>
						</div>
					)}
				/>
			</div>

			<div className={styles.user__part}>
				<button type='submit' className={`${styles.buttonlink} ${styles.effect}`}>
					{user ? 'Save' : 'Create'}
				</button>
			</div>
		</form>
	);
};

export default UserView;
