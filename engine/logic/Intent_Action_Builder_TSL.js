var logger = executor.logger;

//logger.info("##START## INTENT_ACTION_BUILDER_TSL");

var selectedTemplate = executor.inFields.get("templateInformation");
//logger.info("selectedTemplate : " + selectedTemplate);

var restActionOpt = executor.subject.getTaskKey("REST_Action_Builder_Task");
//logger.info("REST_Action_Builder_Task Key Processed");

var internalActionOpt = executor.subject.getTaskKey("Internal_Action_Builder_Task");
//logger.info("Internal_Action_Builder_Task Key Processed");

// Grab FT from Context and check for swagger

//If swagger exists trigger the functionality
/*
if(swagger is true){
  restActionOpt.copyTo(executor.selectedTask);
  logger.info("REST_Action_Builder_Task Selected");
}
else if(swagger is not true){
  internalActionOpt.copyTo(executor.selectedTask);
  logger.info("Internal_Action_Builder_Task Selected");
}
else{
  internalActionOpt.copyTo(executor.selectedTask);
    logger.info("TSL FAILED DEFAULTED TO INTERNAL ACTION");

}
*/

//logger.info("##END## INTENT_ACTION_BUILDER_TSL");

var returnValue = true;
returnValue;