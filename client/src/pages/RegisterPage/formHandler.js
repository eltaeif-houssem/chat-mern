const formHandler = (
  username,
  email,
  password,
  passwordCnf,
  setSnackStatus
) => {
  if (!username || !email || !password || !passwordCnf) {
    setSnackStatus({
      status: true,
      severity: "warning",
      message: "all fields are required",
    });
    return false;
  }

  if (username.trim().length < 6) {
    setSnackStatus({
      status: true,
      severity: "warning",
      message: "username min length is 6",
    });
    return false;
  }

  if (
    !email.trim().length > 5 ||
    !email.includes("@") ||
    !email.includes(".")
  ) {
    setSnackStatus({
      status: true,
      severity: "warning",
      message: "please enter a valid email",
    });
    return false;
  }

  if (!password.trim().length > 6) {
    setSnackStatus({
      status: true,
      severity: "warning",
      message: "password min length is 6",
    });
    return false;
  }

  if (passwordCnf.trim() !== password.trim()) {
    setSnackStatus({
      status: true,
      severity: "warning",
      message: "passwords should be the same",
    });
    return false;
  }
  return true;
};

export default formHandler;
