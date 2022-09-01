import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import { Buffer } from "buffer/";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/user";
import { useNavigate } from "react-router-dom";

// Import components
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SimpleBackdrop from "../../components/SimpleBackdrop";

// Import styles
import "./SetAvatarPage.css";
// Define snack model
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialSnackStatus = {
  status: false,
  severity: "",
  message: "",
};

const SetAvatarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define states
  const [snackStatus, setSnackStatus] = useState(initialSnackStatus);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const TAB = [];
      for (let i = 0; i < 5; i++) {
        const { data } = await axios.get(
          `https://api.multiavatar.com/${Math.floor(Math.random() * 2000) + 1}`,
          {
            withCredentials: false,
          }
        );
        const buffer = new Buffer(data).toString("base64");
        TAB.push(buffer);
      }
      setAvatars(TAB);
      setLoading(false);
    };
    fetchData();
  }, []);

  const setAvatarHandler = () => {
    if (selectedAvatar === null) {
      setSnackStatus({
        status: true,
        severity: "warning",
        message: "please select an avatar",
      });
      return;
    }

    const body = {
      avatar: avatars[selectedAvatar],
    };

    dispatch(updateUser(body, navigate));
  };

  return isLoading ? (
    <SimpleBackdrop />
  ) : (
    <div className="set-avatar-page">
      <div className="avatars">
        {avatars.map((avatar, idx) => (
          <div
            className={`avatar ${selectedAvatar === idx && "selected"}`}
            onClick={() => setSelectedAvatar(idx)}
            key={idx}
          >
            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
          </div>
        ))}
      </div>
      <button onClick={setAvatarHandler} className="set-avatar-btn">
        {selectedAvatar === null
          ? "Please select an avatar"
          : "Set as profile picture"}
      </button>
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

export default SetAvatarPage;
