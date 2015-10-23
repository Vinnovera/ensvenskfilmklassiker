
function showTip() {
	var tips = $('.teaser');

	tips.each(function(){
		$(this).click(function(e) {
			e.preventDefault();
			$('.tips, .tip').removeClass('active');
			$(this).parent().addClass('active');
			$('.tips').addClass('active');
		});
	});

	$('.back-btn').click(function(e) {
		e.preventDefault();
		$('.tips, .tip').removeClass('active');
	});

}

function instaFeed() {
	var clientId = 'd06ee162a3bb4abdbe112230442c0a77';
	var feed = new Instafeed({
		get: 'tagged',
		tagName: 'stockholmfilmfestival',
		limit: 23,
		sortBy: 'most-recent',
		resolution: 'standard_resolution',
		clientId: clientId
	});

	feed.run();
}


$(document).ready(function() {
	instaFeed();
	showTip();
	
});

