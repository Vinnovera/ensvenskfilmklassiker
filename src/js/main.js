
function showTip() {
	var tips = $('.tip');

	tips.each(function(){
		$(this).click(function() {
			$(this).next('.tip-content').toggleClass('open');
			$(this).find('.tip-teaser').toggleClass('thumbs');
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

