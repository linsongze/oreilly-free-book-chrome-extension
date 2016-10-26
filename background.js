
var min = 1;
var max = 5;
var current = min;
var bk =  chrome.extension.getBackgroundPage();
var url = "";
var filename = null;
var downloadUrl = null;
function updateInfo(url){
	filename = checkUrlAndExtractName(url);
	if(filename == null ){
		chrome.browserAction.setIcon({path:"icon.png"});
	}else{
		chrome.browserAction.setIcon({path:"icon_download.png"});
		downloadUrl = "http://www.oreilly.com/programming/free/files/"+filename+".pdf";
	}
	
}
function checkUrlAndExtractName(url){
	var reg = /http:\/\/www\.oreilly\.com\/programming\/free\/([^\/]+)\.csp/;
	var r = "";
	while(r = reg.exec(url)){
		return r[1];
	}
	return null;
}
function clickIconAction() {

	bk.console.log("current->"+url);

	if(filename != null){
		chrome.tabs.create({url :downloadUrl},function(){});
	}
  
}

chrome.browserAction.onClicked.addListener(clickIconAction);
chrome.tabs.onActiveChanged.addListener(function(){
	chrome.tabs.getSelected(function(tabs)
	 {
			url = tabs.url;
			updateInfo(url);
	 });
});
chrome.tabs.onUpdated.addListener(function( tabId,  changeInfo,  tab){
	url = tab.url;
	updateInfo(url);
});
chrome.browserAction.setIcon({path:"icon.png"});