/*
 *  js工具类
 *  @Author: 周传禹
 *  @Copy：未经本人同意，禁止用于商业盈利，禁止转载
 *  @Date：2019-03-01
 */
function Maps() {
    setLocation()
    setInterval(function () {
        setLocation()
    }, 50000);
    function setLocation() {
        var map = new AMap.Map('container', {
            resizeEnable: true
        });
        AMap.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition: 'RB',    //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function (status, result) {
                if (status == 'complete') {
                    var position = result.position;
                    $api.setStorage('x', position.lng);
                    $api.setStorage('y', position.lat);
                } else {
                    $api.setStorage('x', 0);
                    $api.setStorage('y', 0);
                }
            });
        });
    }
}

function islogin() {
    api.toast({
        msg: '您还没登录,请先登录',
        duration: 2000,
        location: 'bottom'
    });
    setTimeout(function () {
        api.openWin({
            name: 'login',
            url: 'login.html',
            reload: true,
            slidBackEnabled: false
        });
    }, 2000);
}

/**
 * 验证是否是正整数
 */
function isPositiveInteger(integer) {
    var reg = /^[1-9]\d*$/;
    return reg.test(integer);
}

/**
 * 验证是否为大于等于0的整数
 */
function isInt(integer) {
    var reg = /^([1-9]\\d*(\\.[0-9]*[1-9])?)|(0\\.[0-9]*[1-9])|0$/;
    return reg.test(integer);
}

/**
 * 验证电话号码格式
 */
function isTel(tel) {
    var reg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
    return reg.test(tel);
}

//验证6-20位数字字母组成的密码
function mi(integer) {
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    return reg.test(integer);
}

//验证6-20位数字字母组成的密码
function isPwd(integer) {
    var reg = /^[0-9a-zA-Z]{6,16}$/;
    return reg.test(integer);
}

/**
 * 验证身份证号码格式
 */
function isIdentityNum(identityNum) {
    var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    return reg.test(identityNum);
}

/**
 * 验证社会组织机构代码格式
 */
function isSocialNum(socialNum) {
    var reg = /^[a-zA-Z0-9]{17}-[a-zA-Z0-9]$/;
    return reg.test(socialNum);
}

/**
 * 是否含有中文（也包含日文和韩文）
 */
function isChineseChar(str) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
}

/***
 * 大于等于1的正整数 
 */
function isNat(str) {
    // var reg=/^([1-9]\d+)|([2-9])$/ 
    var reg = /^[1-9]\d*$/
    return reg.test(str);
}

/**
 * 判读是否非空，非空返回true
 */
function isNotEmpry(obj) {
    if (obj != null && obj != "" && obj != undefined && obj != "null") {
        return true;
    }
    return false;
}

/**
 * 判读是否是整数，是整数返回true
 */
function isNotInteger(obj) {
    if (!isNaN(obj) && obj % 1 === 0) {
        return true;
    } else {
        return false;
    }
}
/**
 * 判读是否超出所规定的字数限制
 */
function checknum(id, max, mid) {
    var textDom = document.getElementById(id);
    var len = textDom.value.length;
    $api.html($api.byId(mid), len);
    if (len > max) {
        textDom.value = textDom.value.substring(0, max);
        // api.toast({
        //     msg: '最多可以输入' + max + "个字",
        //     duration: 2000,
        //     location: 'bottom'
        // });
        return;
    }
    // document.getElementById("in").value="你还可以输入"+(nMax-len)+"个字";
}
// 图片显示破图时 设置默认图片路径
function onerrors(obj) {
    $api.attr(obj, 'src', '../image/img.png');
}

// 图文详情更换图片链接
function displayHtmlWithImageStream(bodyHtml) {
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var arr = bodyHtml.match(imgReg);
    if (arr != null) {
        for (var i = 0; i < arr.length; i++) {
            var images = arr[i];
            var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            var src = images.match(srcReg);
            var url = src[1];
            bodyHtml = bodyHtml.replace(url, $api.getStorage("URL") + url)
        }
    }
    return bodyHtml;
}

// 文字输入
function checknums(id, max, mid) {
    var textDom = document.getElementById(id);
    var len = textDom.value.length;
    alert(len);
    if (len < max) {
        $api.html($api.byId(mid), len);
    } else {
        $api.html($api.byId(mid), max);
    }
}

//头部渲染
function Drawing(obj) {
    //修改手机状态栏字体颜色
    api.setStatusBarStyle({
        style: 'dark'
    });
    var header = $api.byId(obj);
    $api.fixStatusBar(header);
}

