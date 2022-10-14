var logger = executor.logger;
var start = new Date();
//logger.info("##START## TEMPLATE_IDENTIFICATION_TASK_TL");

//logger.info("~~All In: " + executor.inFields);

var intent = executor.inFields.get("intent");
//logger.info("~~intent: " + intent);

var intentMatching = executor.inFields.get("intent-matching");
//logger.info("~~intentMatching: " + intentMatching);

var intentMatchingKeys = intentMatching.keySet().toArray();
//logger.info("~~ intentMatchingKeys: " + intentMatchingKeys);

//for (var prop in intentMatchingKeys) {
//	logger.info("~~ ~~ test intentMatchingKeys: " + prop);
//}

var selectedKey = "";
var hightestValue = 0.00;
for (var i = 0; i < intentMatchingKeys.length; i++) {
	//logger.info("~~ intentMatchingKeys - Floats: " + parseFloat(intentMatching.get(intentMatchingKeys[i].toString())));
	//logger.info("~~ intentMatchingKeys - type: " + typeof parseFloat(intentMatching.get(intentMatchingKeys[i].toString())));
	//logger.info("~~ intentMatchingKeys - type: " + typeof hightestValue);

	if (parseFloat(intentMatching.get(intentMatchingKeys[i].toString())) > hightestValue) {
		//logger.info("~~ intentMatchingKeys - " + parseFloat(intentMatching.get(intentMatchingKeys[i].toString())) + " is greater than " + hightestValue);

		selectedKey = intentMatchingKeys[i].toString();
		hightestValue = parseFloat(intentMatching.get(intentMatchingKeys[i]));
	}
}
//logger.info("~~ Highest Correllation: " + selectedKey);
//logger.info("~~ Highest Value: " + hightestValue);

//logger.info("~~ Current Stored Functionality Templates: " + executor.getContextAlbum("FunctionalityTemplateAlbum").keySet());
var ftKeys = executor.getContextAlbum("FunctionalityTemplateAlbum").keySet().toArray();
//logger.info("~~ ftKeys: " + ftKeys);

const recursiveSearch = (obj, searchKey, results, path) => {
	const r = results;
	var p = path;

	var objKeys = obj.keySet().toArray();
	for (var j = 0; j < objKeys.length; j++) {
		p.push("" + objKeys[j]);
		var value = obj.get(objKeys[j]);
		if ((objKeys[j] == searchKey || objKeys[j] == "summary") && value.equals(selectedKey)) {
			//logger.info("Path was pushed: " + p);
			r.push(p.toString());
		} else if (value.getClass().getName().toString().equals("com.google.gson.internal.LinkedTreeMap")) {
			recursiveSearch(value, searchKey, r, p);
		}
		else if (value.getClass().getName().toString().equals("java.util.ArrayList")) {
			for (var a = 0; a < value.size(); a++) {
				p.push("" + value.toArray()[a]);
				if ((objKeys[j] == searchKey || objKeys[j] == "summary") && value.toArray()[a].equals(selectedKey)) {
					//logger.info("2Path was pushed: " + p);
					r.push(p.toString());
				} else if (value.toArray()[a].getClass().getName().toString().equals("com.google.gson.internal.LinkedTreeMap")) {
					recursiveSearch(value.toArray()[a], searchKey, r, p);
				}
				p.pop();
			}
		}
		else {
			//logger.info("UNCAUGHT VALUE TYPE: " + value.getClass().getName().toString());
		}
		p.pop();
	};
	//logger.info("R is : " + r);
	return r;
};

var path = [];
for (var i = 0; i < ftKeys.length; i++) {
	//logger.info("This is template number :" + i);

	var ftTemplate = executor.getContextAlbum("FunctionalityTemplateAlbum").get(ftKeys[i]);
	//logger.info("This is the ftTemplate :" + ftTemplate);

	var emptyArray = [];
	var emptyPath = [];
	var searchResults = [];
	searchResults = recursiveSearch(ftTemplate, 'description', emptyArray, emptyPath);

	if (searchResults === undefined || searchResults.length == 0) {
		//logger.info("searchResults is Empty");
	}
	else {
		//logger.info("searchResults is Empty or Does not exist");
		for (var k = 0; k < searchResults.length; k++) {
			path.push(ftKeys[i], searchResults[k].toString());
		}
	}
}

//logger.info("Heres the result: " + path);

executor.outFields.put("templateInformation", path);
executor.outFields.put("intent",intent);

//logger.info("##END## TEMPLATE_IDENTIFICATION_TASK_TL");
logger.info("TIT - ");
logger.info(new Date() - start);

var returnValue = true;
returnValue;
