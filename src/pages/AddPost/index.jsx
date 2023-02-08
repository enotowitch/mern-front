import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

import { Link } from 'react-router-dom';

import React, { useEffect, useRef, useState } from 'react';
import axios from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';


export const AddPost = () => {

	const fileRef = useRef(null)

	const [imgUrl, imgUrlSet] = useState();
	const [text, textSet] = React.useState('');
	const [title, titleSet] = React.useState('');
	const [tags, tagsSet] = React.useState('');

	const navigate = useNavigate()
	const { id: updPostId } = useParams()

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
			tags
		}

		if (updPostId) {
			await axios.patch(`posts/${updPostId}/edit`, fields) // * update post
			navigate(`/posts/${updPostId}`)
		} else {
			const { data } = await axios.post("post", fields) // * create post
			navigate(`/posts/${data._id}`)
		}

	}

	// ! insert data from original post to updating post
	useEffect(() => {
		async function fetchPostToUpdate() {
			const { data } = await axios.get(`posts/${updPostId}`)
			imgUrlSet(data.imgUrl)
			textSet(data.text)
			titleSet(data.title)
			tagsSet(data.tags)
		}
		fetchPostToUpdate()
	}, [])

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
