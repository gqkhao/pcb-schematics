$(function(){//document.ready
		$.ajaxSetup ({
			cache: false
		});
		
		$(document).on('click', 'a.login',function(){
				var dialog = new Dialog({});
					dialog.newLogin();
				return false;
		});
		
		// 搜索 ------
		if ( $("#search").length > 0) {
				$("#searchForm").attr("action","/plus/search.php");
				$("#searchBtn").click(function(){
						var searchBox = $("#searchBox").val();
						var typeid  = $("#typeid").val();
						var keyword = searchBox.replace(/\//," ");
						var action  = "/search/0_title_"+typeid+"_"+keyword;
						if( !searchBox){
								$.blockUI({ 
										message:  '<p class="pt10 pb10 fb f26">请输入您要搜索的关键字</p>',
										css: {
												marginLeft:  '-190px', 
												top:   '20%',
												width: '380px',
												textAlign:	'center',
												color : '#fff',
												background:"#c00",
												border : "3px solid #fff",
												borderRadius:"2px"
										},
										timeout: 1200 
								});
								$("#searchBox").focus();
								return false;
						}
						////去掉搜索伪静态 by kevin 2012.12.25
						//location.href=action;
						//return false;
				});
				
				$("#searchBox").keydown(function(event) {
						if( event.keyCode == 13 ){  
								$("#searchBtn").click();
								return false;
						}
				});
				
		}// 搜索结束-----
		
		//IE6背景图片缓存
		if( ie6 ){
				document.execCommand("BackgroundImageCache",false,true);
		};
		
		//修改注册按钮链接
		$("a.login").attr("href",loginUrl);
		$("#topLogout").find('.register').attr("href",regUrl);
		
		// 2015-02-12 添加百度搜索框
		var bdsearch = '<div id="bdcs"><div class="bdcs-container"><meta http-equiv="x-ua-compatible" content="IE=9"><div class="bdcs-main bdcs-clearfix" id="default-searchbox"><div class="bdcs-search bdcs-clearfix" id="bdcs-search-inline"><form action="http://s.elecfans.com/cse/search" method="get" target="_blank" class="bdcs-search-form" id="bdcs-search-form"><input type="hidden" name="s" value="6298135183618923127"><input type="hidden" name="entry" value="1"><input type="text" name="q" class="bdcs-search-form-input" id="bdcs-search-form-input" placeholder="" autocomplete="off"><input type="submit" class="bdcs-search-form-submit " id="bdcs-search-form-submit" value="搜索"></form></div><div class="bdcs-search-sug" id="bdcs-search-sug" style="top: 29px; width: 400px; display: none;"><ul class="bdcs-search-sug-list" id="bdcs-search-sug-list"></ul></div></div></div></div><script charset="utf-8" src="http://znsv.baidu.com/customer_search/api/js?sid=6298135183618923127&amp;plate_url=http%3A%2F%2Fwww.elecfans.com%2F&amp;t=395479"></script>';
		$("#searchForm").parent().empty().html(bdsearch);
		setTimeout(function(){$("#bdcs-search-form-input").attr("placeholder","")},2000);
		
		//	2015-07-17 增加右下角弹窗广告
		// cookie 设置函数
		$.extend({
			cookieHelper: function(name, value, options) {
				if (typeof value != 'undefined') { // name and value given, set cookie
					options = options || {};
					if (value === null) {
						value = '';
						options.expires = -1;
					}
					var expires = '';
					if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
						var date;
						if (typeof options.expires == 'number') {
							date = new Date();
							date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
						} else {
							date = options.expires;
						}
						expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
					}
					var path = options.path ? '; path=' + options.path : '';
					var domain = options.domain ? '; domain=' + options.domain : '';
					var secure = options.secure ? '; secure' : '';
					document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
				} else { // only name given, get cookie
					var cookieValue = null;
					if (document.cookie && document.cookie != '') {
						var cookies = document.cookie.split(';');
						for (var i = 0; i < cookies.length; i++) {
							var cookie = jQuery.trim(cookies[i]);
							// Does this cookie string begin with the name we want?
							if (cookie.substring(0, name.length + 1) == (name + '=')) {
								cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
								break;
							}
						}
					}
					return cookieValue;
				}
			}
		});
	
	// 2015-07-20 TDK广告
	if($.cookieHelper("tdkad") !== "yes"){
		$.cookieHelper("tdkad", "yes", {expires:"1",path:"/"});
		showTdkAd();
		setTimeout("closeTdkAd()", 15000);
	}
	$(document).on("click", "#tdk-close", function(){
		closeTdkAd();
	});
});// End document.ready
//	2015-07-17 增加右下角弹窗广告 end

// 2015-07-20 TDK广告
function showTdkAd(){
	$('body').append('<div id="fix-tdkad"><iframe width="640" height="480" frameborder="0" src="http://www1.elecfans.com/www/delivery/myafr.php?target=_blank&amp;cb=0.8775979285112017&amp;zoneid=233" scrolling="no"></iframe><span id="tdk-close">关闭</span></div>');
}
function closeTdkAd(){
	if($('#fix-tdkad').length){
		$('#fix-tdkad').animate({
			"opacity" : 0
		}, 500, function(){
			$('#fix-tdkad').remove();
		});
	}
}

$(window).load(function(){
		CheckLogin();
		/*
		//载入下拉导航DOM
		$("body").append('<div id="loadHtml" class="none"></div>');
		$("#loadHtml").load("/templets/default/include-sz/loadHtml.html",function(){
				var domTech = $("#navTechload").html();
				var domData = $("#navDataload").html();
				var domYqj  = $("#navYqjload").html();
				var domCir  = $("#navCirload").html();
				//追加DOM到导航相应位置
				
				var $navDrop = $("#nav").find(".navDrop");
				var $nav_a = $navDrop.find(".nav-a");
				var fl='<dd class="subNav-box pa"><div class="subNav-hd h5 ov"></div><div class="subNav yahei"><div class="nav-loading"><img src="/images/icon/ajax.gif"/></div></div></dd>';
				$navDrop.append(fl);

				$("#navTech").find("div.subNav").append(domTech);
				$("#navData").find("div.subNav").append(domData);
				$("#navYqj").find("div.subNav").append(domYqj);
				$("#navCir").find("div.subNav").append(domCir);
				//鼠标经过
				$nav_a.mouseDelay(false,"navGroup").hover(function(){
						console.log("gg");
						//下拉菜单
						$navDrop.find("dd.subNav-box").stop(true,true).slideUp(200);
						$(this).parent().next("dd.subNav-box").stop(true,true).slideDown();;
						
				},function(){
						$navDrop.find("dd.subNav-box").stop(true,true).slideUp(200);
						
				});
				$navDrop.mouseDelay(false,"navGroup").hover(null, function () {
						$navDrop.find("dd.subNav-box").stop(true,true).slideUp(200);
						
				});
		});
		*/
		
		var fl='<dd class="subNav-box pa"><div class="subNav-hd h5 ov"></div><div class="subNav yahei"><div class="nav-loading"><img src="/images/icon/ajax.gif"/></div></div></dd>';
		$("#page:not('.homePage') #nav dl.navDrop").append(fl);
		var $navDl = $("#nav").find("dl.navDrop");
		$navDl.mouseDelay().hover(function(){
			  $navDl.removeClass("cur");
			  $("#nav").find(".subNav-box").stop(true,true).slideUp(200);
			  $(this).find(".subNav-box").stop(true,true).slideDown();
			  $(this).addClass("cur");
		},function(){
			  $(this).find(".subNav-box").stop(true,true).slideUp(200);
			  $(this).removeClass("cur");
		});
		
		$("#navData .nav-a").one("mouseover",function(){
		   setTimeout(function(){
			   $("#navData").find("div.subNav").load("/templets/default/include/loadHtml.html #navDataFl");
		   },200);
		});
		$("#navTech .nav-a").one("mouseover",function(){
		   setTimeout(function(){
			   $("#navTech").find("div.subNav").load("/templets/default/include/loadHtml.html #navTechFl");
		   },200);
		});
		$("#navYqj .nav-a").one("mouseover",function(){
		   setTimeout(function(){
			   $("#navYqj").find("div.subNav").load("/templets/default/include/loadHtml.html #navYqjFl");
		   },200);
		});
		$("#navCir .nav-a").one("mouseover",function(){
		   setTimeout(function(){
			   $("#navCir").find("div.subNav").load("/templets/default/include/loadHtml.html #navCirFl");
		   },200);
		});
		//当前频道
		$(".homePage .nav-a").unbind("mouseover");
		$("#nav .navCur").css("z-index","2").find(".nav-a").unbind("mouseover");
		
		// 导航 (新版) ---------------------------------
		/*
		var $nav = $("#nav");
		var $nav_li = $nav.find("dl"); 
		var $nav_a = $nav.find(".nav-a");
		//追加滑动块、滑动电路DOM到导航
		var nav_slide_html = '<div id="nav-slide" class="nav-slide"></div>';
		var nav_cir_html = '<div id="nav-cir" class="nav-cir" ><div class="nav-cir-left"></div><div class="nav-cir-right"></div><div class="nav-cir-line"></div></div>';
		var nav_slide_cir =  nav_slide_html + nav_cir_html;
		$nav.append(nav_slide_cir);
		var $nav_slide = $("#nav-slide");
		var $nav_cir = $("#nav-cir");	
		$nav_a.mouseDelay().hover(function(){
				//获取坐标
				var $this_parent = $(this).parent();
				var page_left = $("#page").offset().left;
				var this_left = $this_parent.offset().left;
				var this_width = $this_parent.width();
				//----- 滑动块+电路 -----
				$nav_slide.stop(true,true).show().animate({ left : this_left - page_left - 6 , width : this_width + 1 },300);
				//----- 滑动电路 -----
				if( $(this).is("#navHome .nav-a") ){
				   $nav_cir.stop(true,true).animate({width:10},300).fadeOut(200);
				}else{
				   $nav_cir.stop(true,true).show().animate({ width : this_left - page_left - 3 },600);
				};
		},function(){
				$nav_slide.stop(true,true).fadeOut(800); 
				$nav_cir.stop(true,true).animate({width:10},800).fadeOut(600);
		});
		*/
});// End window.load


