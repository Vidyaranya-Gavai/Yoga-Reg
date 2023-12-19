const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const fs = require('fs');
const multer = require("multer");
const uploadMiddleware = multer({ dest: 'uploads/' });

router.post("/", uploadMiddleware.single('file'), async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(10));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const {originalname,path} = req.file;
		const parts = originalname.split('.');
		const ext = parts[parts.length - 1];
		const newPath = path+'.'+ext;
		const newPath1 = newPath.substring(0, 7)+ '/' +newPath.substring(8, newPath.length);
		fs.renameSync(path, newPath1);

		console.log(req.body);
		console.log(req.file);
		await new User({ ...req.body, password: hashPassword, cover: newPath1 }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post('/updatedata',async(req,res)=>{
	try {
		const userUpdatedData=req.body.userUpdatedData;
		console.log(userUpdatedData)

	} catch (error) {
		console.log(error);
	}
})




module.exports = router;