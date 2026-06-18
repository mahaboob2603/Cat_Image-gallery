const Cat = require("../models/Cat");

// POST /api/cats  (protected, expects multipart/form-data with "image" field)
const createCat = async (req, res) => {
  try {
    const { name, breed, age, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const cat = await Cat.create({
      name,
      breed,
      age,
      description,
      imageUrl: req.file.path, // Cloudinary URL
      owner: req.user.id,
    });

    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/cats  (public - gallery view)
const getAllCats = async (req, res) => {
  try {
    const cats = await Cat.find().populate("owner", "username").sort({ createdAt: -1 });
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/cats/:id
const getCatById = async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id).populate("owner", "username");
    if (!cat) return res.status(404).json({ message: "Cat not found" });
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT /api/cats/:id  (protected, owner only)
const updateCat = async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: "Cat not found" });

    if (cat.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this cat" });
    }

    const { name, breed, age, description } = req.body;
    cat.name = name ?? cat.name;
    cat.breed = breed ?? cat.breed;
    cat.age = age ?? cat.age;
    cat.description = description ?? cat.description;
    if (req.file) cat.imageUrl = req.file.path;

    await cat.save();
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /api/cats/:id  (protected, owner only)
const deleteCat = async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: "Cat not found" });

    if (cat.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this cat" });
    }

    await cat.deleteOne();
    res.status(200).json({ message: "Cat deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createCat, getAllCats, getCatById, updateCat, deleteCat };