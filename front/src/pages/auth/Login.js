import "./auth.css"

import { useContext, useRef, useState } from "react"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import { AuthContext } from "../../context/auth/AuthContext"
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from "../../context/auth/AuthActions"
import { setAuthorizationToken } from "../../utils/utils"
import { ShippingContext } from "../../context/shipping/ShippingContext"
import { NEXT_STEP } from "../../context/shipping/ShippingActions"


const Login = () => {
    
    const username = useRef();
    const password = useRef();
    
    const { isFetching, dispatch } = useContext(AuthContext);
    const history = useHistory();

    const { dispatch: shippingDisaptch } = useContext(ShippingContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const userCredentials = {
            username: username.current.value,
            password: password.current.value
        }

        dispatch({ type: LOGIN_START });

        try {
            const { data } = await axios.post("http://localhost:3030/api/auth/login", userCredentials);
            dispatch({ type: LOGIN_SUCCESS, payload: data.user });

            localStorage.setItem("shipperToken", data.token);
            setAuthorizationToken(data.token);

            const location = history.location.pathname;
            if (location === "/login") {
                history.push("/");
            } else {
                shippingDisaptch({ type: NEXT_STEP });
            }
        } catch (err) {
            dispatch({ type: LOGIN_FAILURE, payload: err });
            const data = err.response.data;

            switch (err.response.status) {
                case 404:
                    username.current.setCustomValidity(data.message);
                    username.current.reportValidity();
                    setTimeout(() => username.current.setCustomValidity(""), 1000);
                    break;
                case 403:
                    password.current.setCustomValidity(data.message);
                    password.current.reportValidity();
                    setTimeout(() => password.current.setCustomValidity(""), 1000);
                    break;
                default:
                    console.log(err);
                    break;
            }
        }
    }


    return (
        <div className="auth-container">
            <div className="logo-form">
                <h1>Shipper</h1>
            </div>


            <form className="form-container" onSubmit={submitHandler}>
                <h3 className="header">Login</h3>
                
                <div className="form-item">
                    <input 
                        placeholder="Username"
                        type="text" 
                        name="username"
                        required
                        minLength="3" 
                        className="input-item" 
                        ref={username}
                        />
                </div>                

                <div className="form-item">
                    <input 
                        placeholder="Password"
                        type="password" 
                        name="pass" 
                        required
                        minLength="6"
                        className="input-item" 
                        ref={password}
                        />
                </div>

                <div className="form-item">
                    <input 
                        type="submit" 
                        value={isFetching ? "Loading" : "Login"} 
                        className="form-button"
                        disabled={isFetching}
                    />
                </div>
            </form>
            
            <Link to="/register">
                <div className="insted">
                    <button 
                    className="insted-button"
                    disabled={isFetching}
                    >Register insted</button>
                </div>    
            </Link>

            <hr className="end-line"/>
            
        </div>
    )
}

export default Login
