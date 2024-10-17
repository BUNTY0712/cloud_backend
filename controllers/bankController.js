const bankModel = require('../models/bankDetailsModel');
exports.creatbankController = async (req, res) => {
	try {
		const {
			account_holder_name,
			ifsc_no,
			bank_name,
			branch_name,
			account_number,
			pan_number,
		} = req.body;
		// Validate required fields
		if (
			!account_holder_name ||
			!ifsc_no ||
			!bank_name ||
			!branch_name ||
			!account_number ||
			!pan_number
		) {
			return res.status(400).send({
				success: false,
				message: 'Please fill all required fields',
			});
		}

		// Create a new user object with the provided data
		const newBankDetail = new bankModel({
			account_holder_name,
			ifsc_no,
			bank_name,
			branch_name,
			account_number,
			pan_number,
		});

		// Save the new user
		await newBankDetail.save();

		return res.status(200).send({
			success: true,
			message: 'User created successfully',
			user: newBankDetail,
		});
	} catch (error) {
		return res.status(500).send({
			success: false,
			message: 'Error while registering user',
			error: error.message,
		});
	}
};
