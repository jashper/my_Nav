
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
	menuHeight = $('.leftSideBox').outerHeight()+ 0;
	wH = $(window).height();
	
	if ( menuHeight >= wH ){
		menuMoveRange = menuHeight - wH;
	} else {
		let menuMoveRange = 0;
	}
	return menuMoveRange;
}