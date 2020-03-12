#!/usr/bin/bash python3
# %%

import sys
import requests

from pandas import read_csv
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score


# %%
# Parameters for all runs

test_frac = 0.2
random_seed = 42


# %%
# Import dataset
def import_dataset(dataset_name):
    return read_csv(f'/app/data/processed/{dataset_name}.csv')

ccpp = import_dataset('ccpp')


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
    num_rows = X.shape[0]
    errors = y_pred - y_true
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
# Putting together the helper methods above to perform gradient descent linear regression

def linear_regression(X_train, X_test, y_train, y_test, max_iterations=50, learn_rate=0.01, standard_scale=True):
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
# Get headers and body from shell command

learn_rate = float(sys.argv[1])
max_iterations = int(sys.argv[2])
experiment_id = int(sys.argv[3])
user_id = int(sys.argv[4])
authorization = ' '.join([sys.argv[5], sys.argv[6]])
port = int(sys.argv[7])

headers = {
    "Content-Type": "application/json",
    "Authorization": authorization
    }


# %%
# Train selected model
linreg_results = linear_regression(X_train, X_test, y_train, y_test, max_iterations=max_iterations, learn_rate=learn_rate)


# %%
# Send results back to backend

print("python on port: ", port)
base_url = f'https://localhost:{port}'
response = requests.put(f'{base_url}/user/{user_id}/experiment/{experiment_id}',
    json=linreg_results,
    headers=headers)
