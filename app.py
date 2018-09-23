import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, AdaBoostClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis, QuadraticDiscriminantAnalysis
from sklearn.model_selection import train_test_split
import pickle

from flask import Flask, request

from io import StringIO

"""
    To run a flask server just type into your terminal

    FLASK_APP=app.py
    flask run

"""

app = Flask(__name__)

filename1 = 'modelDiabetes.sav'
filename2 ='finalized_model_cervical_cancer_prediction.sav'
filename3 ='lung_model.sav'
modelDiabetes = pickle.load(open(filename1, 'rb'))
modelforCervical = pickle.load(open(filename2, 'rb'))
modelforLung = pickle.load(open(filename3, 'rb'))


def model(prediction):
    print ('Your prediction..........')
    value = str(modelDiabetes.predict(prediction))
    if value == '0':
        return 'There is 83 percent chance that you do not have Diabetes'
    else:
        return 'There is 83 percent chance that you do have Diabetes'

def modelCervical(prediction):
    print ('Your prediction..........')
    value = str(modelforCervical.predict(prediction))
    if value == '0':
        return 'There is 97 percent chance that you do not have Cervical Cancer'
    else:
        return 'There is 97 percent chance that you have Cervical Cancer'


def modelLung(prediction):
    print ('Your prediction..........')
    value = str(modelforLung.predict(prediction))
    if value == '1':
        return 'There is 79 percent chance that you will survive lung cancer'
    else:
        return 'There is 79 percent chance that trying to cure lung cancer will not have much effect'


@app.route("/predictDiabetes", methods=["POST"])                    # YOU CAN CHANGE THIS TO SUIT YOUR METHODS
def predictDiabetes():
    print("getting record...")
    record = np.zeros((1, 7))
    initialReq = request.data                               # request.data is getting the data you are sending from your index.js
    print("INITIAL REQUEST: {}".format(initialReq))
    initialReq = initialReq.split(',')                      # this is how I seperated the numbers into a string array
    print("RECORD BEFORE: {}".format(initialReq))
    record[0] = map(float, initialReq)                        # this is how I converted my string numbers into ints
    print("RECORD AFTER: {}".format(record))
    return model(record)                                    # I then returned the prediction which the model fucntion did for me



@app.route("/predictCervical", methods=["POST"])
def predictCervical():
    print("getting record...")
    record = np.zeros((1, 30))
    initialReq = request.data
    print("INITIAL REQUEST: {}".format(initialReq))
    initialReq = initialReq.split(',')
    print("RECORD BEFORE: {}".format(initialReq))
    record[0] = map(int, initialReq)
    print("RECORD AFTER: {}".format(record))
    return modelCervical(record)



@app.route("/predictLung", methods=["POST"])
def predictLung():
    print("getting record...")
    record = np.zeros((1, 8))
    initialReq = request.data
    print("INITIAL REQUEST: {}".format(initialReq))
    initialReq = initialReq.split(',')
    print("RECORD BEFORE: {}".format(initialReq))
    record[0] = map(int, initialReq)
    print("RECORD AFTER: {}".format(record))
    return modelLung(record)                                    


if __name__ == '__main__':
    app.run(debug=True)
