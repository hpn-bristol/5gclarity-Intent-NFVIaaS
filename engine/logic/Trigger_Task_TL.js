var logger = executor.logger;

logger.info("##START## TRIGGER_TASK_TL");

//Receive Intent from Dashboard
logger.info("All In: " + executor.inFields);
var intent = executor.inFields.get("intent");
logger.info("intent: " + intent);

//Read Intent with basic semantic model
var semanticModel = ["start", "stop", "create", "read", "update", "delete", "deploy", "register"];

var request = intent.get("request");
logger.info("request: " + request);

var action = "unidentified";
for(var i = 0; i < semanticModel.length; i++)
{
	logger.info(request + " and " + semanticModel[i] + " is " + request.includes(semanticModel[i]));
	if(request.includes(semanticModel[i]))
	{
		action = semanticModel[i];
	}
}

executor.outFields.put("intent", intent);
executor.outFields.put("action", action);

logger.info("##END## TRIGGER_TASK_TL");

var returnValue = true;
returnValue;
