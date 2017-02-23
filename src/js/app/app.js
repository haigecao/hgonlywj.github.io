/**
 * 获取初始化列表,获取数据
 * 参数： userInfo 用户数据 -1 代表用户没有登录
 *       status true [用户登录，获取用户信息] || false [获取不到用户信息]
 */
function getInitList(userInfo) {
    console.log("getInitList 初始化页面的列表");

    if (newUser.singalLogin == false) {         // newUser.singalLogin 为false, 证明用户没有登录
        initPage(noLoginData);                  // 使用打底数据，进行页面初始化
    } else {
        alert("1 —— " + JSON.stringify(userInfo));
        try {
            $.ajax({
                type: 'post',
                url: SELECT_URL,
                data: userInfo,
                dataType: 'json',
                success: function(data){
                    try {
                        alert("2 —— " + JSON.stringify(data));
                        console.log("list sucess", data);
                        newUser.ajaxDataList = data;            // 保存数据
                        newUser.hadprize = data.data.hadprize;  // 设定 今天是否可以领取
                        initPage(data);                         // 进行页面初始化
                    } catch (error) {
                        initPage(otherdata);              // 进行页面初始化
                        // alert("3—— " + JSON.stringify(error));
                    }
                },
                error: function(data){     // 获取数据失败，使用打底数据进行初始化
                    console.log("error ajax 获取失败 arguments ---------> ", arguments);

                    alert("4 —— " + JSON.stringify(data));
                    initPage(otherdata);        // 进行页面初始化
                }
            });
        } catch (error) {
            // alert("5 —— " + JSON.stringify(error));
            initPage(otherdata);              // 进行页面初始化
        }
    }
}

/**
 * 用户领取奖励
 *  逻辑是这样的，
 *      1）书豆，点击领取，直接发出请求
 *      2）滴滴和QB，需要先输入手机号或者QQ号，
 *          然后，请求之后，在显示
 *
 *  参数1、用户信息
 *  参数2、奖品类型
 *  参数3、显示弹窗类型 一个对象，
 *  参数4、day 第几天
 */
