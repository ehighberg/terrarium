# %%
import pandas as pd


# %%
# Import dataset

def import_dataset(filepath, header=None):
    return pd.read_excel(filepath, header=header)

CCPP_raw = import_dataset('./ml/data/raw/CCPP/Folds5x2_pp.xlsx', 0)


# %%
# View imported dataset

print(CCPP_raw.sample(10))
print(CCPP_raw.dtypes)


# %%
# Export dataset

CCPP_raw.columns = ['avg_temp', 'exhaust_vac', 'ambient_pressure', 'rel_humid', 'net_energy']
CCPP_raw.to_csv('./ml/data/processed/ccpp.csv', index=False)
