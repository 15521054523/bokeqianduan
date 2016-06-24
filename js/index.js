/*
window.onload = function(){


	//下拉菜单
	$().getClass('member').hover(function(){
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$().getClass('member_ul').show();
	},function(){
		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$().getClass('member_ul').hide();
	});

	//登录框
	var login = $().getId('login'),
	loginW = parseInt(login.css('width')),
	loginH = parseInt(login.css('height'));
	login.center(loginW,loginH).resize(function(){
		login.center(loginW,loginH);
	});

	//打开登录框
	$().getClass('login').click(function(){
		login.show();
		$().getId('screen').lock();
	});


	//关闭登录框
	$().getClass('close').click(function(){
		login.hide();
		$().getId('screen').unlock();
	});

	//登录框拖拽
	login.drag();


}

*/


window.onload = function(){

	var a = document.getElementById('a');
	addEvent(a,'click',function(e){
		//e.preventDefault();
		e.stopPropagation();
		alert('a');
	});

	addEvent(document,'click',function(e){
		alert('document');
	});

}