function setGift(userInfo, type, alertBox, day) {
    console.log("点击领取, 用户信息为", userInfo, " ajax URL", SET_URL);

    // 1:Q币 2:优惠券 3:书豆
    if (type == '3') {   // 如果是书豆，就直接发送用户信息，只有一次弹窗
        console.log("..... 3:书豆 .....");

        userInfo['txt'] = parseInt(Math.random() * 100000000);  // 跟后台约定，随机生成一个值，给回台。
        var alertItem = alertBox[0];
        console.log("数据发送 ----> " + JSON.stringify(arguments));
        // 设定数据
        $.ajax({
            type: 'post',
            url: SET_URL,
            timeout: 3000,  // 超时时间
            data: userInfo,
            dataType: 'json',
            success: function(data){
                console.log("[set 接收]-- data --> " + JSON.stringify(data));
                // alert(JSON.stringify(data));
                if (data.code == 0) {
                    setTimeout(function() {
                        $(".mod-alert").show();
                        $('.alert-box').hide();
                        $(alertItem).show();
                        $("input").val("");
                    }, 5);

                    updateGetCard();        // 更新卡片
                    $(".hg-gift-use").attr("day", day);     // 设定卡片

                    // 关闭弹窗
                    $(".alert-close").click(function () {
                        $('.alert-box').hide();
                        $(".mod-alert").hide();

                        var num = parseInt(day) + 16;   // 17 --> 23
                        _sdi.stat({ptype: '7',stype: num + ""});
                        console.log(" 按钮点击量 —— 第" + num + "天弹窗-关闭");
                    });
                }
                else {
                    console.log("setGift data is wrong <--- 设定数据失败 刷新 ---> ");
                    setTimeout(function() {
                        $(".mod-alert").show();
                        $('.alert-box').hide();
                        $("#alert11").show();
                    });

                    // 关闭弹窗
                    $(".next-again").click(function () {
                        $('.alert-box').hide();
                        $(".mod-alert").hide();
                        location.reload();
                    });
                }
            },
            error: function(xhr, type){     // 获取数据失败，使用打底数据进行初始化
                // location.reload();
                // 关闭弹窗
                // 显示
                setTimeout(function() {
                    $(".mod-alert").show();
                    $('.alert-box').hide();
                    $("#alert11").show();
                }, 5);

                // 关闭弹窗
                $(".next-again").click(function () {
                    $('.alert-box').hide();
                    $(".mod-alert").hide();
                    location.reload();
                });

                console.log(arguments);
            }
        });

    } else if (type == '1' || type == "2") {   // Q币 || 滴滴, 需要弹窗1次，但需要更新一次
        console.log(".....1 Q币 || 2 滴滴 .....");

        var alertItem1 = alertBox[0];
        var alertItem2 = alertBox[1];
        // console.log(alertBox);
        setTimeout(function() {
            $(".mod-alert").show();
            $('.alert-box').hide();
            $(alertItem1).show();
            $("input").val("");
        }, 5);

        // 关闭弹窗
        $(".alert-close").click(function () {
            $('.alert-box').hide();
            $(".mod-alert").hide();
        });

        $(".is-gift-get").click(function () {

            var txt = $(".input-value").val().trim();     // 获取用户信息，QQ或者电话
            userInfo["txt"] = txt;
            if (newUser.isGetCard == true) {        // 经过输入校验，手机或者QQ号
                // 设定数据
                $.ajax({
                    type: 'post',
                    url: SET_URL,
                    data: userInfo,
                    dataType: 'json',
                    success: function(data){
                        // alert(JSON.stringify(data));
                        if (data.code == 0) {
                            console.log("data 是对的", data);
                            updateGetCard();        // 更新卡片

                            $(".mod-alert").show();
                            $('.alert-box').hide();
                            $(alertItem2).show();

                            // 关闭弹窗
                            $(".alert-close").click(function () {
                                $('.alert-box').hide();
                                $(".mod-alert").hide();
                            });
                        }
                        else {
                            // location.reload();
                            console.log("data 是 错误的", data);
                            console.log("setGift data is wrong <--- 设定数据失败 刷新 ---> ");
                            setTimeout(function() {
                                $(".mod-alert").show();
                                $('.alert-box').hide();
                                $("#alert11").show();
                            });

                            // 关闭弹窗
                            $(".next-again").click(function () {
                                $('.alert-box').hide();
                                $(".mod-alert").hide();
                                location.reload();
                            });
                        }
                    },
                    error: function(xhr, type){     // 获取数据失败，使用打底数据进行初始化
                        console.log("setGift data is wrong <--- 设定数据失败 刷新 ---> ");
                        setTimeout(function() {
                            $(".mod-alert").show();
                            $('.alert-box').hide();
                            $("#alert11").show();
                        });

                        // 关闭弹窗
                        $(".next-again").click(function () {
                            $('.alert-box').hide();
                            $(".mod-alert").hide();
                            location.reload();
                        });
                    }
                });
            }
        });

    } else {
        ;
    }
}

/**
 * 更新 【领取】 卡片
 * 但用户领取奖品之后，就更新页面的状态，显示去使用。
 */
function updateGetCard() {
    var data = newUser.ajaxDataList.data.prizes[newUser.activateCard];  // 这个就是要更新的数据
    if (data["type"] == 1) {         // 1:Q币
        var iconClass = "icon icon-qb";

    } else if (data["type"] == 2) {  // 2:优惠券
        var iconClass = "icon icon-dd";

    } else if (data["type"] == 3) {  // 3:书豆
        var iconClass = "icon icon-sd";
    }

    data["itemClass"] = "item is-get";       // 图标设定
    data["iconClass"] = iconClass;
    data["showDay"] = "";
    data["own"] = 1;
    data["btntxt"] = newUser.btnText;
    data["txt"] = newUser.gitfText;         // 领取奖品后，设定真实文案
}

