
function showTip() {
	$('.tip').click(function() {
		console.log('hello');
		
		$('.tip-content').toggleClass('open');
		$('.tip-teaser').toggleClass('thumbs');
	});
}


$(document).ready(function() {

	showTip();
	
});

