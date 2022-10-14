# intent-matching
Fast intent matching for the Intent Engine in 5G-CLARITY, using a FastText word embedding model to determine text similarity between an intent and available endpoint descriptions, and FastAPI for serving.

## Installation

1. Clone this repository
2. Download the required data file from the [FastText resources page](https://dl.fbaipublicfiles.com/fasttext/vectors-wiki/wiki.simple.zip) (simple English binary). This is required as the data file exceeds the file size limit on GitHub.
3. Extract the downloaded data into /app/data
4. Build the Docker image from within the intent-matching folder with
	``` Bash
	docker build --rm -t intentmatching:0.1.0 .
	```
5. Include the Docker image into a stack or run it manually with
	``` Bash
	docker run --rm --name intent-matching -p 8000:80 -e MAX_WORKERS=1 intentmatching:0.1.0
	```
	Because the language model for the intent matching is rather big, it is recommended to use one worker process, otherwise the machine will quickly run out of memory.

## Usage

1. Access the Swagger documentation under /docs
2. Use the endpoint /match with a POST request, with the following example body:
	``` JSON
	{
		"intent": "I want to create a slice",
		"descriptions": ["This module allows to create a slice", "This endpoint deploys a function"],
		"top_n": 5
	}
	```
3. The output of this query is a JSON with the descriptions and their similarity to the intent attached:
	``` JSON
	{
		"intent-matching": {
			"This module allows to create a slice": 0.8765,
			"This endpoint deploys a function": 0.6543
		}
	}
	```
	Note that the similarity scores in the result JSON are not guaranteed to be ordered.
4. For more information and configuration of the web server, refer to the [FastAPI Docker documentation](https://hub.docker.com/r/tiangolo/uvicorn-gunicorn-fastapi)