//定义全局变量 ------------------------
var ie6 = $.browser.msie&&($.browser.version == "6.0")&&!$.support.style;
var ie678 = $.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0" || $.browser.version == "8.0");
//注册地址
var loginUrl = 'http://home.elecfans.com/do.php?ac=synclogin';
var regUrl = 'http://home.elecfans.com/do.php?ac=syncregister';
var forgetPwUrl = 'http://home.elecfans.com/do.php?ac=lostpasswd';
//
var loginTitle = '用户登录';
var loginTitle_hasRegister = '用户登录 <span>(<a href="'+regUrl+'" class="ml5" target="_blank">还没有注册？</a>)</span>';
//时间
var myDate = new Date();
var m = myDate.getMonth()+1;
var d = myDate.getDate();
var nowDate = m+"月"+d+"日";

// 2015-07-08
var ELECFANS_HOST = window.location.host;
var ELECFANS_DOMAIN_ARR = ELECFANS_HOST.split('.');
var ELECFANS_DOMAIN_LEN = ELECFANS_DOMAIN_ARR.length;
var ELECFANS_DOMAIN = ELECFANS_DOMAIN_ARR[(ELECFANS_DOMAIN_LEN-2)]+'.'+ELECFANS_DOMAIN_ARR[(ELECFANS_DOMAIN_LEN-1)];
var ELECFANS_BBS = 'http://bbs.'+ELECFANS_DOMAIN;
var ELECFANS_HOME = 'http://home.'+ELECFANS_DOMAIN;


//滚动到页面指定位置 ------------------------
function windowScroll(o,target){
		$(o).click(function(){
				var target_top = $(target).offset().top;
				$("html,body").animate({ scrollTop : target_top },800);
				return false;
		});
};
//表单默认值 -----
function inputDefault(obj){
	  var $obj = $(obj);
	  var defaultVal = $obj.val();
	  $obj.focus(function(){
			 var iptval = $(this).val();
			 if(!this.defaultValue){
				  this.defaultValue = defaultVal;
			 };
			 if(iptval==this.defaultValue){
				  $(this).val("");
			 }
			 $(this).removeClass("grey9").addClass("black");
	  });
	  $obj.blur(function(){
			 var iptval = $(this).val();
			 if(iptval==""){
				  $(this).val(this.defaultValue);
				  $(this).removeClass("black").addClass("grey9");
			 }
	  });
};
//仿微博向下滚动，obj:ul外围元素，num:最少li的数量，height:obj设定的高度
function weiboScroll(obj,num,height){
		var $obj = $(obj);
		var oNum = num ? num : 5;
		var oHeight = height ? height : "295px";
		var $ul = $obj.find("ul"); 
		var liNum = $ul.find("li").length;

		$obj.hover(function(){ 
				clearInterval(scrtime); 
		},function(){ 
				scrtime = setInterval(function(){ 
						if( liNum > oNum ){
								//执行滚动
								var liHeight = $ul.find("li:last").height(); 
								$ul.animate({ marginTop : liHeight + 20 +"px"},1000,function(){ 
										$ul.find("li:last").prependTo($ul);
										$ul.find("li:first").hide(); 
										$ul.css({marginTop:0}); 
										$ul.find("li:first").fadeIn(1000); 
								}); 
						}
				},3000); 
		}).trigger("mouseleave"); 
}
//检查登录  ---------------------------
function CheckLogin(){
		$.get("/member/check-login-sz.php",function(data,textStatus){
				if( data != "" ){
						//隐藏顶部未登录信息
						$("#topLogout").hide();
						//顶部添加登录后信息
						$("#topLogin").append(data);
						
						//显示发表评论的表单，隐藏评论区域未登录信息
						if( $("#userComment").length > 0 ){
								$("#J_CommentLogout").hide();
								$("#J_CommentLogin").show();
						}
				}
		}); 
}

// 选项卡 seo tab ---------------
function seoTab(obj){
		$(obj).hover(function(){
				var $this = $(this);
				if( $this.is(".tab-cur") ){
						return false;
				}
				var tab_show_height = $this.siblings(".tab-show").height();
				delayTime = setTimeout(function() {
						$this.siblings(".tab-content").css({ position : "absolute",top : "-9999em"}).removeClass("tab-show").end()
							    .next(".tab-content").css({position : "static",height : tab_show_height}).addClass("tab-show").end()
							    .addClass("tab-cur").siblings(".tab-title").removeClass("tab-cur");
				},150)	
		},function(){
				if( !$(this).is(".tab-cur") ){
						clearTimeout(delayTime);
				}
		});	
}
/*
 * life-ahead.com
 * 李楠 2011-09-27
 */
