
function showTip() {
	var tips = $('.tip');

	tips.each(function(){
		$(this).click(function() {
			$(this).find('.tip-content').toggleClass('open');
			$(this).find('.tip-teaser').toggleClass('thumbs');
		});
	});


}

function instaFeed() {
	var clientId = 'd06ee162a3bb4abdbe112230442c0a77';
	var feed = new Instafeed({
		get: 'tagged',
		tagName: 'filmfestival',
		limit: 17,
		sortBy: 'most-recent',
		resolution: 'thumbnail',
		clientId: clientId
	});

	feed.run();
}


$(document).ready(function() {
	instaFeed();
	showTip();
	
});

