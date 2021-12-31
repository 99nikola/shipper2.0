import { Login, Register, Home } from "./pages/Pages";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { setAuthorizationToken, useSingleton } from "./utils/utils";
import { AuthContext } from "./context/auth/AuthContext";
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from "./context/auth/AuthActions";
import axios from "axios";

const App = () => {

	const { loggedIn, dispatch } = useContext(AuthContext);

	useSingleton(() => {
		const token = localStorage.getItem("shipperToken");
		if (token === null) return;
		setAuthorizationToken(token);
	});

	useLayoutEffect(() => {
		if (loggedIn) return;

		(async () => {
			dispatch({ type: LOGIN_START });
			try {
				const { data } = await axios.get("http://localhost:3030/api/users/currentUser");
				dispatch({ type: LOGIN_SUCCESS, payload: data.user });
			} catch (err) {
				dispatch({ type: LOGIN_FAILURE, payload: err });
			}
		})();

		return () => dispatch({ type: LOGOUT });
	}, []);

	return (
    	<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route path="/" component={Home} />
			</Switch>
		</BrowserRouter>
  	)
}

export default App
