function chanel_poster(){
	baidu_m(532562,'#headJf',950,90);
}
function baidu_m(posterid,htmlid,width,height){
	$(htmlid).html('<iframe src="http://skin.elecfans.com/baidu_m.html?id='+posterid+'" width="'+width+'" height="'+height+'" scrolling="no" frameborder="0" style="display:block;margin:0"></iframe>');
}
$(function(){//document.ready
		//下载地址右边添加PCB打样广告 
		// var pcb_ad = '<a href="http://www.elecfans.com/adstat-20.html" class="pcb_ad_btn">PCB打样</a>';
		// $("#goDown").after( pcb_ad );
		chanel_poster();
		
		////add by liuping 2014年8月29日 在下载地址下面添加PCB广告
		var pcb_ad = '';
			pcb_ad += '<div class="pcb_ad yahei group">';
			pcb_ad += '		<div class="pcb_ad_title">本站推荐</div>';
			pcb_ad += '		<div class="pcb_ad_content" >';
			pcb_ad += '			<a href="http://www.hqpcb.com/online.html?tid=30" target="_blank" title="PCB打样、PCB加工、PCB抄板，首选华强PCB！" style="color:#000;">';
			pcb_ad += '					<strong>PCB打样、PCB加工、PCB抄板，首选华强PCB！</strong>';
			pcb_ad += '					<span>最快48小时交货，<img src="/images/pcb_ad.gif?v=1.0" alt="PCB打样、PCB加工、PCB抄板，首选华强PCB！" style="vertical-align:middle;"></span>';
			pcb_ad += '			</a>';
			pcb_ad += '		</div>';
			pcb_ad += '</div>';
		$('#dataIntro').before(pcb_ad);
		$('#downUrl').after('<div><a href="http://www.hqpcb.com/pcbjishu/?tid=30" target="_blank" title="华强PCB技术中心，海量PCB软件教程下载！" style="font-size:14px;color:#000000;font-weight:bold;text-decoration:underline;">海量PCB软件教程下载 <img src="/images/pcb_ad_arrow.gif" alt="华强PCB技术中心，海量PCB软件教程下载！" style="vertical-align:middle;"></a></div>');

		//获取收藏数，评论数，下载次数-----------------------------------------------------------
		function GetNum(){
				$.get('/plus/arcInfo.php?dopost=infonum&aid='+webID,function(data){
						var num = eval('('+ data +')');
						$(".downTimes").html( num.downnum );//下载次数
						$("#stowcount").html( num.stownum );//收藏数
						$("#cmtNum-pageTop span").html( num.replynum );//评论数量：上
						//评论数量：下
						var totalComment = '<a href="/plus/feedback.php?aid='+webID+'" target="_blank">查看全部<span class="grey9">'+num.replynum+'</span>条评论</a><div class="orgTip-r-e"></div>';
						$("#userComment").find('.orgTip').html(totalComment);
				});
		}
		GetNum();

		
		//滚动到下载地址，用户评论---------------------------------------------------------------
		windowScroll("#cmtNum-pageTop","#userComment");//评论
		windowScroll("#goDown","#downUrl-box");//下载地址
		
		// 2015-04-10 增加vip下载
		$("#goDown").text("普通下载").parent().addClass("text-hide-cover");
		$('<a href="#downUrl-box" id="vipDown">VIP下载</a>').insertAfter("#goDown");
		$("#df-btnDown").text("电信下载").next().text("联通下载");
		// 点击VIP下载
		$("#downInfo-bd").on("click", "#vipDown", function(e) {
			var aid = "";
			var content  = '';
			e.preventDefault();
			if ($("#topLogout").css("display") !== "none") {
				// 未登录
				var dialog = new Dialog({});
				dialog.newLogin();
				return false;
			}else{
				// 请求后台查询用户状态
				aid = $("#df-btnDown").attr("href");
				if(aid === undefined){
					return false;
				}
				aid = aid.substr(aid.indexOf("&id=") + 4);
				aid = aid.substr(0, aid.indexOf('&'));
				$.post('/plus/arcInfo.php', {'aid' : aid, 'dopost' : 'vipchannel'}, function(data){
					if(data.code === 4){
						// 下载提示框
						content +='<div class="downtip">';
						content +='	<div class="downtip-hd">' + $("h1").html() + '</div>';
						content +='	<div class="downtip-bd">';
						content +='	<p><span class="mr10">您会员截至日期：<em class="vip-dwnred">' + data.data.endoftime + '</em></span> <span class="ml10">剩余下载次数：<em class="vip-dwnred">' + data.data.available + '</em>次</span></p>';
						content +='	</div>';
						content += '<div class="downtip-vipft"><a href="' + $("#df-btnDown").attr("href").replace("open=2", "open=3") + '" id="dialog-vipDown">VIP免积分下载</a></div>';
						content += '<div clsss="downtip-bd">我同意本站“<a href="/help/download-protocol.html" target="_blank" class="blue">资料下载协议</a>”。评论将有机会获得返分!</div>';
						content +='</div>';
						var dialog = new Dialog({
							title: 'VIP下载'
						});
						dialog.pop();
						dialog.showCustom("VIP下载",content,350,220);
						$("#J_DialogContent").on('click','#dialog-vipDown',function(){
								setTimeout( function(){ $(".close-dialog").click(); },1000);
						});
					}else if(data.code === 2){
						// 弹窗提示开通vip
						content += '<p class="charn-tips">实时开通VIP会员特权，免积分下载资料！</p>';
						content += '<p class="charn-tips"><a  class="recharge-vip" href="/vipdownload/pay"  target="_blank">立即开通</a><a class="recharge-not" href="javascript:void(0);">暂不开通</a></p>'
						var dialog = new Dialog({
							title: '提示'
						})
						dialog.pop()
						dialog.showCustom("",content,350,200)
						$("#J_DialogContent").on('click','.recharge-vip, .recharge-not',function(e){
							if($(e.target).attr('class') === 'recharge-vip'){
								setTimeout(function(){$(".close-dialog").click();}, 1000);
							}else{
								$(".close-dialog").click();
							}
						});
					}else if(data.code === 3){
						// vip失效、提示充值
						content +='<div class="downtip">';
						content +='<p id="num-error-tip">您的VIP已失效！</p>';
						content +='	<div class="downtip-hd">' + $("h1").html() + '</div>';
						content +='	<div class="downtip-bd">';
						content +='	<p><span class="mr10">您会员截至日期：<em class="vip-dwnred">' + data.data.endoftime + '</em></span> <span class="ml10">剩余下载次数：<em class="vip-dwnred">0</em>次</span></p>';
						content +='	</div>';
						content += '<div class="downtip-ft"><a href="/vipdownload/pay" id="needvip" target="_blank">VIP充值</a><a href="/member/upload.php" class="upfilefornum" target="_blank">上传资料赚取积分</a></div>';
						content += '<div class="downtip-bd">我同意本站“<a href="/help/download-protocol.html" target="_blank" class="blue">资料下载协议</a>”。评论将有机会获得返分!</div>';
						content +='</div>';
						var dialog = new Dialog({
								title : '下载'
							});
						dialog.pop();
						dialog.showCustom("下载资料",content,350,220);
						$("#J_DialogContent").on('click','#needvip',function(){
								setTimeout( function(){ $(".close-dialog").click(); },1000);
						});
					}else if(data.code === 5){
						var dialog = new Dialog({
							title: '登录'
						});
						dialog.pop();
						dialog.showLogin();
						return false;
					}else{
						// 错误提示
						alert(data.msg);
					}
				}, "json");
			}
		});
		//----------------- 2015-04-10 ----------------end
		
//下载-----------------------------------------------------------------------------------
//		var $btnDown = $(".btnDown");
//		$btnDown.on('click',function(){
//				var url = '/plus/arcInfo.php?dopost=download&aid='+webID;
//				$.get(url,function(data){
//						//未登录 ---------------
//						if( data.status == "logout" ){
//								//弹出登陆框
//								var loginTitle = '下载请先登录 <span>(<a href="'+regUrl+'" class="grey9" target="_blank">还没有注册？</a>)</span>';
//								var loginDialog = new LoginDialog({
//									title : loginTitle,
//									tipContent : "请再次点击下载按钮"
//								});
//								loginDialog.pop();
//								return false;
//						}
//						//可以正常下载---------------
//						var jifen = $("#J_Jifen").html();
//						if( data.status == "download" ){
//								var downlink = $btnDown.attr('href');
//								var title = $("h1").html();
//								var size = $("#J_DataSize").html();
//								var content = '';
//									content +='<div class="downtip">';
//									content +='		<div class="downtip-hd">'+title+'</div>';
//								    content += '	<div class="downtip-ft"><a href="'+ downlink +'" class="btn" id="dialog-btnDown">下载</a></div>';
//									content +='</div>';
//									
//								var dialog = new Dialog({
//										title : "下载资料",
//										width : 350,
//										height: 200,
//										content : content
//								});
//								dialog.show();
//								$("#dialog-btnDown").on('click',function(){
//										setTimeout( function(){ $(".close-dialog").click(); },400);
//								});
//								return false;
//						}
//						//积分不够---------------
//						if( data.status == "failed"){
//								var content = '';
//									content +='<div class="downfail">';
//									content +='		<div class="downfail-hd">';
//									content +='			<p class="f14 lh180">下载此文档需消耗 '+jifen+' 个积分</p>';
//									content +='			<p class="red">您当前的财富值为 '+data.myjifen+'，不足以支付下载此文档哦!</p>';
//									content +='		</div>';
//									content +='		<div class="downfail-bd">';
//									content +='			<p class="f14">您可以通过以下几种途径获取财富值：</p>';
//									content +='				<p>1.<a href="/member/upload-sz.php" class="blue">上传资料</a></p>';
//									content +='				<p>2.评价资料</p>';
//									content +='				<p>3.<a href="/" class="blue">在社区互动</a><span class="grey9">(每日登陆，发表日志，参与投票等...)</span></p>';
//									content +='				<p>4.<a href="/" class="blue">论坛发帖</a></p>';
//									content +='				<p class="mt10">更多获取积分方法请查看<a href="/" class="blue">积分规则</a></p>';
//									content +='		</div>';
//								    content += '	<div class="downfail-ft"><span class="btn" id="dialogClose-btnDown">关闭</span></div>';
//									content +='</div>';
//									
//								var dialog = new Dialog({
//										title : "积分不够，不能下载",
//										width : 360,
//										height: 360,
//										content : content
//								});
//								dialog.show();
//								$("#dialogClose-btnDown").on('click',function(){
//										$(".close-dialog").click();
//								});
//								return false;
//						}
//
//						if( data.status == 'resource_not_found'){
//							alert('下载资源未找到！');
//							return false;
//						}
//				});
//				return false;
//		});

		// 2015-04-10 start
		var $btnDown = $(".btnDown");
		$btnDown.on('click',function(e){
			var url="/plus/arcInfo.php";
			e.preventDefault();
			$.post(url,{'dopost':'download','aid':webID},function(response){
				var content = "";
				var thetext = $(".dataParam").text().trim();
				var size = thetext.substring((thetext.indexOf("大小：") + 3), (thetext.indexOf("人气："))).trim();
				var jifen = thetext.substring((thetext.indexOf("需要积分") + 5), thetext.length).trim();
				switch(response.status){
					case 'logout':
						var dialog = new Dialog({});
						dialog.newLogin();
					break;
					case 'resource_not_found':
					if(confirm('资料找不到了，你可以选择通知我们')){
						$('#J_DownloadErr').trigger('click');
					}
					break;
					case 'need_complete_uinfo':
						var formbox='<div class="info-blockUI info-blockMsg" id="featuredformbox" style="">';
						formbox+='<div class="dialog">';
						formbox+='<div class="info-dialog-hd">下载此份资料需要填写个人信息</div>';
						formbox+='<div class="info-dialog-bd">';
						formbox+='<div class="info-form">';
						formbox+='<form id="uinfocomplete"  name="form1" method="post" action="/plus/ajax_post.php" target="_self">';									
						formbox+='<ul class="form-item">';
						formbox+='<li>';
						formbox+='<label for="uname"><i class="no-null">*</i>姓名：</label>';
						formbox+='<input id="uname" name="uname" class="txt-input" type="text">';
						formbox+='</li>';
						formbox+='<li>';
						formbox+='<label for="email"><i class="no-null">*</i>邮箱：</label>';							
						formbox+='<input class="text-input" type="text" id="email" name="email">';
						formbox+='</li>';
						formbox+='<li>';
						formbox+='<label for="position">职务：</label>';
						formbox+='<input class="text-input" type="text" name="position" id="position">';
						formbox+='</li>';
						formbox+='<li>';
						formbox+='<label for="shouji"><i class="no-null">*</i>手机：</label>';
						formbox+='<input class="text-input" type="text" name="shouji" id="shouji">';
						formbox+='</li>';
						formbox+='<li>';
						formbox+='<label for="company"><i class="no-null">*</i>单位名称：</label>';
						formbox+='<input class="text-input" type="text" name="company" id="company">';				
						formbox+='</li>';
						formbox+='<li>';								
						formbox+='<label for="gongzuoxingzhi"><i class="no-null">*</i>工作性质：</label>';
						formbox+='<select name="gongzuoxingzhi" id="gongzuoxingzhi">';
						formbox+='<option value="">--请选择您的工作性质 --</option>';
						formbox+='<option value="设计开发工程">设计开发工程</option>';
						formbox+='<option value="设计开发管理">设计开发管理</option>';
						formbox+='<option value="测试测量">测试测量</option>';
						formbox+='<option value="生产品质管理">生产品质管理</option>';
						formbox+='<option value="企业管理">企业管理</option>';
						formbox+='<option value="技术支持">技术支持</option>';
						formbox+='<option value="学术研究/学生">学术研究/学生</option>';
						formbox+='<option value="市场及销售">市场及销售</option>';
						formbox+='<option value="采购">采购</option>';
						formbox+='<option value="行业服务/咨询顾问">行业服务/咨询顾问</option>';
						formbox+='</select>';		
						formbox+='</li>';
						
						formbox+='<ul>';
						formbox+='<li>';
						formbox+='<label for="jishulingyu">技术领域：</label>';
						formbox+='<select name="jishulingyu" id="jishulingyu">';
						formbox+='<option value="">--请选择您的技术领域--</option>';
						formbox+='<option value="可编程逻辑">可编程逻辑</option>';
						formbox+='<option value="电源/新能源">电源/新能源</option>';
						formbox+='<option value="MEMS/传感技术">MEMS/传感技术</option>';
						formbox+='<option value="测量仪表">测量仪表</option>';
						formbox+='<option value="嵌入式技术">嵌入式技术</option>';
						formbox+='<option value="制造/封装">制造/封装</option>';
						formbox+='<option value="模拟技术">模拟技术</option>';
						formbox+='<option value="连接器">连接器</option>';
						formbox+='<option value="EMC/EMI设计">EMC/EMI设计</option>';
						formbox+='<option value="光电显示">光电显示</option>';
						formbox+='<option value="存储技术">存储技术</option>';
						formbox+='<option value="EDA/IC设计">EDA/IC设计</option>';
						formbox+='<option value="处理器/DSP">处理器/DSP</option>';
						formbox+='<option value="接口/总线/驱动">接口/总线/驱动</option>';
						formbox+='<option value="控制/MCU">控制/MCU</option>';
						formbox+='<option value="RF/无线">RF/无线</option>';
						formbox+='<option value="其他">其他</option>';
						formbox+='</select>';
						formbox+='</li>';
						formbox+='</ul>';
						
						formbox+='<ul>';
						formbox+='<li>';
						formbox+='<label for="yingyonglingyu">应用领域：</label>';
						formbox+='<select name="yingyonglingyu" id="yingyonglingyu" >';
						formbox+='<option value="">--请选择您的应用领域--</option>';
						formbox+='<option value="音视频及家电">音视频及家电</option>';
						formbox+='<option value="LEDs">LEDs</option>';
						formbox+='<option value="汽车电子">汽车电子</option>';
						formbox+='<option value="医疗电子">医疗电子</option>';
						formbox+='<option value="通信网络">通信网络</option>';
						formbox+='<option value="智能电网">智能电网</option>';
						formbox+='<option value="安全设备/系统">安全设备/系统</option>';
						formbox+='<option value="军用/航空电子">军用/航空电子</option>';
						formbox+='<option value="移动通信">移动通信</option>';
						formbox+='<option value="便携设备">便携设备</option>';
						formbox+='<option value="触控感测">触控感测</option>';
						formbox+='<option value="工业控制">工业控制</option>';
						formbox+='<option value="其他">其他</option>';
						formbox+='</select>';
						formbox+='</li>'
						formbox+='</ul>';


						formbox+='<li>';								
						formbox+='<label>所在地区：</label>';
						formbox+='<span id="residecitybox"></span>';
						formbox+='</li>';
						formbox+='<li>';							
						formbox+='<label for="address">详细地址：</label>';	
						formbox+='<input id="address" class="text-input" type="text" name="address">';
						formbox+='</li>';
						formbox+='<li style="height:46px;">';
						formbox+='<input type="hidden" name="area" id="area" value="">';
						formbox+='<input type="hidden" name="dopost" value="downloaduinfocomplete"/>';
						formbox+='<input type="hidden" name="aid" value="'+webid+'"/>';
						var title = $("h1").html();
						formbox+='<input type="hidden" name="title" value="'+title+'"/>';
						formbox+='<input type="submit" class="X-btn from-submit" id="submit" value="提交资料">';
						formbox+='</li>';
						formbox+='</ul>';
						formbox+='<div id="download-source-tip" class="tip"></div>';							
						formbox+='</form>';
						formbox+='</div>';		
						formbox+='</div>';		
						formbox+='<div class="close-dialog info-close-dialog" title="点击关闭">X</div>';
						formbox+='</div>';
						formbox+='</div>';
						$.blockUI({//信息完善框
								message:formbox,
								css : {
											top: "20%",
											width: this.width + "px",
											height: this.height + "px",
											marginLeft: "-"+this.width/2+"px", 
											color: "#000",
											border:	"8px solid #d8d8d8",
											background: "#fff",
											borderRadius: "5px"
									},
								onBlock: function() { 	
										$("#featuredformbox .info-close-dialog").attr('title','点击关闭').on('click',$.unblockUI);
									}
								});
						//省市
						var province = response.province || '';
						var city = response.city || '';
						if(province != ""){
							province = province.indexOf('省')>0?province.substr(0,province.length-1):province;
						}
						if(city != ""){
							city = city.indexOf('市')>0?city.substr(0,city.length-1):city;
						}	
						if(typeof showprovince =='function'){
							showprovince('province', 'city', province, 'residecitybox');
							showcity('city', city, 'province', 'residecitybox');
						}else{//加载js
							$.getScript('http://www.elecfans.com/skin-2012/js/select_city.js',function(){
								showprovince('province', 'city', province, 'residecitybox');
								showcity('city', city, 'province', 'residecitybox');	
							});
						}
						
						$('#uname').val(response.realname);//显示信息
						$('#email').val(response.email);
						$('#position').val(response.position);
						$('#shouji').val(response.mobile);
						$('#company').val(response.field3);
						$('#gongzuoxingzhi').val(response.field1);
						$('#address').val(response.field4);
						//职务 技术领域 应用领域 所在地区 详细地址（可选）
						//姓名 邮箱 手机 单位名称 工作性质（必选）
						$('#uname,#email,#shouji,#company').on('blur',function(){
							if(''==$.trim($(this).val())){
								$(this).css('border','1px solid red');
							}else{
								$(this).css('border','1px solid #ECECEC');
							}
						}).blur();
						
						$('#gongzuoxingzhi').on('change',function(){
							if(''==$.trim($(this).val())){
								$(this).css('border','1px solid red');
							}else{
								$(this).css('border','1px solid #ECECEC');
							}
						}).change();
						
						$('#uinfocomplete').on('submit',function(){//提交信息
							var self=this;
							$.ajax({
								url: '/plus/arcInfo.php',
								type:'post',
								data: $(self).serialize(),
								async: true,
								dataType:'json',
								success: function(data){
									if(data.status=='success'){
										var dialog = new Dialog({
											title : '下载'
										});
										var jifen = $("#J_Jifen").html();
										var downlink = $btnDown.attr('href');
										var title = $("h1").html();
										var size = $("#J_DataSize").html();
										show_download_dialog(title,size,downlink,jifen);
									}else{
										$('#download-source-tip').html(data.msg);
									}
								}
							})
							return false;
						});
					break;
					case 'download':
						var downlink = $btnDown.attr('href');
						var title = $("h1").html();
						var shengyu = response.scores;
						show_download_dialog(title,size,downlink,jifen,shengyu);
					break;
					case 'vipchannel_download':
						content +='<div class="downtip">';
						content +='	<div class="downtip-hd">' + $("h1").html() + '</div>';
						content +='	<div class="downtip-bd">';
						content +='	<p><span class="mr10">您会员截至日期：<em class="vip-dwnred">' + response.data.endoftime + '</em></span> <span class="ml10">剩余下载次数：<em class="vip-dwnred">' + response.data.available + '</em>次</span></p>';
						content +='	</div>';
						content += '<div class="downtip-vipft"><a href="' + $("#df-btnDown").attr("href").replace("open=2", "open=3") + '" id="dialog-vipDown">VIP免积分下载</a></div>';
						content += '<div clsss="downtip-bd">我同意本站“<a href="/help/download-protocol.html" target="_blank" class="blue">资料下载协议</a>”。评论将有机会获得返分!</div>';
						content +='</div>';
						var dialog = new Dialog({
							title: '下载资料'
						});
						dialog.pop();
						dialog.showCustom("VIP下载",content,350,220);
						$("#J_DialogContent").on('click','#dialog-vipDown',function(){
								setTimeout( function(){ $(".close-dialog").click(); },1000);
						});
					break;
					case 'vip_need_open':
						content +='<div class="downtip">';
						content +='<p id="num-error-tip">您剩余积分不够！</p>';
						content +='	<div class="downtip-hd">' + $("h1").html() + '</div>';
						content +='	<div class="downtip-bd">';
						content +='	<p><span class="mr10">文件大小：' + size + '</span> <span class="ml10">需要积分：' + jifen + '</span><span class="ml10">剩余积分：' + response.scores + '</span></p>';
						content +='	</div>';
						content += '<div class="downtip-ft"><a href="/vipdownload/pay" id="needvip" target="_blank">VIP免积分下载</a><a href="/member/upload.php" class="upfilefornum" target="_blank">上传资料赚取积分</a></div>';
						content += '<div class="downtip-bd">我同意本站“<a href="/help/download-protocol.html" target="_blank" class="blue">资料下载协议</a>”。评论将有机会获得返分!</div>';
						content +='</div>';
						var dialog = new Dialog({
								title : '下载'
							});
						dialog.pop();
						dialog.showCustom("下载资料",content,350,220);
						$("#J_DialogContent").on('click','#needvip',function(){
								setTimeout( function(){ $(".close-dialog").click(); },1000);
						});
					break;
					case 'vip_disabled':
						content +='<div class="downtip">';
						content +='<p id="num-error-tip">您的VIP已失效！</p>';
						content +='	<div class="downtip-hd">' + $("h1").html() + '</div>';
						content +='	<div class="downtip-bd">';
						content +='	<p><span class="mr10">您会员截至日期：<em class="vip-dwnred">' + response.data.endoftime + '</em></span> <span class="ml10">剩余下载次数：<em class="vip-dwnred">0</em>次</span></p>';
						content +='	</div>';
						content += '<div class="downtip-ft"><a href="/vipdownload/pay" id="needvip" target="_blank">VIP充值</a><a href="/member/upload.php" class="upfilefornum" target="_blank">上传资料赚取积分</a></div>';
						content += '<div class="downtip-bd">我同意本站“<a href="/help/download-protocol.html" target="_blank" class="blue">资料下载协议</a>”。评论将有机会获得返分!</div>';
						content +='</div>';
						var dialog = new Dialog({
								title : '下载'
							});
						dialog.pop();
						dialog.showCustom("下载资料",content,350,220);
						$("#J_DialogContent").on('click','#needvip',function(){
								setTimeout( function(){ $(".close-dialog").click(); },1000);
						});
					break;
					default:
					 alert('系统繁忙请稍后重试！');
				}
			});
			return false;
				
			function show_download_dialog(title,size,downlink,jifen,shengyu){//下载弹出框
				var content  = '';
					content +='<div class="downtip">';
					content +='		<div class="downtip-hd">'+title+'</div>';
					content +='		<div class="downtip-bd">';
					content +='			<p><span class="mr10">文件大小：'+size+'</span> <span class="ml10">需要积分：'+jifen+'</span><span class="ml10">剩余积分：'+shengyu+'</span></p>';
					content +=			'';
					content +='		</div>';
					content += '	<div class="downtip-ft"><a href="'+ downlink +'" class="btn" id="dialog-btnDown">下载</a><a href="/member/upload.php" class="upfilefornum" target="_blank">上传资料赚取积分</a></div>';
					//// add by liuping 2014年8月28日
					content += '<div class="downtip-bd">我同意本站“<a href="/help/download-protocol.html" target="_blank" class="blue">资料下载协议</a>”。评论将有机会获得返分!</div>';
					//// end
					content +='</div>';
				var dialog = new Dialog({
							title : '下载'
						});
				dialog.pop();
				dialog.showCustom("下载资料",content,350,220);
				$("#J_DialogContent").on('click','#dialog-btnDown',function(){
						setTimeout( function(){ $(".close-dialog").click(); },1000);
				});
				return false;
			}
		});
		if(location.search=='?direct=1'){
			$("#df-btnDown").trigger('click');
		}
		// 2015-04-10 end
		
		//报错 ---------------------------
		$("#downUrl-box").on('click','a.goWeb',function(){
				var content = '';
					content += '<div class="err-dialog yahei">';
					content += '<form action="/plus/erraddsave.php" method="post" name="feedback" id="errForm">';
					content += '	<fieldset>';
					content += '		<legend>报错</legend>';
					content += '		<input type="hidden" name="dopost" value="saveedit">';
					content += '		<input type="hidden" name="title" value="'+document.title+'" />';
					content += '		<input type="hidden" name="aid" value="'+webID+'" />';
					content += '		<input type="hidden" name="type" value="1" id="J_Type" />';
					content += '		<p class="choose-errType">请选择错误类型：</p>';
					content += '		<p class="mb10"><span class="err-type select-type" id="J_CanNot">不能下载</span> <span class="err-type" id="J_DataErr">资料有错</span></p>';
					content += '		<p class="choose-errType">备注（选填）：</p>';
					content += '		<div><textarea name="erradd" class="errContent"></textarea></div>';
					content += '		<div class="btn-area err-btn-area mt5 group">';
					content += '			<div class="btn-hasLoading-wrap fr"><span class="loading"><img src="/skin-2012/images/loading.gif" /></span><button type="submit" id="J_errSubmit" class="btn err-submit">提交</button></div>';
					content += '		</div>';
					content += '	</fieldset>';
					content += '</form>';
					content += '</div>';
				
				var dialog = new Dialog({
						title : "报错",
						width : 330,
						height: 280,
						content : content
				});
				dialog.show();
				
				//表单操作 ----------------
				var $errForm = $("#errForm");
				var $loading = $errForm.find("span.loading");
				//选中错误类型
				$errForm.on('click','span.err-type',function(){
						var $this = $(this);
						var $type = $("#J_Type");
						$this.addClass("select-type").siblings().removeClass("select-type");
						if( $this.is("#J_CanNot") ){
								$type.val("1");
						}
						if( $this.is("#J_DataErr") ){
								$type.val("2");
						}
				});
				$errForm.ajaxForm({
						beforeSubmit : errRequest,
						success:function(responseText,statusText){ 
								//隐藏loading
								$loading.hide();
								//提示报错成功 --------------------
								var errSuccessTip = new SubmitSuccessTip({
										title : "报错成功",
										content : "谢谢您的参与！",
										height : 210
								})
								errSuccessTip.show();
						}//end success:function
				});//end ajaxForm 
				function errRequest(formData, jqForm, options) { 	
						//显示loading
						$loading.show();
						
						var queryString = $.param(formData); 
						return true;
				}
				return false;
		});
//收藏-----------------------------------------------------------------------------------
		var $stow = $("#myStow");
		var $stow_num = $("#stowcount");
		$stow.on('click',function(){
				var url = '/plus/arcInfo.php?dopost=joinstow&aid='+webID;
				$.get(url,function(data){
						if( data == "logout" ){//未登录
								//弹出登陆框
								var loginTitle = '收藏请先登录 <span>(<a href="'+regUrl+'" class="grey9" target="_blank">还没有注册？</a>)</span>';
								var loginDialog = new LoginDialog({
									title : loginTitle,
									tipContent : "请再次点击收藏按钮"
								});
								loginDialog.pop();
								return false;
						}
						if( data == "already" ){//已经收藏
								alert("您已经收藏过该资料");
						}
						if( data == "success" ){//收藏成功
								
								//更新收藏数
								var num = $stow_num.html();
								var eNum = parseInt( num ) + 1;
								$stow_num.html( eNum );
						}
						if( data == "err" ){//收藏错误
								
						}
				});
				return false;
		});
		
//评论-----------------------------------------------------------------------------------------------------
		
		//评论 -------------------------------------------
		var $cmtList = $("#cmtList");
		var $comment = $("#userComment");
		//隐藏原有评论表单等信息
		$("#subCmt").hide();
		
		//加载评论--------------------------
		var $window = $(window);
		$window.on('scroll',function(){
				var fold = $window.height() + $window.scrollTop();
				if( fold > $comment.offset().top ){
						//LoadCommets(1);
						$.post('/plus/arcInfo.php',{ dopost:"getcomment",aid: webID},function(data){
								var $commentBd = $comment.find('.userCmt-bd');
								//加载评论
								$cmtList.hide().html(data).slideDown(600);
								//重写提交评论表单
								var dom = '';
									dom += '';
									dom += '<div class="commentForm-area">';
									dom += '		<div id="J_CommentLogout" class="tc">';
									dom += '				<p>发表评论请先 <a rel="nofollow" href="'+loginUrl+'" class="login blue" id="J_Btn-commentLogin">登录</a>， 还没有账号？<a href="'+regUrl+'" target="_blank">免费注册</a>。</p>';
									dom += '		</div>';
									dom += '		<div id="J_CommentLogin" class="none">';
									dom += '			<div id="commentForm-wrap">';
									dom += '				<h3>发表评论</h3>';
									dom += '				<form action="/plus/arcInfo.php" method="POST" name="feedback" id="commentForm">';
									dom += '						<fieldset>';
									dom += '							<legend>用户评论</legend>';
									dom += '							<input type="hidden" name="dopost" value="comment" />';
									dom += '							<input type="hidden" name="aid" id="webID" value="'+webID+'" />';
									dom += '							<div class="textarea"><textarea name="content" class="comment-msg" id="cmtMsg"></textarea></div>';
									dom += '							<div class="btn-area comment-btn-area group">';
									dom += '									<div class="btn-hasLoading-wrap"><span class="loading"><img src="/skin-2012/images/loading.gif" /></span><button type="submit" id="J_LoginSubmit" class="btn login-submit">发表</button></div>';
									dom += '									<div class="cmt-tip" id="J_CmtTip"><span class="black">技术交流、我要发言！</span> 发表评论可获取积分！ 请遵守相关规定。</div>';
									dom += '							</div>';
									dom += '						</fieldset>';       
									dom += '				</form>';
									dom += '			</div>';
									dom += '			<div id="J_CmtOverlayer" class="cmt-overlayer none"><img src="/skin-2012/images/loading.gif" class="i-block vm" alt="" /> 评论提交中...</div>';
									dom += '		</div>';
									dom += '</div>';
								$commentBd.append( dom );
								
									
								if( $("#topLogin").find(".my-mail").length > 0 ){
										$("#J_CommentLogout").hide();   
										$("#J_CommentLogin").show();
								}
								//发表评论-----------------------------
								$("#commentForm").ajaxForm({ 
										beforeSubmit:commentRequest,
										success:function(responseText,statusText){ 
												//插入临时评论并显示
												$cmtList.append( responseText );
												$("#J_TempComment").fadeIn(300);
												//隐藏提示
												$("#J_CmtTip").hide();
												
												//提交成功，隐藏loding...，显示评论表单
												$("#commentForm-wrap").fadeIn(300);
												$("#J_CmtOverlayer").hide();
												
										}//end success:function
								});//end ajaxForm 
						});
						//评论提交前验证
						function commentRequest(formData, jqForm, options) { 	
								//验证
								var form = jqForm[0]; 
								if ( form.content.value == '' ) { 
									$("#J_CmtTip").html("评论内容不能少于2个汉字").css("color","#c00");
									return false; 
								}; 
								if ( form.content.value.length > 200 ) { 
									$("#J_CmtTip").html("您输入的评论过长，最多200个汉字").css("color","#c00");
									return false; 
								};
								form.content.value = '';
								//隐藏表单，显示loading...
								$("#commentForm-wrap").hide();
								$("#J_CmtOverlayer").fadeIn(300);
								
								var queryString = $.param(formData); 
								return true;
						}
						$window.off('scroll');//移除窗口滚动事件
				}
		});
		//评论：回复 --------------------------
		$cmtList.on('click','a.c-reply',function(){
				var $this = $(this);
				var tid = $this.attr("id");
				var url = '/plus/arcInfo.php?dopost=comment';
				var form = '';
					form += '<div class="replyForm-wrap none" id="replyFormWrap"><form action="/plus/arcInfo.php" method="POST" id="replyForm">';
					form += '	<fieldset><legend>回复评论</legend>';
					form += '	<input type="hidden" name="dopost" value="comment" />';
					form += '	<input type="hidden" name="aid" value="'+webID+'" />';
					form += '	<div class="textarea"><textarea name="content" class="comment-msg reply-msg"></textarea></div>';
					form += '	<input type="hidden" name="tid" value="'+tid+'" />';
					form += '	<div class="btn-area comment-btn-area group">';
					form += '		<div class="btn-hasLoading-wrap"><span class="loading"><img src="/skin-2012/images/loading.gif" /></span><button type="submit" id="J_replySubmit" class="btn reply-submit">回复</button></div>';
					form += '		<div class="cmt-tip" id="J_ReplyTip"></div>';
					form += '	</div>';
					form += '	</fieldset> ';
					form += '</form></div>';  
					
				//移除评论表单
				$("#replyFormWrap").remove();
				//在当前回复按钮所在位置显示评论表单
				$this.parent("div").after( form );
				$("#replyFormWrap").slideDown(400);
				//验证，如果未登陆，提示登陆
				$.get(url,function(data){
						if( data == "logout" ){
								//评论未登陆提示
								var dialog = new LoginDialog({
										title : '评论请先登录'
								})
								dialog.pop();
								
								return false;
						}
						
				});
				//提交回复 ---------------------
				$("#replyForm").ajaxForm({ 
						beforeSubmit:replyRequest,
						success:function(responseText,statusText){ 
								//如果未登录
								if( responseText == "logout" ){
										//评论提示
										var dialog = new LoginDialog({
												title : '评论请先登录'
										})
										dialog.pop();
										//移除评论表单
										$("#replyFormWrap").remove();
										
										return false;
								}
								
								//移除评论表单
								$("#replyFormWrap").remove();
								//构建临时评论并显示
								$this.parent("div").parent("div").after( responseText );
								$("#J_TempComment").fadeIn(300);
						}//end success:function
				});//end ajaxForm 
				return false;
		});
		//评论：赞 --------------------------
		$cmtList.on('click','a.adjust',function(){
		        var $target = $(this).find("span");
				var tid = $target.attr("id");
				var num = $target.html();
				$.get('/plus/arcInfo.php?dopost=goodcomment&commentid='+tid+'',function(data){
						var eNum = parseInt( num ) + 1;
						$target.html( eNum );
				});
				return false;
		});
		
		
		//回复提交前验证
		function replyRequest(formData, jqForm, options) { 	
				//验证
				var form = jqForm[0]; 
				if ( form.content.value == '' ) { 
					$("#J_ReplyTip").html("评论内容不能少于2个汉字").css("color","#c00");
					return false; 
				}; 
				if ( form.content.value.length > 200 ) { 
					$("#J_ReplyTip").html("您输入的评论过长，最多200个汉字").css("color","#c00");
					return false; 
				};
				//显示loading
				$("#replyFormWrap").html('<li class="comment tc"><img src="/skin-2012/images/loading.gif" class="i-block vm" alt="" /> 评论提交中...</li>');
				
				var queryString = $.param(formData); 
				return true;
		}
		//最终下载页侧边栏
		$("#f-deepRead").load("/templets/default/include/zuizongye.html #f-read");
		$("#f-downRank").load("/templets/default/include/zuizongye.html #f-down");
		
		//修改上传资料按钮的链接地址
		//http://www.elecfans.com/member/upload.php
		var updata_url = 'http://www.elecfans.com/member/upload.php';
		$("#sideUpdata").attr("href",updata_url);
		
//广告 ------------------------------------------------------------
		/*topjf*/
		var top_ad = '';
			top_ad += '<a href="http://www.elecfans.com/adstat-8.html" target="_blank"><img src="/images2012/pcb.gif" width="960" height="90" alt="" /></a>';
		$("#topJf").html( top_ad );
		/*headjf*/
		//德州仪器+QQ群
		/*
		var head_ad = '';
			head_ad += '<div class="group">';
			head_ad += '  <a href="http://www.elecfans.com/adstat-3.html" target="_blank" class="fl"><img src="http://www.elecfans.com/images2012/ni/468x60.gif" alt="美国国家仪器" height="60" width="468"></a>';
			head_ad += '  <a href="http://www.elecfans.com/adstat-5.html" target="_blank" class="fr"><img src="http://www.elecfans.com/images2012/ic-survey.gif" height="60" width="480"></a>';
			head_ad += '</div>';
		*/
			/*
			head_ad += '<div class="mt5">';
			head_ad += '  <a href="http://www.elecfans.com/adstat-9.html" target="_blank"><img src="http://www.elecfans.com/images2012/os-banner.gif" alt="美国国家仪器" height="60" width="950"></a>';
			head_ad += '</div>';
		
		var head_ad = '';
			head_ad += '<div class="group">';
			head_ad += '  	<a href="http://www.elecfans.com/adstat-22.html" target="_blank"><img src="http://www.elecfans.com/images2012/fpga/sailins.gif" width="950" height="90" alt="FPGA设计大赛"></a>';
			head_ad += '</div>';
		$("#headJf").html( head_ad );
			*/
		//赛林思
		
		//侧边栏广告
		
		if($("#deepRead").length > 0){
			gg_dom = '<div id="sidebar-firstad" style="width:300px;height:250px"></div>';
			$("#deepRead").before(gg_dom);
			openX_ad(310,'#sidebar-firstad',300,250);
			//zhcyy
		}
				
		
		
		
//后台统计访问次数--------------------------------------------
		$.getScript("/plus/count.php?aid="+webID);
		////关键字植入
	
	$.get("/plus/arcInfo.php?dopost=getkeyword",function(data){
		eval('var keywords = '+data);
		var htmlstr = $('#content').html();
		if(htmlstr){
			for(var i=0;i<keywords.length;i++){
				eval('re = /'+keywords[i]['word']+'/g');
				repstr = '<a href="'+keywords[i]['url']+'" target="_blank" title="'+keywords[i]['title']+'" class="key">'+keywords[i]['word']+'</a>';
				htmlstr = htmlstr.replace(re,repstr)
			}
			$('#content').html(htmlstr);
		}
	});
	
	
	
});// End document.ready

