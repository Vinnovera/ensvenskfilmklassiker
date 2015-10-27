!function(w, d, $) {

	var $tipsWrapper, $tips;

	$(d).on('ready', function() {
		$tipsWrapper = $('.tips');
		$tips = $tipsWrapper.find('.tip');

		bindEvents();
		instaFeed();
	});

	window.onYouTubeIframeAPIReady = function() {};

	function bindEvents() {
		$tipsWrapper.on('click', '.tip .teaser', onTipClick);
		$tipsWrapper.on('click', '.tip .back-btn', onBackClick);
		$tipsWrapper.on('click', '.tip .next-btn', onNextClick);
	}

	function onTipClick(e) {
		e.preventDefault();

		var $tip = $(this).closest('.tip');

		deactivateTips();
		stopTipVideos();
		updateScreenings($tip);
		activateTip($tip);
		updateHistory($(this).attr('href'));
		scrollToTip($tip, function() {
			loadTipVideo($tip, function() {
				playTipVideo($tip);
			});
		});
	}

	function onBackClick(e) {
		e.preventDefault();

		deactivateTips();
		stopTipVideos();
		updateHistory($(this).attr('href'));
	}

	function onNextClick(e) {
		e.preventDefault();

		var
			url  = $(this).attr('href'),
			$tip = getTipByUrl(url);

		deactivateTips();
		stopTipVideos();
		activateTip($tip);
		updateHistory(url);
		scrollToTip($tip, function() {
			loadTipVideo($tip, function() {
				playTipVideo($tip);
			});
		});
	}

	function loadTipVideo($tip, callback) {
		callback = callback || function() {};

		var video = $tip.data('video');

		if (!video) {
			var
				$video  = $tip.find('.video'),
				videoId = $video.data('videoid');

			video = new YT.Player($video.get(0), {
				videoId: videoId,
				events: {
					'onReady': callback
				}
			});

			$tip.data('video', video);
		} else {
			setTimeout(callback, 0);
		}
	}

	function playTipVideo($tip) {
		var video = $tip.data('video');

		if (video) {
			video.playVideo();
		}
	}

	function stopTipVideos() {
		$tips.each(function() {
			var video = $(this).data('video');

			if (video) {
				video.stopVideo();
			}
		});
	}

	function deactivateTips() {
		$tipsWrapper.removeClass('active');
		$tips.removeClass('active');
	}

	function activateTip($tip) {
		$tipsWrapper.addClass('active');
		$tip.addClass('active');
	}

	function getTipByUrl(url) {
		return $tips.has('a[href="'+url+'"].teaser');
	}

	function updateScreenings($tip) {
		$tip.find('.movie').each(function() {
			var
				id   = $(this).data('movieid'),
				date = screenings.getNextFormatedScreeningDate(id);

			$(this).find('.movie-screening').text(date);
		})
	}

	function updateHistory(url) {
		window.history.replaceState(null, null, url);
	}

	function scrollToTip($tip, callback) {
		callback = callback || function() {};

		$('html, body').animate(
			{
				scrollTop: $tip.find('.content').offset().top
			},
			500,
			callback
		);
	}

	function instaFeed() {
		var
			clientId = 'd06ee162a3bb4abdbe112230442c0a77',
			feed = new Instafeed({
				get: 'tagged',
				tagName: 'stockholmfilmfestival',
				limit: 23,
				sortBy: 'most-recent',
				resolution: 'standard_resolution',
				template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
				clientId: clientId
			});

		feed.run();
	}

	var screenings = new function() {
		var
			self        = this,
			months      = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],

			screenings  = {
				"dope": [
					1447444800000, 1447585200000, 1448038800000, 1448103600000, 1448190000000
				],
				"the_diary_of_a_teenage_girl": [
					1447612200000, 1447790400000, 1448206200000
				],
				"closet_monster_2015": [
					1447264800000, 1448138700000, 1448224200000
				],
				"the_survivalist": [
					1447257600000, 1447700400000, 1447873200000
				],
				"stockholm_achievement_award": [
					1447434000000
				],
				"the_wave": [
					1447272000000, 1447326000000, 1447506000000
				],
				"suffragette": [
					1447347600000, 1447520400000, 1447617600000
				],
				"me_and_earl_and_the_dying_girl": [
					1447606800000, 1448136000000, 1448200800000
				],
				"price_of_love_2015": [
					1447318800000, 1447704000000, 1447864200000, 1447930800000, 1448038800000
				],
				"angry_indian_goddesses": [
					1447272000000, 1447347600000, 1447498800000
				],
				"experimenter": [
					1447246800000, 1447434000000, 1447606800000, 1447923600000, 1448044200000
				],
				"green_room": [
					1448049600000, 1448136000000, 1448211600000
				],
				"maryland": [
					1447351200000, 1448047800000, 1448109000000
				],
				"the_program_2015": [
					1448042400000, 1448222400000
				],
				"the_lobster": [
					1447954200000, 1448199000000
				]
			};

		this.getNextScreening = function(id) {
			if (screenings.hasOwnProperty(id)) {
				var
					currTime = new Date().getTime(),
					coming;

				coming = screenings[id]
							.sort()
							.filter(function(time) {
								return time > currTime
							});

				if (coming.length) {
					return coming[0];
				}
			}

			return false;
		};

		this.getNextFormatedScreeningDate = function(id) {
			var
				date = self.getNextScreening(id),
				str  = '';

			if (date) {
				date = new Date(date);

				str += date.getDate() + ' ';
				str += months[date.getMonth()] + ' ';
				str += 'kl ';
				str += date.getHours();

				return str;
			}

			return false;
		};
	};
}(window, document, jQuery);