//定义Dialog弹出框对象 2011.09.22 by linan
function Dialog(options) {
		this.name    = options.name || "linan-dialog";
		this.title   = options.title || "提示";
		this.content = options.content || "";
		this.top 	 = options.top || "30%";
		this.width   = options.width || 350;
		this.height  = options.height || 280;
		this.timeOut = options.timeOut || null;//定义对话框从出现到消失的时间
		this.motai   = options.motai || "no";
}
Dialog.prototype = {
	// 2015-04-10 增加内容
	//弹出对话框，加载中状态...
	pop: function() {
			var html = '';
			html += '<div class="dialog">';
			html += '		<div class="dialog-hd" id="J_DialogTitle">' + this.title + '</div>';
			html += '		<div class="dialog-bd" id="J_DialogContent">';
			html += '				<div class="dialog-loading"><img src="http://skin.elecfans.com/images/loading.gif" width="16" height="16" />正在加载,请稍后...</div>';
			html += '		</div>';
			html += '		<div class="close-dialog">X</div>';
			html += '</div>';
			var motai = this.motai;
			//blockUI
			$.blockUI({
				message: html, //对话框DOM
				css: {
					top: this.top,
					width: this.width + "px",
					height: "120px",
					marginLeft: "-" + this.width / 2 + "px",
					color: "#000",
					border: "8px solid #d8d8d8",
					background: "#fff",
					borderRadius: "3px"
				},
				timeout: this.timeOut,
				overlayCSS: {
					cursor: "pointer",
					backgroundColor: '#111',
					opacity: 0.3
				},
				showOverlay: true,
				fadeIn: 200,
				fadeOut: 400,
				onBlock: function() {
					if (motai == "no") {
						//延时400给遮罩层、关闭按钮添加title属性，以及click关闭对话框事件。
						setTimeout(function() {
							$(".blockOverlay,.close-dialog").attr('title', '点击关闭').on('click', $.unblockUI);
						}, 400);
					} else {
						$(".close-dialog").hide();
					}
				}
			});
		},
		//显示登录框 -----------------
		showLogin: function(title, tipContent) {
			var title = title ? title : this.title;
			var content = tipContent ? tipContent : "";
			//改变标题
			$("#J_DialogTitle").html(title);
			//登录表单DOM
			var loginForm_dom = '';
			loginForm_dom += '<div class="login-form">';
			loginForm_dom += '<form method="post" action="/member/index_do_ajax.php" name="userlogin" id="J_LoginForm">';
			loginForm_dom += '		<fieldset>';
			loginForm_dom += '				<legend>用户登录</legend>';
			loginForm_dom += '				<input type="hidden" name="fmdo" value="login" />';
			loginForm_dom += '				<input type="hidden" name="dopost" value="login" />';
			loginForm_dom += '				<div class="login-form-item">';
			loginForm_dom += '						<div class="login-form-wrap group">';
			loginForm_dom += '								<label class="login-label" for="username">账号：</label>';
			loginForm_dom += '								<input class="login-input" type="text" id="username" name="userid" />';
			loginForm_dom += '						</div>';
			loginForm_dom += '						<div class="login-form-tip tip-show"></div>';
			loginForm_dom += '				</div>';
			loginForm_dom += '				<div class="login-form-item">';
			loginForm_dom += '						<div class="login-form-wrap group">';
			loginForm_dom += '								<label class="login-label" for="password">密码：</label>';
			loginForm_dom += '								<input class="login-input" type="password" id="password" name="pwd" maxlength="100" />';
			loginForm_dom += '						</div>';
			loginForm_dom += '						<div class="login-form-tip">6-16位英文或数字，区分大小写</div>';
			loginForm_dom += '				</div>';
			loginForm_dom += '				<div class="btn-area login-btn-area group">';
			loginForm_dom += '						<span class="btn-hasLoading-wrap"><span class="loading"><img src="http://skin.elecfans.com/images/loading.gif" /></span><button type="submit" id="J_LoginSubmit" class="btn login-submit">登录</button></span> <a rel="nofollow" href="' + forgetPwUrl + '" class="grey9 ml20">忘记密码？</a> <a rel="nofollow" href="' + regUrl + '" class="blue ml10">免费注册</a>';
			loginForm_dom += '				</div>';
			loginForm_dom += '		</fieldset>';
			loginForm_dom += '</form>';
			loginForm_dom += '</div>';
	
			//对话框展开，显示登录表单 ------------------------------------------------------------
			$(".blockPage").animate({
				"height": "240px"
			}, 200, function() {
	
				$("#J_DialogContent").html(loginForm_dom);
	
				//表单验证 -------------------------------------------------
				var $username = $("#username");
				var $password = $("#password");
				var $loading = $("span.loading");
				//提示文本
				var username_empty = '请输入账号';
				var username_err = '账号不存在';
				var password_err = '密码错误,请重新输入';
				var password_lenErr = '×密码不符合要求：<span class="grey9">6-16位,英文或数字</span>';
				var password_empty = '请输入登录密码：<span class="grey9">6-16位,英文或数字</span>';
				//验证账号
				$username.blur(function() {
					var thisVal = $(this).val();
					if (thisVal.length > 0) {
						tipErr($(this), "", "none");
					} else {
						tipErr($(this), username_empty);
					}
				});
				//密码提示
				$password.focus(function() {
					$(this).parent("div").next("div.login-form-tip").css("display", "block");
				});
				//密码验证
				$password.blur(function() {
						var len = $(this).val().length; //获取密码长度
						if (len > 0) {
							if (len < 3 || len > 16) { //密码长度不能小于6，大于16
								tipErr($(this), password_lenErr);
							} else {
								tipErr($(this), "", "none");
							}
						} else {
							tipErr($(this), password_empty);
						}
					}) //end 密码检测
					//表单验证 End -------------------------------------------------
	
				//登录错误提示
				function tipErr(obj, text, display) {
					var display = display ? display : "block";
					obj.parent("div").next("div.login-form-tip").html(text).css({
						"display": display,
						"color": "#c00"
					});
	
				}
	
				//表单提交 -----------------------------------------------------
				var successTip = this.successTip;
				var tipContent = this.tipContent;
				//提交前验证
				function loginRequest(formData, jqForm, options) {
						//账号
						var usernameVal = $username.val();
						if (usernameVal.length > 0) {
							tipErr($(this), "", "none");
						} else {
							tipErr($username, username_empty);
							$username.focus().select();
							return false;
						}
						//密码
						var len = $password.val().length; //获取密码长度
						if (len > 0) {
							if (len < 3 || len > 16) { //密码长度不能小于6，大于16
								tipErr($password, password_lenErr);
								$password.focus().select();
								return false;
							} else {
								tipErr($password, "", "none");
							}
						} else {
							tipErr($password, password_empty);
							$password.focus().select();
							return false;
						}
						//显示loading
						$loading.show();
						$("#log-tip").hide();
						var queryString = $.param(formData);
						return true;
					}
					/*ajax登录*/
				$("#J_LoginForm").ajaxForm({
					beforeSubmit: loginRequest,
					success: function(responseText, statusText) {
							//隐藏loading
							$loading.hide();
							if (responseText == "用户名不存在") {
								tipErr($username, username_err);
								$username.focus().select();
								return false;
							}
							if (responseText == "密码错误") {
								tipErr($password, password_err);
								$password.focus().select();
								return false;
							}
							//执行同步登录
							eval("urlarr = " + responseText);
							for (var i = 0; i < urlarr.length; i++) {
								$.getScript(urlarr[i]);
							}
	
							//执行登录检查
							CheckLogin();
	
							//提示登录成功 --------------------
							var loginSuccessTip = new SubmitSuccessTip({
								title: "登录成功",
								content: content
							})
							loginSuccessTip.show();
	
						} //end success:function
				}); //end ajaxForm 
	
			}); //End $(".blockPage").animate()
		},
		
	// 2015-07-09 新版登录框
	newLogin: function() {
		//登录表单DOM
		var cqm_login = '';
		cqm_login += '<div class="other-Login"><p><a class="other-login-link sina-login-link" target="_self" href="/thirdparty/weibo/index.php">使用微博账号登录</a></p><p><a class="other-login-link qq-login-link" target="_self" href="/thirdparty/qq/login.php">使用QQ账号登录</a></p></div>';
		cqm_login += '<div class="login-form">';
		cqm_login += '<span class="login-line">或者</span>';
		cqm_login += '<form method="post" action="/member/index_do_ajax.php" name="userlogin" id="J_LoginForm" autocomplete="off">';
		cqm_login += '<fieldset>';
		cqm_login += '<legend>用户登录</legend>';
		cqm_login += '<input type="hidden" name="fmdo" value="login" />';
		cqm_login += '<input type="hidden" name="dopost" value="login" />';
		cqm_login += '<div class="login-form-tip">6-36位英文或数字，区分大小写</div>';
		cqm_login += '<div class="login-form-item">';
		cqm_login += '<input class="login-input login-input-username" type="text" id="username" name="userid" placeholder="请输入用户名"/>';
		cqm_login += '</div>';
		cqm_login += '<div class="login-form-item">';
		cqm_login += '<input class="login-input" type="password" id="password" name="pwd" maxlength="100"  placeholder="请输入密码"/>';
		cqm_login += '</div>';
		cqm_login += '<div class="btn-area login-btn-area group">';
		cqm_login += '<span class="btn-hasLoading-wrap"><span class="loading"><img src="http://skin.elecfans.com/images/loading.gif" /></span><button type="submit" id="J_LoginSubmit" class="btn login-submit">登 录</button></span> <span style="font-size:14px;display:inline-block;margin-left:20px;"><a href="' + ELECFANS_BBS + '/member.php?mod=reg" target="_blank" style="text-decoration:underline;margin-right:10px;color:#1ea3e4;float:left;margin-top:10px;">注册</a>  <a rel="nofollow" target="_self" class="forgetPw" href="javascript:;" style="text-decoration:underline;margin-left:10px;">找回密码</a></span>';
		cqm_login += '</div>';
		cqm_login += '</fieldset>';
		cqm_login += '</form>';
		cqm_login += '</div>';
		//对话框DOM
		var html = '';
		html += '<div class="dialog1">';
		html += '<div class="dialog-hd1" id="J_DialogTitle">登 录</div>';
		html += '<div class="dialog-bd1" id="J_DialogContent">';
		html += cqm_login;
		html += '</div>';
		html += '<div class="close-dialog1">X</div>';
		html += '</div>';
		//blockUI ----------------------
		$.blockUI({
			message: html, //对话框DOM
			css: {
				top: "12%",
				width: "370px",
				height: "410px",
				marginLeft: "-" + this.width / 2 + "px",
				left: "50%",
				color: "#000",
				border: "8px solid #d8d8d8",
				background: "#fff",
				borderRadius: "5px"
			},
			overlayCSS: {
				cursor: "pointer",
				backgroundColor: '#111',
				opacity: 0.3
			},
			showOverlay: true,
			fadeIn: 200,
			fadeOut: 400,
			onBlock: function() {
				$(".blockOverlay,.close-dialog1").attr('title', '点击关闭').on('click', $.unblockUI);
			}
		});
		//表单验证
		var $username = $("#username");
		var $password = $("#password");
		var $loading = $("span.loading");
		//提示文本
		var username_empty = '请输入账号';
		var username_err = '账号不存在';
		var password_err = '密码错误,请重新输入';
		var password_lenErr = '×密码不符合要求：<span class="grey9">6-36位,英文或数字</span>';
		var password_empty = '请输入登录密码：<span class="grey9">6-36位,英文或数字</span>';
		//表单验证 End
		//登录错误提示
		function tipErr(obj, text, display) {
			var display = display ? display : "block";
			$("div.login-form-tip").html(text).css({
				"display": display,
				"color": "#c00"
			});
		}
		//表单提交
		var successTip = this.successTip;
		var tipContent = this.tipContent;
		/*ajax登录*/
		$("#J_LoginForm").ajaxForm({
			beforeSubmit: loginRequest,
			success: function(responseText, statusText) {
				//隐藏loading
				$loading.hide();
				if (responseText == "用户名不存在") {
					tipErr($username, username_err);
					$username.focus().select();
					return false;
				}
				if (responseText == "密码错误") {
					tipErr($password, password_err);
					$password.focus().select();
					return false;
				}
				//执行登录检查
				$("#J_Login").html('正在加载，请稍后...');
				CheckLogin();
				$(".blockPage").animate({
					"height": "190px"
				}, 200, function() {
					var successTip_dom = '';
					successTip_dom += '<div class="success-tip">';
					successTip_dom += '<h3 class="tip-title">登录成功</h3>';
					successTip_dom += '<div class="tip-content"></div>';
					successTip_dom += '</div>';
					//改变对话框标题
					$("#J_DialogTitle").html('提示');
					//改变对话框内容
					$("#J_DialogContent").html(successTip_dom);
					setTimeout(function() {
						$.unblockUI();
					}, 1400);
				});
				//执行同步登录js
				eval("urlarr = " + responseText);
				for (var i = 0; i < urlarr.length; i++) {
					$.getScript(urlarr[i]);
				}
			}	//end success:function
		});	//end ajaxForm
		
		//提交前验证
		function loginRequest(formData, jqForm, options) {
			//账号
			var usernameVal = $username.val();
			if (usernameVal.length > 0) {
				tipErr($(this), "", "none");
			} else {
				tipErr($username, username_empty);
				$username.focus().select();
				return false;
			}
			//密码
			var len = $password.val().length; //获取密码长度
			if (len > 0) {
				if (len < 3 || len > 36) { //密码长度不能小于6，大于36
					tipErr($password, password_lenErr);
					$password.focus().select();
					return false;
				} else {
					tipErr($password, "", "none");
				}
			} else {
				tipErr($password, password_empty);
				$password.focus().select();
				return false;
			}
			//显示loading
			$loading.show();
			var queryString = $.param(formData);
			return true;
		}

		$(".forgetPw").click(function() {
			$(".blockPage").animate({
				"height": "300px"
			}, 200, function() {
				var forgot_password = '';
				forgot_password += '<form method="post" autocomplete="off" id="lostpwform_LogH3" class="cl" onsubmit="" action="' + ELECFANS_BBS + '/member.php?mod=sendmailapi&apiname=getpassword&format=jsonp">';
				forgot_password += '<div class="lostpw-form">';
				forgot_password += '<div class="login-form-item">请输入您注册时填写的邮箱地址，我们会发送密码重置邮件给您：</div>';
				forgot_password += '<div class="login-form-item">';
				forgot_password += '<input type="text" name="email" id="lostpw_email" size="30" value="" tabindex="1" class="login-input login-input-email">';
				forgot_password += '</div>';
				forgot_password += '<div class="login-form-item" id="lostpwd-username-box" style="display:none;">';
				forgot_password += '<input type="text" name="username" id="lostpw_username" size="30" value="" tabindex="1" class="login-input login-input-username">';
				forgot_password += '</div>';
				forgot_password += '<div class="login-form-item">';
				forgot_password += '<button class="btnnew lostpw-submit" type="submit" id="lostpwsubmit" name="lostpwsubmit" value="true">提交</button> <a class="ml20" id="back-login-link" href="javascript:;" target="_self">想起密码了</a>';
				forgot_password += '</div>';
				forgot_password += '</div>';
				forgot_password += '</form>';
				//改变对话框标题
				$("#J_DialogTitle").html('重置登录密码');
				//改变对话框内容
				$("#J_DialogContent").html(forgot_password);

				$("#back-login-link").click(function() {
					$(".blockPage").animate({
						"height": "410px"
					}, 200, function() {
						var dialog = new Dialog({});
						dialog.newLogin();
						return false;
					});
				});

				function getpwdrequest(formData, jqForm, options) {
					lostpwsubmit.disabled = true;
					return true;
				}

				$("#lostpwform_LogH3").ajaxForm({
					beforeSubmit: getpwdrequest,
					dataType: 'jsonp',
					success: function(responseText, statusText) {
						lostpwsubmit.disabled = false;
						if (responseText.status == 'successed') {
							$("#J_DialogContent").html("找回密码的邮件发送成功");
							setTimeout($.unblockUI, 2000);
						} else {
							if (responseText.needusername == '1') {
								alert('该邮箱需要填写用户名');
								$('#lostpwd-username-box').show();
							} else {
								alert(responseText.msg);
							}
						}
					}
				});
			});
		});
	},	//End Show
	
	//显示自定义内容 --------------
	showCustom : function(title,content,width,height,top){
		var title  = title ? title : this.title;
		var content  = content ? content : this.content;
		var width  = width ? width : this.width;
		var height = height ? height : this.height;
		var top = top ? top : this.top;
		//改变标题
		$("#J_DialogTitle").html(title);
		//改变内容
		$(".blockPage").animate({ "height": height+"px","width": width + "px" },300).animate({"top":top},400);
		$("#J_DialogContent").html( content );
	},
	// 2015-04-10 End
	show: function() {
		var html = '';
		html += '<div class="dialog ' + this.name + '">';
		html += '		<div class="dialog-hd">' + this.title + '</div>';
		html += '		<div class="dialog-bd">' + this.content + '</div>';
		html += '		<div class="close-dialog">X</div>';
		html += '</div>';
		var eMotai = this.motai;
		//blockUI,弹出对话框
		$.blockUI({
			message: html, //对话框DOM
			css: {
				top: this.top,
				width: this.width + "px",
				height: this.height + "px",
				marginLeft: "-" + this.width / 2 + "px",
				color: "#000",
				border: "8px solid #d8d8d8",
				background: "#fff",
				borderRadius: "3px"
			},
			timeout: this.timeOut,
			overlayCSS: {
				cursor: "pointer",
				backgroundColor: '#111',
				opacity: 0.3
			},
			showOverlay: true,
			fadeIn: 200,
			fadeOut: 400,
			onBlock: function() {
				//延时400给遮罩层、关闭按钮添加title属性，以及click关闭对话框事件。
				setTimeout(function() {
					$(".blockOverlay,.close-dialog").attr('title', '点击关闭').on('click', $.unblockUI);
				}, 400);
			}
		});
	}
}

