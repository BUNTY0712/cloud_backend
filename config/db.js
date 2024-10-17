// for atlas
const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.error(`Error: ${error.message}`.red);
		process.exit(1);
	}
};

module.exports = connectDB;

// for moogo
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/merncrud");
//     console.log(`Connected to Mongodb database`.bgMagenta.white);
//   } catch (error) {
//     console.log(`MONGO Connect Error ${error}`.bgRed.white);
//   }
// };

// module.exports = connectDB;
