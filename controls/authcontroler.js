const User =require('../models/user');
const jwt =require('jsonwebtoken');
const Cryptojs =require('crypto-js');

const generateotp =require("../controls/utilits/generateotp");
exports.createuser = async(req,res)=>{
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if(emailRegex.test(req.body.email)){
		return res.status(400).json({status:false,message:"Email is not valid"});
	}
	const minPasswordLength =8;
	if(req.body.password < minPasswordLength){
		return res.status(400).json({status:false,message:" password should beat least"+inPasswordLength+"characters"});
	}
	try {
		const exstingemail =await User.findOne({email:req.body.email})
		if (exstingemail){
			return res.status(400).json({status:false,message:"Email already exist"});
		
		}
		const otp =generateotp();
		const newuser =new User({
			email:req.body.email,
			username:req.body.username,
			password:Cryptojs.AES.encrpty(req.body.password,process.env.SECRET)

		}
		)
	} catch (error) {
		
	}
	}