/**
 * 测试 用例
 */
function testExample() {
    newUser.singalLogin
}


/**
 * 页面初始化
 * 参数: 初始化数据
 *      3种情况的初始化，
 *          1）不是QB
 *          2）是QB，没有登录
 *          3）是QB，已经登录
 */
function initPage(initList) {

    if (initList.code == 0) {                        // 数据获取成功
        var isNewUser = initList.data.isNewUser;     // 0:老用户 1:新用户
        var timeOut = initList.data.timeout;         // 0:可以领奖 1:已超过领奖周期
    }
    else {                      // 没有数据， 或者数据失败，使用打底数据
        initList = otherdata;   // 【 otherdata 】 是用户未登录，或者不是QB的情况下
    }

    if (timeOut == 1) {                     // 超过领奖周期,已失效，所有的都已失效
        newUser.activityOver = true;        // 活动实效，页面所有的按钮都显示【已失效】
    }

    console.log('isNewUser', isNewUser, "timeOut", timeOut);

    // 已经登录的状态
    if (newUser.singalLogin == true) {
        // 如果是1 新用户，【默认】是老用户, 并且已经登录的状态。
        if (isNewUser == 1) {
            newUser.isOldUser = false;
        } else {                                // 如果是老用户，就显示打底数据
            console.log("isNewUser = ", isNewUser, "newUser.singalLogin = ", newUser.singalLogin);
            // alert("[ 老用户显示默认数据, 样式有bug，未显示老用户状态]");

            // 显示
            setTimeout(function() {
                $(".mod-alert").show();
                $('.alert-box').hide();
                $(".alert-box-hg").show();
            }, 5);

            // 关闭弹窗
            $(".next-say-ok").click(function () {
                _sdi.stat({ptype:'7',stype:'16'});
                console.log("活动仅限新用户参加");

                $('.alert-box-hg').hide();
                $(".mod-alert").hide();
            });
        }
    } else {    // 未登录
        console.log("未登录");
        // alert("未登录");
    }


    $("#mod-luckbox-app").css("visibility", "visible"); // 显示列表区域

    var vm = new Vue({
        el: '#mod-luckbox-app',
        data: function () {
            return {
                "prizelist": updatePrizesList(initList.data.prizes)    // 更新列表
            }
        },
        methods: {
            // 参数1： 属否已经领取过。
            //【1】领取过；【0】未领取； 【-1】第一个未领取的，页面展示为【领取，点击领取】
            // 参数2： 领取的类型，书豆，qb, 优惠卷
            // 参数3： 如果领过，跳转的URL。
            click: function (own, type, url, event, day) {
                console.log("arguments ---------------->   ", arguments);
                // 活动结束 或者 不是QQ浏览器 没有点击事件
                if (newUser.activityOver == true ||    // 活动结束
                    newUser.isQQBrowser == false) {     // 不是QB

                    console.log("【不是QQ浏览器】 或者 【活动已经失效】 没有点击事件, 取消");
                    return;
                }

                // 未登录 是QB
                if (newUser.isQQBrowser == true && newUser.singalLogin == false) {
                    console.log("是QB，开始登录。");
                    mustLogin().then(function (userInfo) {      // 必须登录
                        location.reload();                      // 登录就会刷新页面

                    }, function () {
                        return;
                    });
                } else {                           // 登录
                    type = type + "";
                    var alertBox = "";
                    if (own == 1) {                // 领取过，页面跳转，使用
                        location.href = url;       // 页面跳转
                        _sdi.stat({ ptype:'7',stype: parseInt(day) + 7 + "" });
                        console.log("按钮点击量 —— 第 " + parseInt(day) + 7 + " 天翻开-使用");

                        return;

                    } else if (own == -1) {        // 第一个未领取，弹出弹窗，让用户领取
                        switch (type) {
                            case "1":     // 1:Q币 2:优惠券 3:书豆
                                var alertBox = {
                                     0: "#alert6",
                                     1: "#alert5"
                                };
                                break;
                            case "2":
                                var alertBox = {
                                    0: "#alert8",
                                    1: "#alert7"
                                };
                                break;
                            case "3":
                                var alertBox =  {
                                    0: "#alert3"
                                };
                                break;
                        };

                        // 点击领取的时候，用户必须处于登录状态
                        mustLogin().then(function (userInfo) {
                            checkAccount(userInfo);         // 检测用户是否更换

                            _sdi.stat({ptype:'2',stype:day + ""});
                            console.log("参与 —— 领取第" + day +" 天");

                            console.log("setGift 设定礼物");
                            setGift(userInfo, type, alertBox, day);
                            newUser.isAbleClick = true;
                        }, function () {
                            // 测试
                            console.log("测试  领取商品");
                            // newUser.isAbleClick = true;
                        });

                    } else if (own == 0) {         // 未领取，点击无效
                        return;
                    }


                }
            }
        }
    });

    console.log("--------------------------");
}

