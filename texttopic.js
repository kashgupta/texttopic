var watson = require('watson-developer-cloud');
var jsdom = require("jsdom");
var $ = null;

jsdom.env(
  "http://quaintous.com/2015/07/31/jquery-node-mystery/",
  function (err, window) {
    $ = require('jQuery')(window);
  }
);

var alchemy_language = watson.alchemy_language({
  api_key: '3b25495860896b5ac82651371ec0b087caeff92d'
});

var questionText = 'what is the Holacracy-culture like now at Zappos in 2016? What changes have there been since last April (2015)?';

function parseQuestion(questionText) {

var parameters = {
  text: questionText
};
var results;

alchemy_language.keywords(parameters, function (err, response) {
  if (err)
    console.log('error:', err);
  else
//	console.log(JSON.stringify(response, null, 2)); original api call
    results = response.keywords;
    findImage(results);
});
}

function findImage(keywordsArray) {
	var API_KEY = '2963297-a802754b7d8ad5e3209e82c96';
	
for (var i = 0; i < keywordsArray.length; i++) {
	var keyword = keywordsArray[i].text
	var keywordNumber = i +1;
	console.log('Keyword #'+keywordNumber+': '+ keyword);
	var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(keyword);
	
	$.getJSON(URL, function(data){
    	if (parseInt(data.totalHits) > 0)
        	$.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
    	else
        	console.log('No hits');
		});
	}	
	
}

parseQuestion(questionText);