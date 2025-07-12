// employee-salary-prediction-app/server/utils/modelUtils.js
const { StandardScaler } = require('sklearn.preprocessing');
const { LabelEncoder } = require('sklearn.preprocessing');
const { train_test_split } = require('sklearn.model_selection');
const { accuracy_score } = require('sklearn.metrics');

const preprocessData = (data) => {
    // Replace '?' in object columns with 'Unknown'
    for (const col of Object.keys(data)) {
        if (typeof data[col] === 'string' && data[col] === '?') {
            data[col] = 'Unknown';
        }
    }

    // Remove unwanted values and outliers
    data = data.filter(row => row.workclass !== 'Without-pay' && row.workclass !== 'Never-worked');
    data = data.filter(row => !['Preschool', '1st-4th', '5th-6th'].includes(row.education));
    data = data.filter(row => row.age >= 17 && row.age <= 75);
    data = data.filter(row => row['hours-per-week'] >= 25 && row['hours-per-week'] <= 55);
    data = data.filter(row => row['capital-gain'] <= 50000);
    data = data.filter(row => row['capital-loss'] <= 5000);
    
    return data;
};

const encodeLabels = (data) => {
    const le = new LabelEncoder();
    const categoricalCols = Object.keys(data).filter(col => typeof data[col] === 'string');

    for (const col of categoricalCols) {
        data[col] = le.fit_transform(data[col]);
    }

    return data;
};

const standardizeData = (X) => {
    const scaler = new StandardScaler();
    const numericalCols = Object.keys(X).filter(col => typeof X[col] === 'number');
    X[numericalCols] = scaler.fit_transform(X[numericalCols]);
    
    return X;
};

const splitData = (X, y) => {
    return train_test_split(X, y, { test_size: 0.2, random_state: 42 });
};

const evaluateModels = (models, X_train, y_train, X_test, y_test) => {
    const accuracies = {};
    
    for (const [name, model] of Object.entries(models)) {
        model.fit(X_train, y_train);
        const y_pred = model.predict(X_test);
        const acc = accuracy_score(y_test, y_pred);
        accuracies[name] = acc;
    }
    
    return accuracies;
};

module.exports = {
    preprocessData,
    encodeLabels,
    standardizeData,
    splitData,
    evaluateModels
};