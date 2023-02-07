import React from 'react';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import UserForm from '../UserForm';

export const Registration = () => {

	return (
		<UserForm title="Создание аккаунта" action="register" >

			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<TextField
				className={styles.field}
				label="Полное имя"
				fullWidth
			/>
			
		</UserForm>
	)
};
