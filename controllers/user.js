const Users = require("../models/User");
const crypto = require("crypto");

const register = async (req, res) => {
  try {
    const check = await Users.findOne({ email: req.body.email });

    if (check) {
      const { firstname, lastname, email, dhid, contact } = check;

      const user = new Users({
        firstname,
        lastname,
        email,
        contact,
        dhid,
      });

      await user.save();

      res.status(200).json({
        success: "true",
        msg: " user created successfully.",
        data: user,
      });
    } else {
      const user = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        contact: req.body.contact,
        dhid: crypto.randomBytes(64).toString("hex"),
      });

      await user.save();

      res.status(200).json({
        success: "true",
        msg: "user created successfully",
        data: user,
      });
    }
  } catch (error) {
    // res.status(500).json(error);
    console.log(error);
  }
};

module.exports = { register };
