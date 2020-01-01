const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bycrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post(
  "/",
  [
    check("name", "Name is Required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Please enter Password 6 or more Character").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, name, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: "User Already Exists" }] });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bycrypt.genSalt(10);

      user.password = await bycrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("tokenjwt"),
        { expiresIn: 250000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
