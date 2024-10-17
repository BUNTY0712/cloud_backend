const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.loginController = async (req, res) => {
	try {
		const { choice_id, password } = req.body;
		if (!choice_id || !password) {
			return res.status(401).send({
				success: false,
				message: 'Please provide choice  and password',
			});
		}

		const user = await userModel.findOne({ choice_id });

		if (!user) {
			return res.status(404).send({
				success: false,
				message: 'Name is not registered',
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).send({
				success: false,
				message: 'Invalid username or password',
			});
		}

		return res.status(200).send({
			success: true,
			user,
			message: 'Login succesfull',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			success: false,
			message: 'Error in login callback',
			error: error.message,
		});
	}
};

exports.registerController = async (req, res) => {
	try {
		const {
			sponsor_id,
			choice_id,
			position,
			fullname,
			phone,
			email,
			city,
			password,
			confirm_password,
			mainId,
			allUserCount,
		} = req.body;

		// Validate required fields
		if (
			!fullname ||
			!email ||
			!password ||
			!confirm_password ||
			!phone ||
			!city
		) {
			return res.status(400).send({
				success: false,
				message: 'Please fill all required fields',
			});
		}

		// Check if passwords match
		if (password !== confirm_password) {
			return res.status(400).send({
				success: false,
				message: 'Passwords do not match',
			});
		}

		// Check if the user already exists
		// const existingUser = await userModel.findOne({ email });
		// if (existingUser) {
		// 	return res.status(401).send({
		// 		success: false,
		// 		message: 'User already exists',
		// 	});
		// }

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user object with the provided data
		const newUser = new userModel({
			sponsor_id,
			choice_id,
			position,
			fullname,
			phone,
			email,
			city,
			password: hashedPassword,
			confirm_password: hashedPassword, // Hash both password fields
			mainId,

			allUserCount,
		});

		// Save the new user
		await newUser.save();

		return res.status(200).send({
			success: true,
			message: 'User created successfully',
			user: newUser,
		});
	} catch (error) {
		return res.status(500).send({
			success: false,
			message: 'Error while registering user',
			error: error.message,
		});
	}
};

exports.getSixUserController = async (req, res) => {
	try {
		const { id } = req.body;

		// Fetch the recent 6 users based on the id
		// const getSixUserOnly = await userModel
		// 	.find({ mainId: id })
		// 	.sort({ createdAt: -1 })
		// 	.limit(6);
		// const getSixUserOnly = await userModel
		// 	.find({ mainId: id })
		// 	.select('memberId'); // Ensure all fields are selected

		const getSixUserOnly = await userModel.find({ mainId: id });

		const lengthUser = getSixUserOnly.length;
		console.log('lengthUser', lengthUser);

		if (!id || getSixUserOnly.length === 0) {
			return res.status(401).send({
				success: false,
				message: 'User not found or wrong ID',
				data: [],
			});
		}

		return res.status(200).send({
			success: true,
			message: 'Recent 6 users fetched successfully',
			data: getSixUserOnly,
		});
	} catch (error) {
		return res.status(500).send({
			success: false,
			message: 'Error while fetching users',
			error: error.message,
		});
	}
};
