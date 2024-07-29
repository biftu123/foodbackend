const Category = require('../models/catagory'); // Assuming your model is defined in this fi
    // Create a new category
   exports. createCategory= async (req, res) => {
        try {
            const { title, imageUrl, value } = req.body;
            const newCategory = new Category({ title, imageUrl, value });
            await newCategory.save();
            res.status(201).json({ message: 'Category created successfully', category: newCategory });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    exports.getcatagory =async(req,res)=>{
        try {
            const catagories =new Category.find({title:{$ne:"More"}},{__v:0})
            res.status(200).json(catagories);
        } catch (error) {
            res.status(500).json({ error: err.message });
        }
    }
exports.getrandomcatagories =async(req,res)=>{
    try {
        let catagories = new Category.aggregate([
            {$match:{title:{$ne:"More"}}},
            {$sample:{size:4}}
        ]);
        const morecatagory =new Category.findOne({title:"More"},{__v:0});
        if(morecatagory){
            catagories.push(morecatagory);
        }
        res.status(200).json(catagories);
    } catch (error) {
        res.status(500).json({ error: err.message });  
    }
}
   
