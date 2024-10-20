
const express = require('express')
const User = require('../model/User')
const SalesData = require('../model/SalesData')
const csv = require('csv-parser')
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const JWT_SECRET = 'your_secret_key'; 

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function Register(req, res) {
    try {
        const { firstName,lastName,email,password,businessName} = req.body;

        if(!firstName || !lastName || !email || !password || !businessName){
            return res.status(201).json({"message":"Missing data"})
        }
        const isValiduser = await User.findOne({ Email: email });

        if (isValiduser) {
            return res.status(200).json({ "message": "User already Exist" })
        }

        const newUser = new User({
            FirstName:firstName,
            LastName:lastName,
            Email:email,
            Password:password,
            BussinessName:businessName
        })

        await newUser.save();
        return res.status(201).json({ "message": "user Registered Succesfully!!" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
}


async function Login(req, res) {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all the data." });
        }

        // Find the user with matching email and password
        const validUser = await User.findOne({ Email: email, Password: password });
        if (!validUser) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate JWT token (add relevant user info in payload)
        const token = jwt.sign(
            {
                userId: validUser._id,
                email: validUser.Email,
                firstName: validUser.FirstName, // Example of including user info in the token
            },
            JWT_SECRET, // Use your secret key
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Return the token and success message
        return res.status(200).json({
            message: "User login successfully!",
            token: token // Send the token to the client
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}

async function DataUploader(req, res) {
    // Check if file exists
    const {user_id} = req.body;
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Get the file name from the request body
    const { fileName } = req.body;
    if (!fileName) {
        return res.status(400).send('File name is required.');
    }

    const results = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            // Map CSV data to the schema format
            results.push({
                orderId: data['Order ID'],
                product: data['Product'],
                quantityOrdered: Number(data['Quantity Ordered']),
                priceEach: Number(data['Price Each']),
                Margin: Number(data['Margin '])
            });
        })
        .on('end', async () => {
            try {
                // Create a new SalesData instance and save it
                const newSalesData = new SalesData({
                    Users : user_id,
                    salesData: results,
                    FileName: fileName 
                });

                await newSalesData.save();

                console.log('Data saved to database:', results);
                res.status(200).send('File processed and data saved successfully.');
            } catch (error) {
                console.error('Error saving data:', error);
                res.status(500).send('Error saving data to the database.');
            } finally {
                // Remove the file after processing
                fs.unlinkSync(filePath);
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).send('Error reading the CSV file.');
        });
}

async function UserSalesdata(req, res) {
    try {
        const { id } = req.body;

        // Check if the ID is provided
        if (!id) {
            return res.status(400).json({ message: "ID is missing" });
        }

        // Fetch sales data for the user
        const data = await SalesData.find({ Users: id });

        // Check if any sales data was found
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No Sales Data Found" });
        }

        // Prepare an array to hold the filenames and their IDs
        const salesDataList = data.map(item => ({
            fileName: item.FileName,
            id: item._id
        }));

        return res.status(200).json(salesDataList); // Send the list of sales data

    } catch (error) {
        console.error("Error fetching sales data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getSalesdata(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(200).json({ "message": "Id Missing" });
    }
    const salesdata = await SalesData.findById(id);

    if (!salesdata) {
        return res.status(200).json({ "message": "No Data Found !!" })
    }

    return res.status(200).json({ "Sales data ": salesdata })

}

async function getInvestmentAssistance(req, res) {
    try {
        const userPrompt = req.body.userPrompt;
        const prompt = `Try to write response as small as possible Act as a Chartered Accountant (CA) who specializes in helping shopkeepers make sound financial and investment decisions. When the user asks a question, respond with clear, personalized advice, taking into account their business type, financial goals, and risk tolerance. Provide practical investment suggestions, tax-saving strategies, and methods for improving financial health. Here is my question: ${userPrompt}`;

        const result = await model.generateContent(prompt);

       
        let aiResponse = result.response.candidates[0].content.parts[0].text;

        aiResponse = aiResponse
            .replace(/\*\*/g, '') // Remove '**'
            .replace(/\*/g, '')   // Remove '*'
            .replace(/\s+/g, ' ') // Remove excessive whitespaces/newlines
            .trim();              // Trim spaces at the beginning and end

        return res.status(200).json({ message: aiResponse });
    } catch (error) {
        res.status(500).json({ error: "Error generating AI response: " + error.message });
    }
}

async function getFinancialQueries(req, res) {
    try {
        const { fileName, isUsedSalesdata, question, bussinesstype } = req.body;
        if(!fileName && !isUsedSalesdata && !question && !bussinesstype){
            console.log('data missing');
        }


        if (isUsedSalesdata === true) {
            if (!fileName) {
                return res.status(400).json({ "message": "Please select your Sales Report Name" });
            }

            const salesdata = await SalesData.findOne({ FileName: fileName }).select('uniqueProductPrices');

            if (!salesdata) {
                return res.status(404).json({ "message": "Sales report not found." });
            }
            const prompt = `I have a question about my sales report. Can you help me understand ${question}? I'm not sure how it is affecting my overall business, here is my sales data ${salesdata}here product Name and count are there count is the occurence of product in sales report try to write straight forward answer and try to keep as small the response as possible and I would appreciate your insights as my CA`

            const result = await model.generateContent(prompt);
            let aiResponse = result.response.candidates[0].content.parts[0].text;

            aiResponse = aiResponse
                .replace(/\*\*/g, '') // Remove '**'
                .replace(/\*/g, '')   // Remove '*'
                .replace(/\s+/g, ' ') // Remove excessive whitespaces/newlines
                .trim();              // Trim spaces at the beginning and end
    
            return res.status(200).json({ message: aiResponse });
        } else {

            const prompt = `As a shopkeeper, I have a question related to my business. Can you help me with ${question} ? My bussiness is about ${bussinesstype}, try to write straight forward answer and try to keep as small the response as possible  and I would appreciate your advice as my Chartered Accountant.`

            const result = await model.generateContent(prompt);
             
            let aiResponse = result.response.candidates[0].content.parts[0].text;

        aiResponse = aiResponse
            .replace(/\*\*/g, '') // Remove '**'
            .replace(/\*/g, '')   // Remove '*'
            .replace(/\s+/g, ' ') // Remove excessive whitespaces/newlines
            .trim();              // Trim spaces at the beginning and end

        return res.status(200).json({ message: aiResponse });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
}


async function CalculateTax(req, res) {
    try {
        const { filename } = req.body;
        const salesdata = await SalesData.findOne({ FileName: filename }).select('uniqueProductPrices');
        return res.status(200).json({ "message": salesdata })

    } catch (error) {
        return res.status(500).json({ "message": "Internal Server Error" });
    }


}

async function getTaxRate(req, res) {

    try {
        const productName = req.body;
        if (!productName) {
            return res.status(200).json({ "message": "not found" })
        }
        const prompt = `Based on the given GST rates:
"0% GST Rate: Applies to essential food items such as food grains (e.g., rice, wheat, milk products, pulses), fresh fruits, vegetables, and educational services like tuition fees for primary education.
5% GST Rate: This covers common-use products and services, including items like packaged food (e.g., tea, coffee, edible oils) and transport services such as rail, metro, and public bus transport.
12% GST Rate: Includes processed food products like dairy items (butter, cheese), frozen vegetables, and IT products such as computer hardware, printers, and certain types of machinery.
18% GST Rate: This rate is levied on a wide range of consumer goods like soaps, shampoos, household electronics (refrigerators, air conditioners), and restaurant services with air conditioning or those serving alcohol. 28% GST Rate: Applies to luxury goods and products deemed non-essential or harmful, such as high-end cars, luxury motorcycles, aerated drinks, tobacco products, and gambling services.",
categorize ${productName} and return only the GST rate for "${productName}". here is the name of product "${productName} "Do not ask any questions".`;


        const result = await model.generateContent(prompt);

        return res.status(200).json({ "message": result })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Internal Server Error " })
    }
}

module.exports = { Register, Login, DataUploader, getSalesdata, getInvestmentAssistance, getFinancialQueries, CalculateTax, getTaxRate , UserSalesdata }
