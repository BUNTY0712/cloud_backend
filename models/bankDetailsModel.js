const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			unique: true,
			index: true,
		},
		account_holder_name: {
			type: String,
		},
		ifsc_no: {
			type: String,
		},
		bank_name: {
			type: String,
		},
		branch_name: {
			type: String,
		},
		account_number: {
			type: String,
		},
		pan_number: {
			type: String,
		},
		merchants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' }],
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

bankSchema.pre('save', async function (next) {
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

const bankModel = mongoose.model('Bank', bankSchema);

module.exports = bankModel;
