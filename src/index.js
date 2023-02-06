import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom"
import { ContextProvider } from "./Context";

import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<ContextProvider>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<Router>
				<App />
			</Router>
		</ThemeProvider>
	</ContextProvider>
);
