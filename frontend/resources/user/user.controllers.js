const User = require("./user.model");
// const crudControllers = require("../../utils/crud");

const getMe = async (req, res) => {
  try {
    return res.status(200).json({ data: req.user }).send({ message: "hello" });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

module.exports = {
  getMe,
  updateMe,
};
