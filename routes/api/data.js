const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const { check, validationResult } = require("express-validator");
const Data = require("../../models/Data");

router.get("/", auth, async (req, res) => {
  try {
    const profile = await Data.find({ user: req.user.id })
    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("category", "category is required")
        .not()
        .isEmpty(),
      check("description", "description is required")
        .not()
        .isEmpty(),
      check("cost", "cost is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { category, description, cost } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;

    if (category) profileFields.category = category;
    if (description) profileFields.description = description;
    if (cost) profileFields.cost = cost;

    try {
      profile = new Data(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
