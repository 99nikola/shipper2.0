import "./auth.css"
import axios from "axios"
import { AuthContext } from "../../context/auth/AuthContext";
import { useContext, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { REGISTER_SUCCESS } from "../../context/auth/AuthActions";
import { setAuthorizationToken } from "../../utils/utils";

const Register = () => {

    const [ name, username, email, password, passCheck ] = [ useRef(), useRef(), useRef(), useRef(), useRef() ]
    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password.current.value !== passCheck.current.value) {
            passCheck.current.setCustomValidity("Paswords don't match!");
            passCheck.current.reportValidity();
            setTimeout(() => passCheck.current.setCustomValidity(""), 1000);
            return;
        }

        const user = {
            username: username.current.value.trim(),
            email: email.current.value.trim(),
            password: password.current.value,
            name: name.current.value.trim()
        }

        try {
            const { data } = await axios.post("http://localhost:3030/api/auth/register", user);
            dispatch({ type: REGISTER_SUCCESS, payload: data.user });

            localStorage.setItem("shipperToken", data.token);
            setAuthorizationToken(data.token);
            history.push("/");
        } catch (err) {
            if (err.response.status === 409) {
                const data = err.response.data;
                switch (data.errorCode) {
                    case 0: 
                        username.current.setCustomValidity(data.message);
                        username.current.reportValidity();
                        setTimeout(() => username.current.setCustomValidity(""), 1000);
                        break;
                    case 1: 
                        email.current.setCustomValidity(data.message);
                        email.current.reportValidity();
                        setTimeout(() => email.current.setCustomValidity(""), 1000);
                        break;
                    default:
                        console.log("Bad server code");
                        break;
                }
            } else {
                console.log(err);
            }
        }
    }

    return (
    <div className="auth-container">

        <div className="logo-form">
            <h1>Shipper</h1>
        </div>


        <form className="form-container" onSubmit={submitHandler}>
            <h3 className="header">Create account</h3>
            
            <div className="form-item">
                <input 
                    placeholder="Name"
                    type="text"
                    name="name" 
                    required
                    minLength="3"
                    className="input-item"
                    ref={name}
                    // pattern={/\w{1}(\w{1,}|\d{1,})/}
                    />
            </div>

            <div className="form-item">
                <input 
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                    className="input-item" 
                    ref={email}
                    />
            </div>

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
                    placeholder="Re-enter password"
                    type="password" 
                    name="pass-check" 
                    required
                    minLength="6"
                    className="input-item" 
                    ref={passCheck}
                    />
            </div>

            <div className="form-item">
                <input 
                    type="submit" 
                    value="Register" 
                    className="form-button"
                    />
            </div>
        </form>
        
        <Link to="/login">
            <div className="insted">
                <button className="insted-button">Login insted</button>
            </div>
        </Link>

        <hr className="end-line"/>
        
    </div>
    )
}

export default Register
