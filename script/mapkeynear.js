var index,timer,arr;
var cf=0;
var map;
var myflag=true;
var pageindex=0;
var allnum=0;
var  totalpage=0;
var gArr=[];
var apiUrl="http://api.map.baidu.com/place/v2/search";
 
var bmapkey="9tL77cS5MQOBHo2viZzbGi2S698mHSGH";

var apiUrlAmap="http://restapi.amap.com/v3/place/around";
var amapkey="30cc8e7b0d99b029eadb7e89d0bfc17a";



var regx_mobile = /(1[3|4|5|6|7|8|9][\d]{9})/g;
var recMark;    //本次标识

var queryarea,queryword;
//var map;
var currUser;

var dbx;
var lonlat="";
var xlon,xlat;

var radius;
    apiready = function () {
    fixbar();
   
    permissionPosition(locationPos)

    //locationPos();
    




    dbx=api.require("db");
    currUser=$api.getStorage("uid");
    console.log("userid:"+currUser);
   
    openDB()


   function callbackme(){
    console.log("callback me")
   };


    function locationPos(){
        var map = api.require('bMap');



        map.getLocation({
            accuracy: '100m',
            autoStop: true,
            filter: 1
        }, function (ret, err) {
            if (ret.status) {
                console.log(JSON.stringify(ret));
                // lon = ret.lon;
                // lat = ret.lat;
                xlon = ret.lon;
                xlat = ret.lat;
                lonlat=ret.lat+","+ret.lon;
                console.log("xlon:" + xlon);


                var map = new BMap.Map();
                var point = new BMap.Point(xlon, xlat);
                //  var point = new BMap.Point(90.896327,39.679685);
                var gc = new BMap.Geocoder();
                gc.getLocation(point, function (rs) {
                    var addComp = rs.addressComponents;
                    console.log(JSON.stringify(addComp));
                    //console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    position = addComp.city;
                 //   console.log("我的位置：" + posFormat(position));

                    // if (addComp.city == "" || addComp.city == undefined || addComp.city == null) {
                    //  //   $(".toggle").show();

                    // } else {
                    //  //   $(".toggle").hide();
                    // //   position = posFormat(position);
                    // }
                    mapInit();

                });
            } else {
                console.log(JSON.stringify(err.code));
            
            }
        });
    }

$(document).ready(function(){
  
	 index=0;
	 timer=null;
     arr=[1,2,34,5,6,7,97,4,2,45,3,54,6,48,4,562,7,8,3,43,34];
     


 
  // mapInit();
  //  setTimeout(function(){
  //     console.log("当前用户："+currUser);
  //  },3000)

  

	$("#start").click(function(){
		console.log("ZZZZ");
	
     if($(this).hasClass("flag")){
          console.log("flag")
          $(this).removeClass("flag");
          $(this).html("开始采集");
         //console.log(shine())
        //  cf=10;
        myflag=false;
       
        console.log(" 主动停止检索 显示现存数组");
        console.log(gArr);
        console.log(gArr.length);
        // saveCount((gArr.length));
        saveCount(cf+1);


        api.openWin({
          name: 'mapSpiderDetail',
          url: './mapSpiderDetail.html',
          reload:true,
          pageParam: {
             // param: recMark
             user: currUser,
             key:recMark
          }
      })


     }else{

        queryword=$("#industry").val();
        queryarea=$("#city").html();
       if(queryword==""){
            showTip("请输入关键词",1200,"middle");
            return false;
       };
     
       if(queryarea==""||queryarea=="选择范围"){
        showTip("请选择范围",1200,"middle");
        return false;
       }




        //  recMark=markFormat(new Date().getTime());
         recMark=markFormat();
        console.log("no-flag")
        $(this).addClass("flag");
        $(this).html("停止采集");
         cf=0;
        pageindex=0;       
        gArr=[];
        myflag=true;

         recordIt();
         search();

          setTimeout(function(){
            shine();
           },3000)        
     }	   	
	});	
})

};
/*documentReady end*/




