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
## Steps for deployment of VM2 - NFVO OSM-MANO  
1. Ensure that the VM is in the same network or has connectivity to the VM1.
2. Install the OSM MANO following the following instructions https://osm.etsi.org/docs/user-guide/latest/03-installing-osm.html
3. Configure the usernames and account and the access of the VIM to be able to deploy VNF. https://osm.etsi.org/docs/user-guide/latest/04-vim-setup.html
4. Test the installation of OSM-MANO following the documentation.
## Steps for Training and Testing IntentEngine to be able to deploy NFV into OSM MANO
The Intent engine can now recieve intents at this URL: (IP or localhost):5001/intent-input.
1. Ensure the VM is accesible by REST.
2. If you already have Postman account jump to the step 4
3. Download postman app and create your account, https://www.postman.com/
4. Open your postman app and create a POST request to train the Intent Engine in order. The POST request called "Initialisation_Event" mas sent at the URL (IP or localhost):23324/apex/RestServerConsumer/EventIn.
6. Sent the POST request.
7. After train the Intent Engine, we can test the training by an Intent for NS instatiation, create a POST request to submit the Intent http://10.68.110.53:5001/intent-input 
```json
{
  "intent": {
    "request": "Create new VNF package resource",
    "parameters" : {}
  }
}
```
8. Verify that the Intent Engine delivered the request to OSM and the VNF Packet is Created (empty). 
