from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

class Data:
    def __init__(self, id, resultat):
        self.id = id
        self.resultat = resultat

    def toJSON(self):
        return {
            "id": self.id,
            "resultat": self.resultat
        }

data = []
id_cpt = 0

@app.route("/", methods=['GET'])
def listData():
    return [res.toJSON() for res in data]
    # curl -X GET http://localhost:5000/

@app.route("/add/<int:value1>/<int:value2>", methods=['POST'])
def add(value1, value2):
    resultat = value1 + value2
    global id_cpt
    data.append(Data(id_cpt, resultat))
    id_cpt += 1
    return { "id": data[-1].id }
    # curl -X POST http://localhost:5000/add/1/10

@app.route("/sub/<int:value1>/<int:value2>", methods=['POST'])
def sub(value1, value2):
    resultat = value1 - value2
    global id_cpt
    data.append(Data(id_cpt, resultat))
    id_cpt += 1
    return { "id": data[-1].id }
    # curl -X POST http://localhost:5000/sub/1/10

@app.route("/mul/<int:value1>/<int:value2>", methods=['POST'])
def mul(value1, value2):
    resultat = value1 * value2
    global id_cpt
    data.append(Data(id_cpt, resultat))
    id_cpt += 1
    return { "id": data[-1].id }
    # curl -X POST http://localhost:5000/mul/1/10

@app.route("/div/<int:value1>/<int:value2>", methods=['POST'])
def div(value1, value2):
    resultat = value1 / value2
    global id_cpt
    data.append(Data(id_cpt, resultat))
    id_cpt += 1
    return { "id": data[-1].id }
    # curl -X POST http://localhost:5000/div/1/10


@app.route("/get/<int:id>", methods=['GET'])
def getById(id):
    if id < id_cpt:
        return { "resultat": data[id].resultat }
    else:
        return
    # curl -X GET http://localhost:5000/get/0