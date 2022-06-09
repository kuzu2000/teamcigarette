const User = require('../models/User');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

//UPDATE
router.patch('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    user.username = req.body.username;
  }

  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 12);
  }

  const updatedUser = await user.save();

  const created = {
    username: updatedUser.username,
    password: updatedUser.password,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    _id: updatedUser._id,
  };

  const token = jwt.sign({
    username: updatedUser.username,
    password: updatedUser.password,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    id: updatedUser._id,
  }, process.env.JWT_SEC, { expiresIn: '3d' });

  res.status(201).json({ result: created, token });
});

//DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
