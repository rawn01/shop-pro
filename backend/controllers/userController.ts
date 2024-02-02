import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import { signAndSetToken } from "../utils/generateToken";

// @desc: Auth user & get token
// @route: POST /api/users/login
// @access: Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if(!user || !(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  signAndSetToken(res, user._id);

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    ...(user.isAdmin && { isAdmin: user.isAdmin })
  });
});

// @desc: Register user & get token
// @route: POST /api/users/register
// @access: Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if(userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if(!user) {
    res.status(400);
    throw new Error("Invalid User");
  }

  signAndSetToken(res, user._id);

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  })
});

// @desc: Logout user & clear cookie
// @route: POST /api/users/logout
// @access: Private
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ message: "Logged out" });
});

// @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
  }); 
});

// @desc: Update user profile
// @route: PUT /api/users/profile
// @access: Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if(req.body.password) {
    user.password = req.body.password
  }

  const updatedUser = await user.save();

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  })
});

// @desc: Get all users
// @route: GET /api/users/
// @access: Private(Admin)
export const getAllUsers = asyncHandler(async (req, res) => {
  res.send("Get all users"); 
});

// @desc: Get user by ID
// @route: GET /api/users/:id
// @access: Private(Admin)
export const getUserById = asyncHandler(async (req, res) => {
  res.send("Get user " + req.params.id); 
});

// @desc: Delete user
// @route: DELETE /api/users/:id
// @access: Private(Admin)
export const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user " + req.params.id); 
});

// @desc: Update user by ID
// @route: PUT /api/users/:id
// @access: Private(Admin)
export const updateUser = asyncHandler(async (req, res) => {
  res.send("update user " + req.params.id); 
});