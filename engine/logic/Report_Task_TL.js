var logger = executor.logger;

logger.info("##START## Report_Task_TL");

logger.info("~~All In: " + executor.inFields);

var report = executor.inFields.get("report");
logger.info("~~report: " + report);

executor.outFields.put("report", report);

logger.info("##END## Report_Task_TL");

var returnValue = true;
returnValue;
