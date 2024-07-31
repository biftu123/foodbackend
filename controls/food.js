const { query } = require('express');
const Food = require('../models/food');

exports.addfood = async (req, res) => {
    try {
        const { title, time, code, imageUrl, catagory, description, foodType, foodTags, price, restaurant } = req.body;
        if (!title || !time || !code || !imageUrl || !catagory || !description || !foodType || !foodTags || !price || !restaurant) {
            return res.status(400).json({ error: "Missing required fields in the request body." });
        }
        
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
            return res.status(200).json([]);
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

exports.searchfood = async (req, res) => {
    const search = req.params.search;
    try {
        const result = await Food.aggregate([
            {
                $search: {
                    index: "foods",
                    text: {
                        query: search,
                        path: {
                            wildcard: "*"
                        }
                    }
                }
            }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};