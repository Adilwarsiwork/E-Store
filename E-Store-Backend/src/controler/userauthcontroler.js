const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

exports.userSignup = async (req, res) => {
  console.log("hello from user sign signup");

  const checkemail = await req.body.email;

  const _email = await User.findOne({ email: checkemail });

  if (_email) {
    res.send({ msg: "user already exist" });
  } else {
    const { firstName, lastName, username, email, password, contactNumber } =
      await req.body;

    const data = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      contactNumber,
    });

    // another way to insert data into collection

    // const createUser = new User({
    //   firstName,
    //   lastName,
    //   username,
    //   email,
    //   password,
    //   contactNumber,
    // });
    // const data = await createUser.save();

    if (data) {
      res.status(200).json({ detaila: data });
    } else {
      res.status(400).json({ msg: error });
      res.status(400).json({ msg: "some problem occurs" });
    }
  }
};

exports.userSignin = async (req, res) => {
  const checkemail = await req.body.email;
  const checkpassword = await req.body.password;

  const _user = await User.findOne({ email: checkemail });

  if (_user) {
    const verifypassword = await _user.authenticate(checkpassword);
    const role = await _user.role;
    if (verifypassword && role === "user") {
      const { _id, firstName, lastName, username, email, contactNumber } =
        _user;

      res.status(200).json({
        signin_details: {
          _id,
          firstName,
          lastName,
          username,
          email,
          contactNumber,
          // _user: _user,
        },
      });
    } else {
      res.status(404).json({ msg: "invalid password" });
    }
  } else {
    res.status(404).json({ msg: "user does not exist" });
  }
};
