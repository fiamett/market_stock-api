const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const catData = await Category.findAll({ include: Product });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  //includes its associated Products
});

router.get("/:id", async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: Product,
    });
    if (!catData) {
      res.status(404).json({ message: "no tag with this id!" });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
  //uses {"id":--num--,"category_name":"----"}
});

router.put("/:id", async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id);
    if (!catData) {
      res.status(404).json({ message: "no tag with this id!" });
      return;
    }
    catData.set(req.body);
    await catData.save(res.status(200).json(catData));
  } catch (err) {
    res.status(500).json(err);
  }
  //find a single tag by its `id`
  // update a tag's name by its `id` value
  //uses {"category_name":""} format
});

router.delete("/:id", async (req, res) => {
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!catData) {
      res.status(404).json({ message: "No location found with this id!" });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
