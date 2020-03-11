#!/usr/bin/sh python3
# %%

import sys
import requests
import json
import os

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score


# %%
# Parameters for manual testing

parameters = {
    'dataset': 'ccpp',
    'model': 'linear_regression',
    'target': 'net_energy',
    'metric': 'r2',
    'user_id': 1,
    }

hyperparameters = {
    'standard_scale': True,
    'learning_rate': 0.1,
    'max_iterations': 10
}

test_frac = 0.2
random_seed = 42


# %%
# Manual testing request data

simulated_incoming_body = '''{  "experiment": {
	"target": "net_energy",
	"metric": "r2",
	"model": "linear_regression",
	"dataset": "ccpp",
	"user_id": 6
	},
	"model": {
		"standard_scale": true,
		"learning_rate": 0.1,
		"max_iterations": 100
	}
}'''

simulated_headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6ImJvYiIsImV4cCI6MTU4NDAyMTgyNn0.Cs4Izyuf_lSEt6Q3RGpOPW_CAO_oLGPfk9P3K4KW5QM",
    "Content-Type": "application/json"
}

simulated_outgoing_body = {
    "history": {
        "loss": [58,68,46,1,33,60,42,51,49,54],
        "r2": [0.37,0.16,0.62,0.22,0.76,0.95,0.86,0.35,0.74,0.65]
        },
    "final_score": 0.8
}


# %%
# Import dataset
local_root = '~/ga/u4/terrarium'
print(os.getcwd())
def import_dataset(parameters):
    dataset_name = parameters['dataset']
    return pd.read_csv(f'{local_root}/ml/data/processed/{dataset_name}.csv')

ccpp = import_dataset(parameters)


# %%
# Do train / test split

X = ccpp[ccpp.columns[:-1]]
y = ccpp[ccpp.columns[-1]]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=test_frac, random_state=random_seed
)


# %%
# Sklearn's linear regression doesn't support setting the learning rate or number of iterations, so here we're going to be hand-rolling our linear regression model

def add_ones(X):
    return np.hstack((np.ones((X.shape[0], 1)), X))

def gen_initial_thetas(X):
    return np.zeros((X.shape[1], 1))

def predict_y(X, thetas):
    return X.dot(thetas)

def calc_cost(y_pred, y_true):
    num_rows = y_pred.shape[0]
    errors = y_pred - y_true
    return (0.5 / num_rows) * np.sum(errors ** 2)

def calc_gradient(X, y_true, y_pred):
    # print(y_pred[:10])
    # print(y_true[:10])
    num_rows = X.shape[0]
    errors = y_pred - y_true
    # print(errors[:10])
    # print((1 / num_rows) * np.matmul(X.T, errors))
    return (1 / num_rows) * np.matmul(X.T, errors)

def update_thetas(thetas, gradient, learn_rate):
    return thetas - learn_rate * gradient

def scale_X(X):
    means = np.mean(X, axis=0)
    standard_deviations = np.std(X, axis=0)
    scaled_X = (X - means) / standard_deviations
    return (scaled_X, means, standard_deviations)

def restore_X(scaled_X, means, standard_deviations):
    X = standard_deviations * scaled_X + means
    return X

def scale_X_test(X_test, means, standard_deviations):
    return (X_test - means) / standard_deviations

# %%
# # scale = scale_X(X_train)
# # print(scale)
# X_train, _, _ = scale_X(X_train)
# X_train = add_ones(X_train)
# y_train = np.array(y_train).reshape(y_train.shape[0], 1)
# initial_thetas = gen_initial_thetas(X_train)
# preds = predict_y(X_train, initial_thetas)
# # print(preds[:10, :])
# # print(y_train[:10])
# cost = calc_cost(preds, y_train)
# grad = calc_gradient(X_train, y_train, preds)
# updated_thetas = update_thetas(initial_thetas, grad, 0.01)
# new_cost = calc_cost(X_train, predict_y(X_train, updated_thetas))
# print(cost)
# print(new_cost)
# # print(grad)
# print(updated_thetas)
# # print(preds[:10])


# %%
# Putting together the helper methods above to perform gradient descent linear regression

def linear_regression(X_train, X_test, y_train, y_test, max_iterations=50, learn_rate=0.01, standard_scale=False):
    '''
    Returns in a tuple:
        history: cost values and metric evaluated on training set at each iteration
        final_score: final metric value, evaluated on test set
    '''

    # Setup the history object
    history = { 'loss': [], 'r2': [] }

    # Scale train data if selected
    if standard_scale:
        X_train, means, standard_deviations = scale_X(X_train)

    # Add ones column for bias term
    X_train = add_ones(X_train)

    # Convert target column to an array
    y_train = np.array(y_train).reshape(y_train.shape[0], 1)

    # Initialize thetas to zeros
    thetas = gen_initial_thetas(X_train)

    # Descend gradient for max_iterations
    for _ in range(max_iterations):
        # Get current target predictions
        y_pred = predict_y(X_train, thetas)

        # Calculate gradient for current thetas
        gradient = calc_gradient(X_train, y_train, y_pred)

        # Update thetas
        thetas = update_thetas(thetas, gradient, learn_rate)

        # Caclulate history values
        cost = calc_cost(y_pred, y_train)
        r2 = r2_score(y_train, y_pred)

        # Add history values
        history['loss'].append(cost)
        history['r2'].append(r2)

    # Scale test data if selected
    if standard_scale:
        X_test = scale_X_test(X_test, means, standard_deviations)

    # Get final score
    X_test = add_ones(X_test)
    y_test_pred = predict_y(X_test, thetas)
    final_score = r2_score(y_test, y_test_pred)

    return {'history': history, 'final_score': final_score}


# %%
# More manual testing code
# results = linear_regression(X_train, X_test, y_train, y_test, max_iterations=1000, learn_rate=0.5, standard_scale=True)
# print(results['history']['loss'][-1])
# print(results['final_score'])

headers = simulated_headers
body = simulated_outgoing_body
user_id = 6
experiment_id = 13


# %%
# Get headers and body from shell command



# %%
# Train selected model
linreg_results = linear_regression(X_train, X_test, y_train, y_test, max_iterations=hyperparameters['max_iterations'], learn_rate=hyperparameters['learning_rate'])


# %%
# Send results back to backend

base_url = 'http://localhost:3000'
response = requests.put(f'{base_url}/user/{user_id}/experiment/{experiment_id}',
    json=simulated_outgoing_body,
    headers=headers)

print(response)