function shine(){
   
 if(cf<=allnum){
           
                saveArr(gArr[cf]);
          
                 cf++;
                if(myflag==true){

                        setTimeout(function(){
                          shine();
                        },1500)

                }else{
                    console.log("return flag false")
                    return false
                }
      }else{
          console.log("检索结束,显示所有数组");
          console.log(gArr);
          var finalnum=gArr.length;
          saveCount(finalnum);
          spiderFinished();
          api.openWin({
            name: 'mapSpiderDetail',
            url: './mapSpiderDetail.html',
            reload:true,
            pageParam: {
                //param: recMark
                user: currUser,
                key:recMark
            }
        })

      }
  
  
}

/*闪动效果*/
function bounce(item){
  if(item){
      mapMarker(item);
  
       console.log("tanchu");
     var strHtml="<div class='itemWrap shin'><div class='item'><span>"+item.name+"--"+item.tel+"</span></div></div>";
     $("body").append(strHtml);
     	
     setTimeout(function(){
          $(".shin").remove()
      },500)
  }
     
}


function saveArr(item){
  console.log(item);
    if(item){
            console.log("有效数据 存入");
            console.log(item);
           var sts='INSERT INTO MSG (id,log,tel,keytime,user) VALUES ("'+item.uid+'","'+item.name+'","'+item.tel+'","'+recMark+'","'+currUser+'")';
            insertData(sts);
            bounce(item);
         
    }else{
      console.log("无效数据 返回");
    }
   
}




function searchx(){
   console.log("请求地图api 获取数据");
   var type=encodeURI( $("#industry").val())  ;
  //  var region=encodeURI("北京");
   var radius=(queryarea);

   if(radius=="3公里"){
            radius=3000;
   }
   if(radius=="5公里"){
    radius=5000;
    }
    if(radius=="10公里"){
        radius=10000;
      }
  //  var tag=encodeURI(query);
   var tag=encodeURI("餐饮");
  
//   var  url=apiUrl+"?query="+type+"&region="+region+"&ak="+bmapkey+"&output=json&page_num="+pageindex+"&page_size=10";
   // var  url=apiUrl+"?query="+type+"&region="+region+"&ak="+bmapkey+"&output=json&page_num="+pageindex+"&page_size=10";
    var  url=apiUrl+"?query="+type+"&location="+xlat+","+xlon+"&radius="+radius+"&ak="+bmapkey+"&output=json&page_num="+pageindex+"&page_size=10";
     //var  url=apiUrl+"?query="+type+"&location="+xlat+","+xlon+"&radius=5000&ak="+bmapkey+"&output=json&page_num="+pageindex+"&page_size=10";
  
    console.log(url);
  
   if(myflag==true){
          $.ajax({
            
            url:url,
        
            type: 'GET',
            async:true,//设置同步。ajax默认异步
            dataType: 'jsonp',

          jsonp:'callback',//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        // jsonpCallback:"callback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
           timeout: 5000,
           contentType: 'application/json; charset=utf-8',
            success:function(ret){
               pageindex++;
                // shine();
                 totalpage=Math.ceil(ret.total / 10);
                 allnum=ret.total;
                console.log(JSON.stringify(ret));
                for(var i=0;i<ret.results.length;i++){

                 

                   if(ret.results[i].telephone){
                    var phoneNumber = ret.results[i].telephone.toString();
                        phoneNumber = phoneNumber.replace(/^\s+|\s+$/gm, '');
                    var mobiles = phoneNumber.match(regx_mobile);
                    var mobile = mobiles ? mobiles[0] : "";
                    var tel = phoneNumber.split(",")[0].replace(/[^0-9]/ig,"");
                         ret.results[i].tel=mobile;

                         if(mobile){
                            gArr.push(ret.results[i]);
                         }
                        

                   }
                  

                }

                console.log("全局列表")
                console.log(gArr);
                allnum=gArr.length; 
           
                if(gArr.length>0){
                    console.log("我有数据");
                    setTimeout(function() {
                        myshow();
                    },1000);                  
                }else{
                 console.log("没有找到数据 ")
               
                 setTimeout(function() {
                  myshow();
                  },1000); 

                }
            }
        })
       
   }else{
       console.log("停止 从api 获取数据")
   }
   
}




