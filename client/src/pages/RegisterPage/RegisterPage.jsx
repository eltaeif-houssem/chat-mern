import { useState, forwardRef, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../actions/user";
import formHandler from "./formHandler";

// Import components
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Import styles
import "./RegisterPage.css";

// Define snack model
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialSnackStatus = {
  status: false,
  severity: "",
  message: "",
};

const RegisterPage = () => {
  const dispatch = useDispatch();

  // Define states
  const [snackStatus, setSnackStatus] = useState(initialSnackStatus);
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordConfShow, setPasswordConfShow] = useState(false);

  // Define input refs
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCnfRef = useRef();

  // Form submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordCnf = passwordCnfRef.current.value;

    if (!formHandler(username, email, password, passwordCnf, setSnackStatus)) {
      return;
    }

    const body = {
      username,
      email,
      password,
    };

    dispatch(register(body, setSnackStatus));
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <div className="register-form-box">
          <div>
            <i className="fa-solid fa-user"></i>
          </div>
          <input
            type="text"
            placeholder="Username"
            autoFocus
            ref={usernameRef}
          />
        </div>

        <div className="register-form-box">
          <div>
            <i className="fa-solid fa-envelope"></i>
          </div>
          <input type="text" placeholder="Email" ref={emailRef} />
        </div>

        <div className="register-form-box">
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

        <div className="register-form-box">
          <div>
            <i className="fa-solid fa-lock"></i>
          </div>
          <input
            type={passwordConfShow ? "text" : "password"}
            placeholder="Confirm password"
            ref={passwordCnfRef}
          />
          <div onClick={() => setPasswordConfShow(!passwordConfShow)}>
            {passwordConfShow ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </div>
        </div>
        <p>
          Already have an account?{" "}
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
        <button>Create Account</button>
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

export default RegisterPage;
