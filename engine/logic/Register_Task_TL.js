var logger = executor.logger;

logger.info("START Register_Task_TL");

//Receive Intent from Dashboard
logger.info("All In: " + executor.inFields);

var intent = executor.inFields.get("intent");
logger.info("intent: " + intent);
var action = executor.inFields.get("action");
logger.info("action: " + action);

logger.info("DO SOMETHING HERE");

executor.getExecutionProperties().setProperty("site", "172.17.0.2:8080/function/myslicemanager");
executor.getExecutionProperties().setProperty("site2", "172.17.0.2:8080/function/myslicemanager");

executor.outFields.put("response", "SOMETHING");

logger.info("END Register_Task_TL");

var returnValue = true;
returnValue;