//定义弹出用户登录框
function LoginDialog(options){
		this.title = options.title;
		this.tipContent = options.tipContent || "";
}
LoginDialog.prototype = {
		pop : function(){		
				var loginForm_dom = '';
					loginForm_dom += '<div class="login-form">';
					loginForm_dom += '<form method="post" action="/member/index_do_ajax.php" name="userlogin" id="J_LoginForm">';
					loginForm_dom += '		<fieldset>';
					loginForm_dom += '				<legend>用户登录</legend>';
					loginForm_dom += '				<input type="hidden" name="fmdo" value="login" />';
					loginForm_dom += '				<input type="hidden" name="dopost" value="login" />';
					loginForm_dom += '				<div class="login-form-item">';
					loginForm_dom += '						<div class="login-form-wrap group">';
					loginForm_dom += '								<label class="login-label" for="username">账号：</label>';
					loginForm_dom += '								<input class="login-input" type="text" id="username" name="userid" />';
					loginForm_dom += '						</div>';
					loginForm_dom += '						<div class="login-form-tip tip-show"></div>';
					loginForm_dom += '				</div>';
					loginForm_dom += '				<div class="login-form-item">';
					loginForm_dom += '						<div class="login-form-wrap group">';
					loginForm_dom += '								<label class="login-label" for="password">密码：</label>';
					loginForm_dom += '								<input class="login-input" type="password" id="password" name="pwd" maxlength="16" />';
					loginForm_dom += '						</div>';
					loginForm_dom += '						<div class="login-form-tip">6-16位英文+数字，区分大小写</div>';
					loginForm_dom += '				</div>';
					loginForm_dom += '				<div class="btn-area login-btn-area group">';
					loginForm_dom += '						<span class="btn-hasLoading-wrap"><span class="loading"><img src="http://skin.elecfans.com/images/loading.gif" /></span><button type="submit" id="J_LoginSubmit" class="btn login-submit">登录</button></span> <a rel="nofollow" href="'+forgetPwUrl+'" class="grey9 ml20">忘记密码？</a> <a rel="nofollow" href="'+regUrl+'" target="_blank" class="blue ml10">免费注册</a>';
					loginForm_dom += '				</div>';
					loginForm_dom += '		</fieldset>';
					loginForm_dom += '</form>';
					loginForm_dom += '</div>';

				var dialog = new Dialog({
						title : this.title,
						width : 350,
						height: 240,
						content : loginForm_dom
				});
				dialog.show();
				
				//表单验证 -------------------------------------------------
				var $username = $("#username");
				var $password = $("#password");
				var $loading = $("span.loading");
				//提示文本
				var username_empty = '请输入账号';
				var username_err = '账号不存在';
				var password_err = '密码错误,请重新输入';
				var password_lenErr =  '×密码不符合要求：<span class="grey9">6-16位,英文+数字</span>';
				var password_empty = '请输入登录密码：<span class="grey9">6-16位,英文+数字</span>';
				//验证账号
				$username.blur(function(){
						var thisVal = $(this).val();
						if( thisVal.length > 0 ){
								tipErr( $(this) , "" , "none" );
						}else{
								tipErr( $(this) , username_empty );
						}
				});				
				//密码提示
				$password.focus(function(){
						$(this).parent("div").next("div.login-form-tip").css("display","block");
				});
				//密码验证
				$password.blur(function(){
						var len = $(this).val().length;//获取密码长度
						if( len > 0 ){
								if( len < 3 || len > 16 ){//密码长度不能小于6，大于16
										tipErr( $(this), password_lenErr );
								}else{
										tipErr( $(this),"","none");
								}
						}else{
								tipErr( $(this), password_empty );
						}
				})//end 密码检测
				//表单验证 End -------------------------------------------------
				
				//登录错误提示
				function tipErr(obj,text,display){
						var display = display ? display : "block";
						obj.parent("div").next("div.login-form-tip").html(text).css({"display":display,"color": "#c00" });
						
				}
				
				//表单提交 -----------------------------------------------------
				var successTip = this.successTip;
				var tipContent = this.tipContent;
				
				/*ajax登录*/ 
				$("#J_LoginForm").ajaxForm({ 
						beforeSubmit:loginRequest,
						success:function(responseText,statusText){ 
								//隐藏loading
								$loading.hide();
								if( responseText == "用户名不存在"){
										tipErr( $username , username_err );
										$username.focus().select();
										return false;
								} 
								if( responseText == "密码错误"){
										tipErr( $password , password_err );
										$password.focus().select();
										return false;
								}
								
								//改变登录后状态
								CheckLogin();
								
								//提示登录成功 --------------------
								var loginSuccessTip = new SubmitSuccessTip({
										title : "登录成功",
										content : tipContent,
										height : 210
								})
								loginSuccessTip.show();
								
						}//end success:function
				});//end ajaxForm 
				//提交前验证
				function loginRequest(formData, jqForm, options) { 	
						//账号
						var usernameVal = $username.val();
						if(  usernameVal.length > 0 ){
								tipErr( $(this) , "" , "none" );
						}else{
								tipErr( $username , username_empty );
								$username.focus().select();
								return false;
						}
						//密码
						var len = $password.val().length;//获取密码长度
						if( len > 0 ){
								if( len < 6 || len > 16 ){//密码长度不能小于6，大于16
										tipErr( $password, password_lenErr );
										$password.focus().select();
										return false;
								}else{
										tipErr( $password,"","none");
								}
						}else{
								tipErr( $password, password_empty );
								$password.focus().select();
								return false;
						}
						//显示loading
						$loading.show();
						
						var queryString = $.param(formData); 
						return true;
				}
		}
}

