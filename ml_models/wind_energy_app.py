import streamlit as st
import pickle

# Set page title and icon
st.set_page_config(page_title='Wind Energy Prediction', page_icon=':wind_blowing_face:')

# Load the pickled model
filename = "D:/Rubix/ml_models/wind_turbine_regression.pickle"
loaded_model = pickle.load(open(filename, "rb"))

# Main title
st.title('Wind Energy Output Prediction')

# Subtitle
st.sidebar.header('Enter Input Parameters')

# Text input boxes for float values
wind_speed = st.sidebar.text_input('Wind Speed (m/s)', value='5.0')
wind_direction = st.sidebar.text_input('Wind Direction (degrees)', value='180.0')
th_power = st.sidebar.text_input('Theoretical Power (KWh)', value='1000.0')

# Button to trigger prediction
if st.sidebar.button('Predict'):
    # Convert input values to float
    wind_speed = float(wind_speed)
    wind_direction = float(wind_direction)
    th_power = float(th_power)

    # Make prediction
    prediction = loaded_model.predict([[wind_speed, wind_direction, th_power]])

    # Display the output
    st.success('Predicted Energy Output: {:.2f} KWh'.format(prediction[0]))
