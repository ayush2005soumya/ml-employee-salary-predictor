// import React from 'react';
// import { useHistory } from 'react-router-dom';

// const ResultsPage = ({ predictedSalary }) => {
//     const history = useHistory();

//     const handleBackToHome = () => {
//         history.push('/');
//     };

//     return (
//         <div className="results-page">
//             <h1>Salary Prediction Result</h1>
//             <p>Your predicted salary is: <strong>${predictedSalary}</strong></p>
//             <button onClick={handleBackToHome}>Back to Home</button>
//         </div>
//     );
// };

// export default ResultsPage;

// import React from 'react';
// import { useLocation, useHistory } from 'react-router-dom';

// const ResultsPage = () => {
//     const location = useLocation();
//     const history = useHistory();
//     const result = location.state&& location.state.result;

//     if (!result) {
//         return (
//             <div>
//                 <h2>No prediction result found.</h2>
//                 <button onClick={() => history.push('/')}>Back to Home</button>
//             </div>
//         );
//     }

//     return (
//         <div className="result">
//             <h3>Best Model: {result.best_model}</h3>
//             <h3>Predicted Salary: {result.best_prediction}</h3>
//             <button onClick={() => history.push('/')}>Back to Home</button>
//         </div>
//     );
// };

// export default ResultsPage;

import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '../styles/resultspage.css';

const ResultsPage = () => {
    const location = useLocation();
    const history = useHistory();
    const result = location.state && location.state.result;

    if (!result) {
        return (
            <div className="result">
                <div className="result-card">
                    <h2>No prediction result found.</h2>
                    <button onClick={() => history.push('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="result">
            <div className="result-card">
                <h3>Best Model: {result.best_model}</h3>
                <h3>Predicted Salary: {result.best_prediction}</h3>
                <button onClick={() => history.push('/')}>Back to Home</button>
            </div>
        </div>
    );
};

export default ResultsPage;
