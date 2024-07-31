const Rating =require('../models/rating');
const Restaurant=require('../models/resturant');
const Food =require('../models/food');
exports.addRating =async(req,res)=>{
	const newRating = new Rating(
		userId =req.body.userId,
		ratingType=req.body.ratingType,
		product= req.body.product,
		rating= req.body.Rating

	)
	try {
		await newRating.save();
		if(req.body.ratingType==='restaurant'){
			const restaurant =await Rating.aggregate([
				{$match:{ratingType:req.body.ratingType,product:req.body.product}},
				{$group:{_id:'product',averageRating:{$avg:'rating'}}}
			])
		}
		if(restaurant.length >0){
			const averageRating= restaurant[0].averageRating;
			await Restaurant.findByIdAndUpdate(req.body.product,{rating:averageRating},{new:true});
		}
		
			
			else if(req.body.ratingType==='food'){
				const food =await Rating.aggregate([
					{$match:{ratingType:req.body.ratingType,product:req.body.product}},
					{$group:{_id:'product',averageRating:{$avg:'rating'}}}
				])
			}
			if(food.length >0){
				const averageRating= food[0].averageRating;
				await Food.findByIdAndUpdate(req.body.product,{rating:averageRating},{new:true});
			}
			res.status(201).json({ message: 'created successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
exports.checkrating =async(req,res)=>{
	const ratingType =req.query.ratingType;
	const product =req.query.product;
	try {
		const exstingrating =await Rating.findOne({
			userId:req.user.id,
			ratingType:ratingType,
			product:product
		})
		if(exstingrating){
			res.status(200).json({status : true,message:"you have already rating this resturant"})
		}else{
			res.status(200).json({status : false,message:"user has not rated this resturant"})
		}
	
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}