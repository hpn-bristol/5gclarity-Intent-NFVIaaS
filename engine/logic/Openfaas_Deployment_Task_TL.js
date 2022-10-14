var logger = executor.logger;

logger.info("##START## OPENFAAS_DEPLOYMENT_TASK_TL");

logger.info("~~All In: " + executor.inFields);

var intent = executor.inFields.get("intent");
logger.info("~~intent: " + intent);

var image = intent.get("image");
logger.info("image: " + image);

var service = intent.get("service");
logger.info("service: " + service);

//Look for OpenFaas URL
var openfaasURL = executor.getContextAlbum("RegisteredComponentsAlbum").get("openfaas");

executor.getExecutionProperties().setProperty("openfaas", openfaasURL);

executor.outFields.put("image", image);
executor.outFields.put("service", service);

logger.info("##END## OPENFAAS_DEPLOYMENT_TASK_TL");

var returnValue = true;
returnValue;
