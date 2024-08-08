const Order =require('../models/order');
 exports.placedorder =async(req,res)=>{
	const  neworder =new Order({ ...req.body,userId:req.user.id});
	try {
		await neworder.save();
		const orderId =neworder._id;
		res.status(201).json({ status:true,messsage:"order pelaced succefffuly"});
	} catch (error) {
		res.status(500).json({ error: error.message });	
	}
 }
 exports.getorder =async (req,res)=>{
	const userId =req.user.id;
	const{paymentStatus,orderStatus}= req.query;
	let query = {userId};
	if(paymentStatus){
query.paymentStatus = paymentStatus
	}
	if(orderStatus === orderStatus){
		query.orderStatus =orderStatus
	}
	try {
		const order = await Order.find({query}).populate({
			path:"orderItems.foodId",
			select:'imageUrl title rating time'
		});
		res.status(200).json(order);
		
	} catch (error) {
		res.status(500).json({ error: error.message });	
	}
 }