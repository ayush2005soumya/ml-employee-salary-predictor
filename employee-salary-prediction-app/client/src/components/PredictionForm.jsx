// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; // useHistory for v5

// const PredictionForm = () => {
//     const [formData, setFormData] = useState({
//         age: '',
//         workclass: '',
//         educationNum: '',
//         maritalStatus: '',
//         occupation: '',
//         relationship: '',
//         race: '',
//         sex: '',
//         hoursPerWeek: '',
//         capitalGain: '',
//         capitalLoss: '',
//         nativeCountry: ''
//     });
//     const history = useHistory(); // useHistory() for v5

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('/api/predict', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });
//             const data = await response.json();
//             // Redirect to results page with prediction data
//             history.push('/result',  { result: data } );
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div className="prediction-form">
//             <h2>Salary Prediction Form</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
//                 <input type="text" name="workclass" placeholder="Work Class" value={formData.workclass} onChange={handleChange} required />
//                 <input type="number" name="educationNum" placeholder="Education Number" value={formData.educationNum} onChange={handleChange} required />
//                 <input type="text" name="maritalStatus" placeholder="Marital Status" value={formData.maritalStatus} onChange={handleChange} required />
//                 <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} required />
//                 <input type="text" name="relationship" placeholder="Relationship" value={formData.relationship} onChange={handleChange} required />
//                 <input type="text" name="race" placeholder="Race" value={formData.race} onChange={handleChange} required />
//                 <input type="text" name="sex" placeholder="Sex" value={formData.sex} onChange={handleChange} required />
//                 <input type="number" name="hoursPerWeek" placeholder="Hours Per Week" value={formData.hoursPerWeek} onChange={handleChange} required />
//                 <input type="number" name="capitalGain" placeholder="Capital Gain" value={formData.capitalGain} onChange={handleChange} required />
//                 <input type="number" name="capitalLoss" placeholder="Capital Loss" value={formData.capitalLoss} onChange={handleChange} required />
//                 <input type="text" name="nativeCountry" placeholder="Native Country" value={formData.nativeCountry} onChange={handleChange} required />
//                 <button type="submit">Predict Salary</button>
//             </form>
//         </div>
//     );
// };

// export default PredictionForm;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/PredictionForm.css'; // Custom styles including background image

