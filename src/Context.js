import React, { useEffect, useState } from "react"
import axios from "./axios";

const Context = React.createContext()

function ContextProvider(props) {

	const [posts, postsSet] = useState([])
	const [tags, tagsSet] = useState([])

	useEffect(() => {
		async function fetch() {
			const { data: dataPost } = await axios.get("/post")
			const { data: dataTag } = await axios.get("/tags")
			postsSet(dataPost)
			tagsSet(dataTag)
		}
		fetch()
	}, [])

	return (
		<Context.Provider value={{ posts, postsSet, tags, tagsSet }}>
			{props.children}
		</Context.Provider>
	)
}

export { ContextProvider, Context }