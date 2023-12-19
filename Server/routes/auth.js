const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const Batch_pass = require('../models/pass')

router.post('/getdata', async (req, res) => {
	try {
		const userDetails = req.body.id;
		const user = await User.findOne({ _id: userDetails });
		res.json(user);
	} catch (error) {

	}
});


router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "User Does Not Exists..." });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, user: user });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

router.post('/addPass', async (req, res) => {
	try {
		console.log(req.body)
		console.log(req.body.lastName);
		// const data = String(req.body);
		// const formData = data.split('------WebKitFormBoundary');
		// console.log(formData)

		// const values = {};
		// formData.forEach(part => {
		// 	const match = part.match(/name="([^"]+)"\r\n\r\n([^]+)\r\n/);
		// 	if (match) {
		// 	const key = match[1];
		// 	const value = match[2];
		// 	values[key] = value.trim();
		// 	}
		// });
		// console.log(values);

		// const {firstName, lastName, age, gender, batch, referedBy} = req.body;
		// const batchPass = await Batch_pass.create({
		// 	firstName, lastName, age, gender, batch, referedBy
		//   });
		// res.json(batchPass);


	} catch (error) {
		console.log(error);
	}
})

module.exports = router;