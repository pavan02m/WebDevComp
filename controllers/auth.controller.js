import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // validations

    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPassword,
      email: email,
    });

    await newUser.save();

    res.status(200).send({
      success: true,
      message: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error });
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //validations

    const user = await User.findOne({ email: email });

    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);
      if (isMatch) {
        const payload = {
          id: user._id,
          role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res
          .cookie("access_token",token, {httpOnly:true})
          .status(200)
          .send({
            success: true,
            message: "user loggedIn successfully",
            token,
          });
      }
    } else {
      res.status(400).send({ success: false, message: "user not found" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: "error while logging" });
  }
};
