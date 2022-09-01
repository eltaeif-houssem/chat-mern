import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/user";
import { io } from "socket.io-client";
import { getChat, addMessage } from "../../../api/chat.js";

// Import components
import Picker from "emoji-picker-react";

const RightSide = ({ friends, selectedFriend }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // Define refs
  const socket = useRef();
  const scrollBox = useRef();
  const messageRef = useRef();

  // Define states
  const [currentChat, setCurrentChat] = useState({
    messages: [],
  });

  const [showEmoji, setShowEmoji] = useState(false);

  // Scroll to bottom function
  const scrollToBottom = () => {
    scrollBox.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Logout a user
  const logoutHandler = () => {
    dispatch(logout());
  };

  // select an emoji
  const onEmojiClick = (event, emojiObject) => {
    messageRef.current.value += emojiObject.emoji;
  };

  // Add user to socket server
  useEffect(() => {
    socket.current = io("https://portfolio-chat-web-app.herokuapp.com", {
      withCredentials: true,
    });
    socket.current.emit("new-user", user._id);
  }, [user]);

  // Scroll to bottom when messages comes
  useEffect(() => {
    scrollToBottom();
  }, []);

  // Handle socket new messages
  useEffect(() => {
    socket.current.on("msg-recieved", (data) => {
      setCurrentChat({
        ...currentChat,
        messages: [...currentChat.messages, data],
      });
      scrollToBottom();
    });
  }, [socket, currentChat]);

  // Fetch chat messages
  useEffect(() => {
    const fetchData = async () => {
      if (selectedFriend !== null) {
        const { data } = await getChat(friends[selectedFriend]._id);
        setCurrentChat(data);
      }
    };
    fetchData();
  }, [friends, selectedFriend]);

  // send new message handler
  const sendMessageHandler = async () => {
    const message = messageRef.current.value;
    if (!message || selectedFriend === null) {
      return;
    }

    const chid = currentChat._id;

    const body = {
      from: user._id,
      to: friends[selectedFriend]._id,
      message,
    };

    await addMessage(chid, body);

    socket.current.emit("new-msg", body);

    delete body.to;

    setCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, body],
    });

    messageRef.current.value = "";

    scrollToBottom();
  };

  return (
    <div className="right-side">
      <header>
        {selectedFriend === null ? (
          <div></div>
        ) : (
          <div>
            <img
              src={`data:image/svg+xml;base64,${friends[selectedFriend].avatar}`}
              alt="avatar"
            />
            <p>{friends[selectedFriend].username}</p>
          </div>
        )}

        <button onClick={logoutHandler}>
          <i className="fa-solid fa-power-off"></i>
        </button>
      </header>
      <section>
        {currentChat.messages.map((message, idx) => (
          <div
            className={`message-box ${user._id === message.from && "sent-box"}`}
            key={idx}
          >
            <p className={`msg ${user._id === message.from && "msg-sent"}`}>
              {message.message}
            </p>
          </div>
        ))}
        <div className="scroll-down-box" ref={scrollBox}></div>
      </section>
      <footer>
        {showEmoji && (
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{
              position: "absolute",
              bottom: "90px",
              left: "0px",
            }}
            disableSearchBar={true}
          />
        )}

        <div>
          <button onClick={() => setShowEmoji(!showEmoji)}>
            <i className="fa-solid fa-icons"></i>
          </button>
          <input type="text" ref={messageRef} />
        </div>
        <button onClick={sendMessageHandler}>
          Send <i className="fa-solid fa-paper-plane"></i>
        </button>
      </footer>
    </div>
  );
};

export default RightSide;
