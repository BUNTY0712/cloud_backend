const loanModel = require('../models/loanModel');

exports.createloanController = async (req, res) => {
	try {
		const { approvedloan, netloan, ewi, totalweek, paidweek, userId } =
			req.body;

		// Check if all required fields are provided
		if (
			!approvedloan ||
			!netloan ||
			!ewi ||
			!totalweek ||
			!paidweek ||
			!userId
		) {
			return res.status(400).send({
				success: false,
				message: 'Please fill all required fields',
			});
		}

		// Find all loans for the user, sorted by the ID to get the most recent one last
		// const loans = await loanModel.find({ userId: userId });

		// // Check if the user has any loans
		// if (loans.length > 0) {
		// 	// Fetch the last loan from the array (id: 12 in your case)
		// 	const lastLoan = loans[loans.length - 1]; // This will get the latest loan

		// 	// Log the last loan to verify
		// 	console.log('Last Loan:', lastLoan);

		// 	// Check if the `netloan` of the last loan is not 0
		// 	if (lastLoan.netloan !== '0') {
		// 		return res.status(400).send({
		// 			success: false,
		// 			message: 'Loan not created, previous loan not cleared',
		// 		});
		// 	}
		// }

		// Create a new loan since either no loans exist or the last loan is cleared
		const newLoan = new loanModel({
			approvedloan,
			netloan,
			ewi,
			totalweek,
			paidweek,
			userId,
		});

		// Save the new loan
		await newLoan.save();

		return res.status(200).send({
			success: true,
			message: 'Loan created successfully',
			data: newLoan,
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

exports.creatEmiController = async (req, res) => {
	try {
		const { approvedloan, netloan, ewi, totalweek, paidweek, userId } =
			req.body;

		// Check if all required fields are provided
		if (
			!approvedloan ||
			!netloan ||
			!ewi ||
			!totalweek ||
			!paidweek ||
			!userId
		) {
			return res.status(400).send({
				success: false,
				message: 'Please fill all required fields',
			});
		}

		// Find all loans for the user, sorted by the ID to get the most recent one last
		const loans = await loanModel.find({ userId: userId });

		// Check if the user has any loans
		if (loans.length > 0) {
			// Fetch the last loan from the array (id: 12 in your case)
			const lastLoan = loans[loans.length - 1]; // This will get the latest loan

			// Log the last loan to verify
			console.log('Last Loan:', lastLoan);

			// Check if the `netloan` of the last loan is not 0
			if (lastLoan.netloan !== '0') {
				return res.status(400).send({
					success: false,
					message: 'Loan not created, previous loan not cleared',
				});
			}
		}

		// Create a new loan since either no loans exist or the last loan is cleared
		const newLoan = new loanModel({
			approvedloan,
			netloan,
			ewi,
			totalweek,
			paidweek,
			userId,
		});

		// Save the new loan
		await newLoan.save();

		return res.status(200).send({
			success: true,
			message: 'Loan created successfully',
			data: newLoan,
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

exports.getloanController = async (req, res) => {
	try {
		const { id } = req.body;
		const alloans = await loanModel.find({ userId: id });

		if (!alloans) {
			return res.status(401).send({
				success: false,
				message: 'No loans',
			});
		}

		return res.status(200).send({
			success: true,
			message: 'Successfully fetch',
			data: alloans[alloans.length - 1],
		});
	} catch (error) {
		return res.status(500).send({
			success: false,
			message: 'server error',
			error: error.message,
		});
	}
};
