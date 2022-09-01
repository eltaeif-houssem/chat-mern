const formHandler = (email, password, setSnackStatus) => {
  if (!email || !password) {
    setSnackStatus({
      status: true,
      severity: "warning",
      message: "all fields are required",
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

  return true;
};

export default formHandler;
