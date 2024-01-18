import streamlit as st
import joblib
import pandas as pd

# Load Prophet models
model_DL = joblib.load('D:/Rubix/ml_models/prophet_model_mlr.h5')
model_KL = joblib.load('D:/Rubix/ml_models/prophet_model_mlr_KL.h5')

# Streamlit app
st.title('Energy Demand Prediction App')


# Sidebar with input boxes
st.sidebar.title('Input Parameters')
timestamp_input = st.sidebar.text_input('Timestamp (YYYY-MM-DD HH:mm:ss)', '2022-02-01 00:00:00')
temperature_input = st.sidebar.slider('Temperature (°C)', min_value=0.0, max_value=40.0, value=20.0)
humidity_input = st.sidebar.slider('Humidity (%)', min_value=0, max_value=100, value=50)

# Button to trigger predictions
if st.sidebar.button('Predict Demand', key='predict_button'):
    # Create a DataFrame with user input
    input_features_prophet = pd.DataFrame({
        'ds': [pd.to_datetime(timestamp_input)],
        'Temperature': [temperature_input],
        'Humidity': [humidity_input]
    })

    # Make predictions using the loaded models
    prediction_DL = model_DL.predict(input_features_prophet)['yhat'].values[0]
    prediction_KL = model_KL.predict(input_features_prophet[['ds', 'Humidity']])['yhat'].values[0]

    # Display predictions
    st.subheader('Predicted Demand for Delhi (Next 72 hrs):')
    st.success(f"{prediction_DL:.2f} KWh")

    st.subheader('Predicted Demand for Kerela (Next 72 hrs):')
    st.success(f"{prediction_KL:.2f} KWh")

