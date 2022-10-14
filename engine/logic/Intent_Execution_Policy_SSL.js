var logger = executor.logger;

logger.info("##START## INTENT_EXECUTION_POLICY_SSL");

logger.info("Possible Outputs: " + executor.stateOutputNames);

var templateInformation = executor.fields.get("templateInformation");
var ftTemplate = executor.getContextAlbum("FunctionalityTemplateAlbum").get(templateInformation[0]);

if(ftTemplate.get("swagger"))
{
	logger.info("We found SWAGGER");
  	executor.setSelectedStateOutputName("templateSelectionREST");
}
else
{
	logger.info("DEFAULTING TO INTERNAL ACTION");
  	executor.setSelectedStateOutputName("templateSelectionInternal");
}

logger.info("Selected Output: " + executor.selectedStateOutputName);

logger.info("##END## INTENT_EXECUTION_POLICY_SSL");

var returnValue = true;
returnValue;