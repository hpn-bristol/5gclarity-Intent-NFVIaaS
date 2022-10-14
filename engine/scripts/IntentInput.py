import json
import time
import requests

from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)
@app.route('/intent-input', methods=['POST'])
def newSendIntent():
    #time.sleep(5)
    intent = request.get_json()
    intentMatchingInput = requests.post('http://localhost:23324/apex/RestServerConsumer/EventIn', json={'intent' : intent["intent"]})
    print("HERE IS THE INTENT MATCHING INPUT JSON RESPONSE")
    print(intentMatchingInput.json())
    
    if intentMatchingInput.status_code == 200 or intentMatchingInput.status_code == 202:
        message = "Intent Decriptions Successfully Gathered"
        print("HERE IS THE INTENT MATCHING INPUT JSON RESPONSE")
        print(intentMatchingInput.json())
        
        intentMatchingOutput = requests.post('http://intentengine_matching_1:80/match', json=intentMatchingInput.json())
        if intentMatchingOutput.status_code == 200 or intentMatchingOutput.status_code == 202:
            message = "Intent is Successfully Matched"
            print("HERE IS THE INTENT MATCHING OUTPUTJSON RESPONSE")
            scored = intentMatchingOutput.json()
            scored["name"] = "Intent_Matching_Result"
            print("HERE IS THE scored")
            print(scored)
            
            scoredDescriptionInput = requests.post('http://localhost:23324/apex/RestServerConsumer/EventIn', json=scored)
            if scoredDescriptionInput.status_code == 200 or scoredDescriptionInput.status_code == 202:
                message = "Scored Descriptions are Successfully Inputted"
                print("HERE IS THE SCORED DESCRIPTION JSON RESPONSE")
                print(scoredDescriptionInput.json())
                
                message = scoredDescriptionInput.json()
                path = "http://" + message["path"]
                method = message["method"]
                body = message["body"]
                
                print("Path = " , path)
                print("Method = " , method)
                print("Body = " , body)
                headers = {'Content-Type': 'application/json'}

                if(method == "get"):
                    response = requests.get(path, json=body, headers={'Content-Type': 'application/json'})
                    print("GET Called")
                if(method == "post"):
                    response = requests.post(path, json=body, headers={'Content-Type': 'application/json'})
                    print("POST Called")
                if(method == "put"):
                    response = requests.put(path, body)
                    print("PUT Called")
                if(method == "delete"):
                    response = requests.post(path)
                    print("DELETE Called")

                if response.status_code == 200 or response.status_code == 202:
                    message = response.text
                else:
                    message = response.text
                    
                print(message, response.status_code, response.headers.items())
                return(message, response.status_code, response.headers.items())

    else:
        message = "Error when intent sent to intent engine"
    
    print(message, scoredDescriptionInput.status_code, scoredDescriptionInput.headers.items())
    return(message, scoredDescriptionInput.status_code, scoredDescriptionInput.headers.items())

app.run(debug=True,host="0.0.0.0",port=5001)
