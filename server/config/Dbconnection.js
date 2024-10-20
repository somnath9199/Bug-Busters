const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Define the Dbconnect function
const Dbconnect = () => {
    const dburl = process.env.DB_URL; // Make sure your .env file contains the correct DB_URL value
    
    if (!dburl) {
        console.log('DB_URL is not defined in the environment variables.');
        return;
    }

    mongoose.connect(dburl)
        .then(() => {
            console.log('Mongoose connected successfully!');
        })
        .catch((err) => {
            console.log('Some problem occurred while connecting to MongoDB:', err);
        });
};

// Export the Dbconnect function
module.exports = Dbconnect;