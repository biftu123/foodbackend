
const jwt =require('jsonwebtoken');
const Cryptojs =require('crypto-js');
const sendemail=require('../controls/utilits/sendemail')
const generateotp =require("../controls/utilits/generateotp");
const User = require('../models/user');
const Address = require('../models/address');
exports.createuser = async(req,res)=>{
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if(!emailRegex.test(req.body.email)){
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
			password: Cryptojs.AES.encrypt(req.body.password, process.env.SECRET).toString(),
			otp:otp,
          userType:req.body.userType
		}
		)
		await newuser.save();
		sendemail(newuser.email,otp);
		
		res.status(201).json({ message: 'User created successfully' });

	} catch (error) {
		res.status(500).json({ error: error.message });
	}
	}
exports.login=async(req,res)=>{
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if(!emailRegex.test(req.body.email)){
		return res.status(400).json({status:false,message:"Email is not valid"});
	}
	const minPasswordLength =8;
	if(req.body.password < minPasswordLength){
		return res.status(400).json({status:false,message:" password should beat least"+inPasswordLength+"characters"});
	} try {
		const user = await User.findOne({email:req.body.email});
		if(!user){
			res.status(400).json({ message: 'User is not registered' });
		}
		const decryptedPassword = Cryptojs.AES.decrypt(user.password, process.env.SECRET);
const decpassword = decryptedPassword.toString(Cryptojs.enc.Utf8);
		if(decpassword !== req.body.password){
			return res.status(400).json({status:false,message:"Pasword is not valid"});
		}
		const usertoken = jwt.sign({
			id: user._id,
			email: user.email,
			userType: user.userType
		}, process.env.Jwt_SECRET, { expiresIn: '21d' });
		const { password, otp, ...others } = user._doc;

res.status(200).json({ ...others, usertoken });
	
	}
	 catch (error) {
		res.status(500).json({ error: error.message });
	}
}