/**
 * 参数，用户信息
 */
function checkAccount(userInfo) {

    if (newUser.userAccount == "") {
        newUser.userAccount = userInfo.account;
    } else if (newUser.userAccount != userInfo.account) {
        location.reload();
    }
}


/**
 * 更新显示列表,为显示更新。
 *  用户不是新用户了，或者活动过期。
 *  只要用户领过，数据还在，那么就显示用户领过的。
 * @param prizes
 */
function updatePrizesList(prizes) {
    console.log("-------> prizes", prizes);
    // alert(JSON.stringify(prizes));
    var count = 0;
    try {
        var singallingQu = true;               // 定位【首次领取】
        for (var pro in prizes) {

            if (newUser.isQQBrowser == false) { // 不在QQ浏览器内，显示未开启
                var itemClass = "item";
                prizes[pro]["itemClass"] = itemClass;
                prizes[pro]["showDay"] = "第" + prizes[pro]["day"] + "天";
                prizes[pro]['btntxt'] = "未开启";
            }
            // 未登录,并且活动没有失效
            else if (newUser.singalLogin == false && newUser.activityOver == false &&
                singallingQu == true && newUser.isQQBrowser == true) {
                console.log("未登录的时候，设定第一个为领取状态");
                singallingQu = false;           // 第一个未领取处理完成，将标志位置位。

                var itemClass = "item is-gift";
                prizes[pro]["itemClass"] = itemClass;
                prizes[pro]['own'] = -1;        // 第一个未领取的，设定未 -1
                newUser.activateCard = pro;     // 记录第几张卡片

                prizes[pro]["showDay"] = "第" + prizes[pro]["day"] + "天";

                if (prizes[pro]["type"] == 1) {         // 1:Q币
                    var updateIcon = "icon icon-qb";

                } else if (prizes[pro]["type"] == 2) {  // 2:优惠券
                    var updateIcon = "icon icon-dd";

                } else if (prizes[pro]["type"] == 3) {  // 3:书豆
                    var updateIcon = "icon icon-sd";
                }
                prizes[pro]["updateIcon"] = updateIcon;     // 点击领取以后进行更新
                newUser.btnText = prizes[pro]['btntxt'];    // 保存翻牌之后的数据

                prizes[pro]['btntxt'] = "领取";

            }
            // 活动 已经失效，并且用户没有领过。
            else if (newUser.activityOver == true && prizes[pro]['own'] == 0) {

                var itemClass = "item";
                prizes[pro]["itemClass"] = itemClass;
                prizes[pro]["showDay"] = "第" + prizes[pro]["day"] + "天";
                prizes[pro]['btntxt'] = "已失效";
            }
            // 已领取
            else if (prizes[pro]["own"] == 1 && newUser.isQQBrowser == true) {
                console.log("--------------> 已领取");
                // alert("--------------> 已领取");

                if (prizes[pro]["type"] == 1) {         // 1:Q币
                    var iconClass = "icon icon-qb";

                } else if (prizes[pro]["type"] == 2) {  // 2:优惠券
                    var iconClass = "icon icon-dd";

                } else if (prizes[pro]["type"] == 3) {  // 3:书豆
                    var iconClass = "icon icon-sd";
                }

                prizes[pro]["itemClass"] = "item is-get";       // 图标设定
                prizes[pro]["iconClass"] = iconClass;
                prizes[pro]["showDay"] = "";

                prizes[pro]["txt"] = initShowGift(prizes[pro]); // 设定领奖礼品内容
            }
            // 首先判断是否领取 0 未领取，显示领取，将第一个未领取的变成领取的状
            // 并且必须是QQ浏览器，否则，就不开启第一个
            // 并且newUser.hadprize 为0，如果为1，证明今天领过了。
            else if (prizes[pro]["own"] == 0 && singallingQu == true &&
                newUser.activityOver == false && newUser.isOldUser == false &&
                newUser.isQQBrowser == true && newUser.hadprize == 0) {

                console.log("设定第一个为领取状态");
                singallingQu = false;           // 第一个未领取处理完成，将标志位置位。

                var itemClass = "item is-gift";
                prizes[pro]["itemClass"] = itemClass;
                prizes[pro]['own'] = -1;        // 第一个未领取的，设定未 -1
                newUser.activateCard = pro;     // 记录第几张卡片

                addAlertGift(prizes[pro]);      // 添加弹窗，因为只有一个弹窗可以被开启，就是领取弹窗

                prizes[pro]["showDay"] = "第" + prizes[pro]["day"] + "天";

                if (prizes[pro]["type"] == 1) {         // 1:Q币
                    var updateIcon = "icon icon-qb";

                } else if (prizes[pro]["type"] == 2) {  // 2:优惠券
                    var updateIcon = "icon icon-dd";

                } else if (prizes[pro]["type"] == 3) {  // 3:书豆
                    var updateIcon = "icon icon-sd";
                }
                prizes[pro]["updateIcon"] = updateIcon;     // 点击领取以后进行更新
                newUser.btnText = prizes[pro]['btntxt'];    // 保存翻牌之后的数据

                prizes[pro]['btntxt'] = "领取";
            }
            // 显示未开启
            else if (prizes[pro]["own"] == 0) {
                console.log("显示未开启------------->");
                count++;

                var itemClass = "item";
                prizes[pro]["itemClass"] = itemClass;
                prizes[pro]["showDay"] = "第" + prizes[pro]["day"] + "天";
                prizes[pro]['btntxt'] = "未开启";
            }
        }
        newUser.prizesList = prizes;    // 保存渲染列表

        console.log("保存渲染列表 prizes ", prizes);
        // alert(count);
        return prizes;
    } catch (error) {
        console.log("error prizes", error);
    }
}

