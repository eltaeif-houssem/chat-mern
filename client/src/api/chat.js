import axios from "./axios";

// Get a user friends
export const getFriends = () => axios.get("/chat/friends");

// Get a user chat
export const getChat = (id) => axios.get(`/chat/chat/${id}`);

// Add new message
export const addMessage = (chid, body) =>
  axios.post(`/chat/message/${chid}`, body);
