# Employee Salary Prediction App - Server

## Overview
This server-side application is built using Node.js and Express. It serves as the backend for the Employee Salary Prediction web application, handling requests from the client, processing input data, and returning predictions based on various machine learning models.

## Features
- Implements seven different machine learning models to predict employee salaries.
- Provides an API endpoint for the client to submit data and receive predictions.
- Utilizes middleware for data validation and error handling.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the server directory:
   ```
   cd employee-salary-prediction-app/server
   ```
3. Install the required dependencies:
   ```
   npm install
   ```

### Running the Server
To start the server, run the following command:
```
npm start
```
The server will run on `http://localhost:5000` by default.

### API Endpoints
- **POST /predict**: Accepts input data for salary prediction and returns the predicted salary.

### Testing
You can test the API using tools like Postman or cURL by sending a POST request to the `/predict` endpoint with the required input data.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.