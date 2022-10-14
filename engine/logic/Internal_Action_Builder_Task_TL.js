var logger = executor.logger;

logger.info("##START## INTERNAL_ACTION_BUILDER_TASK_TL");

logger.info("~~All In: " + executor.inFields);

var templateInformation = executor.inFields.get("templateInformation");
logger.info("~~templateInformation: " + templateInformation);

var actionObj = {"One" : 1, "Two" : 2, "Three" : 3};
executor.outFields.put("action", actionObj);

logger.info("##END## INTERNAL_ACTION_BUILDER_TASK_TL");

var returnValue = true;
returnValue;
