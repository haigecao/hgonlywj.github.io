if(window._sdi||(window._sdi={}),"undefined"==typeof sdi_aid||!(sdi_aid>0)){var sdijs=document.getElementById("sdi_js");sdi_aid=sdijs.getAttribute("aid")}if(function(t,e){"use strict";t.constant={p_sf:"sdi_from",p_sc:"sdi_sc",p_wf:"from",c_uid:"sdi_uid"},t.variable={env:0,hasInit:!1,hasPlayed:!1,debug:!1,ck_from:t.constant.p_sf+"_"+sdi_aid},t.v=t.variable,t.c=t.constant,t.user={imei:"",phone:"",qq:"",wx:"",guid:"",network:""};var n=localStorage,i=location.href,o=t.constant,a=t.variable,r="//sdi.3g.qq.com",s=i.indexOf("debug=true")>0;t.analytics||(t.analytics={}),t.analytics.report=function(t,e,i){"function"==typeof e&&(i=e,e={});var r,d="";for(r in e)d+="&"+r+"="+e[r];d+="&r="+parseInt(99999*Math.random()+1);var u=new Image;t+=(t.indexOf("?")>0?"":"?")+d,u.src=t;var c="aid="+sdi_aid+",uid="+n.getItem(o.c_uid)+",channel="+n.getItem(a.ck_from)+",ptype="+e.ptype+",stype="+e.stype;s&&alert(c+" send"),u.onload=function(){s&&alert(c+" success"),"function"==typeof i&&i()}},t.analytics.stat=function(e,i){void 0!=e&&"[object Object]"==e||(e={}),e.aid=sdi_aid,e.channel=0;var s=n.getItem(a.ck_from);s&&(e.channel=s);var d=n.getItem(o.c_uid);d||(d=t.tool.uuid(),n.setItem(o.c_uid,d)),e.uid=d,t.analytics.report(r+"/stat",e,i)},t.stat=function(e,n){t.analytics.stat(e,n)},t.statPlay=t.stat,t.analytics.doPV=function(e){var r=t.tool.url.getParam,s=t.tool.getEnv(),d=r(i,o.p_sf);(""==d||!t.tool.isInt(d))&&(d=0);var u=n.getItem(a.ck_from);u=u>0?u:d,u!=d&&(0==d?d=u:u=d);var c=r(i,o.p_sc);if((""==c||!t.tool.isInt(c))&&(c=0),0==d){if(2==s){var l=r(i,o.p_wf);switch(l){case"timeline":0==c&&(c=1),d=1;break;case"singlemessage":0==c&&(c=1),d=2;break;case"groupmessage":0==c&&(c=1),d=3}}else 3==s?d=4:4==s&&(d=5);u=d}n.setItem(a.ck_from,d);var p={};p.ptype="1",p.stype=d,c>0&&(p.ptype+=",5",p.stype+=","+c),t.analytics.stat(p,e)},t.tool||(t.tool={}),t.tool.uuid=function(){function t(){return(65536*(1+Math.random())|0).toString(16).substring(1)}return t()+t()+t()+t()+t()},t.tool.url={getParam:function(e,n){var i=new t.tool.urlObj(e),o=i.get(n);return void 0==o?"":o},setParam:function(e,n){var i=new t.tool.urlObj(e);for(var o in n)i.set(o,n[o]);return i.url()},delParam:function(e,n){var i=new t.tool.urlObj(e);return i.remove(n),i.url()}},t.tool.isInt=function(t){var e=/^[1-9]+[0-9]*]*$/;return!!e.test(t)},t.tool.getEvn=function(){var t=navigator.userAgent,e=0;return t.indexOf("MicroMessenger")>-1?e=2:t.indexOf("QQ/")>-1?e=3:t.indexOf("Weibo")>-1?e=4:t.indexOf("WeSecure")>-1?e=1:t.indexOf("com.qq.wifimananer")>-1&&(e=1),a.env=e,e},t.tool.getEnv=function(){return t.tool.getEvn()},t.tool.getOs=function(){var t=navigator.userAgent,e=0;return e=t.indexOf("Android")>-1?1:/iP(ad|hone|od)/.test(t)?2:t.indexOf("Windows Phone")>=0?3:0},t.tool.urlObj=function(t){var e=t||window.location.href,n="",i={},o="",a=function(){var t=e,a=t.indexOf("#");if(a>0&&(o=t.substr(a),t=t.substring(0,a)),a=t.indexOf("?"),a>0){n=t.substring(0,a),t=t.substr(a+1);for(var r=t.split("&"),s=0;s<r.length;s++){var d=r[s].split("=");d[1]=void 0==d[1]?null:d[1],i[d[0]]=d[1]}}else n=e,i={}};this.set=function(t,e){i[t]=encodeURIComponent(e)},this.remove=function(t){t in i&&(i[t]=void 0)},this.get=function(t){return i[t]},this.url=function(t){var e=n,a=[];for(var r in i)i[r]&&a.push(r+"="+i[r]),null==i[r]&&a.push(r);return a.length>0&&(e+="?"+a.join("&")),o.length>0&&(e+=o),e},this.debug=function(){var t=[];for(var e in i)t.push(e+"="+i[e]);alert(t)},a()},t.tool.addLoadListener=function(t){var n=window.addEventListener,i=e.addEventListener,o=window.attachEvent;if("undefined"!=typeof n)n("load",t,!1);else if("undefined"!=typeof i)i("load",t,!1);else if("undefined"!=typeof o)o("onload",t);else{var a=window.onload;"function"!=typeof window.onload?window.onload=t:window.onload=function(){a(),t()}}},t.tool.WxJs=function(t,e,n){"function"==typeof e&&(n=e,e={}),"object"==typeof WeixinJSBridge&&"function"==typeof WeixinJSBridge.invoke?WeixinJSBridge.invoke(t,e,function(t){n(t)}):document.addEventListener("WeixinJSBridgeReady",function(){WeixinJSBridge.invoke(t,e,function(t){n(t)})},!1)},t.tool.GjJs=function(t,n,i){"function"==typeof n&&(i=n,n={}),"object"==typeof TcsJSBridge&&"function"==typeof TcsJSBridge.invoke?TcsJSBridge.invoke(t,n,function(t){i(t)}):e.addEventListener("TcsJSBridgeReady",function(){TcsJSBridge.invoke(t,n,function(t){i(t)})},!1)},t.share={pt:[3,6],st:[],opt:{img_url:"",link:i,desc:"",title:"",appid:"wx7e52715f6250fbd7"},callback:{f1:function(t){},f2:function(t){}},init:function(n,i,o){var r=t.tool.getEnv();t.share.setOpt(n),"function"==typeof i&&(t.share.callback.f1=i),"function"==typeof o&&(t.share.callback.f2=o),a.hasInit||(a.hasInit=!0,2==r&&(window.WeixinJSBridge?t.share.bindWx():e.addEventListener("WeixinJSBridgeReady",function(){t.share.bindWx()},!1)),window.TcsJSBridge?t.share.bindGj():e.addEventListener("TcsJSBridgeReady",function(){t.share.bindGj()},!1))},run:function(e){1==a.env?(t.share.gj2x(),t.share.callback.f1(t.share.opt)):"function"==typeof e&&e()},bindWx:function(){WeixinJSBridge.on("menu:share:appmessage",function(e){t.share.wx2wxFriend()}),WeixinJSBridge.on("menu:share:timeline",function(e){t.share.wx2wxTimeline()}),WeixinJSBridge.on("menu:share:qq",function(e){t.share.wx2qq()})},bindGj:function(){t.share.gjSetOpt(),TcsJSBridge.on("share2App",function(e){if(t.share.gjSetOpt(),"object"==typeof e)if("click"==e.action);else if("select"==e.action){switch(e.appName){case"weixinMessage":break;case"weixinTimeline":}t.stat({ptype:t.share.pt.join(","),stype:t.share.st.join(",")}),t.share.callback.f1(t.share.opt)}else"finish"==e.action||"cancel"==e.action})},setOpt:function(n){t.share.opt.img_url=void 0==n.img_url?t.share.opt.img_url:n.img_url,t.share.opt.link=void 0==n.link?t.share.opt.link:n.link,t.share.opt.desc=void 0==n.desc?t.share.opt.desc:n.desc,t.share.opt.title=void 0==n.title?t.share.opt.title:n.title,void 0!=n.appid&&(t.share.opt.appid=n.appid),null==n.appid&&(t.share.opt.appid=void 0),t.share.setLink(),"object"==typeof TcsJSBridge&&"function"==typeof TcsJSBridge.invoke?t.share.gjSetOpt():e.addEventListener("TcsJSBridgeReady",function(){t.share.gjSetOpt()},!1)},setLink:function(){var e=t.tool.url.getParam(i,o.p_sc),r=t.share.opt.link;(""==e||!t.tool.isInt(e))&&(e=0),e=+e+1,t.share.st=[a.env,e];var s={sdi_sc:e};r=t.tool.url.setParam(r,s);var d=n.getItem(a.ck_from);d&&!isNaN(d)||(d=0);var u={sdi_from:d};r=t.tool.url.setParam(r,u),t.share.opt.link=r},wx2wxTimeline:function(){WeixinJSBridge.invoke("shareTimeline",t.share.opt,function(e){t.share.callback.f2(e)}),t.share.callback.f1(t.share.opt),t.stat({ptype:t.share.pt.join(","),stype:t.share.st.join(",")})},wx2wxFriend:function(){WeixinJSBridge.invoke("sendAppMessage",t.share.opt,function(e){t.share.callback.f2(e)}),t.share.callback.f1(t.share.opt),t.stat({ptype:t.share.pt.join(","),stype:t.share.st.join(",")})},wx2qq:function(){WeixinJSBridge.invoke("shareQQ",t.share.opt,function(e){t.share.callback.f2(e)}),t.share.callback.f1(t.share.opt),t.stat({ptype:t.share.pt.join(","),stype:t.share.st.join(",")})},gj2x:function(){1==t.tool.getOs()&&t.stat({ptype:t.share.pt.join(","),stype:t.share.st.join(",")}),TcsJSBridge.invoke("share2App",t.share.opt,function(e){1==t.tool.getOs()&&t.share.callback.f2(e)})},gjSetOpt:function(){var e=t.tool.getOs();2==e&&TcsJSBridge.invoke("setShareInfo",t.share.opt,function(t){})}},t.timing={auto:!0,time:{loadingStart:(new Date).getTime()},extiming:{loading:0},buildData:function(e,n){var i=[];return"navigation"==n?i=t.timing.navi():"resource"==n&&(i=t.timing.res()),{base:{reqid:e,type:n,time:(new Date).getTime(),aid:sdi_aid},timing:i,profile:{env:a.evn,max:0,network:t.user.network,imei:t.user.imei,guid:t.user.guid}}},postByBeacon:function(t){navigator.sendBeacon&&navigator.sendBeacon(r+"/timing",JSON.stringify(t))},postByAjax:function(e){t.api.ajax({url:r+"/timing",data:e,contentType:"application/json"})},navi:function(){var e=window.performance,n=window.location,i=e.timing,o=e.navigation?e.navigation.type:-1,a=e.navigation?e.navigation.redirectCount:-1,r=e.memory?e.memory.usedJSHeapSize:-1;return[{link:n.protocol+"//"+n.host+n.pathname,search:n.search,dns:(i.domainLookupEnd-i.domainLookupStart).toFixed(2),tcp:(i.connectEnd-i.connectStart).toFixed(2),wait:(i.responseStart-i.navigationStart).toFixed(2),ttfb:(i.responseStart-i.connectEnd).toFixed(2),response:(i.responseEnd-i.responseStart).toFixed(2),dom:(i.domComplete-i.responseEnd).toFixed(2),load:(i.loadEventEnd-i.loadEventStart).toFixed(2),total:(i.loadEventEnd-i.connectEnd).toFixed(2),full:(i.loadEventEnd-i.navigationStart).toFixed(2),type:o,redirectCount:a,memory:r,loading:t.timing.extiming.loading}]},res:function(){if(void 0==performance.getEntries)return[];for(var t=performance.getEntries(),e=[],n=0;n<t.length;n++){var i=t[n],o=i.name,a=i.name;o.indexOf("?")>-1&&(o=o.substring(0,o.indexOf("?"))),a=a.indexOf("?")>-1?a.substring(a.indexOf("?"),a.length):"",e.push({link:o,search:a,dns:(i.domainLookupEnd-i.domainLookupStart).toFixed(2),tcp:(i.connectEnd-i.connectStart).toFixed(2),ttfb:(i.responseStart-i.connectEnd).toFixed(2),response:(i.responseEnd-i.responseStart).toFixed(2),total:i.duration.toFixed(2),full:i.duration.toFixed(2),type:i.initiatorType})}return e},stat:function(){var e=window.performance;if(e){var n=t.tool.uuid();2==t.tool.getEnv()&&1==t.tool.getOs()?window.addEventListener("unload",function(){t.timing.postByBeacon(t.timing.buildData(n,"navigation")),t.timing.postByBeacon(t.timing.buildData(n,"resource"))},!1):t.tool.addLoadListener(function(){setTimeout(function(){t.timing.auto&&(t.timing.postByAjax(t.timing.buildData(n,"navigation")),t.timing.postByAjax(t.timing.buildData(n,"resource")))},2e3)})}},start:function(){t.timing.auto=!1,t.timing.time.loadingStart=(new Date).getTime()},end:function(){var e=t.tool.uuid();t.timing.extiming.loading=(new Date).getTime()-t.timing.time.loadingStart,2==t.tool.getEnv()&&1==t.tool.getOs()||t.timing.auto||(t.timing.postByAjax(t.timing.buildData(e,"navigation")),t.timing.postByAjax(t.timing.buildData(e,"resource")))}},t.api||(t.api={}),t.api.getNetwork=function(e){var n="unknown";1==t.tool.getEnv()?t.tool.GjJs("getNetworkType",{},function(t){"ok"==t.err_msg&&(n=t.networkType),e(n)}):2==t.tool.getEnv()?t.tool.WxJs("getNetworkType",{},function(t){(t.err_msg="network_type:wifi")?n="wifi":t.subtype&&(n=t.subtype),e(n)}):(navigator.connection&&(n=navigator.connection.type?navigator.connection.type:"unknown"),e(n))},t.api.GJInfo=function(e){function n(){if(o++,o>=6){var t={result:0,msg:"ok",data:i};e(t)}}var i={},o=0;t.tool.GjJs("getInfo",{key:"imei"},function(t){"ok"==t.err_msg&&void 0!=t.ret&&(i.imei=t.ret),n()}),t.tool.GjJs("getInfo",{key:"guid"},function(t){"ok"==t.err_msg&&void 0!=t.ret&&(i.guid=t.ret),n()}),t.tool.GjJs("getInfo",{key:"phone_number"},function(t){"ok"==t.err_msg&&void 0!=t.ret&&(i.phone=t.ret),n()}),t.tool.GjJs("getInfo",{key:"lc"},function(t){"ok"==t.err_msg&&void 0!=t.ret&&(i.lc=t.ret),n()}),t.tool.GjJs("getInfo",{key:"android_os_build_model"},function(t){"ok"==t.err_msg&&void 0!=t.ret&&(i.deviceModel=t.ret),n()}),t.tool.GjJs("getInfo",{key:"android_os_build_version_release"},function(t){"ok"==t.err_msg&&void 0!=t.ret&&(i.OSVersion=t.ret),n()})},t.api.ajax=function(t,e){t.type=t.type||"POST",t.data=t.data||{},t.contentType=t.contentType||"application/x-www-form-urlencoded";var n=t.data,i=t.url,o=new window.XMLHttpRequest;if(o.onreadystatechange=function(){if(4==o.readyState){if("function"!=typeof e)return;if(o.status>=200&&o.status<=307||304==o.status){var t={};try{t=JSON.parse(o.responseText)}catch(e){t=o.responseText}e(t)}else e({msg:"网络连接失败"})}},"application/json"==t.contentType)t.type="POST",n=JSON.stringify(t.data);else if("object"==typeof t.data){var a,r=[];for(a in t.data)r.push(a+"="+encodeURIComponent(t.data[a]));n=r.join("&")}return"GET"==t.type&&(i+=(i.indexOf("?")>0?"&":"?")+n,n=void 0),o.open(t.type,i,!0),o.setRequestHeader("Content-Type",t.contentType),o.send(n),o}}(_sdi,document),!window._sdi)var _sdi={};if(function(t,e){"use strict";var n="//sdi.3g.qq.com",i=n+"/api.do";t.api||(t.api={}),t.api.OAuthLogin=function(t,e,n){var o=i+"?method=login&by="+t+"&backin="+n+"&aid="+sdi_aid+"&backurl="+encodeURIComponent(e);location.href=o},t.api.loginByWX=function(e,n){"function"==typeof e&&(n=e,e={}),e.backurl=e.backurl||"",e.backin=e.backin||"URL";var i=t.tool.getEvn();t.tool.getOs();if(1==i)_sdi.api.GJLoginWX(e,n);else if(2==i){if("CACHE"==e.backin){var o=t.tool.url.getParam(location.href,"openid");if(""!=o)return void t.api.getLoginUser(o,function(t){n(void 0!=t.result&&0==t.result?{result:0,msg:"ok",data:{name:t.data.nickname,unionid:t.data.unionid,openid:t.data.openid,photo:t.data.headimgurl}}:{result:-1,msg:"无法获取用户信息"})});t.api.OAuthLogin("WX",e.backurl,e.backin)}t.api.OAuthLogin("WX",e.backurl,e.backin)}},t.api.loginByQQ=function(e,n){"function"==typeof e&&(n=e,e={});var i=t.tool.getEvn();1==i?t.api.GJLoginQQ(e,n):2==i&&n({result:-1,msg:"not support"})},t.api.getQQProfile=function(e,n){"function"==typeof e&&(n=e,e={}),e.method="getQQProfile",t.api.ajax({type:"POST",url:i,data:e},n)},t.api.getQQByWXOpenId=function(e,n){"function"==typeof e&&(n=e,e={}),e.method="getQQByWXOpenId",t.api.ajax({type:"POST",url:i,data:e},n)},t.api.counter=function(e,n){"function"==typeof e&&(n=e,e={}),e.aid=e.aid||sdi_aid,e.method="counter",t.api.ajax({type:"POST",url:i,data:e},n)},t.api.getLoginUser=function(e,n){var o={method:"getLoginUser",uid:e};t.api.ajax({type:"POST",url:i,data:o},n)},t.api.getGJ3rdAccount=function(e,n){"function"==typeof e&&(n=e,e={}),e.method="getGJ3rdAccount",e.accountId=e.accountId||"",e.type=e.type||0,t.api.ajax({type:"POST",url:i,data:e},n)},t.api.lottery=function(e,n){"function"==typeof e&&(n=e,e={}),e.method="lottery",e.sign=e.sign||"",e.openid=e.openid||"",e.time=e.time||0,e.aid=e.aid||sdi_aid,e.prize=e.prize||"",t.api.ajax({type:"POST",url:i,data:e},n)},t.api.activate=function(e,n){var i=t.tool.getEvn();e.viewId=e.viewId||"1",e.iosViewId=e.iosViewId||1,e.iosUrl=e.iosUrl||"mqqsecure://mqqalbum",e.showId=e.showId||sdi_aid,e.showChannel=e.showChannel||i,e.str1=e.str1||"",e.str2=e.str2||"",e.int1=e.int1||0,e.int2=e.int2||0,e.signature=e.signature||"00B1208638DE0FCD3E920886D658DAF6",e.finishSelf=void 0!=e.finishSelf&&e.finishSelf,e.download=void 0!=e.download&&e.download,e.downloadAPK=e.downloadAPK||"http://m.qq.com",e.downloadIOS=e.downloadIOS||"https://itunes.apple.com/app/apple-store/id439638720?pt=69276&ct=qingchun&mt=8",t.api.getInstallState({pkgName:"com.tencent.qqpimsecure",iosUrl:"mqqsecure://"},function(o){if(0==o.result)2==i?t.api.launch3rdApp({pkgName:"com.tencent.qqpimsecure",signature:e.signature,param:"{'dest_view':"+e.viewId+",'show_id':'"+e.showId+"','show_channel':'"+e.showChannel+"'}",iosUrl:e.iosUrl},function(t){n(t)}):1==i&&t.tool.GjJs("gotoQQSecure",{viewId:e.viewId,viewId_ios:e.iosViewId,str1:e.str1,str2:e.str2,int1:e.int1,int2:e.int2,finishSelf:e.finishSelf},function(t){var e={result:-1,msg:t.err_msg};"ok"==t.err_msg?(e.result=0,n(e)):n(e)});else{var a={result:-1,msg:"no_install"};n(a);var r=e.downloadAPK;2==t.tool.getOs()&&(r=e.downloadIOS),e.download&&setTimeout(function(){window.location=r},500)}})},t.api.silent=function(e){function n(){t.api.activate({},function(t){e(t)})}var i=t.tool.getEvn();if(1==t.tool.getOs()&&(2==i&&("object"==typeof WeixinJSBridge&&"function"==typeof WeixinJSBridge.invoke?n():document.addEventListener("WeixinJSBridgeReady",n,!1)),3==i)){var o=document.createElement("iframe");o.style.display="none",o.src="tcsecure://com.tencent.qqpimsecure/call_at_bg/wetchat/"+sdi_aid+"/"+i,document.body.appendChild(o)}},t.api.launch3rdApp=function(e,n){var i=t.tool.getEvn();if(1==i)1==t.tool.getOs()?t.tool.GjJs("launch3rdApp",{pkgName:e.pkgName||"",signature:e.signature||"",activity:e.activity||"",param:e.param||"",tipType:e.tipType||1,tipMsg:e.tipMsg||"启动第三方APP",tipTime:e.tipTime||0},function(t){var e={result:-1,msg:t.err_msg};"ok"==t.err_msg?(e.result=0,n(e)):n(e)}):2==t.tool.getOs()&&t.tool.GjJs("launch3rdApp",{iosUrl:e.iosUrl||""},function(t){var e={result:-1,msg:t.err_msg};"ok"==t.err_msg?(e.result=0,n(e)):n(e)});else if(2==i){if(1==t.tool.getOs())t.tool.WxJs("launch3rdApp",{packageName:e.pkgName||"",signature:e.signature||"",param:e.param||"",type:1},function(t){var e={result:-1,msg:t.err_msg};"launch_3rdApp:ok"==t.err_msg?(e.result=0,n(e)):n(e)});else if(2==t.tool.getOs()){var o=document.createElement("iframe");o.src=e.iosUrl||"",o.style.display="none",document.body.appendChild(o),o.parentNode.removeChild(o),o=null,window.TcsJSBridge||setTimeout(function(){window.location="https://itunes.apple.com/app/apple-store/id439638720?pt=69276&ct=qingchun&mt=8"},400)}}else if(2==t.tool.getOs()){var o=document.createElement("iframe");o.src=e.iosUrl||"",o.style.display="none",document.body.appendChild(o),o.parentNode.removeChild(o),o=null,window.TcsJSBridge||setTimeout(function(){window.location="https://itunes.apple.com/app/apple-store/id439638720?pt=69276&ct=qingchun&mt=8"},400)}},t.api.getInstallState=function(e,n){e.pkgName=e.pkgName||"",e.iosUrl=e.iosUrl||"";var i=t.tool.getEvn();1==i?t.tool.GjJs("isPkgInstalled",{pkgName:e.pkgName,iosUrl:e.iosUrl},function(t){var e={result:-1,msg:t.err_msg};"true"==t.ret||1==t.ret?(e.result=0,n(e)):n(e)}):2==i&&t.tool.WxJs("getInstallState",{packageName:e.pkgName,packageUrl:e.iosUrl},function(t){var e={result:-1,msg:t.err_msg};t.err_msg.indexOf("get_install_state")>-1&&"get_install_state:no"!=t.err_msg?(e.result=0,n(e)):n(e)})},t.api.GJGetQQLoginState=function(e){t.tool.GjJs("getQQLoginState",{uin:""},function(t){var n={result:-1,msg:t.err_msg};"ok"==t.err_msg&&0==t.ret?("online"==t.state?(n.result=0,n.data={uin:t.uin,name:t.name,token:t.token,openid:t.openid,accountid:t.accountid}):"offline"==t.state?(n.result=1,n.data={uin:t.uin,name:t.name,token:t.token,openid:t.openid,accountid:t.accountid}):n.result=2,e(n)):e(n)})},t.api.GJGetWXLoginState=function(e){t.tool.GjJs("getWXLoginState",{uin:""},function(t){var n={result:-1,msg:t.err_msg};"ok"==t.err_msg&&0==t.ret?("online"==t.state?(n.result=0,n.data={uin:t.uin,name:t.name,token:t.token,openid:t.openid,accountid:t.accountid}):"offline"==t.state?(n.result=1,n.data={uin:t.uin,name:t.name,token:t.token,openid:t.openid,accountid:t.accountid}):n.result=2,e(n)):e(n)})},t.api.GJLoginQQ=function(e,n){"function"==typeof e&&(n=e,e={}),e.asMain=void 0==e.asMain||e.asMain,e.uin=e.uin||"",t.tool.GjJs("loginQQ",{as_main_account:e.asMain,uin:e.uin,login_from:"webview"},function(t){var e={result:-1,msg:t.err_msg};"ok"==t.err_msg&&0==t.ret?(e.result=0,e.data={uin:t.uin,name:t.name,token:t.token,openid:t.openid,accountid:t.accountid},n(e)):n(e)})},t.api.GJLoginWX=function(e,n){"function"==typeof e&&(n=e,e={}),e.asMain=void 0==e.asMain||e.asMain,e.uin=e.uin||"",t.tool.GjJs("loginWX",{as_main_account:e.asMain,uin:e.uin,login_from:"webview"},function(t){var e={result:-1,msg:t.err_msg};"ok"==t.err_msg&&0==t.ret?(e.result=0,e.data={unionid:t.uin,name:t.name,openid:t.openid},n(e)):(e.result=-1,n(e))})},t.api.GJGetQQLoginKey=function(e,n){function i(){if(r++,r>=5){var t={result:0,msg:"ok",data:a};n(t)}}"function"==typeof e&&(n=e,e={}),e.uin=e.uin||"";var o=e.uin,a={};a.uin=o;var r=0;t.tool.GjJs("getQQLoginKey",{uin:o,keytype:"sid"},function(t){"ok"==t.err_msg&&0==t.ret&&(a.sid=t.key,a.uin=t.uin),i()}),t.tool.GjJs("getQQLoginKey",{uin:o,keytype:"skey"},function(t){"ok"==t.err_msg&&0==t.ret&&(a.skey=t.key),i()}),t.tool.GjJs("getQQLoginKey",{uin:o,keytype:"vkey"},function(t){"ok"==t.err_msg&&0==t.ret&&(a.vkey=t.key),i()}),t.tool.GjJs("getQQLoginKey",{uin:o,keytype:"a2key"},function(t){"ok"==t.err_msg&&0==t.ret&&(a.a2key=t.key),i()}),t.tool.GjJs("getQQLoginKey",{uin:o,keytype:"stwebkey"},function(t){"ok"==t.err_msg&&0==t.ret&&(a.stwebkey=t.key),i()})},t.api.GJGetVersionInfo=function(e){function n(){if(o++,o>=5){var t={result:0,msg:"ok",data:i};e(t)}}var i={},o=0;t.tool.GjJs("getQQSecureBuildNo",null,function(t){"ok"==t.err_msg&&(i.buildNo=t.ret),n()}),t.tool.GjJs("getQQSecureVersionName",null,function(t){"ok"==t.err_msg&&(i.versionName=t.ret),n()}),t.tool.GjJs("getQQSecureVersionCode",null,function(t){"ok"==t.err_msg&&(i.versionCode=t.ret),n()}),t.tool.GjJs("isQQSecureOfficial",null,function(t){"ok"==t.err_msg&&("true"==t.ret||1==t.ret?t.ret=!0:t.ret=!1,i.isOfficial=t.ret),n()}),t.tool.GjJs("isQQSecureInstalled",null,function(t){"ok"==t.err_msg&&("true"==t.ret||1==t.ret?t.ret=!0:t.ret=!1,i.isInstalled=t.ret),n()})},t.api.GJGetAccountInfo=function(e){t.tool.GjJs("getMainAccountInfo",{},function(t){var n={result:-1,msg:t.err_msg};"ok"==t.err_msg&&0==t.ret?("online"==t.state?(n.result=0,n.data={token:t.token,accountid:t.accountid}):"offline"==t.state?(n.result=1,n.data={token:t.token,accountid:t.accountid}):n.result=2,e(n)):e(n)})},t.api.saveUser=function(e){e.aid=e.aid||sdi_aid,t.api.ajax({url:i+"?method=saveUser",data:e,contentType:"application/json"})}}(_sdi,document),window._sdi){_sdi.init=function(){function t(){_sdi.api.GJInfo(function(t){t.data&&(_sdi.user.imei=t.data.imei,_sdi.user.guid=t.data.guid,_sdi.user.phone=t.data.phone)})}function e(){var t=document.title;_sdi.variable.hasInit||_sdi.share.init({link:location.href,title:t,desc:location.href})}_sdi.variable.debug=window.location.href.indexOf("debug=true")>0;var n=localStorage.getItem(_sdi.constant.c_uid);n||localStorage.setItem(_sdi.constant.c_uid,_sdi.tool.uuid()),_sdi.tool.getEnv(),"object"==typeof TcsJSBridge&&"function"==typeof TcsJSBridge.invoke?(e(),t()):document.addEventListener("TcsJSBridgeReady",function(){e(),t()},!1),"object"==typeof WeixinJSBridge&&"function"==typeof WeixinJSBridge.invoke?e():document.addEventListener("WeixinJSBridgeReady",function(){e()},!1),_sdi.api.getNetwork(function(t){_sdi.user.network=t})},_sdi.init(),_sdi.analytics.doPV(),_sdi.timing.stat(),_sdi.tool.addLoadListener(function(){});var eruda="//cdn.jsdelivr.net/eruda/1.0.4/eruda.min.js";_sdi.variable.debug&&(document.write('<script src="'+eruda+'"></script>'),document.write("<script>eruda.init();</script>"))}