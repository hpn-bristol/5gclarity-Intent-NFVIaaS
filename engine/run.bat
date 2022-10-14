docker build --no-cache -t josephmcnamara/intentengine:0.0.1 .

docker run -it --network=func_functions -p 23324:23324 -p 6969:6969 -p 18989:18989 -p 5001:5001 --name intent-engine --rm  josephmcnamara/intentengine:0.0.1

pause
