var logger = executor.logger;

logger.info("START Module_Response_TASK_TL");

logger.info("All In: " + executor.inFields);
var service = executor.inFields.get("service");
logger.info("service: " + service);
var image = executor.inFields.get("image");
logger.info("image: " + image);

//logger.info(Object.getOwnPropertyNames(executor));

executor.getExecutionProperties().setProperty("site", "http://localhost:5000/receive");

logger.info("All Out: " + executor.outFields);

executor.outFields.put("processed", true);

logger.info("END Module_Response_TASK_TL");

var returnValue = true;
returnValue;
