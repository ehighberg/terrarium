# %%

import sys
import requests

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

%matplotlib inline

# %%
# Retrieve hyperparameters from cmd arguments


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
# Import dataset

def import_dataset(parameters):
    dataset_name = parameters['dataset']
    return pd.read_csv(f'./ml/data/processed/{dataset_name}.csv')

ccpp = import_dataset(parameters)
print(ccpp.head())


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
    print('X shape:', X.shape)
    print('theta shape:', thetas.shape)
    return X.dot(thetas)

def calc_cost(y_pred, y_true):
    num_rows = y_pred.shape[0]
    errors = y_pred - y_true
    return (1 / num_rows) * np.sum(errors ** 2)

def calc_gradient(X, y_pred, y_true, thetas):
    num_rows = X.shape[0]
    errors = y_pred - y_true
    return (1 / num_rows) * X.dot(errors)

def update_thetas(thetas, theta_gradient, learn_rate=1):
    return thetas - learn_rate * theta_gradient
# %%

X_train = add_ones(X_train)
initial_thetas = gen_initial_thetas(X_train)
preds = predict_y(X_train, initial_thetas)
cost = calc_cost(X_train, y_train)
grad = calc_gradient(X_train, preds, y_train, initial_thetas)
updated_thetas = update_thetas(initial_thetas, grad)
print(cost)
print(grad)
print(updated_thetas)
print(preds[:10])
