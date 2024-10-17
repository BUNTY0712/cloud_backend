const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const bankRoutes = require('./routes/bankRoutes');
const loanRoutes = require('./routes/loanRoutes');
const emiRoutes = require('./routes/emiRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

connectDB();

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/bank', bankRoutes);
app.use('/api/v1/loan', loanRoutes);
app.use('/api/v1/emi', emiRoutes);

const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE || 'development';

app.listen(PORT, () => {
	console.log(
		`Server running in ${DEV_MODE} mode on port ${PORT}`.bgCyan.white
	);
});
