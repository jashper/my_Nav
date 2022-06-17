// 桌機板子選單展開
$(document).ready(function(){
	var scrollTop_before = $(window).scrollTop();
	var scrollType = '';
	$(window).scroll(function(){
		if($(this).scrollTop() > scrollTop_before){
			scrollType = 'down';
		} else {
			scrollType = 'up';
		}
		scrollTop_before = $(this).scrollTop();
	});
	$(window).scroll(function(){
		if($(window).width() < 992){
			switch( scrollType ){
				case 'down':
					$('.rightFeature').addClass('hide');
					$('.mobileMenu').addClass('up');
					break;
				case 'up':
					$('.rightFeature').removeClass('hide');
					$('.mobileMenu').removeClass('up');
					break;
			}
		}
	});
	$("[data-fancybox]").fancybox({
		slideShow  : false,
		fullScreen : false,
		thumbs     : false,
		closeBtn   : true,
	});
	$('.leftMenu > li.more').on(
		{
			mouseenter: function() {
				if( $(window).outerWidth() > 992 ){
					$('#leftBox').addClass('showSub');
					$(this).children('.subMenu').addClass('show');

				}
			},
			mouseleave: function() {
				if( $(window).outerWidth() > 992 ){
					$('#leftBox').removeClass('showSub');
					$(this).children('.subMenu').removeClass('show');
				}
			},
			click: function(){
				$('.leftMenu > li.more .subMenu').attr('style','');
				if( $(window).outerWidth() <= 992 ){
					var this_subMenu =  $(this).children('.subMenu');
					var subMenuH = this_subMenu.innerHeight();
					var windowH = $(window).innerHeight();
					if( subMenuH > windowH){
						this_subMenu.css({"overflow":"auto","max-height":windowH});
					}	
					var subMenuTop = this_subMenu.offset().top;		
					var subMenuABTop = this_subMenu.css('top');
					if( subMenuTop < 0){
						var setTop = parseInt(subMenuABTop) + (subMenuTop * -1);
						this_subMenu.css({"top":setTop});			
					}
				}
			}
		}
	);
	setRightContent();
	resetPageMenuSub();
	leftMenuLiActive();
	$(window).resize(function(){
		leftMenuLiActive();
		setRightContent();
		resetPageMenuSub();
	});
	$(window).resize(function(){
		if( $(window).width() > 992 ){
			$('.leftMenu > li.more .subMenu').attr('style','');
			$('#rightBox').removeClass('blackBlock');
			$('#leftBox').removeClass('showSub');
			$('.mobileMenu').removeClass('up');
			$('.hamburgerClose').removeClass('openSub');
			$('#leftBox').removeClass('mobile-openSub').removeClass('mobile-open');
			$('.leftMenu > li.showSub').removeClass('showSub');
		}
	});
	$('.hamburger').click(function(){
		if( $('#leftBox').hasClass('mobile-open') ) {

			if( $('#leftBox').hasClass('mobile-openSub') ){
				$('#leftBox').removeClass('mobile-openSub');
			} else {
				$('#leftBox').removeClass('mobile-open');
				$('.mobileMenu').removeClass('up');
			}
		} else {
			
			$('#leftBox').addClass('mobile-open');
			$('.mobileMenu').addClass('up');
			$('#rightBox').addClass('blackBlock');
			$('.leftSideBox').css({"top": $(window).scrollTop()+'px'});
			console.log($(window).scrollTop()+'px');
		}
	});
	$('.hamburgerClose').click(function(){
		if($(this).hasClass('openSub')){
			$('.leftMenu > li.more .subMenu').attr('style','');
			$(this).removeClass('openSub');
			$('#leftBox').removeClass('mobile-openSub');
			$('.leftMenu > li.showSub').removeClass('showSub');

		} else {
			$('#leftBox').removeClass('mobile-open');
			$('.mobileMenu').removeClass('up');
			$('#rightBox').removeClass('blackBlock');
			$('.leftMenu > li.showSub').removeClass('showSub');
			$('#leftBox').removeClass('showSub');
		}
	});
	$('.leftMenu > li.more > a').click(function(){
		if( $(window).width() < 992 ) {
			$('.hamburgerClose').addClass('openSub');
			$('#leftBox').addClass('mobile-openSub');
			$('.leftMenu > li.showSub').removeClass('showSub');
			$(this).parent('li').addClass('showSub');
		}
	});
	$('#rightBox').click(function(){
		$('.leftMenu > li.more .subMenu').attr('style','');
		$(this).removeClass('blackBlock');
		$('.mobileMenu').removeClass('up');
		$('.leftMenu > li.showSub').removeClass('showSub');
		$('.hamburgerClose').removeClass('openSub');
		$('#leftBox').removeClass('mobile-openSub').removeClass('mobile-open');
	});
});
function setRightContent(){
	var winH = $(window).outerHeight();
	var rightContentH = $('.rightBox__content').outerHeight();
	if(winH > rightContentH){
		$('footer').css({"margin-top": (winH -rightContentH)+"px"});
	} else{
		$('footer').attr("style",'');
	}
}
function resetPageMenuSub(){
	$('.pageMenu > li > .subMenu').each(function(){
		if($(this).offset().left <240){
			var minLeft = $(this).parent('li').offset().left;
			var viewWidth = $(window).width();
			var subMenuWidth = viewWidth - minLeft - $('.goInquiry').outerWidth();
			$(this).css({"left": "0","transform":"translate(0,0)","-webkit-transform":"translate(0,0)","width":subMenuWidth,"white-space":"normal"});
		}
		if($(this).offset().right >$(window).width()){
			$(this).css({"left": "auto","right": "0","transform":"translate(0,0)","-webkit-transform":"translate(0,0)"});
		}
	});
}
function leftMenuLiActive(){
	if( $(window).width() < 992 ){
		$('.leftMenu > li.more > a').attr('onclick','return false;');
	} else {
		$('.leftMenu > li.more > a').attr('onclick','');
	}
}
// 左側選單定位
$(document).ready(function(){
	var leftMenuControl = new Object();
	leftMenuControl.scrollStaus = 'down';
	leftMenuControl.menuMoveRange = 0;
	leftMenuControl.goUp = false;
	leftMenuControl.goDown = false;
	leftMenuControl.stepMinLimit = 0;
	leftMenuControl.stepMinStart = 0;
	leftMenuControl.stepMaxLimit = 0;
	leftMenuControl.stepMaxStart = 0;
	leftMenuControl.step = 0;
	var scrollPrevNumber = 0;
	var menuHeight = $('.leftSideBox').outerHeight()+ 1;
	var wH = $(window).height();
	leftMenuControl.menuMoveRange = moveSideMenuSetting(leftMenuControl.menuMoveRange);
	$(window).resize(function(){
		leftMenuControl.menuMoveRange = moveSideMenuSetting(leftMenuControl.menuMoveRange);
		moveSideMenu(leftMenuControl,$(window).scrollTop());
	});
	scrollPrevNumber = $(window).scrollTop();
	moveSideMenu(leftMenuControl,$(window).scrollTop());
	$(window).scroll(function(){
		if( $(window).scrollTop() > scrollPrevNumber ) {
			leftMenuControl.scrollStaus = 'down';
		} else {
			leftMenuControl.scrollStaus = 'up';
		}
		scrollPrevNumber = $(window).scrollTop();
		moveSideMenu(leftMenuControl,$(window).scrollTop());
	});
});
function moveSideMenu(leftMenuControl,thisScrollTop){
	var leftSideBoxTop =  parseInt($('.leftSideBox').css('top').replace('px',''));
	if (leftMenuControl.menuMoveRange != 0) {
		if( leftMenuControl.scrollStaus == "up" ) {
			if(leftMenuControl.goUp == false) {
				leftMenuControl.goUp = true;
				leftMenuControl.goDown = false;
				leftMenuControl.stepMinStart = thisScrollTop;
				leftMenuControl.stepMinLimit = thisScrollTop - leftMenuControl.menuMoveRange;
				leftMenuControl.stepMaxStart = 0;
				leftMenuControl.stepMaxLimit = 0;
			} else {
				if (leftMenuControl.stepMinStart - thisScrollTop<= leftMenuControl.menuMoveRange){
					leftMenuControl.step = leftSideBoxTop;
				} else {
					leftMenuControl.step = thisScrollTop;
				}
			}
		} else if( leftMenuControl.scrollStaus == "down" ){
			if(leftMenuControl.goDown == false) {
				leftMenuControl.goDown = true;
				leftMenuControl.goUp = false;
				leftMenuControl.stepMaxStart = thisScrollTop;
				leftMenuControl.stepMaxLimit = thisScrollTop + leftMenuControl.menuMoveRange;
				leftMenuControl.stepMinStart = 0;
				leftMenuControl.stepMinLimit = 0;
			} else {
				if ( thisScrollTop - leftMenuControl.stepMaxStart <= leftMenuControl.menuMoveRange ){
					leftMenuControl.step = leftSideBoxTop;
				} else {
					leftMenuControl.step = thisScrollTop - leftMenuControl.menuMoveRange;
				}
			}
		}
	} else {
		leftMenuControl.step = thisScrollTop;
	}
	$('.leftSideBox').css({"top": leftMenuControl.step });
}
function moveSideMenuSetting(menuMoveRange){
	menuHeight = $('.leftSideBox').outerHeight()+ 1;
	wH = $(window).height();
	
	if ( menuHeight >= wH ){
		menuMoveRange = menuHeight - wH;
	} else {
		let menuMoveRange = 0;
	}
	return menuMoveRange;
}
// FAQ控制
$(document).ready(function(){
	$('.faqListItems').click(function(){
		if ( $(this).hasClass('active') ) {
			$('.faqListItems').removeClass('active');
		} else {
			$('.faqListItems').removeClass('active');
			$(this).addClass('active');
			if($(window).height() <= 992){
				var menuHeight = $('.mobileMenu').innerHeight();
				$('html,body').stop().animate({
					scrollTop: $(this).offset().top - menuHeight
				},300);
			}
		}
	});
});
$(document).ready(function(){
	$('#gotop').click(function(){
		$('html,body').stop().animate({
			scrollTop: 0
		},300);
	});
});
// 輪播
$(document).ready(function(){
	if ( $('.milestoneYearsList').length && $('.milestoneYearsTextList').length) {
		$('.milestoneYearsList').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: false,
			centerMode: true,
			focusOnSelect: true,
			infinite: false,
			asNavFor: '.milestoneYearsTextList',
			responsive: [
			{
				breakpoint: 1480,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
					centerMode: false,
				}
			}]
		});
		$('.milestoneYearsTextList').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: '.milestoneYearsList',
			infinite: false,
			dots: false,
			arrows: true,
			centerMode: true,
			focusOnSelect: true,
			appendArrows: $('.milestoneArea'),
			prevArrow:'<span class="milestoneArrows left"><span class="dlubIcon-longArrow-left"></span></span>',
			nextArrow:'<span class="milestoneArrows right"><span class="dlubIcon-longArrow-right"></span></span>'

		});
	}
	if ( $('.certificationList__Items').length ) {
		$('.certificationListArea').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			infinite: true,
			dots: false,
			arrows: true,
			focusOnSelect: true,
			appendArrows: $('.certificationList'),
			prevArrow:'<span class="certificationListArrows left"><span class="dlubIcon-longArrow-left"></span></span>',
			nextArrow:'<span class="certificationListArrows right"><span class="dlubIcon-longArrow-right"></span></span>',
			responsive: [
			{
				breakpoint: 1680,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1440,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			}]

		});
	}
	if ( $('.indexAbout__BannerAreaItem').length ) {
		$('.indexAbout__BannerArea').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			focusOnSelect: true,
			infinite: true,
			autoplay: true,
  			autoplaySpeed: 5000,
			asNavFor: '.indexAbout__BannerTextSliderArea',
			appendArrows: $('.indexAbout__BannerArrows'),
			
			prevArrow:'<span class="arrow-left"><span class="fontArrows dlubIcon-shortArrow-left"></span></span>',
			nextArrow:'<span class="arrow-right"><span class="fontArrows dlubIcon-shortArrow-right"></span></span>',
			responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: true,
				}
			}]
		});
	}
	if ( $('.indexAbout__BannerTextItem').length ) {
		$('.indexAbout__BannerTextSliderArea').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			focusOnSelect: true,
			dots: true,
			asNavFor: '.indexAbout__BannerArea',
			appendDots: $('.indexAbout__BannerTextSliderDots'),
		});
	}
	if ( $('.indexSuccessTextSliderItem').length ) {
		$('.indexSuccessTextSliderArea').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: true,
			appendArrows: $('.indexSuccessTextSliderArrows'),
			prevArrow:'<span class="arrow-left"><img src="images/bannerArrow-left.png" alt=""></span>',
			nextArrow:'<span class="arrow-right"><img src="images/bannerArrow-right.png" alt=""></span>',
			focusOnSelect: true,
			asNavFor: '.indexSuccess__ImgSliderArea',
			appendDots: $('.indexSuccessTextSliderDots'),
			responsive: [
			{
				breakpoint: 992,
				settings: {
					prevArrow:'<span class="arrow-left"><span class="fontArrows dlubIcon-shortArrow-left"></span></span>',
					nextArrow:'<span class="arrow-right"><span class="fontArrows dlubIcon-shortArrow-right"></span></span>',
				}
			}]
		});
	}
	if ( $('.indexSuccess__ImgSliderItem').length ) {
		$('.indexSuccess__ImgSliderArea').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			focusOnSelect: true,
			asNavFor: '.indexSuccessTextSliderArea',
		});
	}
});

