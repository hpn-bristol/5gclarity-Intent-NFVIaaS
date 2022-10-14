var logger = executor.logger;

logger.info("##START## REGISTER_COMPONENT_TASK_TL");

logger.info("~~All In: " + executor.inFields);

var intent = executor.inFields.get("intent");
logger.info("~~intent: " + intent);

var name = intent.get("name");
logger.info("name: " + name);

var url = intent.get("url");
logger.info("url: " + url);

executor.getContextAlbum("RegisteredComponentsAlbum").put(name, url);
logger.info("~~ URL Stored in RegisteredComponentsAlbum under " + name);

executor.outFields.put("report", "URL Stored in RegisteredComponentsAlbum under " + name);

logger.info("##END## Register_Component_Task_TL");

var returnValue = true;
returnValue;
