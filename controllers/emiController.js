const emiDetailsModel = require('../models/emiDetailsModel');
const loanModel = require('../models/loanModel');

exports.creatEmiController = async (req, res) => {
	try {
		const { loan, description, credit, debit, currentloan, penalty, userId } =
			req.body;

		const activeloan = await loanModel.find({ userId: userId });

		// Check if all required fields are provided
		if (!loan || !description || !credit || !debit || !penalty || !userId) {
			return res.status(400).send({
				success: false,
				message: 'Please fill all required fields',
			});
		}

		// Create a new loan since either no loans exist or the last loan is cleared
		const newEmi = new emiDetailsModel({
			loanamount: loan,
			description,
			credit,
			debit,
			currentloan,
			penalty,
			userId,
		});

		console.log('newEmi', newEmi);

		// Save the new loan
		await newEmi.save();

		return res.status(200).send({
			success: true,
			message: 'Loan created successfully',
			data: newEmi,
		});
	} catch (error) {
		// Handle errors
		return res.status(500).send({
			success: false,
			message: 'Error while creating loan',
			error: error.message,
		});
	}
};

exports.getLastEmiController = async (req, res) => {
	try {
		const { userId } = req.body;

		// Check if userId is provided
		if (!userId) {
			return res.status(400).send({
				success: false,
				message: 'userId not found',
			});
		}

		// Fetch EMI details for the user
		const lastEmi = await emiDetailsModel.find({ userId: userId });

		// Check if any EMI record was found
		if (!lastEmi || lastEmi.length === 0) {
			return res.status(404).send({
				success: false,
				message: 'No EMI found for the user',
			});
		}

		// Get the last EMI record from the array
		const lastIndex = lastEmi.length - 1;

		return res.status(200).send({
			success: true,
			message: 'Last EMI found successfully',
			data: lastEmi[lastIndex],
		});
	} catch (error) {
		// Catch any errors during execution
		return res.status(500).send({
			success: false,
			message: 'Error while fetching EMI',
			error: error.message,
		});
	}
};
