const { query } = require('express');
const Food = require('../models/food');

exports.addfood = async (req, res) => {
    try {
        
        
        const food = new Food(req.body);
        await food.save();
        res.status(201).json({ message: 'Food created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.foodgetbyId = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getrandomfood = async (req, res) => {
    try {
        let foods;
        const code = req.params.code;
        if (code) {
            foods = await Food.aggregate([
                { $match: { code: code, isAvailable: true } },
                { $sample: { size: 5 } },
                { $project: { __v: 0 } }
            ]);
        }
        
        if (!foods || foods.length === 0) {
            foods = await Food.aggregate([
                { $match: { isAvailable: true } },
                { $sample: { size: 5 } },
                { $project: { __v: 0 } }
            ]);
        }
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getfoodbyresturant = async (req, res) => {
    try {
        const id = req.params.id;
        const foods = await Food.find({ restaurant: id });
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getfoodbycatagoryandcode = async (req, res) => {
    const { catagory, code } = req.params;
    try {
        let foods;
        foods = await Food.aggregate([
            { $match: { catagory: catagory, code: code, isAvailable: true } },
            { $project: { __v: 0 } }
        ]);
        if (foods.length === 0) {
            return res.status(200).json(foods);
        }
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getfoodrandombycatagoryandcode = async (req, res) => {
    const { catagory, code } = req.params;
    try {
        let foods;
        foods = await Food.aggregate([
            { $match: { catagory: catagory, code: code, isAvailable: true } },
            { $sample: { size: 10 } }
        ]);
        if (!foods || foods.length === 0) {
            foods = await Food.aggregate([
                { $match: { code: code, isAvailable: true } },
                { $sample: { size: 10 } }
            ]);
        } else if (!foods || foods.length === 0) {
            foods = await Food.aggregate([
                { $match: { isAvailable: true } },
                { $sample: { size: 10 } }
            ]);
        }
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.search = async (req, res) => {
    try {
      const searchall = await Food.find({
        $or: [
          { title: { $regex: req.params.key } },
          
          { catagory: { $regex: req.params.key } },
          { code: { $regex: req.params.key } },
          { resturant: { $regex: req.params.key } },
          
        ],
      });
      res.status(200).json(searchall);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };