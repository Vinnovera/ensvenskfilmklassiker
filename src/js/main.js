!function(w, d, $) {

	var $tipsWrapper, $tips;

	$(d).on('ready', function() {
		$tipsWrapper = $('.tips');
		$tips = $tipsWrapper.find('.tip');

		bindEvents();
		instaFeed();
	});

	function bindEvents() {
		$tipsWrapper.on('click', '.tip .teaser', onTipClick);
		$tipsWrapper.on('click', '.tip .back-btn', onBackClick);
	}

	function onTipClick(e) {
		e.preventDefault();

		deactivateTips();
		activateTip($(this).closest('.tip'));
		updateHistory($(this).attr('href'));
	}

	function onBackClick(e) {
		e.preventDefault();

		deactivateTips();
		updateHistory($(this).attr('href'));
	}

	function activateTip($tip) {
		$tipsWrapper.addClass('active');
		$tip.addClass('active');
	}

	function deactivateTips() {
		$tipsWrapper.removeClass('active');
		$tips.removeClass('active');
	}

	function updateHistory(url) {
		window.history.replaceState(null, null, url);
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
}(window, document, Zepto);