/**
 *    一种兼容前端的Promise写法
 */
function PromiseHG(resolver) {
    var queue = []; //链式调用数组
    resolver(resolve, reject);
    function next(state, val) {
        var arr;
        var chainRs;
        //一个Promise后面又可以有多个then，为了使resolve晚于then执行，用一个setTimeout
        setTimeout(function () {
            if (arr = queue.shift()) {
                chainRs = arr[state](val);
                if (!chainRs)
                    return;
                //某一个resolve函数返回的又是一个Promise对象
                if (chainRs && typeof chainRs.then == 'function') {
                    chainRs.then(resolve, reject);
                } else {
                    //resolve函数返回一个普通的值
                    resolve(chainRs) //.then(resolve, reject);
                }
            }
        }, 0);
    }

    function resolve(x) { // 成功
        next(0, x);
    }

    function reject(reason) { // 失败
        next(1, reason);
    }

    //  Promise最明显的特征 是可以then  then接收两个参数
    //  then就是将传入的函数放入队列中
    this.then = function (resolve, reject) {
        queue.push([resolve, reject]); //resovle  reject  这两个参数也都是函数
        return this;
    };
}

// 获取用户信息。设定用户信息格式
function setUserInfo(data) {
    var userInfo = {
        id: newUser.activeId,   // 活动期数
        time: newUser.iosUserInstallTime,
        qbid: data.qbid,
        loginType: data.type, //登陆类型   1=QQ 2=Weixin
        account: data.uin, //QQ号或weixin openid
        head: data.head, //头像
        skey: {
            1: data.skey,
            2: data.token
        }[data.type] //微信为access_token,qq为skey
    };

    return userInfo;
}

// 更新token,由于用户登录2小时以后，会token过期，因此要更新用户token
// 更新不成功，就唤起登录态。再次登录。
function refreshToken(userInfo) {
    var promise = new PromiseHG(function(resolve, reject) {
        try {
            browser.login.refreshToken({
                uin: userInfo.account
            }, function(data) {
                if (data && data.uin) {
                    var userInfo = setUserInfo(data);
                    resolve(userInfo);
                } else {
                    reject(false);
                }
            });
        } catch (e) {
            reject(-1);
        }
    });

    return promise;
}

var QB_userStatus = {
    notLogin : -17,         // 用户取消登录
    serviceError : -27,     // 接口失败
    codeError : -37,        // 代码问题
};

/**
 * 获取用户登录信息，如果用户没有登录，就强制用户登录
 * @returns {PromiseHG}
 */
function mustLogin() {
    var promise = new PromiseHG(function(resolve, reject) {
        try {
            browser.login.getAccountInfo(function(data) {
                if (data && data.uin) {
                    var userInfo = setUserInfo(data);
                    // console.log("[start userInfo---------- ]", userInfo);
                    // resolve(userInfo);
                    refreshToken(userInfo).then(function (userInfo) {
                        // console.log("[refreshToken userInfo ----------- ]", userInfo);
                        resolve(userInfo);
                    }, function () {
                        try {
                            browser.login.showLoginPanel(function(data) {
                                if (data && data.uin) {
                                    var userInfo = setUserInfo(data);
                                    resolve(userInfo);
                                    //alert("data " + JSON.stringify(data));
                                } else {
                                    reject(QB_userStatus.notLogin);       //用户取消登录
                                    //alert("error " + JSON.stringify(error));
                                }
                            }, function(error) {
                                reject(QB_userStatus.serviceError);           //接口失败
                                //alert("error " + JSON.stringify(error));
                            }, {
                                appID: 13872
                            });
                        } catch (error) {
                            console.log(error);
                            //alert("error " + JSON.stringify(error));
                            reject(QB_userStatus.codeError);    // 代码问题。估计就是jsapi
                        }
                    });

                } else {
                    try {
                        browser.login.showLoginPanel(function(data) {
                            if (data && data.uin) {
                                var userInfo = setUserInfo(data);
                                resolve(userInfo);
                                //alert("data " + JSON.stringify(data));
                            } else {
                                reject(QB_userStatus.notLogin);       //用户取消登录
                                //alert("error " + JSON.stringify(error));
                            }
                        }, function(error) {
                            reject(QB_userStatus.serviceError);           //接口失败
                            //alert("error " + JSON.stringify(error));
                        }, {
                            appID: 13872
                        });
                    } catch (error) {
                        // console.log(error);
                        //alert("error " + JSON.stringify(error));
                        reject(QB_userStatus.codeError);    // 代码问题。估计就是jsapi
                    }
                }
            }, function(err) {
                //reject(-101); //接口失败
                reject(QB_userStatus.serviceError);     //接口失败
                //alert("error " + JSON.stringify(error));
            }, {
                appID: 13872
            });
        } catch (error) {
            // console.log("error", error);
            reject(QB_userStatus.codeError);    // 代码问题。估计就是jsapi
            //alert("error " + JSON.stringify(error));
        }
    });
    return promise;
}

