import axios from "./axios.js";

/****** User auth *******/
// register a user
export const register = (body) => axios.post("/auth/register", body);

// login a user
export const login = (body) => axios.post("/auth/login", body);

// logout a user
export const logout = () => axios.delete("/auth/logout");

/****** User data *******/
// get user data
export const getUser = () => axios.get("/user/user");

// update a user
export const updateUser = (body) => axios.patch("/user/user", body);

// delete a user
export const deleteUser = () => axios.delete("/user/user");
