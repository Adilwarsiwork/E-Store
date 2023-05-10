const Admin = require("../../models/admin/adminmodel");

exports.adminsignup = async (req, res) => {
  console.log("hello from admin signup");

  const checkemail = await req.body.email;

  const _email = await Admin.findOne({ email: checkemail });

  if (_email) {
    res.send({ msg: "user already exist" });
  } else {
    const { firstName, lastName, username, email, password, contactNumber } =
      await req.body;

    const createAdmin = new Admin({
      firstName,
      lastName,
      username,
      email,
      password,
      contactNumber,
    });

    const data = await createAdmin.save();

    // another way to insert data into the collection
    // const data = await User.create({
    //   firstName,
    //   lastName,
    //   username,
    //   email,
    //   password,
    //   contactNumber,
    // });

    if (data) {
      res.status(200).json({ details: data });
    } else {
      res.status(400).json({ msg: error });
      res.status(400).json({ msg: "someting went wrong" });
    }
  }
};

exports.adminsignin = async (req, res) => {
  const checkemail = await req.body.email;
  const checkpassword = await req.body.password;

  const _admin = await Admin.findOne({ email: checkemail });

  if (_admin) {
    const verifypassword = await _admin.authenticate(checkpassword);
    const role = await _admin.role;
    if (verifypassword && role === "admin") {
      const { _id, firstName, lastName, username, email, contactNumber } =
        _admin;

      res.status(200).json({
        msg: { _id, firstName, lastName, username, email, contactNumber },
      });
    } else {
      res.status(404).json({ msg: "invalid password" });
    }
  } else {
    res.status(404).json({ msg: "user doens't exist" });
  }
};
