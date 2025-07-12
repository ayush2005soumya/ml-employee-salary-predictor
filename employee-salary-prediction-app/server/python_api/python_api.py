# from flask import Flask, request, jsonify
# import numpy as np
# import pandas as pd
# import joblib

# # Load your trained objects (update filenames as needed)
# scaler = joblib.load('scaler.pkl')
# encoders = joblib.load('label_encoder.pkl')
# numerical_cols = joblib.load('numerical_cols.pkl')
# categorical_cols = joblib.load('categorical_cols.pkl')
# results_df = pd.read_pickle('results_df.pkl')

# models = {
#     "Logistic Regression": joblib.load('logreg.pkl'),
#     "Decision Tree": joblib.load('dtree.pkl'),
#     "Random Forest": joblib.load('rf.pkl'),
#     "Gradient Boosting": joblib.load('gb.pkl'),
#     "SVM": joblib.load('svm.pkl'),
#     "KNN": joblib.load('knn.pkl'),
#     # For deep learning, use keras.models.load_model if needed
# }

# app = Flask(__name__)

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.json
#     df = pd.DataFrame([data])

#     # Preprocess
#     for col in categorical_cols:
#         df[col] = encoders[col].transform(df[col].astype(str))
#     df[numerical_cols] = scaler.transform(df[numerical_cols])

#     preds = {}
#     for name, model in models.items():
#         pred = model.predict(df)[0]
#         preds[name] = int(pred)

#     best_model = results_df.sort_values("Mean Accuracy", ascending=False).iloc[0]["Model"]
#     best_pred = preds[best_model]

#     return jsonify({
#         "all_predictions": preds,
#         "best_model": best_model,
#         "best_prediction": int(best_pred)
#     })

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib
import datetime
import logging

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils_db.db import insert_prediction

# ----------------- Load Preprocessor & Models -----------------
preprocessor = joblib.load('preprocessor.pkl')
numerical_cols = joblib.load('numerical_cols.pkl')
categorical_cols = joblib.load('categorical_cols.pkl')
results_df = pd.read_pickle('results_df.pkl')

models = {
    "Logistic Regression": joblib.load('logreg.pkl'),
    "Decision Tree": joblib.load('dtree.pkl'),
    "Random Forest": joblib.load('rf.pkl'),
    "Gradient Boosting": joblib.load('gb.pkl'),
    "SVM": joblib.load('svm.pkl'),
    "KNN": joblib.load('knn.pkl'),
}

# ----------------- Label Mapping -----------------
label_map = {0: "<=50K", 1: ">50K"}

# ----------------- Flask Setup -----------------
app = Flask(__name__)
CORS(app)

# Logging setup
logging.basicConfig(filename='logs/api.log', level=logging.INFO, format='%(asctime)s - %(message)s')

# Frontend to backend key rename map
rename_map = {
    'age': 'age',
    'workclass': 'workclass',
    'educationNum': 'education-num',
    'maritalStatus': 'marital-status',
    'occupation': 'occupation',
    'relationship': 'relationship',
    'race': 'race',
    'sex': 'sex',
    'hoursPerWeek': 'hours-per-week',
    'capitalGain': 'capital-gain',
    'capitalLoss': 'capital-loss',
    'nativeCountry': 'native-country',
    'fnlwgt': 'fnlwgt',
    'education':'education'
}

# ----------------- Predict Endpoint -----------------
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # -------- 1. Receive & log input --------
        data = request.json
        extra_fields = {key: data.get(key) for key in ['fnlwgt', 'education']}
        df = pd.DataFrame([data])
        logging.info(f"Input received: {data}")

        # -------- 2. Rename columns to match training schema --------
        df.rename(columns=rename_map, inplace=True)
        df.drop(columns=['fnlwgt', 'education'], errors='ignore', inplace=True)

        # -------- 3. Fill missing columns --------
        for col in categorical_cols:
            if col not in df.columns:
                df[col] = 'Unknown'
        for col in numerical_cols:
            if col not in df.columns:
                df[col] = 0

        # -------- 4. Preprocess with pre-fitted ColumnTransformer --------
        try:
            df_processed = preprocessor.transform(df)
        except Exception as e:
            return jsonify({'error': f'Preprocessing failed: {str(e)}'}), 400

        # -------- 5. Make predictions --------
        preds = {}
        probs = {}
        for name, model in models.items():
            try:
                raw_pred = int(model.predict(df_processed)[0])
                preds[name] = raw_pred
                if hasattr(model, "predict_proba"):
                    probs[name] = float(np.max(model.predict_proba(df_processed)))
                else:
                    probs[name] = "N/A"
            except Exception as e:
                preds[name] = f"Error: {str(e)}"
                probs[name] = "N/A"

        # -------- 6. Convert predictions to readable labels --------
        preds_labeled = {name: label_map.get(pred, str(pred)) for name, pred in preds.items()}

        # -------- 7. Select Best Model --------
        best_model = results_df.sort_values("Mean Accuracy", ascending=False).iloc[0]["Model"]
        best_pred = preds_labeled[best_model]
        best_confidence = probs[best_model]
        # -------- database insertion ----------
        record = {
            "age": int(df["age"].iloc[0]),
            "workclass": df["workclass"].iloc[0],
            "education_num": int(df["education-num"].iloc[0]),
            "education": data.get("education", "N/A"),
            "marital_status": df["marital-status"].iloc[0],
            "occupation": df["occupation"].iloc[0],
            "relationship": df["relationship"].iloc[0],
            "race": df["race"].iloc[0],
            "sex": df["sex"].iloc[0],
            "hours_per_week": int(df["hours-per-week"].iloc[0]),
            "capital_gain": int(df["capital-gain"].iloc[0]),
            "capital_loss": int(df["capital-loss"].iloc[0]),
            "fnlwgt": int(data.get("fnlwgt", 0)),
            "native_country": df["native-country"].iloc[0],
            "income": best_pred,              # predicted label: "<=50K" or ">50K"
            "model": best_model,              # best model used
            "confidence": best_confidence     # prediction confidence
        }
        insert_prediction(record)
        # -------- 8. Log and return results --------
        logging.info(f"Best model: {best_model}, Prediction: {best_pred}, Confidence: {best_confidence}")
        return jsonify({
            "all_predictions": preds_labeled,
            "confidences": probs,
            "best_model": best_model,
            "best_prediction": best_pred,
            "confidence": best_confidence
        })
    
        
        
    

    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        return jsonify({"error": "Unexpected error occurred", "details": str(e)}), 500

# ----------------- Run Flask App -----------------
if __name__ == '__main__':
    app.run(port=5000, debug=True)
