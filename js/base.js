
/*

Base是一个基础库的核心对象
Base.getId('box') 返回的是一个 divElement 对象
将Base.getId('box') 返回改成Base即可

在Base对象中，添加css方法，html方法，click方法

*/

//每次都实例化一次
var $ = function(_this){
	return new Base(_this);
}


//基础库
function Base(_this){
	//创建一个数组，来保存获取的节点和节点数组
	//私有化
	this.elements = [];
	if(_this != undefined){//_this是一个对象，undefined也是一个对象
		this.elements[0] = _this;
	}
}



//获取ID节点
Base.prototype.getId = function(id){
	this.elements.push(document.getElementById(id));
	return this;
}

//获取Class节点
Base.prototype.getClass = function(className,idName){
	var node = null;
	if(arguments.length == 2){
		node = document.getElementById(idName);
	}else{
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for(var i = 0,n = all.length; i < n; i++){
		if(all[i].className == className){
			this.elements.push(all[i]);
		}
	}
	return this;
}

//获取某一个节点
Base.prototype.getElement = function(num){
	//得到要选中的那个节点
	var element = this.elements[num];
	//清空所有的节点
	this.elements = [];
	//将得到的那个节点再赋值回去
	this.elements[0] = element;
	return this;
}

//获取元素节点
Base.prototype.getTagName = function(tag){
	var tags = document.getElementsByTagName(tag);
	for(var i = 0; i < tags.length; i++){
		this.elements.push(tags[i]);
	}
	return this;
}

//设置css
Base.prototype.css = function(attr,value){
	for(var i = 0, n = this.elements.length; i < n; i++){
		if(arguments.length == 1){
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}

//添加class
Base.prototype.addClass = function(className){
	for(var i = 0, n = this.elements.length; i < n; i++){
		if(!hasClass(this.elements[i],className)){
			this.elements[i].className +=' ' + className;
		}
	}
	return this;
}

//移除class
Base.prototype.removeClass = function(className){
	for(var i = 0, n = this.elements.length; i < n; i++){
		if(hasClass(this.elements[i],className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');
		}
	}
	return this;
}

//添加link或style的css规则
Base.prototype.addRule = function(num,selectorText,cssText,position){
	var sheet = document.styleSheets[num];
	insertRule(sheet,selectorText,cssText,position);
	return this;
}

//移除link或style的css规则
Base.prototype.removeRule = function(num,position){
	var sheet = document.styleSheets[num];
	deleteRule(sheet,position);
	return this;
}

//设置innerHTML
Base.prototype.html = function(str){
	for(var i = 0, n = this.elements.length; i < n; i++){
		if(arguments.length == 0){
			return this.elements[i].innerHTML
		}
		this.elements[i].innerHTML = str;
	}
	return this;
}

//设置物体居中
Base.prototype.center = function(width,height){
	var top = (getInner().height - height) / 2;
	var left = (getInner().width - width) / 2;

	for(var i = 0, n = this.elements.length; i < n; i++){
		this.elements[i].style.left = left + 'px';
		this.elements[i].style.top = top + 'px'	;
	}
	return this;
}

//锁屏功能
Base.prototype.lock = function(width,height){
	for(var i = 0, n = this.elements.length; i < n; i++){
		this.elements[i].style.width = getInner().width + 'px';
		this.elements[i].style.height = getInner().height + 'px';
		this.elements[i].style.display = 'block';
		document.documentElement.style.overflow = 'hidden';
	}
	return this;
}

//解锁功能
Base.prototype.unlock = function(width,height){
	for(var i = 0, n = this.elements.length; i < n; i++){
		this.elements[i].style.display = 'none';
		document.documentElement.style.overflow = 'auto';
	}
	return this;
}


//点击事件
Base.prototype.click = function(fn){
	for(var i = 0, n = this.elements.length; i < n; i++){
		this.elements[i].onclick = fn;
	}
	return this;
}

//鼠标移入移出
Base.prototype.hover = function(over,out){
	for(var i = 0, n = this.elements.length; i < n; i++){
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
	return this;
}

//触发浏览器窗口事件
Base.prototype.resize = function(fn){
	window.onresize = fn;
	return this;
}


//显示
Base.prototype.show = function(){
	for(var i = 0, n = this.elements.length; i < n; i++){
		this.elements[i].style.display = 'block';
	}
	return this;
}

//隐藏
Base.prototype.hide = function(){
	for(var i = 0, n = this.elements.length; i < n; i++){
		this.elements[i].style.display = 'none';
	}
	return this;
}

//拖拽功能
Base.prototype.drag = function(){
	for(var i = 0, n = this.elements.length; i < n; i++){
		//拖拽流程:
		//1.先点下去
		//2.在点下的物体被选中，进行move移动
		//3.抬起鼠标，停止移动
		var oDiv = document.getElementById('login');
			this.elements[i].onmousedown = function(e){
				preDef(e);	//阻止默认行为
				var e = getEvent(e),
				_this = this,
				diffX = e.clientX - _this.offsetLeft,
				diffY = e.clientY - _this.offsetTop;
				document.onmousemove = function(e){

					//得到实际移动的距离
					var e = getEvent(e),
					w = parseInt(_this.offsetWidth),
					h = parseInt(_this.offsetHeight),
					x = e.clientX - diffX < 0 ? 0 : e.clientX - diffX,	
					y = e.clientY - diffY < 0 ? 0 : e.clientY - diffY;
					
					if(x < 0){
						x = 0;
					}else if(x > getInner().width - _this.offsetWidth){
						x = getInner().width - _this.offsetWidth;
					}

					if(y < 0){
						y = 0;
					}else if(y > getInner().height - _this.offsetHeight){
						y = getInner().height - _this.offsetHeight;
					}

					_this.style.left = x + 'px';
					_this.style.top = y + 'px';
				}
				document.onmouseup = function(){
					this.onmousemove = null;
					this.onmouseup = null;
				}
			}
	}
	return this;
}