//删除数组中某个值
function ArrDel(arr, val) {
    var index = $.inArray(val, arr);
    if (index >= 0)
        arr.splice(index, 1);
    return arr;
};

//接口ip地址
function Ip() {
    var ip = 'http://www.dianwo.shop/index.php?s=/home/api/';
    return ip;
}
//七牛云
function Ips() {
    var ip = 'http://tupian.kankuaixun.com/index.php?s=/home/api/';
    return ip;
}
//分享
function fen() {
    var ip = 'http://www.dianwo.shop/';
    return ip;
}
//默认女头像
function nv() {
    var head = 'http://tupian.kankuaixun.com/2019-09-04_5d6f28266ee46.png';
    return head;
}
//默认男头像
function nan() {
    var head = 'http://tupian.kankuaixun.com/2019-09-04_5d6f282c33773.png';
    return head;
}
//默认商家头像
function shang() {
    var head = 'http://tupian.kankuaixun.com/2019-09-04_5d6f28150d457.png';
    return head;
}
//app
function app() {
    var head = 'http://tupian.kankuaixun.com/2019-09-30_5d91a0711ae1a.png';
    return head;
}
//默认封面
function coverd() {
    var head = 'http://tupian.kankuaixun.com/2019-09-30_5d91a0711ae1a.png';
    return head;
}
//APP手机号
function shouJi() {
    var head = '0516-66615007';
    return head;
}
//图片缓存
function fnLoadImage(ele_) {
    var dataUrl = $api.attr(ele_, 'data-url');
    if (dataUrl) {
        api.imageCache({
            url: dataUrl
        }, function (ret, err) {
            if (ret) {
                ele_.src = ret.url;
                $api.attr(ele_, 'data-url', '');
            }
        });
    }
}

/* 计算两个经纬度的直线距离 */
function mapNumberUtil(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;// EARTH_RADIUS;
    s = (Math.round(s * 10000) / 10000).toFixed(2);
    return s;
}
//时间转换
function timeChange(timeValue, type) {
    var date = getNowFormatDate(timeValue);
    if (type == 1) {
        return date.substring(0, 4);
    } else if (type == 2) {
        return date.substring(5, date.length - 1);
    }
}

//去除字符串空格
function kong(obj) {
    var str = obj.replace(/\s*/g, "");
    return str;
}
//判断字符串是否有空格
function pank(obj) {
    if (obj.indexOf(" ") == -1) {
        return true;//没有空格
    } else {
        return false;//有空格
    }
}

//数据请求方法
/***   数据源请求* 2020-0927*/
var sign = $api.getStorage('sign');
var sign_o = $api.getStorage('sign_o');
var baseUrl = "http://www.keyuanbang.net";
function apidata(param, successFn, errorFn) {
    
    api.ajax({
        url: baseUrl + param.url,
        method: param.method || 'post',
        dataType: param.type || 'json',
        async: false,
        timeout: param.timeout || 10,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            sign: sign,
            sign_o: sign_o,
            clientId: api.deviceId
        },
        data: {
            body: param.data || {}
        }
    }, function (ret, err) {
      //  console.log(JSON.stringify(ret));
        if (ret) {
            if (ret.status == 193) {
                 //  showTip("请稍后！", 1000, "middle");
                  console.log("193")
                /** 
                    
              $api.rmStorage('uid');
              $api.rmStorage('phone');
              $api.rmStorage('sign');
              $api.rmStorage('sign_o');  
              setTimeout(function () {
                    api.openWin({
                        name: 'login',
                        url: 'login.html',
                        reload: true
                    });
                }, 1000);
                return;
                */
                 resign(param, successFn, errorFn)
            }
            if (ret.status == 199) {
                showTip("登录失效,请重新登录！", 1000, "middle");
              //  $api.clearStorage();
              $api.rmStorage('uid');
              $api.rmStorage('phone');
              $api.rmStorage('sign');
              $api.rmStorage('sign_o');  
              setTimeout(function () {
                    api.openWin({
                        name: 'login',
                        url: 'login.html',
                        reload: true
                    });
                }, 1000);
                return;
            }


            if (ret.status == 104) {
                showTip("该用户已在其他设备登陆,请重新登录", 1000, "middle");
               // $api.clearStorage();
                $api.rmStorage('uid');
                $api.rmStorage('phone');
                $api.rmStorage('sign');
                $api.rmStorage('sign_o');
                setTimeout(function () {
                    api.openWin({
                        name: 'login',
                        url: 'login.html',
                        reload: true
                    });
                }, 1000);
                return;
            } else {
                successFn && successFn(ret);
            }
        } else {
            if (!errorFn) {
                showTip("连接失败，请稍后再试！", 1000, "middle");
            }
            // errorFn && errorFn(err);
        }
    });
}

