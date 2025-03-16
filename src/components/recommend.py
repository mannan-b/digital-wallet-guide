import tensorflow as tf
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
# Import Sequential directly from tensorflow.keras.models
from tensorflow.keras.models import Sequential
# Import Dense and LSTM directly from tensorflow.keras.layers
from tensorflow.keras.layers import Dense, LSTM
import yfinance as yf
import streamlit as st
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch


# Function to fetch stock data
def fetch_stock_data(ticker):
    stock_data = yf.download(ticker, period='5y')
    return stock_data

# Function to preprocess data
def preprocess_data(stock_data):
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(stock_data['Close'].values.reshape(-1, 1))
    return scaled_data

# Function to create LSTM model
def create_lstm_model(scaled_data):
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(scaled_data.shape[1], 1)))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

# Function to predict stock prices
def predict_stock_prices(model, scaled_data):
    predictions = model.predict(scaled_data)
    return predictions

# Function to analyze news sentiment using LLM
def analyze_news_sentiment(news_headlines):
    # Load pre-trained LLM model and tokenizer
    model_name = "distilbert-base-uncased-finetuned-sst-2-english"
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    
    # Tokenize and classify sentiment
    inputs = tokenizer(news_headlines, return_tensors='pt')
    outputs = model(**inputs)
    sentiment_scores = torch.nn.functional.softmax(outputs.logits, dim=1)
    
    return sentiment_scores

# Main function
def main():
    ticker = "AAPL"  # Example stock ticker
    stock_data = fetch_stock_data(ticker)
    scaled_data = preprocess_data(stock_data)
    
    # Create and train LSTM model
    model = create_lstm_model(scaled_data)
    model.fit(scaled_data[:-1].reshape(-1, 1, 1), scaled_data[1:], epochs=100, verbose=0)
    
    # Predict stock prices
    predictions = predict_stock_prices(model, scaled_data[-1].reshape(1, 1, 1))
    
    # Analyze news sentiment
    news_headlines = ["Example news headline about AAPL"]
    sentiment_scores = analyze_news_sentiment(news_headlines)
    
    # Display results
    st.write("Stock Price Prediction:", predictions)
    st.write("News Sentiment Analysis:", sentiment_scores)

if __name__ == "__main__":
    main()