/**
 * 初始化 已经领取过的商品 的内容

 正式环境
         271	50豆
         272	100豆
         273	150豆
         274	200豆

 * 展示商品内容
 */
function initShowGift (obj) {
    var showGift = "";      // 展示领取过的商品

    if (newUser.isReal == true) {
        if (obj['type'] == "3") {           // 书豆
            if (obj['amount'] == "271") { // 50书豆
                showGift = "50书豆";
            } else if (obj['amount'] == "272") {
                showGift = "100书豆";
            } else if (obj['amount'] == "273") {
                showGift = "150书豆";
            } else if (obj['amount'] == "274") {
                showGift = "200书豆";
            } else {
                showGift = "更多书豆";
            }

        } else if (obj['type'] == "1") {    // QB
            showGift = obj["amount"] + " Q币";
        } else if (obj['type'] == "2") {    // 滴滴
            showGift = "百元礼包";
        }
    } else {    // 测试环境

        if (obj['type'] == "3") {           // 书豆
            if (obj['amount'] == "11118") { // 50书豆
                showGift = "50书豆";
            } else if (obj['amount'] == "11119") {
                showGift = "100书豆";
            } else if (obj['amount'] == "11166") {
                showGift = "150书豆";
            } else if (obj['amount'] == "11120") {
                showGift = "200书豆";
            } else {
                showGift = "更多书豆";
            }

        } else if (obj['type'] == "1") {    // QB
            showGift = obj["amount"] + " Q币";
        } else if (obj['type'] == "2") {    // 滴滴
            showGift = "百元礼包";
        }
    }

    return showGift;        // 返回礼品内容
}