//定义表单提交成功后执行的操作
function SubmitSuccessTip( options ){
		this.title = options.title;
		this.content = options.content || "";
		this.height = options.height || 240;
		this.timeOut = options.timeOut || 1600;
}
SubmitSuccessTip.prototype = {
		show : function(){
				var successTip_dom = '';
					successTip_dom += '<div class="success-tip">';
					successTip_dom += '		<h3 class="tip-title">'+ this.title +'</h3>';
					successTip_dom += '		<div class="tip-content">'+ this.content +'</div>';
					successTip_dom += '</div>';
					
				var timeOut = this.timeOut;
				var $dialog_bd = $("div.dialog-bd");
					$dialog_bd.hide();//隐藏原有元素
				$(".blockPage").animate({ "height": this.height + "px" },300,function(){
						//提示报名成功 ---------------
						$dialog_bd.html( successTip_dom ).show();
						//移除对话框 ----------------
						setTimeout(function(){ $.unblockUI(); },timeOut);
				});
		}
}

//FormTip，显示时4种状态，值为空：empty，错误：err，正确：ok，正常：normal(显示默认的提示)	
function FormTip(obj,text){
		this.obj = obj;
		this.target = this.obj.parent("div").next("div");
		this.text = text || this.target.html() ;
}
FormTip.prototype = {
		constructor : FormTip,
		show : function(state){
				switch (state) {
						case "empty" :
							var tipColor = "#c00";
							var label_text = this.obj.siblings("label").text(); //获取label值
								this.text = "请输入"+label_text.slice(0,label_text.length-1);//提示文本，去掉label最后的":"
						case "err" :
								var tipColor = "#c00";
								break;
						case "ok" :
								var tipColor = "#090";
								break;
						case "normal" :
								var tipColor = "#999";
								break;
				}
				this.target.html( this.text ).css({"display":"block","color": tipColor });
		},
		hide : function(){
				this.target.css("display","none");
		}
}

// 页面插入广告系统广告
function openX_ad(posterid, htmlid, width, height) {
	if ($(htmlid).length > 0) {
		var randomnumber = Math.random();
		var ga = document.createElement('iframe');
		ga.src = 'http://www1.elecfans.com/www/delivery/myafr.php?target=_blank&cb=' + randomnumber + '&zoneid=' + posterid;
		ga.width = width;
		ga.height = height;
		ga.frameBorder = 0;
		ga.scrolling = 'no';
		var s = $(htmlid).append(ga);
	}
}





