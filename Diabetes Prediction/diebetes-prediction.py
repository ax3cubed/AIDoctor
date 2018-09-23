import numpy as np
import pandas as pd
import matplotlib



data = pd.read_csv('diabetes.csv', index_col=False)

data.head()

Y = data['Outcome'].values
X = data.drop('Outcome', axis=1).values

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.20, random_state=0)


