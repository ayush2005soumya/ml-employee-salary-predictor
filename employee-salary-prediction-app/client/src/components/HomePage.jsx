// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/main.css';

// const HomePage = () => {
//     return (
//         <div className="home-container">
//             <h1>Employee Salary Prediction</h1>
//             <p>Welcome to the Employee Salary Prediction application. Use the form to input your data and get a salary prediction.</p>
//             <Link to="/predict" className="btn">Go to Prediction Form</Link>
//         </div>
//     );
// };

// export default HomePage;

import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/main.css';

const HomePage = () => {
    const History = useHistory();

    const goToForm = () => {
        History.push('/predict');
    };

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Employee Salary Prediction</h1>
                <p>
                    Welcome to the Employee Salary Prediction application.  
                    Use the form to input your details and get an estimated salary.
                </p>
                <button className="home-btn" onClick={goToForm}>
                    Go to Prediction Form
                </button>
            </div>
        </div>
    );
};

export default HomePage;