/**
 * 显示礼品的弹窗初始化
 *  正式环境
 271	50豆
 272	100豆
 273	150豆
 274	200豆
 */
function addAlertGift(obj) {
    // 书豆
    // if (obj['type'] == "3") {
    //     if (obj['amount'] == "271") { // 50书豆
    //         obj['alertTxt'] = "50书豆";
    //     } else if (obj['amount'] == "272") {
    //         obj['alertTxt'] = "100书豆";
    //     } else if (obj['amount'] == "273") {
    //         obj['alertTxt'] = "150书豆";
    //     } else if (obj['amount'] == "274") {
    //         obj['alertTxt'] = "200书豆";
    //     } else {
    //         obj['alertTxt'] = "更多书豆";
    //     }
    //
    // } else if (obj['type'] == "1") {    // QB
    //     obj['alertTxt'] = obj["amount"] + " Q币";
    // } else if (obj['type'] == "2") {    // 滴滴
    //     obj['alertTxt'] = "百元礼包";
    // }

    obj['alertTxt'] = initShowGift (obj);

    console.log("书豆---------->", obj['alertTxt']);

    var sd ='<div class="alert-box hb ani" id="alert3">' +
                '<a class="G-ico G-ico-close alert-close" style="z-index: 1000"></a>' +
                '<div class="con">' +
                    '<div class="tit">恭喜你获得<br /><span class="color">' + obj.alertTxt + '</span></div>' +
                    '<div class="icon icon-sd"></div>' +
                    '<div class="mbtn hg-gift-use">' + obj.btntxt + '<span class="G-ico G-ico-arr-r"></span></div>' +
                '</div>' +
            '</div>';

    // 滴滴
    var dd ='<div class="alert-box hb ani" id="alert8">' +
            '<a class="G-ico G-ico-close alert-close" href="#"></a>' +
            '<div class="con">' +
            '<div class="tit">恭喜你获得<br /><span class="color">' + obj.txt + '</span></div>' +
            '<div class="input"><input type="text" class="input-dd-tel input-value" onkeyup="checkTelNumber()" placeholder="请输入手机号后点击领取" /></div>' +
            '<div class="mbtn is-get is-disable is-gift-get">点击领取</div>' +
            '<p class="tips"><span class="color">已阅读</span>并同意滴滴出行的' +
            '<a href="http://static.udache.com/gulfstream/webapp/pages/activity-rules.html">活动规则</a></p>' +
            '</div>' +
            '</div>';

    var getDd = '<div class="alert-box hb ani" id="alert7" style="display:none;">' +
                '<a class="G-ico G-ico-close alert-close" href="#"></a>' +
                '<div class="con">' +
                '<div class="tit">恭喜你获得<br /><span class="color">' + obj['alertTxt'] + '</span></div>' +
                '<div class="icon icon-dd"></div>' +
                '<div class="mbtn hg-gift-use">' + obj.btntxt +'<span class="G-ico G-ico-arr-r"></span></div>' +
                '</div>' +
                '</div>';

    // qb
    var qb ='<div class="alert-box hb ani" id="alert6" style="display:none;">' +
            '<a class="G-ico G-ico-close alert-close" href="#"></a>' +
            '<div class="con">' +
            '<div class="tit">恭喜你获得<br /><span class="color">' + obj.txt + '</span></div>' +
            '<div class="input"><input class="input-qq-num input-value" onkeyup="checkQQNumber()" type="text" placeholder="请输入QQ号后点击领取" /></div>' +
            '<div class="mbtn is-get is-disable is-gift-get">点击领取</div>' +
            '<p class="tips">Q币将在<span class="color">7个工作日</span>发放对应的QQ中</p>' +
            '</div>'+
            '</div>';

    var getQb = '<div class="alert-box hb ani" id="alert5" style="display:none;">'+
                '<a class="G-ico G-ico-close alert-close" href="#"></a>'+
                '<div class="con">'+
                '<div class="tit">恭喜你获得<br /><span class="color">' + obj['alertTxt'] +'</span></div>'+
                '<div class="icon icon-qb"></div>'+
                '<div class="mbtn hg-gift-use">'+ obj.btntxt +'<span class="G-ico G-ico-arr-r"></span></div>'+
                '</div>'+
                '</div>';

    var failAlert = '<div class="alert-box title-many-line ani" id="alert11" style="display:none;">' +
                    '<div class="alert-content content-text">' +
                    '<p class="title">领取失败，请稍后重试</p>' +
                    '</div>' +
                    '<div class="btn-group two">' +
                    '<a class="btn btn-common next-again" >确认</a>' +
                    '</div>' +
                    '</div>';
    //------------------------------------------------------------------------------------
    var tpl = "";
    switch (obj.type) {         //奖品类型 1:Q币 2:优惠券 3:书豆
        case "1":
            tpl = qb + getQb;
            newUser.gitfText = obj.alertTxt;         // 保存 真实奖品文案

            break;
        case "2":
            tpl = dd + getDd;
            newUser.gitfText = obj.alertTxt;         // 保存 真实奖品文案

            break;
        case "3":{
            tpl = sd;
            newUser.gitfText = obj.alertTxt;    // 保存 真实奖品文案
            break;
        }
    }
    tpl = tpl + failAlert;
    $(".mod-alert").html(tpl);



    // 绑定跳转的URL
    $(".hg-gift-use").click(function () {
        console.log("跳转的URL = ", obj.url);
        $(".mod-alert").hide();
        $('.alert-box').hide();

        var day = $(".hg-gift-use").attr('day');        // 获取 设置的属性
        _sdi.stat({ptype: '7',stype: day});

        location.href = obj.url;        // 跳转
    });

    // change 检测手机号
    $(".is-dd-get").click(function () {
        var value = $(".input-dd-tel").val().trim();
        if (isTelNumber(value) == true) {
            $('.alert-box').hide();
            $(".mod-alert").hide();
            // updateCard();       // 更新卡片-翻转
        } else {
            ;
        }
    });
}
/**
 * 检测手机号的正确性
 */