function search(){
  console.log("请求 高德 api 获取数据");
  var type=encodeURI( $("#industry").val())  ;
 //  var region=encodeURI("北京");
  var radius=(queryarea);

  if(radius=="3公里"){
           radius=3000;
  }
  if(radius=="5公里"){
   radius=5000;
   }
   if(radius=="10公里"){
       radius=10000;
     }
 

  // var  url=apiUrl+"?query="+type+"&location="+xlat+","+xlon+"&radius="+radius+"&ak="+bmapkey+"&output=json&page_num="+pageindex+"&page_size=10";

 var url=apiUrlAmap+"?location="+xlat+","+xlon+"&keywords="+type+"&radius="+radius+"&offset=10&page="+(pageindex+1)+"&extensions=all&output=json&key="+amapkey;
   console.log(url);
 
  if(myflag==true){
         $.ajax({
           
           url:url,
       
           type: 'GET',
           async:true,//设置同步。ajax默认异步
           dataType: 'jsonp',

         jsonp:'callback',//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
       // jsonpCallback:"callback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
          timeout: 5000,
          contentType: 'application/json; charset=utf-8',
           success:function(ret){
              pageindex++;
           
                totalpage=Math.ceil(ret.count / 10);
                allnum=ret.count;
                console.log("totalpage:"+totalpage)
               console.log(JSON.stringify(ret));
               for(var i=0;i<ret.pois.length;i++){

                

                  if(ret.pois[i].tel){
                   var phoneNumber = ret.pois[i].tel.toString();
                       phoneNumber = phoneNumber.replace(/^\s+|\s+$/gm, '');
                   var mobiles = phoneNumber.match(regx_mobile);
                   var mobile = mobiles ? mobiles[0] : "";
                   var tel = phoneNumber.split(",")[0].replace(/[^0-9]/ig,"");

                           ret.pois[i].tel=mobile;
                          ret.pois[i].uid=ret.pois[i].id;   
                 
                          var alat=ret.pois[i].location.split(",")[1];
                         var alng=ret.pois[i].location.split(",")[0];
 
                           ret.pois[i].location=null;
                           ret.pois[i].location={};
                          ret.pois[i].location.lat=alat;
                          ret.pois[i].location.lng=alng;

                        if(mobile){
                           gArr.push(ret.pois[i]);
                        }
                       

                  }
                 

               }

               console.log("全局列表")
               console.log(gArr);
               allnum=gArr.length; 
          /** 
           * 
           *  if(gArr.length>0){
                   console.log("我有数据");
                   setTimeout(function() {
                       myshow();
                   },1000);                  
               }else{
                console.log("没有找到数据 ")
              
                setTimeout(function() {
                 myshow();
                 },1000); 

               }
           * 
          */
              setTimeout(function() {
                myshow();
            },1000);  
           }
       })
      
  }else{
      console.log("停止 从api 获取数据")
  }

      
      
}





function myshow(){
    if(pageindex<totalpage){
       search();
  
    }else 
    if(totalpage==1){
        console.log("这里 只有一页")
    }else
    {
     
     console.log("api接口数据获取完成！！！！！");
     console.log(gArr)
   //  return false;   


    }
   
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
   
    element.style.display = 'none';
    document.body.appendChild(element);
   
    element.click();
   
    document.body.removeChild(element);
  }
   
  // download("hello.txt","This is the content of my file :)");

function createBase(){
    var db = openDatabase("list","listinfo", 1024*1024, function(){});
     console.log(db)
    if(db){
        console.log("数据库 已经存在")
    }
  
    db.transaction(function(fx){
        fx.executeSql("drop DATABASE list")
    })
    if(db){
        console.log("数据库 已经存在1")
    }else{
        console.log("数据库 不存在了")
    }

} 


