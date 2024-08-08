const Cart = require('../models/cart');
const Food = require('../models/food');
const Restaurant = require("../models/resturant");
exports.addcarts =async(req,res)=>{
	const  userId = req.user.id;
	let count ;
const{totalPrice, quantity, additive,productId}= req.body;
try {
	const  exstingcart = await Cart.findOne({userId:userId,productId:productId});
	count = await Cart.countDocuments({userId:userId})
	if(exstingcart){
		exstingcart.totalPrice+= totalPrice*quantity;
		exstingcart.quantity +=quantity;
		exstingcart.save();
		res.status(200).json({status:true,count:count});
	}else{
		const newcart = new Cart({
			userId:userId,
			productId:productId,
			quantity:quantity,
			additive:additive,
			totalPrice:totalPrice
		})
		newcart.save();
		count = await Cart.countDocuments({userId:userId});
		res.status(200).json({status:true,count:count});
	}
} catch (error) {
	res.status(500).json({ error: error.message });
}

}
exports.removecart= async(req,res)=>{
	const cartid= req.params.id;
	try {
		await Cart.findByIdAndDelete({_id:cartid });
		const count = await Cart.countDocuments({userId:userId});
res.status(200).json({sataus:true,message:"removed succssefully"});
	} catch (error) {
		res.status(500).json({ error: error.message });	
	}
}
exports.getcart= async(req,res)=>{
	const userId= req.user.id;
	try {
		const getcarts = await Cart.find({userId:userId}).populate(
			{
				path:'productId',
				select:'imageUrl restaurant ratingCount rating title',
				populate:{
					path:'restaurant',
					select:'time coords'
				}
			}
		).exec();
		res.status(200).json(getcarts);
	} catch (error) {
		res.status(500).json({ error: error.message });	
	}
}
exports.getcount =async(req,res)=>{
	const userId =req.user.id;
	try {
		const count = await Cart.countDocuments({userId:userId}); 
		res.status(200).json({status:true, count:count})
	} catch (error) {
		res.status(500).json({ error: error.message });	
	}
}
exports.decrementproductqunt = async(req,res)=>{
	const UserId = req.user.id;
	const id = req.params.id;
	try {
		const cart = await Cart.findOne({_id:id});
		if(cart){
			const productprice = cart.totalPrice/cart.quantity;
		
		if(cart.quantity > 1){
			cart.quantity -=1;
			cart.totalPrice -= productprice;
			await cart.save();
			res.status(200).json({status:true,message:"product quntity is decress"});
		}else{
			await Cart.findByIdAndDelete({_id:id});
			res.status(200).json({status:true,message:"product quntity is decress"});
		}
	}else{
		res.status(400).json({ status:false,message:"product not found" });	
	}
	} catch (error) {
		res.status(500).json({ error: error.message });	
	}
}
