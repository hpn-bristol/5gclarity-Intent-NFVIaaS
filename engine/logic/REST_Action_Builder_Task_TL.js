var logger = executor.logger;
var start = new Date();
//logger.info("##START## REST_ACTION_BUILDER_TASK_TL");

//logger.info("~~All In: " + executor.inFields);

var templateInformation = executor.inFields.get("templateInformation");
//logger.info("~~templateInformation: " + templateInformation);

//for (var prop in templateInformation) {
//	logger.info("~~ ~~ test templateInformation: " + prop);
//}

var ftTemplate = executor.getContextAlbum("FunctionalityTemplateAlbum").get(templateInformation[0]);
//logger.info("~~ftTemplate: " + typeof ftTemplate);

var ftTemplateLoc = executor.getContextAlbum("FunctionalityTemplateLocationAlbum").get(templateInformation[0]);
//logger.info("~~ftTemplateLoc: " + typeof ftTemplateLoc);

templatePath = templateInformation[1].split(",");

//Build the REST Request
var path = templatePath[1];
//logger.info("~~path: " + path);

var method = templatePath[2];
//logger.info("~~method: " + method);

var parameters = [];
if (ftTemplate.get("paths").get(path).get(method).get("parameters")) {
	parameters = ftTemplate.get("paths").get(path).get(method).get("parameters").toArray();
}
//logger.info("~~parameters: " + parameters);

var body = {};

var ftTemplateIntance = ftTemplate;
var requiredProperties;

var intent = executor.inFields.get("intent");
//logger.info("~~intent: " + intent);
var intentParameters = executor.getContextAlbum("IntentParameterAlbum").get(intent);
//logger.info("~~intentParameters: " + intentParameters.toString());

//Go get parameters
for (var i = 0; i < parameters.length; i++) {
	if (parameters[i].get("in") == "body") {
		if (parameters[i].get("schema").get("$ref") != null) {
			var parameterPath = [];
			parameterPath = parameters[i].get("schema").get("$ref").split("/")
			//logger.info("~~parameterPath: " + parameterPath.length);

			for (var j = 0; j < parameterPath.length; j++) {
				if (j != 0) {
					ftTemplateIntance = ftTemplateIntance.get(parameterPath[j])
					//logger.info("~~ftTemplateIntance: " + ftTemplateIntance);
				}
			}
			//Find Required
			requiredProperties = ftTemplateIntance.get("required");
			//logger.info("~~requiredProperties: " + requiredProperties);

			var requiredPropertiesArray = requiredProperties.toArray();

			//for (var prop in requiredProperties.toArray()) {
			//	logger.info("~~ ~~ test requiredProperties: " + prop);
			//}

			//logger.info("~~requiredProperties: " + requiredPropertiesArray);


			for (var k = 0; k < requiredPropertiesArray.length; k++) {
				//check intent message for values of required fields
				//logger.info("~~requiredProperties: " + k + " " + requiredPropertiesArray[k]);
				if (intentParameters.get(requiredPropertiesArray[k])) {
					body[requiredPropertiesArray[k]] = intentParameters.get(requiredPropertiesArray[k]);
				}
				else {
					body[requiredPropertiesArray[k]] = "Missing Values";
				}
			}
			//logger.info("~~body: " + body.toString());
		}
		else {
			//Its a different format
			if (parameters[i].get("required") == true) {
				//logger.info("~~THERE IS A REQUIREMENT IN BODY: ");
				if (intentParameters.get(parameters[i].get("name"))) {
					body[parameters[i].get("name")] = intentParameters.get(parameters[i].get("name"));
				}
				else {
					body[parameters[i].get("name")] = "Missing Values";
				}
			}
			else {
				//logger.info("~~THERE IS NO REQUIREMENT IN BODY: ");
			}
		}
	}
	if (parameters[i].get("in") == "path" && parameters[i].get("required") == true) {
		//logger.info("~~BUILDING PATH: ");

		if (intentParameters.get(parameters[i].get("name"))) {
			path = path.replace("{" + parameters[i].get("name") + "}", intentParameters.get(parameters[i].get("name")));
		}
		else {
			path = path.replace("{" + parameters[i].get("name") + "}", "MisssingValues");
		}
	}
}


executor.outFields.put("path", ftTemplateLoc + path);
executor.outFields.put("method", method);
executor.outFields.put("body", body);

//logger.info("##END## REST_ACTION_BUILDER_TASK_TL");
logger.info("RAB - ");
logger.info(new Date() - start);

var returnValue = true;
returnValue;
