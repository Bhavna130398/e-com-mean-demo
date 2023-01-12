const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});
router.get("/:id", async (req, res) => {
  const categoryList = await Category.findById(req.params.id);
  if (!categoryList) {
    res.status(500).json({
      success: false,
      message: "The category with the given id was not found.",
    });
  }
  res.status(200).send(categoryList);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
    image: req.body.image,
  });
  category = await category.save();
  if (!category) {
    return res.status(400).json({
      error: "the category cannot be created!",
      success: false,
    });
  } else {
    return res.status(201).json(category);
  }
});

router.delete("/:id", async (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (!category) {
        return res
          .status(400)
          .json({ success: false, message: "Category not found" });
      } else {
        return res.status(200).json({
          success: true,
          message: "The category is successfully deleted",
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({ success: false, message: error });
    });
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon || category.icon,
      image: req.body.image,
    },
    { new: true }
  );
  if (!category) {
    return res
      .status(400)
      .json({ success: false, message: "Category not found" });
  } else {
    return res.status(200).json({
      success: true,
      message: "The category is successfully updated",
      category: category,
    });
  }
});

module.exports = router;
