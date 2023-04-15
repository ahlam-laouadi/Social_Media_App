const express = require("express");
const {
  createUser,
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserPhoto,
  addFollower,
  addFollowing,
  removeFollowing,
  removeFollower,
} = require("../controllers/user");
const {
  signin,
  requireSignin,
  hasAuthorization,
  signout,
} = require("../controllers/auth");
//chat
import { createChat, findChat, userChats } from '../controllers/ChatController.js';
import { addMessage, getMessages } from '../controllers/MessageController.js';
import { getRooms } from '../controllers/room.js';
const router = express.Router();

router.post("/api/users/create", createUser);
router.get("/api/user/:userId", getUser);
router.post("/api/auth/signin", signin);
router.get("/api/auth/signout", signout);
router.get("/api/users", requireSignin, getAllUsers);
router.get("/api/user/photo/:userId", getUserPhoto);
router.put("/api/users/:userId", requireSignin, hasAuthorization, updateUser);
router.delete(
  "/api/users/:userId",
  requireSignin,
  hasAuthorization,
  deleteUser
);
router
  .route("/api/user/add/follow")
  .put(requireSignin, addFollowing, addFollower);
router
  .route("/api/user/remove/follow")
  .put(requireSignin, removeFollowing, removeFollower);
//chat router
router.post('/', requireSignin,createChat);
router.get('/:userId',requireSignin, userChats);
router.get('/find/:firstId/:secondId',requireSignin, findChat);
router.post('/',requireSignin, addMessage);
router.get('/:chatId',requireSignin, getMessages);
// router.param("userId",requireSignin, getUserById);

//chat
router.get('/rooms',requireSignin, getRooms);

module.exports = router;