function checkTelNumber() {
    var value = $(".input-dd-tel").val().trim();
    if (isTelNumber(value) == true) {       // 手机号正确，更新样式
        $('#alert8 .is-gift-get').removeClass("is-disable");
        newUser.isGetCard = true;   // 允许点击领取

    } else {
        $('#alert8 .is-gift-get').addClass("is-disable");
        newUser.isGetCard = false;   // 不允许点击领取
    }
}

// 检测QQ号的正确行
function checkQQNumber() {
    // "/^\d{5,10}$/.test(this.value)
    var value = $(".input-qq-num").val().trim();
    if (/^\d{5,10}$/.test(value) == true) {
        $('#alert6 .is-gift-get').removeClass("is-disable");
        newUser.isGetCard = true;   // 允许点击领取
    } else {
        $('#alert6 .is-gift-get').addClass("is-disable");
        newUser.isGetCard = false;   // 不允许点击领取
    }
}

/**
 * 显示 TBS 弹框
 */
function showTbs() {
    try {
        // 判断是否安装了 QB
        mtt.qb.isInstall(function (state) {
            console.log("HG", state);
            if (state == true) {  // 是QB 快速打开
                $(".fast-install").html("打开浏览器");
            }

            // 显示
            setTimeout(function() {
                $(".mod-alert").show();
                $('.alert-box').hide();
                $("#alert9").show();
            }, 5);

            // 稍后再说
            $(".next-say").click(function () {
                $('.alert-box').hide();
                $(".mod-alert").hide();
            });


            // 极速安装， 有QB打开QB，跳转到真实页面地址
            $(".fast-install").click(function () {
                if (state) {
                    mtt.qb.openQb({
                        url: location.href,      // 跳转到指定的活动地址
                        posid: 36,
                        ct: 'newUserSave'
                    });

                } else {
                    mtt.qb.download({
                        appStore: 'https://itunes.apple.com/app/apple-store/id370139302?pt=69276&ct=ecup0609&mt=8',
                        androidUrl: 'http://mdc.html5.qq.com/package?channel_id=10983',
                        process: "",
                        success: "",
                        error: ""
                    });
                }

                $('.alert-box').hide();
                $(".mod-alert").hide();
                console.log("下载安装 location.href", location.href);
            });
        });
    } catch (error) {

        console.log("[ jsapi error ]", error);
    }

}


