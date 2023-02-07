import axios from "axios"

const instance = axios.create({
	baseURL: "http://localhost:1111/"
})

instance.interceptors.request.use(config => {
	config.headers.authorization = localStorage.getItem("token")
	return config
}) // * MANDATORY add token to each axios query (config.headers.authorization)

export default instance