// 刷新段sign

function resign(param, successFn, errorFn){
    console.log("uid:"+$api.getStorage("uid"));
    console.log("sign："+sign);
    console.log("signO："+sign_o);
    api.ajax({
        url: baseUrl + "/api/jed/sign_refresh",
        method: param.method || 'post',
        dataType: param.type || 'json',
        async: false,
        timeout: param.timeout || 10,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            sign: sign,
            sign_o: sign_o,
          clientId: api.deviceId
        },
        data: {
           // body: param.data || {}
           body:{
                sign: sign,
                sign_o: sign_o,
                uid:$api.getStorage("uid")
           }
        }
    },function(ret,err){
        
         if(ret){
                  console.log(JSON.stringify(ret))
                  if(ret.status==200){
                    $api.setStorage('sign', ret.data.sign);
                   
                    sign=ret.data.sign;
                      
                    apidata(param, successFn, errorFn)

                  }

         }

    })


}


/*** */
function ask(){

console.log("ask!!!!")
   console.log("uid:"+$api.getStorage("uid"));
   console.log("sign:"+sign);
   console.log("sign_o:"+sign_o);

        api.ajax({
            url: baseUrl + "/api/jed/sign_refresh",
            method: 'post',
            dataType: 'json',
            async: false,
            timeout: 10,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                sign: sign,
              //  sign_o: sign_o,
                //clientId: api.deviceId
            },
            data: {
        
                body:{
                        sign: sign,
                        sign_o: sign_o,
                        uid:$api.getStorage("uid")
                }
            }
        },function(ret,err){
            
            if(ret){
                    console.log(JSON.stringify(ret))
                    if(ret.status==200){
                        $api.setStorage('sign', ret.data.sign);
                    
                        sign=ret.data.sign;
                        
                        apidata(param, successFn, errorFn)

                    }

            }

})

}





//showTip  显示信息
function showTip(msg, time, pos) {
    api.toast({
        msg: msg,
        duration: time,
        location: pos
    })
}

function fixbar() {
      $api.fixStatusBar($api.byId('header'));
}

/** 去掉数组中的空 undefined null 无效值**/
function trimSpace(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == " " || array[i] == "" || array[i] == null || typeof (array[i]) == "undefined") {
            array.splice(i, 1);
            i = i - 1;
        }
    }
    return array;
}

/** 时间格式化 */
function timeFormat(timestamp) {
    var timestamp = timestamp.toString();
    if (timestamp.length == 10) {
        timestamp = timestamp * 1000
    } else {
        timestamp = timestamp
    }
    /*时间戳为10位需*1000，时间戳为13位的话不需乘1000*/
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '.';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}


/** 时间格式化 YYYY-MM-dd*/
function timeFormatYYYYMMdd(timestamp) {
  //  console.log("时间戳1："+timestamp)
    var timestamp = timestamp.toString();
    if (timestamp.length == 10) {
        timestamp = (timestamp)  * 1000
    } else {
        timestamp = (timestamp)
    }
   // console.log("时间戳："+timestamp)
    /*时间戳为10位需*1000，时间戳为13位的话不需乘1000*/
  var date = new Date((timestamp));
     // console.log(date)
    var Y = date.getFullYear() + '.';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    return Y + M + D;
}

/** 过滤字符串中空白*/
function spaceFilter(str) {
    var arr = str.split(",");
    arr = arr.filter(function (n) { return n });
    return arr.join(",");
}



/**
 * 
 * 会员提示
 */
