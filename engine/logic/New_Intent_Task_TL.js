var logger = executor.logger;
var start = new Date();

//logger.info("##START## NEW_INTENT_TASK_TL");

//logger.info("~~All In: " + executor.inFields);

var intent = executor.inFields.get("intent");
//logger.info("~~intent: " + intent);

var request = intent.get("request");
//logger.info("~~request: " + request);

var parameters = intent.get("parameters");
//logger.info("~~parameters: " + parameters);

//Store Intent Params
var IntentParameterAlbum = executor.getContextAlbum("IntentParameterAlbum").put(request, parameters);
logger.info("~~IntentParameterAlbum: " + IntentParameterAlbum);

//logger.info("~~ Current Stored Functionality Templates: " + executor.getContextAlbum("FunctionalityTemplateAlbum").keySet());
var ftKeys = executor.getContextAlbum("FunctionalityTemplateAlbum").keySet().toArray();
//logger.info("~~ ftKeys: " + ftKeys);

const recursiveSearch = (obj, searchKey, results) => {
	const r = results;
	var objKeys = obj.keySet().toArray();
	for (var j = 0; j < objKeys.length; j++) {
		var value = obj.get(objKeys[j]);
		if ((objKeys[j] == searchKey || objKeys[j] == "summary") && value.getClass().getName().toString().equals("java.lang.String")) {
			//logger.info("Value was: " + value);
			r.push(value);
		} else if (value.getClass().getName().toString().equals("com.google.gson.internal.LinkedTreeMap")) {
			//logger.info("Value was: " + value);
			recursiveSearch(value, searchKey, r);
		}
		else if (value.getClass().getName().toString().equals("java.util.ArrayList")) {
			//logger.info("Value was: " + value);
			for (var a = 0; a < value.size(); a++) {
				//logger.info("Value was: " + value.toArray()[a].getClass().getName().toString());
				if ((objKeys[j] == searchKey || objKeys[j] == "summary") && value.toArray()[a].getClass().getName().toString().equals("java.lang.String")) {
					//logger.info("Value was: " + value.toArray()[a]);
					r.push(value.toArray()[a]);
				} else if (value.toArray()[a].getClass().getName().toString().equals("com.google.gson.internal.LinkedTreeMap")) {
					//logger.info("Value was: " + value.toArray()[a]);
					recursiveSearch(value.toArray()[a], searchKey, r);
				}
			}
		}
		else {
			//logger.info("Value type is : " + value.getClass().getName().toString());
		}
	};
	return r;
};

const descriptions = [];
for (var i = 0; i < ftKeys.length; i++) {
	//logger.info("This is template number :" + i);

	var ftTemplate = executor.getContextAlbum("FunctionalityTemplateAlbum").get(ftKeys[i]);
	//logger.info("This is the ftTemplate :" + ftTemplate);

	var emptyArray = [];
	var searchResults = recursiveSearch(ftTemplate, 'description', emptyArray);
	//logger.info("searchResults for template: " + i + " is: " + searchResults);

	for (var k = 0; k < searchResults.length; k++) {
		if (searchResults[k].toString().equals("") == false) {
			descriptions.push(searchResults[k].toString());
		}
	}
}

executor.outFields.put("intent", request);
executor.outFields.put("descriptions", descriptions);

var topN = 5;
executor.outFields.put("top_n", topN);

//logger.info("##END## NEW_INTENT_TASK_TL");

logger.info("NIT - ");
logger.info(new Date() - start);

var returnValue = true;
returnValue;
