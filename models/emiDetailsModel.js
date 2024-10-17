const mongoose = require('mongoose');

const emiSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			unique: true,
			index: true,
		},
		loanamount: {
			type: String,
		},
		description: {
			type: String,
		},
		credit: {
			type: String,
		},
		debit: {
			type: String,
		},
		currentloan: {
			type: String,
		},
		penalty: {
			type: String,
		},
		userId: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

emiSchema.pre('save', async function (next) {
	try {
		if (!this.isNew) {
			return next(); // If not a new document, skip auto-increment logic
		}
		const latestid = await this.constructor.findOne(
			{},
			{},
			{ sort: { id: -1 } }
		); // Find the document with the highest id
		if (latestid) {
			this.id = latestid.id + 1; // Increment the id
		} else {
			this.id = 1;
		}
		next();
	} catch (error) {
		console.error(error); // Log the error
		next(error);
	}
});

const emiDetailsModel = mongoose.model('emi', emiSchema);

module.exports = emiDetailsModel;
