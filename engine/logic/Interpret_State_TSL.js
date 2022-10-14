var logger = executor.logger;

logger.info("##START## INTERPRET_STATE_TSL");

var action = executor.inFields.get("action");
logger.info("Action Processed");

var interpreterOpt = executor.subject.getTaskKey("Interpret_Task");
logger.info("Interpreter Key Processed");
var registerOpt = executor.subject.getTaskKey("Register_Component_Task");
logger.info("Register_Component_Task Key Processed");
var deploymentOpt = executor.subject.getTaskKey("Openfaas_Deployment_Task");
logger.info("Openfaas_Deployment_Task Key Processed");

if(action == "deploy"){
  deploymentOpt.copyTo(executor.selectedTask);
  logger.info("Openfaas_Deployment_Task Selected");
}
else if(action == "register"){
  registerOpt.copyTo(executor.selectedTask);
  logger.info("Register_Component_Task Selected");
}
else{
  interpreterOpt.copyTo(executor.selectedTask);
    logger.info("Default Selected");

}

logger.info("##END## INTERPRET_STATE_TSL");

var returnValue = true;
returnValue;