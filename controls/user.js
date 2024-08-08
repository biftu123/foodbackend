const User =require('../models/user');
exports.getuser =async(req,res)=>{
	try {
		const user = await User.findById(req.user.id);
		const{ password,__v ,createdAt, ...others} =user._doc;
		return res.status(200).json(others);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
exports.verfiedAccount =async(req,res)=>{
	const userotp = req.params.otp;
	try {
		const user = await User.findById(req.user.id);
		if(!user){
			return res.status(500).json({status:false,message:"user is not occured"});
}
if(userotp === user.otp){
	user.verificationAccount = true
	user.otp= 'none'
	await user.save();
const{ password,__v ,createdAt, ...others} =user._doc;
		return res.status(200).json(others);
}else{
	return res.status(400).json({status:false,message:"verification is fallied"});
}


	} catch (error) {
		res.status(500).json({ error: error.message });
		
	}
}
exports.verfiyphone = async(req,res)=>{
	const phone = req.params.phone;

	try {
		const user = await User.findById(req.user.id);
		if(!user){
			return res.status(500).json({status:false,message:"user is not occured"});
		}
		user.phoneVerification =true;
		user.phone =phone;
		await user.save();
		const{ password,__v ,createdAt, ...others} =user._doc;
		return res.status(200).json(others);

	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}