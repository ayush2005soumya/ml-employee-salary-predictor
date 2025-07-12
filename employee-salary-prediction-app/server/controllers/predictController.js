// const salaryModel = require('../models/salaryModel');

// exports.predictSalary = async (req, res) => {
//     try {
//         const inputData = req.body;

//         // Validate input data
//         if (!inputData || Object.keys(inputData).length === 0) {
//             return res.status(400).json({ error: 'Input data is required' });
//         }

//         // Call the salary prediction model
//         const predictionResult = await salaryModel.predict(inputData);

//         // Return the prediction result
//         return res.status(200).json({ predictedSalary: predictionResult });
//     } catch (error) {
//         console.error('Error predicting salary:', error);
//         return res.status(500).json({ error: 'An error occurred while predicting salary' });
//     }
// };

const axios = require('axios');

exports.predictSalary = async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/predict', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error predicting salary:', error);
        res.status(500).json({ error: 'Prediction failed', details: error.message });
    }
};