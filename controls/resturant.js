const Restaurant = require("../models/resturant");

exports.addresturant = async (req, res) => {
  const { time, title, imageUrl, logoUrl, owner, code, coords } = req.body;
  if (!time || !title || !imageUrl || !logoUrl || !owner || !code || !coords.title || !coords.address || !coords.longitude || !coords.latitude) {
    return res.status(400).json({ error: "Missing required fields in the request body." });
  }
  try {
    const add = new Restaurant(req.body);
    add.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.gerreturantbyId = async (req, res) => {
  try {
    const resturant = await Restaurant.findById(req.params._id);
    res.status(200).json(resturant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getallrandomresturant = async (req, res) => {
  try {
    let allnearrestirnant = [];
    if (req.params.code) {
      allnearrestirnant = await Restaurant.aggregate([
        { $match: { code: req.params.code, isAvailability: true } },
        { $sample: { size: 5 } },
        { $project: { __v: 0 } },
      ]);
    }
    if (allnearrestirnant.length === 0) {
      allnearrestirnant = await Restaurant.aggregate([
        { $match: { isAvailability: true } },
        { $sample: { size: 5 } },
        { $project: { __v: 0 } },
      ]);
    }
    res.status(200).json(allnearrestirnant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getallnearyresturant = async (req, res) => {
  try {
    let randomrestuarn = [];
    if (req.params.code) {
      randomrestuarn = await Restaurant.aggregate([
        { $match: { code: req.params.code, isAvailability: true } },
        { $project: { __v: 0 } },
      ]);
    }
    if (randomrestuarn.length === 0) {
      randomrestuarn = await Restaurant.aggregate([
        { $match: { isAvailability: true } },
        { $project: { __v: 0 } },
      ]);
    }
    res.status(200).json(randomrestuarn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add closing parenthesis here