$(window).load(function(){	
		
//------------------- 投票 --------------------
		var $vote = $("#vote");
		//定义获取投票
		function GetVote(){
				$.post("/plus/dingcai.php?id="+webID+"", function(data) {
						$vote.html(data);
				});
		};
		//定义发送投票
		function sendVote(type){
				$.post("/plus/dingcai.php?action="+type+"&id="+webID+"", function(data) {
						GetVote();
				});
		};
		
		//顶
		$vote.on('click','#ding',function(){
				
				sendVote("good");
		});
		//踩
		$vote.on('click','#cai',function(){
				sendVote("bad");
		});
		//投票鼠标悬停样式
		$("#ding,#cai").hover(function(){
			$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
		});
		//获取投票
		GetVote();

		/*var webUrl = location.href;
		$(".shareTo").share({
                title: document.title,
                content:"",
                url: webUrl,
                popupModel: "showdialog"
        });*/
//ie6内容图片最大560px -------------------------------------------------------------		
		if( ie6 ){
				$('.max-wImg').find("img").each(function(){
						if( $(this).width() > "560px" ){
								$(this).width("560px");
						}
				});
		}
		
});
//分享到------------------------------------------------------------2012.3.2 add by qin
function addLoadEvent(func){
	var oldOnload = window.onload;
	if (typeof window.onload != 'function'){
			window.onload = func;
		}
	else {
			window.onload = function(){
			oldOnload();
			func();
			}
		}
	}
