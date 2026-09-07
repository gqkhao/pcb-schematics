//yuanqijian Ad
document.domain = 'elecfans.com';
$(function(){
	if($('#yuanqijian1000_60').length > 0){
		openX_ad(234,'#yuanqijian1000_60',1000,60);
		openX_ad(235,'#yuanqijian1000_60_2',1000,60);
		openX_ad(236,'#yuanqijian320_63',320,63);
	}else if($('#yuanqijian_List_300_250').length > 0){
		openX_ad(237,'#yuanqijian_List_300_250',300,250);
	}else if($('#yuanqijian_Detail_300_250').length > 0){
		openX_ad(238,'#yuanqijian_Detail_300_250',300,250);
	}

	function openX_ad(posterid,htmlid,width,height){
		var randomnumber = Math.random();
		var ga = document.createElement('iframe');
		ga.src = 'http://www1.elecfans.com/www/delivery/myafr.php?target=_blank&cb='+randomnumber+'&zoneid='+posterid;
		ga.width = width;
		ga.height = height;
		ga.frameBorder = 0;
		ga.scrolling = 'no';
		var s = $(htmlid).append(ga);
	}
	$('#make-ad').remove();
})// End document.ready --------------------------------------------------------------------------------------