function mapInit(){

     map = new BMap.Map("l-map");        
   //var point=new BMap.Point(117.184811, 34.261792);
   console.log("----de-d-e--e")
  console.log(xlon+"---"+xlat)
   var point=new BMap.Point(xlon, xlat);
   map.addOverlay(new BMap.Circle(point,3000,{ 
            strokeColor: "blue",
            strokeWeight: 1,
            fillColor: "#E2E8F1",
            fillOpacity: 0.6}
    )); 
    var	marker = new BMap.Marker(point);
    map.addOverlay(marker);
	map.centerAndZoom(point, 15);
}


function reCircle(radius){
    var point=new BMap.Point(xlon, xlat);
    console.log("改变了范围！！！！！！！");
    console.log(radius);
    var rad=0;
    // if(radius=="3公里"){
    //     rad=3000
    // }
  
    // if(radius=="5公里"){
    //     rad=5000
    // }
    // if(radius=="10公里"){
    //     rad=10000
    // }

    radius=="3公里"?rad=3000:false;
    radius=="5公里"?rad=5000:false;
    radius=="10公里"?rad=10000:false;
  map.clearOverlays();
  var	marker = new BMap.Marker(point);
  map.addOverlay(marker);
    map.addOverlay(new BMap.Circle(point,rad,{ 
        strokeColor: "blue",
        strokeWeight: 1,
        fillColor: "#E2E8F1",
        fillOpacity: 0.6}
  )); 

}



function mapMarker(item){
   console.log(item);
     if(item.location){
        if(item.location.lat && item.location.lng){
                var newp=new BMap.Point(item.location.lng,item.location.lat);
                    map.centerAndZoom(newp, 15);
                    


                var	marker = new BMap.Marker(newp);
                 map.addOverlay(marker);

            }else{
               // return  false
            }
            
     }
  

}


function recordIt(){
   console.log("记录 本次 搜索信息");
   var keyname=$("#industry").val();
   var keytime=recMark;
   console.log(keyname+"---"+keytime);

   if(keyname && keytime){
      
        /** 
         var db = openDatabase('test001', '1.0', 'Test DB', 2 * 1024 * 1024);
                                
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS List (keytime,keyname,count,user)');
                tx.executeSql('INSERT INTO List (keytime, keyname,count,user) VALUES ("'+keytime+'","'+keyname+'","0","'+currUser+'")');
 
            });
         */ 
        var sqlstr='INSERT INTO List (keytime, keyname,count,user) VALUES ("'+keytime+'","'+keyname+'","0","'+currUser+'")';
        dbx.executeSql({
          name: 'mydb',
          sql: sqlstr
              }, function(ret, err) {
                  if (ret.status) {
                      console.log(JSON.stringify(ret));
                  } else {
                      console.log(JSON.stringify(err));
                  }
          });
            

   }else{
   
     console.log(" 缺少 搜索关键词");
     
   }
     
}


function saveCount(count){
   console.log("当前数量："+count);
   /**  
      var db = openDatabase('test001', '1.0', 'Test DB', 2 * 1024 * 1024);
      db.transaction(function (tx) {
        tx.executeSql('UPDATE List SET count=\''+count+'\' WHERE keytime=\''+recMark+'\'');    
      });
   */
   var sqlstr='UPDATE List SET count=\''+count+'\' WHERE keytime=\''+recMark+'\'';
  dbx.executeSql({
    name: 'mydb',
    sql: sqlstr
        }, function(ret, err) {
            if (ret.status) {
                console.log(JSON.stringify(ret));
            } else {
                console.log(JSON.stringify(err));
            }
    });

}







 console.log(markFormat(new Date()));


function markFormat(){
  // console.log(item);
 //  var time=parseInt(item);
 //  console.log( time.toString().length);
var date=new Date();
console.log(JSON.stringify(date));
  var year=date.getFullYear();
 // console.log(date.getMonth()+1)
 var month=date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
  //var month=date.getMonth()+1;
  var day=date.getDate()<10?"0"+date.getDate():date.getDate();
  var hour=date.getHours()<10?"0"+date.getHours():date.getHours();
  var minute=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
  var second=date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();


 console.log(year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second)


 var  mks=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
  return mks.toString()

}