function share(){	
	var checkShare=document.getElementById("bdshare");		
	if(checkShare==null){		
		var url="http://bdimg.share.baidu.com/static/js/shell_v2.js?t=" + new Date().getHours();
		var scr1=document.createElement('script');
			scr1.setAttribute("type","text/javascript");
			scr1.setAttribute("id","bdshare_js");
			scr1.setAttribute("data","type=slide&amp;img=5&amp;uid=587264");
			document.body.appendChild(scr1);
			var scr2=document.createElement('script');
			scr2.setAttribute("type","text/javascript");
			scr2.setAttribute("id","bdshell_js");
			scr2.setAttribute("src",url);
			document.body.appendChild(scr2);
	}
	
}
addLoadEvent(share);

document.writeln("<script type=\"text\/javascript\">\/*120*270，创建于2012-7-30 电子站对联*\/ var cpro_id = \'u1002955\';<\/script><script src=\"http:\/\/cpro.baidu.com\/cpro\/ui\/f.js\" type=\"text\/javascript\"><\/script>");

/*
document.writeln("<div class=\"baidu-gg-header\"><script type=\"text/javascript\">var cpro_id = \'u1002949\';</script><script src=\"http://cpro.baidu.com/cpro/ui/c.js\" type=\"text/javascript\"></script></div>");
$(".baidu-gg-header").css({
		"position" : "absolute",
		"left":"50%",
		"margin-left":"-480px",
		"top":"308px",
		"z-index":100
})
*/
// jQuery JCShare plugin 0.2
//;(function($){$.fn.extend({share:function(options){options=$.extend({},$.Share.defaults,options);return new $.Share(this,options)}});$.Share=function(input,options){var title=options.title?options.title:document.title;var content=options.content?options.content:document.title;var url=options.url?options.url:document.URL;$.each(options.sharePlace,function(name,tag){input.find(tag).each(function(){var linkurl=eval("options.dictlink."+name+"(this, title, content, url);");switch(options.popupModel){case"link":$(this).attr("target",options.target);$(this).attr("href",linkurl);break;case"window":$(this).bind("click",function(){window.open(linkurl,'','width=700, height=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no')});break;case"showdialog":$(this).bind("click",function(){window.showModalDialog(linkurl,new Object(),'dialogWidth=700px;dialogHeight=400px')});break}})})};$.Share.defaults={share:".share",sharePlace:{kaixin:".share_kaixin",sina:".share_sina",renren:".share_renren",email:".share_email",douban:".share_douban",qq:".share_qq",google:".share_google",twitter:".share_twitter"},popupModel:"link",title:"",content:"",url:"",target:"_blank",dictlink:{kaixin:function(div,title,content,url){return"http://www.kaixin001.com/repaste/share.php?rtitle="+encodeURIComponent(title)+"&rurl="+encodeURIComponent(url)+"&rcontent="+encodeURIComponent(content)},sina:function(div,title,content,url){return"http://v.t.sina.com.cn/share/share.php?appkey=980576314&url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title)},douban:function(div,title,content,url){return"http://www.douban.com/recommend/?url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title)},renren:function(div,title,content,url){return"http://share.xiaonei.com/share/buttonshare.do?link="+encodeURIComponent(url)+"&title="+encodeURIComponent(title)},qq:function(div,title,content,url){return"http://v.t.qq.com/share/share.php?title="+encodeURI(title)+"&url="+encodeURIComponent(url)}}}})(jQuery);