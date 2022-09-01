// Import styles
import { useSelector } from "react-redux";

const LeftSide = ({ friends, selectedFriend, setSelectedFriend }) => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="left-side">
      <div className="friends">
        {friends.map((friend, idx) => (
          <div
            className={`friend ${selectedFriend === idx && "firendSelected"}`}
            onClick={() => setSelectedFriend(idx)}
            key={idx}
          >
            <img
              src={`data:image/svg+xml;base64,${friend.avatar}`}
              alt="avatar"
            />
            <p>{friend.username}</p>
          </div>
        ))}
      </div>
      <div className="profile-section">
        <img src={`data:image/svg+xml;base64,${user.avatar}`} alt="avatar" />
        <p>{user.username}</p>
      </div>
    </div>
  );
};

export default LeftSide;
