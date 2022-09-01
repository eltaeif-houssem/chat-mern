import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user.js";
import formHandler from "./formHandler.js";

// Import components
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Import styles
import "./LoginPage.css";
import { useRef } from "react";

// Define snack model
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialSnackStatus = {
  status: false,
  severity: "",
  message: "",
};

const LoginPage = () => {
  const dispatch = useDispatch();

  // Define satates
  const [snackStatus, setSnackStatus] = useState(initialSnackStatus);
  const [passwordShow, setPasswordShow] = useState(false);

  // Define input refs
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!formHandler(email, password, setSnackStatus)) {
      return;
    }

    const body = {
      email,
      password,
    };

    dispatch(login(body, setSnackStatus));
  };

  const loginAsGuest = () => {
    emailRef.current.value = "guest@email.com";
    passwordRef.current.value = "123456";
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div className="login-form-box">
          <div>
            <i className="fa-solid fa-envelope"></i>
          </div>
          <input type="text" placeholder="Email" ref={emailRef} />
        </div>

        <div className="login-form-box">
          <div>
            <i className="fa-solid fa-lock"></i>
          </div>
          <input
            type={passwordShow ? "text" : "password"}
            placeholder="Password"
            ref={passwordRef}
          />
          <div onClick={() => setPasswordShow(!passwordShow)}>
            {passwordShow ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </div>
        </div>
        <p>
          You don't have an account yet?{" "}
          <span>
            <Link to="/register">Register</Link>
          </span>
        </p>
        <button>Login</button>
        <button className="login-guest-btn" onClick={loginAsGuest}>
          Login as guest
        </button>
      </form>
      <Snackbar
        open={snackStatus.status}
        autoHideDuration={6000}
        onClose={() => setSnackStatus({ ...snackStatus, status: false })}
      >
        <Alert
          severity={snackStatus.severity}
          sx={{ width: "100%" }}
          onClose={() => setSnackStatus({ ...snackStatus, status: false })}
        >
          {snackStatus.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
