# Intent Engine Deployed in Bristol

### This repository includes the Intent Engine developed through in the 5G-CLARITY Project and extended to support NFVIaaS deployment into the UC1 Narrative 1 and Narrative 2 to be run on Bristol. 

## Requirements

### Computational Requirements for this deployment two Virtual Machines with 8 Gb RAN (Ideally) 40 Gb Hard Disk running the Ubuntu 18 or 20 Linux.
### B - VM1 - Intent Engine
### C - VM2 - NFVO MANO

## Steps for Deplopyment VM1
1. Clone the Intent Engine. 
    ``` Bash
        git clone --recurse-submodules https://github.com/Charlemagne2017/intentengine.git
    ```
2. Create a new directory called in /intentengine/matching/app named data.
3. Download the required data file from the [FastText resources page](https://dl.fbaipublicfiles.com/fasttext/vectors-wiki/wiki.simple.zip) (simple English binary). This is required as the data file exceeds the file size limit on GitHub.
4. Extract the contents of the file to /intentengine/matching/app/data.
5. To build and run the Intent Engine change directory to /intentengine and use docker-compose
    ``` Bash 
        docker-compose up --build
    ```