const PredictionForm = () => {
    const [formData, setFormData] = useState({
        age: '',
        workclass: '',
        educationNum: '',
        maritalStatus: '',
        occupation: '',
        relationship: '',
        race: '',
        sex: '',
        hoursPerWeek: '',
        capitalGain: '',
        capitalLoss: '',
        nativeCountry: '',
        fnlwgt: '',
        education:''
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            history.push('/result', { result: data });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Salary Prediction Form</h2>
            <form className="form-grid" onSubmit={handleSubmit}>
                <label>Age:<input type="number" name="age" value={formData.age} onChange={handleChange} required /></label>
                <label>Workclass:
                    <select name="workclass" value={formData.workclass} onChange={handleChange} required>
                        <option value="Select">Select</option>
                        <option value="Private">Private</option>
                        <option value="Self-emp-not-inc">Self-emp-not-inc</option>
                        <option value="Local-gov">Local-gov</option>
                        <option value="State-gov">State-gov</option>
                        <option value="Self-emp-inc">Self-emp-inc</option>
                        <option value="Federal-gov">Federal-gov</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </label>
                <label>Final weight:<input type="number" name="fnlwgt" value={formData.fnlwgt} onChange={handleChange} required /></label>
                <label>Education:
                    <select name="education" value={formData.education} onChange={handleChange} required>
                        <option value="Select">Select</option>
                        <option value="HS-grad">HS-grad</option>
                        <option value="Some-college">Some-college</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Masters">Masters</option>
                        <option value="Assoc-voc">Assoc-voc</option>
                        <option value="11th">11th</option>
                        <option value="Assoc-acdm">Assoc-acdm</option>
                        <option value="10th">10th</option>
                        <option value="7th-8th">7th-8th</option>
                        <option value="Prof-school">Prof-school</option>
                        <option value="9th">9th</option>
                        <option value="12th">12th</option>
                        <option value="Doctorate">Doctorate</option>
                        <option value="5th-6th">5th-6th</option>
                        <option value="1st-4th">1st-4th</option>
                        <option value="Preschool">Preschool</option>
                    </select>
                </label>
                <label>Education Number:<input type="number" name="educationNum" value={formData.educationNum} onChange={handleChange} required /></label>
                <label>Marital Status:
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
                        <option value="Select">Select</option>
                        <option value="Married-civ-spouse">Married-civ-spouse</option>
                        <option value="Never-married">Never-married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Separated">Separated</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Married-spouse-absent">Married-spouse-absent</option>
                        <option value="Married-AF-spouse">Married-AF-spouse</option>
                    </select>
                </label>
                <label>Occupation:
                    <select name="occupation" value={formData.occupation} onChange={handleChange} required>
                        <option value="Select">Select</option>
                        <option value="Prof-specialty">Prof-specialty</option>
                        <option value="Craft-repair">Craft-repair</option>
                        <option value="Exec-managerial">Exec-managerial</option>
                        <option value="Adm-clerical">Adm-clerical</option>
                        <option value="Sales">Sales</option>
                        <option value="Other-service">Other-service</option>
                        <option value="Machine-op-inspct">Machine-op-inspct</option>
                        <option value="Unknown">Unknown</option>
                        <option value="Transport-moving">Transport-moving</option>
                        <option value="Handlers-cleaners">Handlers-cleaners</option>
                        <option value="Farming-fishing">Farming-fishing</option>
                        <option value="Tech-support">Tech-support</option>
                        <option value="Protective-serv">Protective-serv</option>
                        <option value="Priv-house-serv">Priv-house-serv</option>
                        <option value="Armed-Forces">Armed-Forces</option>
                    </select>
                </label>
                <label>Relationship:
                    <select name="relationship" value={formData.relationship} onChange={handleChange} required>
                        <option value="Select">Select</option>
                        <option value="Husband">Husband</option>
                        <option value="Not-in-family">Not-in-family</option>
                        <option value="Own-child">Own-child</option>
                        <option value="Unmarried">Unmarried</option>
                        <option value="Wife">Wife</option>
                        <option value="Other-relative">Other-relative</option>
                    </select>
                </label>
                <label>Race:
                    <select name="race" value={formData.race} onChange={handleChange} required>
                        <option value="Select">Select</option>
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                        <option value="Asian-Pac-Islander">Asian-Pac-Islander</option>
                        <option value="Amer-Indian-Eskimo">Amer-Indian-Eskimo</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label>Sex:
                    <select name="sex" value={formData.sex} onChange={handleChange} required>
                        <option value="Select">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label>Hours Per Week:<input type="number" name="hoursPerWeek" value={formData.hoursPerWeek} onChange={handleChange} required /></label>
                <label>Capital Gain:<input type="number" name="capitalGain" value={formData.capitalGain} onChange={handleChange} required /></label>
                <label>Capital Loss:<input type="number" name="capitalLoss" value={formData.capitalLoss} onChange={handleChange} required /></label>
                <label>Native Country:
                    <select name="nativeCountry" value={formData.nativeCountry} onChange={handleChange} required>
                        <option value="Select">Select</option>
                        <option value="United-States">United States</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="England">England</option>
                        <option value="Puerto-Rico">Puerto Rico</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="Outlying-US(Guam-USVI-etc)">Outlying US (Guam-USVI-etc)</option>
                        <option value="India">India</option>
                        <option value="Japan">Japan</option>
                        <option value="Greece">Greece</option>
                        <option value="South">South</option>
                        <option value="China">China</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Iran">Iran</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Italy">Italy</option>
                        <option value="Poland">Poland</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Ireland">Ireland</option>
                        <option value="France">France</option>
                        <option value="Dominican-Republic">Dominican Republic</option>
                        <option value="Laos">Laos</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Columbia">Columbia</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Scotland">Scotland</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Yugoslavia">Yugoslavia</option>
                        <option value="El-Salvador">El Salvador</option>
                        <option value="Trinadad&Tobago">Trinidad & Tobago</option>
                        <option value="Peru">Peru</option>
                        <option value="Hong">Hong Kong</option>
                        <option value="Holand-Netherlands">Netherlands</option>
                    </select>
                </label>
                <div className="form-button-container">
                    <button type="submit">Predict Salary</button>
                </div>
            </form>
        </div>
    );
};

export default PredictionForm;
