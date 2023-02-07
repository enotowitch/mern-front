import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { Link } from "react-router-dom"

import React, { useContext } from 'react';
import { Context } from '../../Context';


export const Header = () => {

	const { user, logout } = useContext(Context)


	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>ARCHAKOV BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{user ? (
							<>
								<Link to="/posts/create">
									<Button variant="contained">Написать статью</Button>
								</Link>
								<Button onClick={logout} variant="contained" color="error">
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">Войти</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Создать аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
