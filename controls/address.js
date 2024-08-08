const User =require('../models/user');
const Address =require('../models/address');
exports.addAddress= async(req,res)=>{
	const newAddress = new Address({
		userId: req.User.id,
		postalCode: req.body.postalCode,
		default:req.body.default,
		deliveryInstruction: req.body.deliveryInstruction,
		longitude:req.body.longitude,
		latitude:req.body.latitude,

	});
	try {
		if (req.body.default === true){
			await Address.updateMany({userId:req.user.id},{default : false})
		}
		newAddress.save();
		res.status(201).json({ message: 'Addres successfully added' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
exports.getaddres  = async(req,res)=>{
try {
	const address = await Address.findById(req.user.id);
	res.status(200).Json(address)
} catch (error) {
	res.status(500).json({ error: error.message });
}
}
exports.deleteaddress =async(req,res)=>{
	try {
const deleteadd = await Address.findByIdAndDelete(req.params.id);
res.status(200).Json({status:true, message:"address deleted successfully"})
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
exports.setdefaultaddress = async(req,res)=>{
	const addressId = req.params.id;
	const userId =req.user.id;
	try {
		await Address.updateMany({userId:userId},{default:false});
		const update = Address.findByIdAndUpdate(addressId,{default:true});
		if(update){
			await User.findByIdAndUpdate(userId,{address:addressId});
			res.status(200).json({status:true,message:"address is set as default successfully"})
		}else{
			res.statuS(400).json({status:false,message:"address not found"})
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
exports.getdefaultId= async(req,res)=>{
	const userId= req.user.id;
	try {
	const address= Address.findById({userId:userId,default:true});
	res.status(200).json(address);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}