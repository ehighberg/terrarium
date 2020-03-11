# %%

import requests
import json


# %%
# Manual testing properties
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

simulated_headers = '''{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6ImJvYiIsImV4cCI6MTU4NDAyMTgyNn0.Cs4Izyuf_lSEt6Q3RGpOPW_CAO_oLGPfk9P3K4KW5QM",
    "Content-Type": "application/json"
}'''

simulated_outgoing_body = {
    "history": {
        "loss": [58,68,46,1,33,60,42,51,49,54],
        "r2": [0.37,0.16,0.62,0.22,0.76,0.95,0.86,0.35,0.74,0.65]
        },
    "final_score": 0.84
}


# %%
#
