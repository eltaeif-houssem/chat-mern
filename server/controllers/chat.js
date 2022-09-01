import User from "../models/User.js";
import Chat from "../models/Chat.js";

// Get a users friends
export const getFriends = async (req, res, next) => {
  const { uid } = req.user;
  try {
    const friends = await User.find(
      {
        _id: {
          $not: {
            $eq: uid,
          },
        },
      },
      {
        password: 0,
        email: 0,
      }
    );
    res.status(200).send(friends);
  } catch (e) {
    next(e);
  }
};

// Get a users specific chat
export const getChat = async (req, res, next) => {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const chatExist = await Chat.findOne(
      {
        users: {
          $all: [id, uid],
        },
      },
      {
        users: 0,
      }
    ).sort({ updatedAt: 1 });

    if (chatExist) {
      return res.status(200).send(chatExist);
    }

    const newChat = await Chat.create({ users: [id, uid] });
    delete newChat._doc.users;
    res.status(201).send(newChat);
  } catch (e) {
    next(e);
  }
};

// Add a new message
export const addMessage = async (req, res, next) => {
  const { chid } = req.params;
  const body = req.body;
  delete body.to;
  try {
    await Chat.findByIdAndUpdate(chid, {
      $push: {
        messages: body,
      },
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
