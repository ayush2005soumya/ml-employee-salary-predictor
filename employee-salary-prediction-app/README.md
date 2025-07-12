# Employee Salary Prediction App

This project is a full-stack web application designed to predict employee salaries based on various input features using multiple machine learning models. The stack includes React for the frontend, Node.js/Express for the backend, Python/Flask for ML inference, and PostgreSQL for database integration.

## Project Structure

The project is organized into three main directories: `client`, `server`, and `server/python_api`.

### Client

The `client` directory contains the React application, which includes:

- **public/index.html**: The main HTML file for the React application.
- **src/components**: Contains the React components:
  - **HomePage.jsx**: The home page of the application.
  - **PredictionForm.jsx**: A form for user input to collect data for salary prediction.
  - **ResultsPage.jsx**: Displays the predicted salary and includes navigation back to the home page.
- **src/App.jsx**: The main component that sets up routing for the application.
- **src/index.js**: The entry point for the React application.
- **src/styles/main.css**: CSS styles for the application, ensuring a responsive design.
- **package.json**: Configuration file for the client-side application, including the `"proxy"` setting for API requests.

### Server

The `server` directory contains the Node.js backend, which includes:

- **models/salaryModel.js**: Logic for the salary prediction model, implementing all seven machine learning models.
- **routes/predict.js**: Route handler for predictions, defining the endpoint for the client to submit data.
- **controllers/predictController.js**: Handles the prediction logic and returns results to the client.
- **utils/modelUtils.js**: Utility functions for data preprocessing and model evaluation.
- **db/**: Database connection and query logic for PostgreSQL integration.
- **app.js**: The main entry point for the Node.js server.
- **package.json**: Configuration file for the server-side application.

### Python API

The `server/python_api` directory contains the Python Flask API for ML inference:

- **python_api.py**: Flask API for serving predictions.
- **preprocessor.pkl, scaler.pkl, model .pkl files**: Saved ML models and preprocessors.
- **requirements.txt**: Python dependencies.

### Database Integration

- The application uses **PostgreSQL** to store user input data and prediction results.
- The Node.js backend connects to the PostgreSQL database using a database client (such as `pg`).
- Database logic is organized in the `server/db/` directory, and connection details are configured in environment variables or a config file.
- On each prediction, user input and results are saved to the database for record-keeping and analytics.

## Setup Instructions

### 1. PostgreSQL Database Setup

1. Install PostgreSQL and create a database (e.g., `salary_prediction`).
2. Create necessary tables for storing user inputs and prediction results.
3. Update your database connection settings in the server (usually in `server/db/config.js` or via environment variables).

### 2. Python API Setup

1. Navigate to `server/python_api`:
   ```bash
   cd server/python_api
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Flask API:
   ```bash
   python python_api.py
   ```
   The API runs on `http://localhost:5000`.

### 3. Node.js Backend Setup

1. Navigate to `server`:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Node.js server (should run on port 8000):
   ```bash
   node app.js
   ```
   The backend proxies `/api/predict` to the Python API and interacts with PostgreSQL.

### 4. React Client Setup

1. Navigate to `client`:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure `package.json` includes:
   ```json
   "proxy": "http://localhost:8000"
   ```
4. Start the React app:
   ```bash
   npm start
   ```
   The frontend runs on `http://localhost:3000`.

## Usage

- Open your browser and go to `http://localhost:3000`.
- Fill out the prediction form with employee data.
- Submit to view the predicted salary and best model on the results page.
- All inputs and predictions are stored in the PostgreSQL database for future reference.

## Troubleshooting

- Ensure all three servers (React, Node.js, Python/Flask) and the PostgreSQL database are running.
- If you see errors about "unseen labels" in Python, retrain and save your encoders using OneHotEncoder with `handle_unknown='ignore'`.
- If you get a 404 or 500 error, check the backend and Python API logs for details.
- For database errors, check your PostgreSQL connection settings and table schemas.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE