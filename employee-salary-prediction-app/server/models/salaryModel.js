const { RandomForestClassifier, LogisticRegression, DecisionTreeClassifier, GradientBoostingClassifier, SVC, KNeighborsClassifier } = require('sklearn');
const { train_test_split } = require('sklearn.model_selection');
const { accuracy_score } = require('sklearn.metrics');
const { Sequential } = require('tensorflow.keras.models');
const { Dense, Dropout } = require('tensorflow.keras.layers');
const { Adam } = require('tensorflow.keras.optimizers');
const { StandardScaler } = require('sklearn.preprocessing');
const { LabelEncoder } = require('sklearn.preprocessing');
const pandas = require('pandas');

const salaryModel = {
    trainAndPredict: async (inputData) => {
        // Preprocess input data
        const data = pandas.DataFrame(inputData);
        const labelEncoder = new LabelEncoder();
        const categoricalCols = data.select_dtypes(['object']).columns;

        categoricalCols.forEach(col => {
            data[col] = labelEncoder.fit_transform(data[col]);
        });

        const X = data.drop('income', axis=1);
        const y = data['income'];

        // Standardize numerical data
        const scaler = new StandardScaler();
        const numericalCols = X.select_dtypes(['int64', 'float64']).columns;
        X[numericalCols] = scaler.fit_transform(X[numericalCols]);

        // Split data into training and testing sets
        const [X_train, X_test, y_train, y_test] = train_test_split(X, y, test_size=0.2, random_state=42);

        // Define models
        const models = {
            "Logistic Regression": new LogisticRegression(),
            "Decision Tree": new DecisionTreeClassifier(),
            "Random Forest": new RandomForestClassifier(n_estimators=50),
            "Gradient Boosting": new GradientBoostingClassifier(n_estimators=50),
            "SVM": new SVC(probability=true),
            "KNN": new KNeighborsClassifier()
        };

        const accuracies = {};

        // Train and evaluate models
        for (const [name, model] of Object.entries(models)) {
            await model.fit(X_train, y_train);
            const y_pred = model.predict(X_test);
            const acc = accuracy_score(y_test, y_pred);
            accuracies[name] = acc;
        }

        // Deep Learning model
        const dlModel = new Sequential();
        dlModel.add(new Dense(64, { activation: 'relu', input_shape: [X_train.shape[1]] }));
        dlModel.add(new Dropout(0.3));
        dlModel.add(new Dense(32, { activation: 'relu' }));
        dlModel.add(new Dense(1, { activation: 'sigmoid' }));
        dlModel.compile({ optimizer: new Adam(learning_rate=0.001), loss: 'binary_crossentropy', metrics: ['accuracy'] });

        await dlModel.fit(X_train, y_train, epochs=10, batch_size=32, verbose=0);
        const [dlLoss, dlAcc] = dlModel.evaluate(X_test, y_test, verbose=0);
        accuracies["Deep Learning"] = dlAcc;

        // Determine the best model
        const bestModel = Object.keys(accuracies).reduce((a, b) => accuracies[a] > accuracies[b] ? a : b);

        return {
            accuracies,
            bestModel,
            bestAccuracy: accuracies[bestModel]
        };
    }
};

module.exports = salaryModel;