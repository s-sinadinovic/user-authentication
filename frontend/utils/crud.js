const getOne = (model) => async (req, res) => {
  try {
    const doc = await model
      .findOne({ _id: req.params.id, createdBy: req.user._id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

const getMany = (model) => async (req, res) => {
  try {
    const docs = await model.find({ createdBy: req.user._id }).lean().exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

const createOne = (model) => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body, createBy: req.user._id });
    return res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

const updateOne = (model) => async (req, res) => {
  try {
    const doc = await model
      .findOneAndUpdate(
        {
          _id: req.params.id,
          createdBy: req.user._id,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

const removeOne = (model) => async (req, res) => {
  try {
    const doc = await model.findOneAndRemove({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

const crudControllers = (model) => ({
  createOne: createOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
});

module.exports = crudControllers;
