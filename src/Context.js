import React, { useEffect, useState } from "react"
import axios from "./axios";

const Context = React.createContext()

function ContextProvider(props) {

	const [posts, postsSet] = useState([])
	const [tags, tagsSet] = useState([])
	const [user, userSet] = useState()

	useEffect(() => {
		async function fetchInfo() {
			const { data: dataPost } = await axios.get("/post")
			const { data: dataTag } = await axios.get("/tags")
			postsSet(dataPost)
			tagsSet(dataTag)
		}
		fetchInfo()
	}, [])

	async function login(value) {
		const result = await axios.post("login", value)
		userSet(result.data)
		result && localStorage.setItem("token", result.data.token)
	}

	useEffect(() => {
		async function fetchAuth() {
			const result = await axios.post("auth")
			userSet(result.data)
		}
		fetchAuth()
	}, [])

	function logout() {
		userSet()
	}


	// ! RETURN
	return (
		<Context.Provider value={{ posts, postsSet, tags, tagsSet, login, logout, user }}>
			{props.children}
		</Context.Provider>
	)
}

export { ContextProvider, Context }