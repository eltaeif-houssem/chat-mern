import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getFriends } from "../../api/chat.js";

// Import styles
import "./HomePage.css";
import LeftSide from "./LeftSide/LeftSide.jsx";
import RightSide from "./RightSide/RightSide.jsx";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);

  // Define states
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Fetch user friends
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getFriends();
      setFriends(data);
    };
    fetchData();
  }, []);

  return !user.avatar ? (
    <Navigate to="/setavatar" />
  ) : (
    <div className="home-page">
      <LeftSide
        friends={friends}
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
      />

      <RightSide friends={friends} selectedFriend={selectedFriend} />
    </div>
  );
};

export default HomePage;
