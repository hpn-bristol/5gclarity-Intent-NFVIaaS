# Intent Engine supported NFVIaaS Deployed in Bristol

This repository includes the Intent Engine developed through in the 5G-CLARITY Project and extended to support NFVIaaS deployment into the UC1 Narrative 1 and Narrative 2 to be run on Bristol. 

## Requirements

Computational Requirements for this deployment two Virtual Machines with 8 Gb RAN (Ideally) 40 Gb Hard Disk running the Ubuntu 18 or 20 Linux.
- VM1 - Intent Engine
- VM2 - NFVO MANO

## Steps for Deplopyment VM1
1. Clone the Intent Engine. 
    ``` Bash
        git clone --recurse-submodules https://github.com/Charlemagne2017/Intent-NFaaS.git
    ```
2. Create a new directory called in /intentengine/matching/app/data/.
3. Download the required data file from the [FastText resources page](https://dl.fbaipublicfiles.com/fasttext/vectors-wiki/wiki.simple.zip) (simple English binary). This is required as the data file exceeds the file size limit on GitHub.
4. Extract the contents of the file to ..../intentengine/matching/app/data/.
5. To build and run the Intent Engine change directory to ... /intentengine and use docker-compose
    ``` Bash 
        docker-compose up --build
    ```
## Steps for Testing VM1
The Intent engine can now recieve intents at this URL: (IP or localhost):5001/intent-input.
1. Ensure the VM is accesible by REST.
2. If you already have Postman account jump to the step 4
3. Download postman app and create your account, https://www.postman.com/
4. Open your postman app and create a POST request to train the Intent Engine in order. The POST request called "Initialisation_Event" mas sent at the URL (IP or localhost):23324/apex/RestServerConsumer/EventIn.  An example of the JSON format of "Intialization Event" body is introduced. This is just a simple example which has not being tested please jump to the NFVIaaS setup in the next section. 
  ```json
{
   "name":"Initialisation_Event",
   "templateName":"NAME OF THE RESOURCE",
   "url":"IP OF THE RESOURCE:8080",
   "template":{
      "swagger":"2.0",
      "info":{
         "description":"DESCRIPTION OF THE RESOURCE",
         "version":"VESRSION",
         "title":"NAME OF THE RESOURCE",
         "license":{
            "name":"MIT"
         }
      },
      "basePath":"/",
      "schemes":[
         "http"
      ],
      "paths":{
         "/system/functions":{
            "get":{
               "summary":"GET DESCRIPTION THAT NLP WILL MATCH",
               "consumes":[
                  "application/json"
               ],
               "produces":[
                  "application/json"
               ],
               "responses":{
                  "200":{
                     "description":"ESPECTE RESPOSE SUCCESSFULL.",
                     "schema":{
                        "type":"array",
                        "items":{
                           "$ref":"#/definitions/FunctionListEntry"
                        }
                     }
                  }
               }
            }
         }
          "externalDocs":{
         "description":"DOCUMENTATION",
         "url":"URL OF THE DOCUMENTATION"
      }
   }
}
```
5. After train the Intent Engine, we can submit an Intent associated to the trained resource by creating a 
```json
{
   "intent":{
      "request":"deploy RESOURCE DESCRIBED",
      "parameters":{
         "service":"SERVICE",
         "parameters": "ADDITIONAL PARAMETERS"
      }
   }
}
```
