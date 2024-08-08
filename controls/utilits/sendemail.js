const nodemailer = require('nodemailer');
 async function sendemail(useremail,message){
	const transporter = nodemailer.createTransport({
		service: 'Gmail', // Use your email service provider
		auth: {
			user:process.env.EMAIL , // Your email address
			pass: process.env.PASS // Your email password
		}
	});
	const mailOptions = {
		from:process.env.EMAIL ,
		to: useremail,
		subject: 'Foodly Email verfication',
		html: `<h1>Foodly Email verfication</h1>
		<p> Your Verfication code is</p>
		<h2style=" color: blue">${message}</h2> 
		<p> please enter this  code to verfication page to complete registration process</p>
		<p>if you did not requst this,please ignore this email</p>
	  <p>If you did not request this, please ignore this email.</p>
        `
	};
	try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error(error);
    }

 }
 module.exports =sendemail;