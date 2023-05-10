const express = require("express");
const userrouter = express.Router();

const { userSignup } = require(".././controler/userauthcontroler");
const { userSignin } = require(".././controler/userauthcontroler");

userrouter.post("/signup", userSignup);
userrouter.post("/signin", userSignin);

module.exports = userrouter;
