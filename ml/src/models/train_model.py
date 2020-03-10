# %%

import sys
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# %%
# Retrieve hyperparameters from cmd arguments

# %%
# Hyperparameters for manual testing

dataset = 'ccpp'
model = 'linear_regression'
target = 'net_energy'
