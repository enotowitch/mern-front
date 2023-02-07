import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";

import React, { useState, useContext } from "react";
import { Context } from "../../Context";
import { Navigate } from "react-router-dom"


export const Login = () => {

	const { login, user } = useContext(Context)

	const [value, valueSet] = useState({ email: "", password: "" })

	function onChange(e) {
		const { name, value } = e.target
		valueSet(prev => ({ ...prev, [name]: value }))
	}

	function onSubmit(e) {
		e.preventDefault()
		login(value)
	}

	if (user) {
		return <Navigate to="/" />
	}


	return (
		<form onSubmit={onSubmit}>
			<Paper classes={{ root: styles.root }}>
				<Typography classes={{ root: styles.title }} variant="h5">
					Вход в аккаунт
				</Typography>
				<TextField
					className={styles.field}
					label="E-Mail"
					fullWidth
					type="email"
					onChange={onChange}
					name="email"
					value={value.email}
				/>
				<TextField
					className={styles.field}
					label="Пароль"
					fullWidth
					onChange={onChange}
					name="password"
					value={value.password}
				/>
				<Button type="submit" size="large" variant="contained" fullWidth>
					Войти
				</Button>
			</Paper>
		</form>
	);
};
