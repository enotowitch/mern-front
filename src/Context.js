import React, { useEffect, useState } from "react"
import axios from "./axios";

const Context = React.createContext()

function ContextProvider(props) {

	const [posts, postsSet] = useState([])
	const [tags, tagsSet] = useState([])
	const [user, userSet] = useState()

	// ! fetchInfo
	useEffect(() => {
		async function fetchInfo() {
			const { data: dataPost } = await axios.get("/post")
			const { data: dataTag } = await axios.get("/tags")
			postsSet(dataPost)
			tagsSet(dataTag)
		}
		fetchInfo()
	}, [])

	// ! login
	async function login(value) {
		const result = await axios.post("login", value)
		userSet(result.data)
		result && localStorage.setItem("token", result.data.token)
	}

	// ! fetchAuth
	useEffect(() => {
		async function fetchAuth() {
			const result = await axios.post("auth")
			userSet(result.data)
		}
		fetchAuth()
	}, [])

	// ! logout
	function logout() {
		userSet()
		localStorage.removeItem("token")
	}

	// ! register
	async function register(value) {
		const result = await axios.post("/register", value)
		userSet(result.data)
		result && localStorage.setItem("token", result.data.token) // todo
	}
	// ! removePost
	async function removePost(id) {
		await axios.delete(`post/${id}`)
		postsSet(prev => prev.filter(post => post._id !== id))
	}

	// ! RETURN
	return (
		<Context.Provider value={{ posts, postsSet, tags, tagsSet, login, register, logout, user, removePost }}>
			{props.children}
		</Context.Provider>
	)
}

export { ContextProvider, Context }