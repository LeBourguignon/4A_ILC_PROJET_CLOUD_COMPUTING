from flask import Flask, request

app = Flask(__name__)

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

@app.route("/")
def listData():
    return [res.toJSON() for res in data]

@app.route("/add/<int:value1>/<int:value2>")
def add(value1, value2):
    resultat = value1 + value2
    global id_cpt
    data.append(Data(id_cpt, resultat))
    id_cpt += 1
    return data[-1].toJSON()

@app.route("/sub/<int:value1>/<int:value2>")
def sub(value1, value2):
    resultat = value1 - value2
    global id_cpt
    data.append(Data(id_cpt, resultat))
    id_cpt += 1
    return data[-1].toJSON()

@app.route("/mul/<int:value1>/<int:value2>")
def mul(value1, value2):
    resultat = value1 * value2
    global id_cpt
    data.append(Data(id_cpt, resultat))
    id_cpt += 1
    return data[-1].toJSON()