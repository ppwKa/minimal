if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(function ($) {

        //section-leap
        if ($('.adtest-container .section-leap').length) {
            let videoPlaying = false;
            let currentIndex = 0;
            const videoList = $('.section-leap .video-list');
            const videoItems = $('.section-leap .video-item');
            const sectionItems = $('.section-leap .section-item');
            const sectionSwiper = $('.section-swiper');
            const allVideos = $('.section-leap .video-item video');
            //是否在视口内
            function isInViewport($element) {
                const elementMiddle = $element.offset().top + $element.outerHeight() / 2;
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();
                return elementMiddle >= viewportTop && elementMiddle <= viewportBottom;
            }

            //播放视频
            function playVideo(index, isSwiperChange = false) {
                if (index < videoItems.length) {
                    const currentVideo = videoItems.eq(index).find('video');
                    videoItems.removeClass('active').eq(index).addClass('active');
                    sectionItems.removeClass('active').eq(index).addClass('active');

                    if (!isSwiperChange && sectionSwiper.length > 0) {
                        sectionSwiper[0].swiper.slideTo(index);
                        // return;
                    }

                    currentVideo.get(0).play();
                    currentVideo.on('ended', function () {
                        currentIndex = index + 1;
                        playVideo(currentIndex);
                    });
                } else {
                    //播放结束，重置
                    currentIndex = 0;
                    playVideo(currentIndex);
                }
            }

            videoItems.on('click', function () {
                //当前active视频 播放或暂停
                const activeVideo = $('.section-leap .video-item.active video');
                if (activeVideo[0].paused) {
                    activeVideo[0].play();
                } else {
                    activeVideo[0].pause();
                }
            });

            sectionItems.on('click', function () {
                //移除所有ended事件
                allVideos.off('ended');
                currentIndex = $(this).index();
                playVideo(currentIndex);
            });

            if (sectionSwiper.length > 0) {
                //左右按钮点击事件
                $('.section-swiper .swiper-button-next').on('click', function () {
                    //移除所有ended事件
                    allVideos.off('ended');
                    currentIndex = sectionSwiper[0].swiper.activeIndex + 1;
                    playVideo(currentIndex, true);
                });

                $('.section-swiper .swiper-button-prev').on('click', function () {
                    //移除所有ended事件
                    allVideos.off('ended');
                    currentIndex = sectionSwiper[0].swiper.activeIndex - 1;
                    playVideo(currentIndex, true);
                });
            }

            $(window).on('scroll', function () {
                if (isInViewport(videoList)) {
                    if (!videoPlaying) {
                        playVideo(currentIndex);
                        videoPlaying = true;
                    }
                } else {
                    videoPlaying = false;
                    $('.section-leap .video-item.active video')[0].pause();
                }
            });

            //默认播放第一个视频
            if (videoItems.length > 0) {
                playVideo(currentIndex,true);
            }
        }

        		//swiper
		if (typeof Swiper !== 'undefined') {
			if ($('.adtest-container .section-swiper').length > 0) {
				var swiperSection = new Swiper('.section-swiper', {
					slidesPerView: 2,
					spaceBetween: 6,
					slidesPerGroup: 1,
					initialSlide: 1,
					speed: 800,
					centeredSlides: true,
					navigation: {
						nextEl: '.section-swiper .swiper-button-next',
						prevEl: '.section-swiper .swiper-button-prev',
					},
				});
			}
		}
    });
}