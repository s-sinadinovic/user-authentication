const User = require("../resources/user/user.model");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWTsecret || "placeholderForTesting";
const jwtExp = process.env.JWTexp || "100d";

const newToken = (user) => {
  return jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn: jwtExp,
  });
};

const verifyToken = async (token) => {
  const PAYLOAD = await jwt.verify(token, jwtSecret, (err, payload) => {
    if (err) {
      return err;
    }
    console.log(payload);
    return payload;
  });

  if (PAYLOAD) return PAYLOAD;
  // new Promise((resolve, reject) => {
  //   jwt.verify(token, jwtSecret, (err, payload) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     console.log(payload);
  //     resolve(payload);
  //   });
  // });
};

const signup = async (req, res) => {
  // Form validation
  if (!req.body.username || !req.body.password) {
    // provide both username and password.
    return res.status(400).end();
  }
  if (req.body.password.length < 8) {
    // use 8 or more characters.
    return res.status(400).end();
  }

  // Token creation and distribution
  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    res.status(201).send({ token });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

const login = async (req, res) => {
  // Form validation
  if (!req.body.username || !req.body.password) {
    return res.status(400).end();
  }

  const user = await User.findOne({ username: req.body.username }).exec();
  if (!user) {
    return res.status(401).send({ message: "Not auth" });
  }

  // Password check and token distribution
  try {
    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(401).send({ message: "Not auth" });
    }
    const token = newToken(user);
    return res.status(200).send({ token });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ message: "Not auth" });
  }
};

const protect = async (req, res, next) => {
  console.log("protecting...");
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  let token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).end();
  }

  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id).select("-password").exec();
    req.user = user.toJSON();
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).end();
  }
};

module.exports = {
  newToken,
  verifyToken,
  signup,
  login,
  protect,
};
