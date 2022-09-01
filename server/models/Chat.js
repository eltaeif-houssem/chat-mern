import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
    messages: [
      {
        from: {
          type: mongoose.Types.ObjectId,
          ref: "users",
        },
        message: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("chats", chatSchema);
export default Chat;