function clearData(){
  var db = openDatabase('test001', '1.0', 'Test DB', 2 * 1024 * 1024);

   db.transaction(function (tx) {
    tx.executeSql(" DROP TABLE list");
    tx.executeSql(" DROP TABLE LOGS");
     
    
  });

}

/* 停止采集*/
function stopSpider(){
    
    $("#start").html("开始采集");
    $("#start").removeClass("flag");
    cf=0;
    pageindex=0;
    myflag=true;
    gArr=[];
}



/* 停止采集*/
function spiderFinished(){
   
  $("#start").html("开始采集");
  $("#start").removeClass("flag");
  cf=0;
  pageindex=0;
  myflag=true;
  gArr=[];


}

function spiderStart(){
  console.log("XXXXXXXXXZZZZZ!!!!!!");
 //   console.log($("#start"))
  $("#start").html("停止采集");
  $("#start").addClass("flag");

  cf=0;
  pageindex=0;
  myflag=true;
  gArr=[];


}



/******  db数据操作 */

function openDB(){
     
      var db_ret = dbx.openDatabase({
      name : 'mydb',
      path : 'fs://spiderdb.db'
    }, function(ret, err) {
      if (ret.status) {
      
        console.log('本地数据库连接成功');
        createTbl();             //创建数据表-查询内容
        createTblList();
       // insertData();
     //   selectData();
      } else {
      
        api.toast({
          msg : '本地数据库连接失败'
        });
      }
    });


}

function createTbl(){
   // openDB();
    // var sqlstr='CREATE TABLE IF NOT EXISTS LOGS (keytime,keyname,count,user)';
    var sqlstr='CREATE TABLE IF NOT EXISTS MSG (id unique,log,tel,keytime,user)';
    dbx.executeSql({
    name: 'mydb',
    sql: sqlstr
        }, function(ret, err) {
            if (ret.status) {
                console.log(JSON.stringify(ret));
            } else {
                console.log(JSON.stringify(err));
            }
    });
  }

function createTblList(){
 // var sqlstr='CREATE TABLE IF NOT EXISTS MSG (id unique,log,tel,keytime,user)';
   var sqlstr='CREATE TABLE IF NOT EXISTS List (keytime,keyname,count,user)'; 
 dbx.executeSql({
  name: 'mydb',
  sql: sqlstr
      }, function(ret, err) {
          if (ret.status) {
              console.log(JSON.stringify(ret));
          } else {
              console.log(JSON.stringify(err));
          }
  });
}

  function insertData(str){
    // openDB();

    //var sqlstr='INSERT INTO olist (keytime, keyname,count,user) VALUES ("20211212","测试名字","0","1000002")'
    //var sqlstr='INSERT INTO olist (keytime, keyname,count,user) VALUES ("20211212","测试名字","0","1000002")'
    var sqlstr=str;
     dbx.executeSql({
     name: 'mydb',
     // sql: 'INSERT INTO List (keytime, keyname,count,user) VALUES ("'+keytime+'","'+keyname+'","0","'+currUser+'")',
     sql:sqlstr ,
         }, function(ret, err) {
             if (ret.status) {
                 console.log(JSON.stringify(ret));
             } else {
                 console.log(JSON.stringify(err));
             }
     });
   }
 
   function selectData(){
  
     dbx.selectSql({
     name: 'mydb',
     // sql: 'INSERT INTO List (keytime, keyname,count,user) VALUES ("'+keytime+'","'+keyname+'","0","'+currUser+'")',
     // sql: 'SELECT * FROM MSG',
     sql: 'SELECT * FROM List',
         }, function(ret, err) {
             if (ret.status) {
                 console.log(JSON.stringify(ret));
                 console.log(JSON.stringify("数据信息："+ret.data.length));
               //  vm.list=ret.data
             } else {
                 console.log(JSON.stringify(err));
             }
     });
   }