function tipVip() {
    var dialogBox = api.require('dialogBox');
    dialogBox.taskPlan({
        rect: {
            w: 300
        },
        texts: {
            mainTitle: '温馨提示',
            subTitle: '',
            content: [{
                text: '权限不足，请开通会员解锁所有功能'
            }],
            btnTitle: '开通会员'
        },
        styles: {
            bg: '#fff',
            corner: 10,
            main: {
                marginT: 20,
                color: '#636363',
                size: 18,
                bold: true,
            },
            sub: {
                marginT: 0,
                color: '#999999',
                size: 12,
            },
            content: [{
                bg: '#fff',
                marginT: 0,
                marginB: 30,
                w: 280,
                h: 40,
                align: 'center',
                color: '#bcbcbc',
                size: 16
            }],
            ok: {
                marginB: 10,
                marginL: 10,
                marginR: 0,
                w: 280,
                h: 40,
                bg: '#217bfb',
                color: '#fff',
                size: 16,
                corner: 10
            }
        },
        tapClose: true
    }, function (ret) {
        if (ret.eventType == 'ok') {
            api.openWin({
                name: 'memberCenter',
                url: './memberCenter.html',
                reload: true
            })
            var dialogBox = api.require('dialogBox');
            dialogBox.close({
                dialogName: 'taskPlan'
            });
        }
    });
}


function tipAlert(mtxt,btxt) {
    var dialogBox = api.require('dialogBox');
    dialogBox.taskPlan({
        rect: {
            w: 300
        },
        texts: {
            mainTitle: '温馨提示',
            subTitle: '',
            content: [{
                text: mtxt
            }],
            btnTitle: btxt
        },
        styles: {
            bg: '#fff',
            corner: 10,
            main: {
                marginT: 20,
                color: '#636363',
                size: 18,
                bold: true,
            },
            sub: {
                marginT: 0,
                color: '#999999',
                size: 12,
            },
            content: [{
                bg: '#fff',
                marginT: 0,
                marginB: 30,
                w: 280,
                h: 40,
                align: 'center',
                color: '#bcbcbc',
                size: 16
            }],
            ok: {
                marginB: 10,
                marginL: 10,
                marginR: 0,
                w: 280,
                h: 40,
                bg: '#217bfb',
                color: '#fff',
                size: 16,
                corner: 10
            }
        },
        tapClose: true
    }, function (ret) {
        if (ret.eventType == 'ok') {
           console.log("ok dianji")
           dialogBox.close()
        }
    });
}

/****  权限判断 */


function permissionPosition(callback){

    console.log("定位权限");
    var systemType = api.systemType;
  
    var resultList = api.hasPermission({
        list:['location']
    });
    var granted = resultList[0].granted;
   
    if(granted){
       // console.log("do it")
       callback()
     }else{
     
        api.confirm({
            msg: '应用需要您的授权才能正常使用',
            buttons: ['取消', '好的']
        }, function(ret) {
            if (ret.buttonIndex == 2) {
                api.requestPermission({
                    list: ["location"],
                }, function(res) {
                    if (res.list[0].granted) {
                        // 已授权，可以继续下一步操作
                        api.alert({
                            msg: '已授权'
                        });
                        callback()
                    }
                });
            }
        });

    }

}

function permissionContact(callback){

    console.log("通讯录");
    var systemType = api.systemType;
    var resultList = api.hasPermission({
        list:['contacts']
    });
    var granted = resultList[0].granted;
   
    if(granted){
       // console.log("do it")
       callback()
     }else{
     
        api.confirm({
            msg: '应用需要您的授权才能正常使用',
            buttons: ['取消', '好的']
        }, function(ret) {
            if (ret.buttonIndex == 2) {
                api.requestPermission({
                    list: ["contacts"],
                }, function(res) {
                    if (res.list[0].granted) {
                        // 已授权，可以继续下一步操作
                        api.alert({
                            msg: '已授权'
                        });
                        callback()
                    }
                });
            }
        });

    }


}


function ppp(name,callback){
    console.log("通讯录");
    var systemType = api.systemType;
    var resultList = api.hasPermission({
        list:[name]
    });
    var granted = resultList[0].granted;
   
    if(granted){
       // console.log("do it")
       callback()
     }else{
     
        api.confirm({
            msg: '应用需要您的'+permissionNameFormat(name)+'权限才能正常使用',
            buttons: ['取消', '好的']
        }, function(ret) {
            if (ret.buttonIndex == 2) {
                api.requestPermission({
                    list: [name],
                }, function(res) {
                    if (res.list[0].granted) {
                        // 已授权，可以继续下一步操作
                        api.alert({
                            msg: '已授权'
                        });
                        callback()
                    }
                });
            }
        });

    }

}

function permissionNameFormat(name){
    var val="";
    if(name=="camera"){
            val="相机"
    }
    if(name=="photos"){
            val="相册"
    }
    if(name=="location"){
            val="定位"
    }
    if(name=="contacts"){
            val="通讯录"
    }
    if(name=="storage"){
            val="存储"
    }
    return val;
 }



function requestPosition(){


}