/**
 * 產品詳細頁 頁籤切換
 */
$(document).ready(function(){
	if ( $('.productDetail__tabList li').length && $('.productDetail__tabContentArea .productDetail__tabContentItem').length ){
		$('.productDetail__tabList li').click(function(){
			var tabIndex = $(this).index();
			$('.productDetail__tabList li').removeClass('active');
			$(this).addClass('active');
			$('.productDetail__tabContentArea .productDetail__tabContentItem').removeClass('active');
			$('.productDetail__tabContentArea .productDetail__tabContentItem').eq(tabIndex).addClass('active');
		});
		$('.productDetail__Mobiletab').click(function(){
			var tabIndex = $(this).parent().index();
			var tabTop = $(this).parent().offset().top;
			var menuHeight = $('.mobileMenu').innerHeight();
			$('.productDetail__tabList li').removeClass('active');
			$('.productDetail__tabList li').eq(tabIndex).addClass('active');
			$('.productDetail__tabContentArea .productDetail__tabContentItem').removeClass('active');
			$('.productDetail__tabContentArea .productDetail__tabContentItem').eq(tabIndex).addClass('active');
			$('html,body').stop().animate({
				scrollTop: tabTop - menuHeight
			},300);
		});
	}
});


/**
 * 燈箱功能
 */
$(document).ready(function(){
	var closeControl = ['.dulbLightBox__bg','.dulbLightBox__Close'];
	closeControl.forEach(function(item){
		$(item).click(function(){
			closeLigBox();
		});
	});
	
});
function closeLigBox(){
	$('.dulbLightBox').removeClass('active');
}
function openLightBox(target){
	var targetEle = '';
	switch(target){
		case 'search':
			targetEle = '.searchItem';
			break;
	}
	$('.dulbLightBox').addClass('active');
	$('.dulbLightBox__Content').find(targetEle).addClass('active');
}


/**
 * Google翻譯
 */
 function googleTranslateElementInit() {
	new google.translate.TranslateElement({pageLanguage: 'zh-TW',includedLanguages: 'en'}, 'google_translate_element');
 }