// 更新卡片,领取输入信息的时候，更新卡片
function updateCard() {
    newUser.prizesList[newUser.activateCard].showDay = "";                      // 更新天数
    newUser.prizesList[newUser.activateCard].itemClass = "item is-get";         // 图标设定
    newUser.prizesList[newUser.activateCard].iconClass = newUser.prizesList[newUser.activateCard].updateIcon;   // 更新icon
    newUser.prizesList[newUser.activateCard].btntxt = newUser.btnText;          // 更新文案
    newUser.prizesList[newUser.activateCard].own = 1;                           // 更新为领取
}


/**
 * 初始化页面
 * 1）判断平台,
 *      a)  ios 需要获取 安装时间
 * 2）判断是否登录
 *      a） 未登录，显示第1天，可以点击。
 *      b） 登录，现在用户信息列表
 */
function init() {
    /**
     * 先判断是否是QQ浏览器，不是弹窗，关闭弹窗，显示为空
     * 如果是，就继续。获取数据。
     */
    mobileDevice().then(function () {       // 获取设备信息
        if (newUser.isQQBrowser == false) {       // 不是QQ浏览器,弹出下载QB
            showTbs();                      // 弹出QQ浏览器安装页面
            initPage(otherdata);            // 进行页面初始化，也没有点击事件
            console.log("testdata 不是QQ浏览器,弹出下载QB");

            // alert("不是QQ浏览器,弹出下载QB");
        } else {                            // 是QQ浏览器
            console.log("是QQ浏览器");
            // alert("是QQ浏览器");
            // 获取用户信息，但是不强制用户登录
            getAccountInfo().then(function (userInfo) {     // 登录
                console.log("获取用户信息成功", userInfo);
                newUser.singalLogin = true;                 // 用户登录置位
                getInitList(userInfo);                      // 初始化页面

            }, function (data) {                            // 用户没有登录
                console.log("用户没有登录, 使用默认数据展示", data);
                newUser.singalLogin = false;                // 用户登录置位
                newUser.hadprize = 0;
                initPage(noLoginData);                      // 初始化页面
            });
        }
    }, function () {

        // alert("不是QQ浏览器,弹出下载QB");
        showTbs();                      // 弹出QQ浏览器安装页面
        initPage(otherdata);            // 进行页面初始化，也没有点击事件
    });
}

if (location.href.indexOf("real") != -1) {  // 正式环境

    var SELECT_URL = 'https://interactive.html5.qq.com/act/winnerslist/select';
    var SET_URL = 'https://interactive.html5.qq.com/act/winnerslist/set';
    newUser.isReal = true;      // 正式环境

} else {                                    // 测试环境
    newUser.isReal = false;
    // var SELECT_URL = 'http://act.sparta.html5.qq.com/act/winnerslist/select';

    var SELECT_URL = 'http://actcom.cs0309.imtt.qq.com/act/winnerslist/select';    
    var SET_URL = 'http://act.sparta.html5.qq.com/act/winnerslist/set';
}

// 工程初始化
init();


