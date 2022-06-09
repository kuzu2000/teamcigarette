const News = require('./../models/News');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//Post
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newNews = new News(req.body);

  try {
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(204).json('News article has been deleted...');
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET NEWS
router.get('/find/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL NEWS
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({createdAt: -1});
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
