

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");

if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
{
	alert('Apparently you are using Internet Explorer. Pleause reopen this website with Google Chrome, Safari or Firefox and never use Internet Explorer again. Thank you!');
	history.go(-1);
}
else
{
	window.onload = function () { JF.init() }
}