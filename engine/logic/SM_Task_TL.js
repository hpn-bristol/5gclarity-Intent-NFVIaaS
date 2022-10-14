load("nashorn:mozilla_compat.js");

var logger = executor.logger;

logger.info("START SM_TASK_TL");

var nsid = executor.inFields["NS_ID"];
logger.info("nsid: " + nsid);
var nsdid = executor.inFields["NSD_ID"];
logger.info("nsdid: " + nsdid);
var sliceid = executor.inFields["SLICE_ID"];
logger.info("sliceid: " + sliceid);
var status = executor.inFields["status"];
logger.info("status: " + status);

executor.outFields["NS_ID"] = nsid;
executor.outFields["NSD_ID"] = nsdid;
executor.outFields["SLICE_ID"] = sliceid;
executor.outFields["status"] = status;
executor.outFields["processed"] = true;

logger.info("END SM_TASK_TL");

var returnValueType = Java.type("java.lang.Boolean");
var returnValue = new returnValueType(true);