/**
 * 获取用户信息,并不强制登录。
 */
function getAccountInfo(){
    var promise = new PromiseHG(function(resolve, reject) {
        try {
            browser.login.getAccountInfo(function(data) {
                    if (data && data.qbid) {            //判断用户已登录
                        var userInfo = setUserInfo(data);
                        checkAccount(userInfo);

                        resolve(userInfo);
                    } else {
                        reject(-1);
                    }
                },
                function(err) {
                    reject(-1); //接口失败
                }, {
                    appID: 13872
                });
        } catch (error) {
            // alert("[getAccountInfo]" + JSON.stringify(error));
            reject(-1);
        };
    });

    return promise;
}

/**
 * 获取设备类型
 */
function mobileDevice() {
    var promise = new PromiseHG(function(resolve, reject) {
        try {
            var ua = navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            newUser["device"] = {};
            newUser.device.ios = newUser.device.android = newUser.device.iphone = newUser.device.ipad = newUser.device.androidChrome = false;
            // Android
            if (android) {
                newUser.device.os = 'android';
                newUser.device.osVersion = android[2];
                newUser.device.android = true;
                newUser.device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
            }
            //ios
            if (ipad || iphone || ipod) {
                newUser.device.os = 'ios';
                newUser.device.ios = true;
            }

            isQQBrowser();
            // 在QB内
            if (newUser.isQQBrowser == true) {
                try {
                    browser.define("browser.app.setShareInfo", function(options, callback/*参数列表*/){
                        var _toString = Object.prototype.toString,
                            _cb = _toString.call(callback) === '[object Function]' ? callback : function () {},
                            _opt = options;

                        if (_toString.call(_opt) !== '[object Object]') {
                            _cb({code: 1, msg: 'options 参数错误，必须为Object'});
                        }
                        else if (_toString.call(_opt.title) !== '[object String]') {
                            _cb({code: 2, msg: 'options.title 参数错误，必须为String'});
                        }
                        else {
                            if (_toString.call(window.browser.execWebFn) !== '[object Object]') {
                                Object.defineProperty(window.browser, 'execWebFn', {value: {}});
                            }

                            _opt['content_type'] = 1;
                            window.browser.execWebFn.shareInfoOptions = _opt;

                            if (_toString.call(window.browser.execWebFn.customQbMenuShareInfo) !== '[object Function]') {
                                Object.defineProperty(window.browser.execWebFn, 'customQbMenuShareInfo', {value: function (options/*终端传递过来的参数对象*/) {
                                    return JSON.stringify(window.browser.execWebFn.shareInfoOptions);
                                }});
                            }
                            _cb({code: 0, msg: '5设置成功'});
                        }
                    });

                    var options = {
                        title : "QQ浏览器新用户礼包",
                        url : window.location.href,
                        img_url:"http://res.imtt.qq.com/newuserSave/real/shareIcon.png",
                        img_title:"QQ浏览器新用户礼包",
                        description : "QQ浏览器新用户有福啦！壕送7大礼包，天天有惊喜，最高1000Q币",
                        cus_txt : "来自:QQ浏览器"
                    };

                    // 设置 分享 中心
                    browser.app.setShareInfo(options, function(data) {
                        // alert(JSON.stringify(data));
                        if (newUser.device.ios == true) {       // 安卓获取时间
                            getIOSInstallTime().then(function () {
                                resolve(1);
                            }, function () {
                                reject(-1);
                            });
                        } else {
                            resolve(1);
                        }
                    });

                } catch (error) {
                    window.newUser.iosUserInstallTime = "-1";     // 初始化为空
                    // alert("jsapi error" + JSON.stringify(error));            // JSAPI 有问题，就认为是有问题的用户
                    reject(-1);
                }
            } else {
                resolve(1);
            }

        } catch (e) {
            console.log("[mobileDevice error]");
            reject(-1);
        }
    });

    return promise;
}

/**
 * 获取IOS时间
 */
function getIOSInstallTime() {

    var promise = new PromiseHG(function(resolve, reject) {
        try {
            browser.app.getInstallTime(function(time){
                // 2000-01-01-00:00:00
                time = time + "";
                time = time.substr(0, 10);
                newUser.iosUserInstallTime = Date.parse(new Date(time));
                resolve(1);
            });
        } catch (error) {
            // alert("[getAccountInfo]" + JSON.stringify(error));

            reject(-1);
        };
    });

    return promise;
}

