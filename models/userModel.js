const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			unique: true,
			index: true,
		},
		sponsor_id: {
			type: String,
		},
		choice_id: {
			type: String,
		},
		position: {
			type: String,
		},
		fullname: {
			type: String,
		},
		phone: {
			type: String,
		},
		email: {
			type: String,
		},
		city: {
			type: String,
		},
		password: {
			type: String,
		},
		confirm_password: {
			type: String,
		},
		mainId: {
			type: Number,
		},
		allUserCount: {
			type: Number,
		},
		merchants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' }],
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

userSchema.pre('save', async function (next) {
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

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
