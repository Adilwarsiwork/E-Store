const express = require("express");
const adminrouter = express.Router();

const { adminsignup } = require("../.././controler/admin/adminauthcontroler");
const { adminsignin } = require("../.././controler/admin/adminauthcontroler");

adminrouter.post("/admin/signup", adminsignup);
adminrouter.post("/admin/signin", adminsignin);

module.exports = adminrouter;
