var testdata = {
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
                "txt": "50书豆",        //奖品文案
                "btntxt": "去使用",       //按钮文案
                "url": "https://life.html5.qq.com/coupondlist/coupondlist.html?ch=003617",//按钮跳转链接
                "own": 1                //0:未领取 1:已获得
            },
            {
                "id": "x12",
                "actid": "x1",
                "day": "2",
                "type": "2",
                "amount": "1",
                "txt": "滴滴优惠卷",
                "btntxt": "去使用",
                "url": "https://circle.html5.qq.com/node/?from=077#circle/q_21051121022_1427099654543630",
                "own": 0
            },
            {
                "id": "x13",
                "actid": "x1",
                "day": "3",
                "type": "1",
                "amount": "2",
                "txt": "10·Q币",
                "btntxt": "去使用",
                "url": "https://circle.html5.qq.com/node/?from=077#circle/q_21051121022_1427099654543630",
                "own": 0
            },
            {
                "id": "x14",
                "actid": "x1",
                "day": "4",
                "type": "2",
                "amount": "1",
                "txt": "惊喜礼包",
                "btntxt": "领取",
                "url": "https://circle.html5.qq.com/node/?from=077#circle/q_21051121022_1427099654543630",
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
                "url": "https://circle.html5.qq.com/node/?from=077#circle/q_21051121022_1427099654543630",
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
                "url": "https://circle.html5.qq.com/node/?from=077#circle/q_21051121022_1427099654543630",
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
                "url": "https://circle.html5.qq.com/node/?from=077#circle/q_21051121022_1427099654543630",
                "own": 0
            }
        ]
    }
};

// /**
//  * 【未登录】和【不是QQ浏览器】
//  */
// var otherdata = {
//     "code": 0,
//     "msg": "succ",
//     "data": {
//         "isNewUser": 0,     // 0:老用户 1:新用户
//         "timeout": 0,       // 0:可以领奖 1:已超过领奖周期
//         "prizes": [
//             {
//                 "id": "x11",
//                 "actid": "x1",
//                 "day": "1",             //第几天
//                 "type": "3",            //奖品类型 1:Q币 2:优惠券 3:书豆
//                 "amount": "11118",      //奖品数量 书豆为活动规则编号
//                 "txt": "惊喜礼包",        //奖品文案
//                 "btntxt": "未开启",       //按钮文案
//                 "url": "",//按钮跳转链接
//                 "own": 0                //0:未领取 1:已获得
//             },
//             {
//                 "id": "x12",
//                 "actid": "x1",
//                 "day": "2",
//                 "type": "2",
//                 "amount": "1",
//                 "txt": "惊喜礼包",
//                 "btntxt": "未开启",
//                 "url": "",
//                 "own": 0
//             },
//             {
//                 "id": "x13",
//                 "actid": "x1",
//                 "day": "3",
//                 "type": "1",
//                 "amount": "2",
//                 "txt": "惊喜礼包",
//                 "btntxt": "未开启",
//                 "url": "",
//                 "own": 0
//             },
//             {
//                 "id": "x14",
//                 "actid": "x1",
//                 "day": "4",
//                 "type": "2",
//                 "amount": "1",
//                 "txt": "惊喜礼包",
//                 "btntxt": "未开启",
//                 "url": "",
//                 "own": 0
//             },
//             {
//                 "id": "x15",
//                 "actid": "x1",
//                 "day": "5",
//                 "type": "2",
//                 "amount": "1",
//                 "txt": "惊喜礼包",
//                 "btntxt": "未开启",
//                 "url": "",
//                 "own": 0
//             },
//             {
//                 "id": "x16",
//                 "actid": "x1",
//                 "day": "6",
//                 "type": "2",
//                 "amount": "1",
//                 "txt": "惊喜礼包",
//                 "btntxt": "未开启",
//                 "url": "",
//                 "own": 0
//             },
//             {
//                 "id": "x17",
//                 "actid": "x1",
//                 "day": "7",
//                 "type": "1",
//                 "amount": "2",
//                 "txt": "惊喜礼包",
//                 "btntxt": "未开启",
//                 "url": "",
//                 "own": 0
//             }
//         ]
//     }
// };


