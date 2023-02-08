import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Routes, Route } from "react-router-dom"

function App() {
	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/posts/:id" element={<FullPost />} />
					<Route exact path="/addpost" element={<AddPost />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/register" element={<Registration />} />
					<Route exact path="/posts/:id/edit" element={<AddPost />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
