
function showTip() {
	var tips = $('.tip-teaser');

	tips.each(function(){
		$(this).click(function() {
			$('.tips, .tip-teaser, .tip-content').removeClass('open thumbs active');
			$(this).addClass('active');
			$(this).next('.tip-content').addClass('open');
			$('.tips').addClass('open');
			$('.tip-teaser').addClass('thumbs');

		});
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

