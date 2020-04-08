const express = require("express");
const multer = require("multer");
const Profile = require("../controllers/Profile");
const redis = require("../helpers/redis");
const jwtCheck = require("../helpers/jwt");
const Route = express.Router();

const storageAdmin = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./public/images/profile");
  },
  filename: (request, file, callback) => {
    let filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    callback(null, "admin-" + filetype);
  },
});

const storageUsers = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./public/images/profile");
  },
  filename: (request, file, callback) => {
    let filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    callback(null, "seller-" + filetype);
  },
});

const uploadAdmin = multer({
  storage: storageAdmin,
});

const uploadUsers = multer({
  storage: storageUsers,
});

Route.get("/:id", redis.checkCache, Profile.getProfile);
Route.post("/", jwtCheck.CheckToken, Profile.createProfile);
Route.patch("/", jwtCheck.CheckToken, Profile.updateProfile);
Route.delete("/", jwtCheck.CheckToken, Profile.deleteProfile);
Route.patch(
  "/upload-buyer",
  jwtCheck.CheckToken,
  uploadAdmin.single("image"),
  Profile.uploadAdmin
);
Route.patch(
  "/upload-seller",
  jwtCheck.CheckToken,
  uploadUsers.single("image"),
  Profile.uploadUsers
);

module.exports = Route;
