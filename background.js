
var min = 1;
var max = 5;
var current = min;
var bk =  chrome.extension.getBackgroundPage();
var url = "";
var filename = null;
var downloadUrl = null;
var booksUrl = "";
function updateInfo(url){
	var result = checkUrlAndExtractName(url);
	if(result == null || result[1]==null){
		chrome.browserAction.setIcon({path:"icon.png"});
	}else{
		filename = result[1];
		chrome.browserAction.setIcon({path:"icon_download.png"});
		downloadUrl = result[0]+"/files/"+filename+".pdf";
	}
	bk.console.log(result);
}
function checkUrlAndExtractName(url){
	var reg = /(http:\/\/www\.oreilly\.com\/[^\/]+\/free\/)([^\/]+)\.csp/;
	var r = "";
	while(r = reg.exec(url)){
		return [r[1],r[2]];
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