import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser
} from "../controllers/userController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, admin, getAllUsers).post(registerUser);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

export default router;