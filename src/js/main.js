
function showTip() {
	$('.tip').click(function() {
		console.log('hello');
		
		$('.tip-content').toggleClass('open');
	});
}


$(document).ready(function() {

	showTip();
	
});

