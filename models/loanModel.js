const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			unique: true,
			index: true,
		},
		approvedloan: {
			type: String,
		},
		netloan: {
			type: String,
		},
		ewi: {
			type: String,
		},
		totalweek: {
			type: String,
		},
		paidweek: {
			type: String,
		},
		userId: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

loanSchema.pre('save', async function (next) {
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

const loanModel = mongoose.model('loan', loanSchema);

module.exports = loanModel;
