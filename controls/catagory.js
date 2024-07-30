const Category = require('../models/catagory'); // Assuming your model is defined in this fi
    
exports.createCategory = async (req, res) => {
    try {
        const { title, imageUrl, value } = req.body;
        
        // Check if title, imageUrl, and value are present in req.body
        if (!title || !imageUrl || !value) {
            return res.status(400).json({ error: "Missing required fields in the request body." });
        }

        const newCategory = new Category({ title, imageUrl, value });
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
} 
exports.getcatagory = async (req, res) => {
    try {
        const categories = await Category.find({ title: { $ne: "More" } }).select({ __v: 0 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getrandomcatagories =async(req,res)=>{
    try {
        let catagories = await Category.aggregate([
            {$match:{title:{$ne:"More"}}},
            {$sample:{size:4}}
        ]);
        const morecatagory =await Category.findOne({title:"More"},{__v:0});
        if(morecatagory){
            catagories.push(morecatagory);
        }
        res.status(200).json(catagories);
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
}
   
