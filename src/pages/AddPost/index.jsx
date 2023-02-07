import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

import { Link } from 'react-router-dom';

import React, { useRef, useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';


export const AddPost = () => {

	const fileRef = useRef(null)

	const [imgUrl, imgUrlSet] = useState();
	const [text, textSet] = React.useState('test text');
	const [title, titleSet] = React.useState('TEST TITLE');
	const [tags, tagsSet] = React.useState('tag 1, tag 2, tag 3');

	const navigate = useNavigate()

	// ! handleChangeFile
	const handleChangeFile = async (e) => {
		const formData = new FormData()
		formData.append("image", e.target.files[0])

		const { data: img } = await axios.post("upload", formData)
		imgUrlSet(img.url)
	};

	// ! submitPost (create post)
	async function submitPost(e) {
		e.preventDefault()

		const fields = {
			imgUrl,
			text,
			title,
			tags: tags.split(",")
		}
		const { data } = await axios.post("post", fields) // * create post
		navigate(`/posts/${data._id}`)
	}

	const onClickRemoveImage = () => { };

	const onChange = React.useCallback((text) => {
		textSet(text);
	}, []);

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	);

	return (
		<form onSubmit={submitPost}>
			<Paper style={{ padding: 30 }}>
				<Button variant="outlined" size="large" onClick={() => fileRef?.current?.click()}>
					Загрузить превью
				</Button>

				<input ref={fileRef} type="file" onChange={handleChangeFile} hidden />

				{imgUrl && (
					<Button variant="contained" color="error" onClick={onClickRemoveImage}>
						Удалить
					</Button>
				)}
				{imgUrl && (
					<img className={styles.image} src={`http://localhost:1111/${imgUrl}`} alt="Uploaded" />
				)}
				<br />
				<br />
				<TextField
					classes={{ root: styles.title }}
					variant="standard"
					placeholder="Заголовок статьи..."
					fullWidth
					value={title}
					onChange={(e) => titleSet(e.target.value)}
				/>
				<TextField
					classes={{ root: styles.tags }}
					variant="standard"
					placeholder="Тэги"
					fullWidth
					value={tags}
					onChange={(e) => tagsSet(e.target.value)}
				/>
				<SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
				<div className={styles.buttons}>
					<Button size="large" variant="contained" type="submit">
						Опубликовать
					</Button>
					<Link to="/">
						<Button size="large">Отмена</Button>
					</Link>
				</div>
			</Paper>
		</form>
	);
};
