const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const bcrypt = require('bcrypt');

//Register
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign(
      { username: result.username, email: result.email, id: result._id, isAdmin: result.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign(
      { username: oldUser.username, email: oldUser.email, isAdmin: oldUser.isAdmin, id: oldUser._id },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
