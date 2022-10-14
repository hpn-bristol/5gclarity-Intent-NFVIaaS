var logger = executor.logger;
var start = new Date();

//logger.info("##START## INITIALISATION_TASK_TL");

//logger.info("~~All In: " + executor.inFields);

var templateName = executor.inFields.get("templateName");
//logger.info("~~templateName: " + templateName);

var template = executor.inFields.get("template");
//logger.info("~~template: " + template);

var url = executor.inFields.get("url");
//logger.info("~~url: " + url);

executor.getContextAlbum("FunctionalityTemplateAlbum").put(templateName, template);
//logger.info("~~ Template stored in FunctionalityTemplateAlbum under " + templateName);

executor.getContextAlbum("FunctionalityTemplateLocationAlbum").put(templateName, url);
//logger.info("~~ Location stored in FunctionalityTemplateLocationAlbum under " + templateName);

executor.outFields.put("report", "Template stored in FunctionalityTemplateAlbum under " + templateName);

//logger.info("##END## INITIALISATION_TASK_TL");

logger.info("IT - ");
logger.info(new Date() - start);


var returnValue = true;
returnValue;