/**
 * 判断是否是QB
 * @returns {boolean}
 */
function isQQBrowser() {
    var UA = navigator.userAgent;
    var isWeChat = /MicroMessenger/i.test(UA);
    var isMobileQQ = / QQ\//i.test(UA);
    var isQZone = /Qzone/i.test(UA);
    var isTBS = / TBS\//i.test(UA);
    var notQBCore = !isWeChat && !isMobileQQ && !isQZone && !isTBS;
    var isQQBrowser = false;

    if (typeof window.browser != undefined && typeof browser.app != undefined
        && typeof browser.login != undefined) {

        isQQBrowser = true;
    }

    isQQBrowser = /MQQBrowser/i.test(UA) && notQBCore;

    newUser.isQQBrowser = isQQBrowser;
    return isQQBrowser;
}


//判断输入手机号码
function isTelNumber(value) {
    if (!value) {
        return false;
    }

    var val = value.toString().trim();

    if (val.length == 11) {
        reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
        if (!reg.test(val)) { //判断是否为数字类型
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}


/**
 * 【未登录】和【不是QQ浏览器】
 */
var otherdata = {
    "code": 0,
    "msg": "succ",
    "data": {
        "isNewUser": 0,     // 0:老用户 1:新用户
        "timeout": 1,       // 0:可以领奖 1:已超过领奖周期
        'hadprize': 1,      // 0，今天可以领，1今天不可以领
        "prizes": [
            {
                "id": "x11",
                "actid": "x1",
                "day": "1",             //第几天
                "type": "3",            //奖品类型 1:Q币 2:优惠券 3:书豆
                "amount": "11118",      //奖品数量 书豆为活动规则编号
                "txt": "惊喜礼包",       //奖品文案
                "btntxt": "未开启",      //按钮文案
                "url": "",              //按钮跳转链接
                "own": 0                //0:未领取 1:已获得
            },
            {
                "id": "x12",
                "actid": "x1",
                "day": "2",
                "type": "2",
                "amount": "1",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            },
            {
                "id": "x13",
                "actid": "x1",
                "day": "3",
                "type": "1",
                "amount": "2",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            },
            {
                "id": "x14",
                "actid": "x1",
                "day": "4",
                "type": "2",
                "amount": "1",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            },
            {
                "id": "x15",
                "actid": "x1",
                "day": "5",
                "type": "2",
                "amount": "1",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            },
            {
                "id": "x16",
                "actid": "x1",
                "day": "6",
                "type": "2",
                "amount": "1",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            },
            {
                "id": "x17",
                "actid": "x1",
                "day": "7",
                "type": "1",
                "amount": "2",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            }
        ]
    }
};


/**
 * 【未登录】和【不是QQ浏览器】
 */
var noLoginData = {
    "code": 0,
    "msg": "succ",
    "data": {
        "isNewUser": 1,     // 0:老用户 1:新用户
        "timeout": 0,       // 0:可以领奖 1:已超过领奖周期
        'hadprize': 0,      // 0，今天可以领，1今天不可以领
        "prizes": [
            {
                "id": "x11",
                "actid": "x1",
                "day": "1",             //第几天
                "type": "3",            //奖品类型 1:Q币 2:优惠券 3:书豆
                "amount": "11118",      //奖品数量 书豆为活动规则编号
                "txt": "惊喜礼包",        //奖品文案
                "btntxt": "领取",         //按钮文案
                "url": "",              //按钮跳转链接
                "own": 0                //0:未领取 1:已获得
            },
            {
                "id": "x12",
                "actid": "x1",
                "day": "2",
                "type": "2",
                "amount": "1",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            },
            {
                "id": "x13",
                "actid": "x1",
                "day": "3",
                "type": "1",
                "amount": "2",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            },
            {
                "id": "x14",
                "actid": "x1",
                "day": "4",
                "type": "2",
                "amount": "1",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            },
            {
                "id": "x15",
                "actid": "x1",
                "day": "5",
                "type": "2",
                "amount": "1",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            },
            {
                "id": "x16",
                "actid": "x1",
                "day": "6",
                "type": "2",
                "amount": "1",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            },
            {
                "id": "x17",
                "actid": "x1",
                "day": "7",
                "type": "1",
                "amount": "2",
                "txt": "惊喜礼包",
                "btntxt": "未开启",
                "url": "",
                "own": 0
            }
        ]
    }
};
