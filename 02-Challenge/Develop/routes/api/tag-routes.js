const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {

  try {
    const tagData = await Tag.findAll({
      include: [Product],
  });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get tag by id
router.get('/:id', async (req, res) => {

  try {
    const tagData = await Tag.findByPk(req.params.id,{ 
      include: [Product]})
  
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});
//create new tag
router.post('/', async (req, res) => {
try{
  const newTag = await Tag.create(req.body, {
    where: {
      tag_name: req.body.tag_name
  }})
  res.status(200).json(newTag);
} catch (err) {
  res.status(500).json(err);
}
});

  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const tagData = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!tagData[0]) {
        res.status(404).json({ message: 'This is not a valid tag' });
        return;
      }
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