//插件--------------------------------------------------------------------------------------------------------------------------------------
/*!
 * jQuery Form Plugin
 * version: 2.87 (20-OCT-2011)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
 
;(function($){$.fn.ajaxSubmit=function(options){if(!this.length){log('ajaxSubmit: skipping submit process - no element selected');return this;}
var method,action,url,$form=this;if(typeof options=='function'){options={success:options};}
method=this.attr('method');action=this.attr('action');url=(typeof action==='string')?$.trim(action):'';url=url||window.location.href||'';if(url){url=(url.match(/^([^#]+)/)||[])[1];}
options=$.extend(true,{url:url,success:$.ajaxSettings.success,type:method||'GET',iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank'},options);var veto={};this.trigger('form-pre-serialize',[this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;}
if(options.beforeSerialize&&options.beforeSerialize(this,options)===false){log('ajaxSubmit: submit aborted via beforeSerialize callback');return this;}
var traditional=options.traditional;if(traditional===undefined){traditional=$.ajaxSettings.traditional;}
var qx,n,v,a=this.formToArray(options.semantic);if(options.data){options.extraData=options.data;qx=$.param(options.data,traditional);}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){log('ajaxSubmit: submit aborted via beforeSubmit callback');return this;}
this.trigger('form-submit-validate',[a,this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;}
var q=$.param(a,traditional);if(qx)
q=(q?(q+'&'+qx):qx);if(options.type.toUpperCase()=='GET'){options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;options.data=null;}
else{options.data=q;}
var callbacks=[];if(options.resetForm){callbacks.push(function(){$form.resetForm();});}
if(options.clearForm){callbacks.push(function(){$form.clearForm(options.includeHidden);});}
if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){var fn=options.replaceTarget?'replaceWith':'html';$(options.target)[fn](data).each(oldSuccess,arguments);});}
else if(options.success){callbacks.push(options.success);}
options.success=function(data,status,xhr){var context=options.context||options;for(var i=0,max=callbacks.length;i<max;i++){callbacks[i].apply(context,[data,status,xhr||$form,$form]);}};var fileInputs=$('input:file',this).length>0;var mp='multipart/form-data';var multipart=($form.attr('enctype')==mp||$form.attr('encoding')==mp);if(options.iframe!==false&&(fileInputs||options.iframe||multipart)){if(options.closeKeepAlive){$.get(options.closeKeepAlive,function(){fileUpload(a);});}
else{fileUpload(a);}}
else{if($.browser.msie&&method=='get'&&typeof options.type==="undefined"){var ieMeth=$form[0].getAttribute('method');if(typeof ieMeth==='string')
options.type=ieMeth;}
$.ajax(options);}
this.trigger('form-submit-notify',[this,options]);return this;function fileUpload(a){var form=$form[0],el,i,s,g,id,$io,io,xhr,sub,n,timedOut,timeoutHandle;var useProp=!!$.fn.prop;if(a){if(useProp){for(i=0;i<a.length;i++){el=$(form[a[i].name]);el.prop('disabled',false);}}else{for(i=0;i<a.length;i++){el=$(form[a[i].name]);el.removeAttr('disabled');}};}
if($(':input[name=submit],:input[id=submit]',form).length){alert('Error: Form elements must not have name or id of "submit".');return;}
s=$.extend(true,{},$.ajaxSettings,options);s.context=s.context||s;id='jqFormIO'+(new Date().getTime());if(s.iframeTarget){$io=$(s.iframeTarget);n=$io.attr('name');if(n==null)
$io.attr('name',id);else
id=n;}
else{$io=$('<iframe name="'+id+'" src="'+s.iframeSrc+'" />');$io.css({position:'absolute',top:'-1000px',left:'-1000px'});}
io=$io[0];xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(status){var e=(status==='timeout'?'timeout':'aborted');log('aborting upload... '+e);this.aborted=1;$io.attr('src',s.iframeSrc);xhr.error=e;s.error&&s.error.call(s.context,xhr,e,status);g&&$.event.trigger("ajaxError",[xhr,s,e]);s.complete&&s.complete.call(s.context,xhr,e);}};g=s.global;if(g&&!$.active++){$.event.trigger("ajaxStart");}
if(g){$.event.trigger("ajaxSend",[xhr,s]);}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){if(s.global){$.active--;}
return;}
if(xhr.aborted){return;}
sub=form.clk;if(sub){n=sub.name;if(n&&!sub.disabled){s.extraData=s.extraData||{};s.extraData[n]=sub.value;if(sub.type=="image"){s.extraData[n+'.x']=form.clk_x;s.extraData[n+'.y']=form.clk_y;}}}
var CLIENT_TIMEOUT_ABORT=1;var SERVER_ABORT=2;function getDoc(frame){var doc=frame.contentWindow?frame.contentWindow.document:frame.contentDocument?frame.contentDocument:frame.document;return doc;}
function doSubmit(){var t=$form.attr('target'),a=$form.attr('action');form.setAttribute('target',id);if(!method){form.setAttribute('method','POST');}
if(a!=s.url){form.setAttribute('action',s.url);}
if(!s.skipEncodingOverride&&(!method||/post/i.test(method))){$form.attr({encoding:'multipart/form-data',enctype:'multipart/form-data'});}
if(s.timeout){timeoutHandle=setTimeout(function(){timedOut=true;cb(CLIENT_TIMEOUT_ABORT);},s.timeout);}
function checkState(){try{var state=getDoc(io).readyState;log('state = '+state);if(state.toLowerCase()=='uninitialized')
setTimeout(checkState,50);}
catch(e){log('Server abort: ',e,' (',e.name,')');cb(SERVER_ABORT);timeoutHandle&&clearTimeout(timeoutHandle);timeoutHandle=undefined;}}
var extraInputs=[];try{if(s.extraData){for(var n in s.extraData){extraInputs.push($('<input type="hidden" name="'+n+'" />').attr('value',s.extraData[n]).appendTo(form)[0]);}}
if(!s.iframeTarget){$io.appendTo('body');io.attachEvent?io.attachEvent('onload',cb):io.addEventListener('load',cb,false);}
setTimeout(checkState,15);form.submit();}
finally{form.setAttribute('action',a);if(t){form.setAttribute('target',t);}else{$form.removeAttr('target');}
$(extraInputs).remove();}}
if(s.forceSync){doSubmit();}
else{setTimeout(doSubmit,10);}
var data,doc,domCheckCount=50,callbackProcessed;function cb(e){if(xhr.aborted||callbackProcessed){return;}
try{doc=getDoc(io);}
catch(ex){log('cannot access response document: ',ex);e=SERVER_ABORT;}
if(e===CLIENT_TIMEOUT_ABORT&&xhr){xhr.abort('timeout');return;}
else if(e==SERVER_ABORT&&xhr){xhr.abort('server abort');return;}
if(!doc||doc.location.href==s.iframeSrc){if(!timedOut)
return;}
io.detachEvent?io.detachEvent('onload',cb):io.removeEventListener('load',cb,false);var status='success',errMsg;try{if(timedOut){throw'timeout';}
var isXml=s.dataType=='xml'||doc.XMLDocument||$.isXMLDoc(doc);log('isXml='+isXml);if(!isXml&&window.opera&&(doc.body==null||doc.body.innerHTML=='')){if(--domCheckCount){log('requeing onLoad callback, DOM not available');setTimeout(cb,250);return;}}
var docRoot=doc.body?doc.body:doc.documentElement;xhr.responseText=docRoot?docRoot.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(isXml)
s.dataType='xml';xhr.getResponseHeader=function(header){var headers={'content-type':s.dataType};return headers[header];};if(docRoot){xhr.status=Number(docRoot.getAttribute('status'))||xhr.status;xhr.statusText=docRoot.getAttribute('statusText')||xhr.statusText;}
var dt=(s.dataType||'').toLowerCase();var scr=/(json|script|text)/.test(dt);if(scr||s.textarea){var ta=doc.getElementsByTagName('textarea')[0];if(ta){xhr.responseText=ta.value;xhr.status=Number(ta.getAttribute('status'))||xhr.status;xhr.statusText=ta.getAttribute('statusText')||xhr.statusText;}
else if(scr){var pre=doc.getElementsByTagName('pre')[0];var b=doc.getElementsByTagName('body')[0];if(pre){xhr.responseText=pre.textContent?pre.textContent:pre.innerText;}
else if(b){xhr.responseText=b.textContent?b.textContent:b.innerText;}}}
else if(dt=='xml'&&!xhr.responseXML&&xhr.responseText!=null){xhr.responseXML=toXml(xhr.responseText);}
try{data=httpData(xhr,dt,s);}
catch(e){status='parsererror';xhr.error=errMsg=(e||status);}}
catch(e){log('error caught: ',e);status='error';xhr.error=errMsg=(e||status);}
if(xhr.aborted){log('upload aborted');status=null;}
if(xhr.status){status=(xhr.status>=200&&xhr.status<300||xhr.status===304)?'success':'error';}
if(status==='success'){s.success&&s.success.call(s.context,data,'success',xhr);g&&$.event.trigger("ajaxSuccess",[xhr,s]);}
else if(status){if(errMsg==undefined)
errMsg=xhr.statusText;s.error&&s.error.call(s.context,xhr,status,errMsg);g&&$.event.trigger("ajaxError",[xhr,s,errMsg]);}
g&&$.event.trigger("ajaxComplete",[xhr,s]);if(g&&!--$.active){$.event.trigger("ajaxStop");}
s.complete&&s.complete.call(s.context,xhr,status);callbackProcessed=true;if(s.timeout)
clearTimeout(timeoutHandle);setTimeout(function(){if(!s.iframeTarget)
$io.remove();xhr.responseXML=null;},100);}
var toXml=$.parseXML||function(s,doc){if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else{doc=(new DOMParser()).parseFromString(s,'text/xml');}
return(doc&&doc.documentElement&&doc.documentElement.nodeName!='parsererror')?doc:null;};var parseJSON=$.parseJSON||function(s){return window['eval']('('+s+')');};var httpData=function(xhr,type,s){var ct=xhr.getResponseHeader('content-type')||'',xml=type==='xml'||!type&&ct.indexOf('xml')>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.nodeName==='parsererror'){$.error&&$.error('parsererror');}
if(s&&s.dataFilter){data=s.dataFilter(data,type);}
if(typeof data==='string'){if(type==='json'||!type&&ct.indexOf('json')>=0){data=parseJSON(data);}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){$.globalEval(data);}}
return data;};}};$.fn.ajaxForm=function(options){if(this.length===0){var o={s:this.selector,c:this.context};if(!$.isReady&&o.s){log('DOM not ready, queuing ajaxForm');$(function(){$(o.s,o.c).ajaxForm(options);});return this;}
log('terminating; zero elements found by selector'+($.isReady?'':' (DOM not ready)'));return this;}
return this.ajaxFormUnbind().bind('submit.form-plugin',function(e){if(!e.isDefaultPrevented()){e.preventDefault();$(this).ajaxSubmit(options);}}).bind('click.form-plugin',function(e){var target=e.target;var $el=$(target);if(!($el.is(":submit,input:image"))){var t=$el.closest(':submit');if(t.length==0){return;}
target=t[0];}
var form=this;form.clk=target;if(target.type=='image'){if(e.offsetX!=undefined){form.clk_x=e.offsetX;form.clk_y=e.offsetY;}else if(typeof $.fn.offset=='function'){var offset=$el.offset();form.clk_x=e.pageX-offset.left;form.clk_y=e.pageY-offset.top;}else{form.clk_x=e.pageX-target.offsetLeft;form.clk_y=e.pageY-target.offsetTop;}}
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null;},100);});};$.fn.ajaxFormUnbind=function(){return this.unbind('submit.form-plugin click.form-plugin');};$.fn.formToArray=function(semantic){var a=[];if(this.length===0){return a;}
var form=this[0];var els=semantic?form.getElementsByTagName('*'):form.elements;if(!els){return a;}
var i,j,n,v,el,max,jmax;for(i=0,max=els.length;i<max;i++){el=els[i];n=el.name;if(!n){continue;}
if(semantic&&form.clk&&el.type=="image"){if(!el.disabled&&form.clk==el){a.push({name:n,value:$(el).val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
continue;}
v=$.fieldValue(el,true);if(v&&v.constructor==Array){for(j=0,jmax=v.length;j<jmax;j++){a.push({name:n,value:v[j]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:n,value:v});}}
if(!semantic&&form.clk){var $input=$(form.clk),input=$input[0];n=input.name;if(n&&!input.disabled&&input.type=='image'){a.push({name:n,value:$input.val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}}
return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n){return;}
var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++){a.push({name:n,value:v[i]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:this.name,value:v});}});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length)){continue;}
v.constructor==Array?$.merge(val,v):val.push(v);}
return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(successful===undefined){successful=true;}
if(successful&&(!n||el.disabled||t=='reset'||t=='button'||(t=='checkbox'||t=='radio')&&!el.checked||(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||tag=='select'&&el.selectedIndex==-1)){return null;}
if(tag=='select'){var index=el.selectedIndex;if(index<0){return null;}
var a=[],ops=el.options;var one=(t=='select-one');var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=op.value;if(!v){v=(op.attributes&&op.attributes['value']&&!(op.attributes['value'].specified))?op.text:op.value;}
if(one){return v;}
a.push(v);}}
return a;}
return $(el).val();};$.fn.clearForm=function(includeHidden){return this.each(function(){$('input,select,textarea',this).clearFields(includeHidden);});};$.fn.clearFields=$.fn.clearInputs=function(includeHidden){var re=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(re.test(t)||tag=='textarea'||(includeHidden&&/hidden/.test(t))){this.value='';}
else if(t=='checkbox'||t=='radio'){this.checked=false;}
else if(tag=='select'){this.selectedIndex=-1;}});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType)){this.reset();}});};$.fn.enable=function(b){if(b===undefined){b=true;}
return this.each(function(){this.disabled=!b;});};$.fn.selected=function(select){if(select===undefined){select=true;}
return this.each(function(){var t=this.type;if(t=='checkbox'||t=='radio'){this.checked=select;}
else if(this.tagName.toLowerCase()=='option'){var $sel=$(this).parent('select');if(select&&$sel[0]&&$sel[0].type=='select-one'){$sel.find('option').selected(false);}
this.selected=select;}});};$.fn.ajaxSubmit.debug=false;function log(){if(!$.fn.ajaxSubmit.debug)
return;var msg='[jquery.form] '+Array.prototype.join.call(arguments,'');if(window.console&&window.console.log){window.console.log(msg);}
else if(window.opera&&window.opera.postError){window.opera.postError(msg);}};})(jQuery);


/*!
 * jQuery blockUI plugin
 * Version 2.39 (23-MAY-2011)
 * //@requires jQuery v1.2.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2010 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

;(function($){if(/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery)||/^1.1/.test($.fn.jquery)){alert('blockUI requires jQuery v1.2.3 or later!  You are using v'+$.fn.jquery);return}$.fn._fadeIn=$.fn.fadeIn;var noOp=function(){};var mode=document.documentMode||0;var setExpr=$.browser.msie&&(($.browser.version<8&&!mode)||mode<8);var ie6=$.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!mode;$.blockUI=function(opts){install(window,opts)};$.unblockUI=function(opts){remove(window,opts)};$.growlUI=function(title,message,timeout,onClose){var $m=$('<div class="growlUI"></div>');if(title)$m.append('<h1>'+title+'</h1>');if(message)$m.append('<h2>'+message+'</h2>');if(timeout==undefined)timeout=3000;$.blockUI({message:$m,fadeIn:700,fadeOut:1000,centerY:false,timeout:timeout,showOverlay:false,onUnblock:onClose,css:$.blockUI.defaults.growlCSS})};$.fn.block=function(opts){return this.unblock({fadeOut:0}).each(function(){if($.css(this,'position')=='static')this.style.position='relative';if($.browser.msie)this.style.zoom=1;install(this,opts)})};$.fn.unblock=function(opts){return this.each(function(){remove(this,opts)})};$.blockUI.version=2.39;$.blockUI.defaults={message:'<h1>Please wait...</h1>',title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:'30%',top:'40%',left:'35%',textAlign:'center',color:'#000',border:'3px solid #aaa',backgroundColor:'#fff',cursor:'wait'},themedCSS:{width:'30%',top:'40%',left:'35%'},overlayCSS:{backgroundColor:'#000',opacity:0.6,cursor:'wait'},growlCSS:{width:'350px',top:'10px',left:'',right:'10px',border:'none',padding:'5px',opacity:0.6,cursor:'default',color:'#fff',backgroundColor:'#000','-webkit-border-radius':'10px','-moz-border-radius':'10px','border-radius':'10px'},iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank',forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onBlock:null,onUnblock:null,quirksmodeOffsetHack:4,blockMsgClass:'blockMsg'};var pageBlock=null;var pageBlockEls=[];function install(el,opts){var full=(el==window);var msg=opts&&opts.message!==undefined?opts.message:undefined;opts=$.extend({},$.blockUI.defaults,opts||{});opts.overlayCSS=$.extend({},$.blockUI.defaults.overlayCSS,opts.overlayCSS||{});var css=$.extend({},$.blockUI.defaults.css,opts.css||{});var themedCSS=$.extend({},$.blockUI.defaults.themedCSS,opts.themedCSS||{});msg=msg===undefined?opts.message:msg;if(full&&pageBlock)remove(window,{fadeOut:0});if(msg&&typeof msg!='string'&&(msg.parentNode||msg.jquery)){var node=msg.jquery?msg[0]:msg;var data={};$(el).data('blockUI.history',data);data.el=node;data.parent=node.parentNode;data.display=node.style.display;data.position=node.style.position;if(data.parent)data.parent.removeChild(node)}$(el).data('blockUI.onUnblock',opts.onUnblock);var z=opts.baseZ;var lyr1=($.browser.msie||opts.forceIframe)?$('<iframe class="blockUI" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>'):$('<div class="blockUI" style="display:none"></div>');var lyr2=opts.theme?$('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+(z++)+';display:none"></div>'):$('<div class="blockUI blockOverlay" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');var lyr3,s;if(opts.theme&&full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:fixed">'+'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>'+'<div class="ui-widget-content ui-dialog-content"></div>'+'</div>'}else if(opts.theme){s='<div class="blockUI '+opts.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:absolute">'+'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>'+'<div class="ui-widget-content ui-dialog-content"></div>'+'</div>'}else if(full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage" style="z-index:'+(z+10)+';display:none;position:fixed"></div>'}else{s='<div class="blockUI '+opts.blockMsgClass+' blockElement" style="z-index:'+(z+10)+';display:none;position:absolute"></div>'}lyr3=$(s);if(msg){if(opts.theme){lyr3.css(themedCSS);lyr3.addClass('ui-widget-content')}else lyr3.css(css)}if(!opts.theme&&(!opts.applyPlatformOpacityRules||!($.browser.mozilla&&/Linux/.test(navigator.platform))))lyr2.css(opts.overlayCSS);lyr2.css('position',full?'fixed':'absolute');if($.browser.msie||opts.forceIframe)lyr1.css('opacity',0.0);var layers=[lyr1,lyr2,lyr3],$par=full?$('body'):$(el);$.each(layers,function(){this.appendTo($par)});if(opts.theme&&opts.draggable&&$.fn.draggable){lyr3.draggable({handle:'.ui-dialog-titlebar',cancel:'li'})}var expr=setExpr&&(!$.boxModel||$('object,embed',full?null:el).length>0);if(ie6||expr){if(full&&opts.allowBodyStretch&&$.boxModel)$('html,body').css('height','100%');if((ie6||!$.boxModel)&&!full){var t=sz(el,'borderTopWidth'),l=sz(el,'borderLeftWidth');var fixT=t?'(0 - '+t+')':0;var fixL=l?'(0 - '+l+')':0}$.each([lyr1,lyr2,lyr3],function(i,o){var s=o[0].style;s.position='absolute';if(i<2){full?s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"'):s.setExpression('height','this.parentNode.offsetHeight + "px"');full?s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):s.setExpression('width','this.parentNode.offsetWidth + "px"');if(fixL)s.setExpression('left',fixL);if(fixT)s.setExpression('top',fixT)}else if(opts.centerY){if(full)s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');s.marginTop=0}else if(!opts.centerY&&full){var top=(opts.css&&opts.css.top)?parseInt(opts.css.top):0;var expression='((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';s.setExpression('top',expression)}})}if(msg){if(opts.theme)lyr3.find('.ui-widget-content').append(msg);else lyr3.append(msg);if(msg.jquery||msg.nodeType)$(msg).show()}if(($.browser.msie||opts.forceIframe)&&opts.showOverlay)lyr1.show();if(opts.fadeIn){var cb=opts.onBlock?opts.onBlock:noOp;var cb1=(opts.showOverlay&&!msg)?cb:noOp;var cb2=msg?cb:noOp;if(opts.showOverlay)lyr2._fadeIn(opts.fadeIn,cb1);if(msg)lyr3._fadeIn(opts.fadeIn,cb2)}else{if(opts.showOverlay)lyr2.show();if(msg)lyr3.show();if(opts.onBlock)opts.onBlock()}bind(1,el,opts);if(full){pageBlock=lyr3[0];pageBlockEls=$(':input:enabled:visible',pageBlock);if(opts.focusInput)setTimeout(focus,20)}else center(lyr3[0],opts.centerX,opts.centerY);if(opts.timeout){var to=setTimeout(function(){full?$.unblockUI(opts):$(el).unblock(opts)},opts.timeout);$(el).data('blockUI.timeout',to)}};function remove(el,opts){var full=(el==window);var $el=$(el);var data=$el.data('blockUI.history');var to=$el.data('blockUI.timeout');if(to){clearTimeout(to);$el.removeData('blockUI.timeout')}opts=$.extend({},$.blockUI.defaults,opts||{});bind(0,el,opts);if(opts.onUnblock===null){opts.onUnblock=$el.data('blockUI.onUnblock');$el.removeData('blockUI.onUnblock')}var els;if(full)els=$('body').children().filter('.blockUI').add('body > .blockUI');else els=$('.blockUI',el);if(full)pageBlock=pageBlockEls=null;if(opts.fadeOut){els.fadeOut(opts.fadeOut);setTimeout(function(){reset(els,data,opts,el)},opts.fadeOut)}else reset(els,data,opts,el)};function reset(els,data,opts,el){els.each(function(i,o){if(this.parentNode)this.parentNode.removeChild(this)});if(data&&data.el){data.el.style.display=data.display;data.el.style.position=data.position;if(data.parent)data.parent.appendChild(data.el);$(el).removeData('blockUI.history')}if(typeof opts.onUnblock=='function')opts.onUnblock(el,opts)};function bind(b,el,opts){var full=el==window,$el=$(el);if(!b&&(full&&!pageBlock||!full&&!$el.data('blockUI.isBlocked')))return;if(!full)$el.data('blockUI.isBlocked',b);if(!opts.bindEvents||(b&&!opts.showOverlay))return;var events='mousedown mouseup keydown keypress';b?$(document).bind(events,opts,handler):$(document).unbind(events,handler)};function handler(e){if(e.keyCode&&e.keyCode==9){if(pageBlock&&e.data.constrainTabKey){var els=pageBlockEls;var fwd=!e.shiftKey&&e.target===els[els.length-1];var back=e.shiftKey&&e.target===els[0];if(fwd||back){setTimeout(function(){focus(back)},10);return false}}}var opts=e.data;if($(e.target).parents('div.'+opts.blockMsgClass).length>0)return true;return $(e.target).parents().children().filter('div.blockUI').length==0};function focus(back){if(!pageBlockEls)return;var e=pageBlockEls[back===true?pageBlockEls.length-1:0];if(e)e.focus()};function center(el,x,y){var p=el.parentNode,s=el.style;var l=((p.offsetWidth-el.offsetWidth)/2)-sz(p,'borderLeftWidth');var t=((p.offsetHeight-el.offsetHeight)/2)-sz(p,'borderTopWidth');if(x)s.left=l>0?(l+'px'):'0';if(y)s.top=t>0?(t+'px'):'0'};function sz(el,p){return parseInt($.css(el,p))||0}})(jQuery);


//修改blockUI默认样式
$.blockUI.defaults.css = {
		padding:	0,
		margin:		0,
		width:		"30%",
		top:		"50%",
		left:		"50%",
		color:		"#000",
		border:		"3px solid #2a78b4",
		borderRadius:"5px",
		cursor:		"default"
};
$.blockUI.defaults.overlayCSS = {
		backgroundColor: "#333",
		opacity:	  	 0.3,
		cursor:		  	 "default"
};
$.blockUI.defaults.fadeIn = 400;
$.blockUI.defaults.fadeOut= 600;

/*!
 * jQuery.mouseDelay.js v1.2
 * http://www.planeart.cn/?p=1073
 * Copyright 2011, TangBin
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function($,g){var h={},id=1,etid=g+'ETID';$.fn[g]=function(e,f){id++;f=f||this.data(etid)||id;e=e||150;if(f===id)this.data(etid,f);this._hover=this.hover;this.hover=function(c,d){c=c||$.noop;d=d||$.noop;this._hover(function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){c.call(b,a)},e)},function(a){var b=this;clearTimeout(h[f]);h[f]=setTimeout(function(){d.call(b,a)},e)});return this};return this};$.fn[g+'Pause']=function(){clearTimeout(this.data(etid));return this};$[g]={get:function(){return id++},pause:function(a){clearTimeout(h[a])}}})(jQuery,'mouseDelay');


//百度 2012.05.04 by linan
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F4dbddc73fd0fe464304ba8ad95cbc96e' type='text/javascript'%3E%3C/script%3E"));

//谷歌 2012.05.04 by linan
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-25599667-1']);
  _gaq.push(['_setDomainName', 'elecfans.com']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
