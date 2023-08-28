const { User, validatUser } = require("../models/Users");

const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");

const userRegister = async (req, res) => {
  try {
    const { error } = validatUser(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already exists" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(200).send({ message: "User Created Succesfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(409).json("User Not found Please register");
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatePassword) {
      return res.status(401).json("Invalid Email or Password");
    }
    const token = await generateToken(user);

    res.status(200).send({ token: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getALLUsers = async (req, res) => {
  try {
    const users = await User.find({}).select(["-password"]);
    if (!users) {
      return res.status(404).json(`User not found`);
    }
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { userRegister, loginUser, getALLUsers };
