var index,timer,arr;
var cf=0;
var map;
var myflag=true;

var pageindex=0;
var pageindex_amap=0;
var pageindex_tmap=0;

var allnum=0;
var allnum_bmap=0;
var allnum_amap=0;
var allnum_tmap=0;


var  totalpage=0;
var  totalpage_amap=0;
var  totalpage_tmap=0;


var gArr=[];
var gArr_amap=[];
var gArr_bmap=[];
var gArr_tmap=[];

var ffnum=0;

var apiUrl="http://api.map.baidu.com/place/v2/search";
var apiUrl_amap="https://restapi.amap.com/v3/place/text";
var apiUrl_tmap="https://apis.map.qq.com/ws/place/v1/search";


var bmapkey="9tL77cS5MQOBHo2viZzbGi2S698mHSGH";
var amapkey="30cc8e7b0d99b029eadb7e89d0bfc17a";
var tmapkey="ISABZ-7223F-ISIJO-NHWIL-YZE2J-EJBE6";



var regx_mobile = /(1[3|4|5|6|7|8|9][\d]{9})/g;
var recMark;    //本次标识

var queryarea,queryword;
//var map;
var currUser;

var dbx;
    apiready = function () {
    fixbar();
    dbx=api.require("db");
    currUser=$api.getStorage("uid");
    console.log("userid:"+currUser);
      //   map = api.require('bMap');
      //  console.log(map)
        
        //$api.offset(dom元素).h 
    
       // mapInit();
       
       storageReadWrite();

    //  openDB()


    };

$(document).ready(function(){
   //	console.log("DDDD");
	 index=0;
	// timer=null;
     //arr=[1,2,34,5,6,7,97,4,2,45,3,54,6,48,4,562,7,8,3,43,34];
     
 //    createBase();

 
   mapInit();

  

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
         
             user: currUser,
             key:recMark
          }
      })


     }else{

        // recMark=Date.parse(new Date());



      //  recMark=new Date().getTime();

        gArr=[];
        gArr_amap=[];
        gArr_bmap=[];
        gArr_tmap=[];

        queryword=$("#industry").val();
        queryarea=$("#city").html();
       if(queryword==""){
            showTip("请输入关键词",1200,"middle");
            return false;
       };
       if(queryarea==""||queryarea=="选择区域"){
        showTip("请选择区域",1200,"middle");
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
      searchAmap();
        searchTmap();

          
          setTimeout(function(){
            shine();
           },3000)        
     }	   	
	});	
})

/*documentReady end*/




function shine(){
  console.log(" cf:"+cf+"值到达最终ffnum:"+ffnum+"。");
//  if(cf<=allnum){
    if(cf<=ffnum){
          
            //  console.log(gArr[cf]);
                 //  console.log(cf);
                // bounce(gArr[cf]);

                saveArr(gArr[cf]);
               // mapMarker(gArr[cf]);
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
          console.log(JSON.stringify(gArr) );
          var finalnum=gArr.length;
          saveCount(finalnum);
          spiderFinished();
          api.openWin({
            name: 'mapSpiderDetail',
            url: './mapSpiderDetail.html',
            reload:true,
            pageParam: {
               
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

      if(cf<allnumTotal){

        console.log("有效数据 存入");
            console.log(item);
             
         
           var sts='INSERT INTO MSG (id,log,tel,keytime,user) VALUES ("'+item.uid+'","'+item.name+'","'+item.tel+'","'+recMark+'","'+currUser+'")';
            insertData(sts);


            bounce(item);
      }
            
         
    }else{
      console.log("无效数据 返回");
   //   return false
    }
   
}

function loacalsave(){
         
    var db = openDatabase('test001', '1.0', 'Test DB', 2 * 1024 * 1024);
                      
    db.transaction(function (tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique,log,tel,keytime,user)');
       tx.executeSql('INSERT INTO LOGS (id,log,tel,keytime,user) VALUES ("'+item.uid+'","'+item.name+'","'+item.tel+'","'+recMark+'","'+currUser+'")');
 
    });
}







function search(){
   console.log("请求地图api 获取数据");
   var type=encodeURI( $("#industry").val())  ;
  //  var region=encodeURI("北京");
   var region=encodeURI(queryarea);
  //  var tag=encodeURI(query);
 
  
//   var  url=apiUrl+"?query="+type+"&region="+region+"&ak="+bmapkey+"&output=json&page_num="+pageindex+"&page_size=10";
 var  url=apiUrl+"?query="+type+"&region="+region+"&ak="+bmapkey+"&output=json&page_num="+pageindex+"&page_size=10";
  
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

                            if(isInArray(gArr,ret.results[i])){
                                console.log("gARR已存在")
                               }else{
                                gArr.push(ret.results[i]);
                              }
                         }
                        

                   }
                  

                }

                console.log(" baidu全局列表")
                console.log(gArr);
                allnum=gArr.length; 
                allnum_bmap=gArr_bmap.length;
                allnumTotal=0;
                allnumTotal=allnum_amap+allnum_bmap+allnum_tmap;
        
           
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
       ffnum=gArr.length;
    }else 
    if(totalpage==1){
        console.log("这里 只有一页")
        ffnum=gArr.length;
    }else
    {
     
     console.log("api接口数据获取完成！！！！！");
     console.log(gArr)
     ffnum=gArr.length;
   //  return false;   


    }
   
}



/**** */

function searchAmap(){
    console.log("请求地图高德api 获取数据");
    var type=encodeURI( $("#industry").val())  ;
    // var region=encodeURI("徐州");
   var region=encodeURI(queryarea);
    var tag=encodeURI("餐饮");
   
 //   var  url=apiUrl+"?query="+type+"&region="+region+"&ak="+bmapkey+"&output=json&page_num="+pageindex+"&page_size=10";
    //  var  url=apiUrl+"?query="+type+"&region="+region+"&ak="+bmapkey+"&output=json&page_num="+pageindex_amap+"&page_size=10";
    //https://restapi.amap.com/v3/place/text?keywords=%E5%A4%A7%E5%AD%A6&city=nanjing&output=xml&offset=10&page=1&key=30cc8e7b0d99b029eadb7e89d0bfc17a&extensions=all
   var url=apiUrl_amap+"?keywords="+type+"&city="+region+"&output=json&offset=10&page="+(pageindex_amap+1)+"&key="+amapkey
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
                pageindex_amap++;
              
                  totalpage_amap=Math.ceil(ret.count / 10);
              //    allnum_amap=ret.count;
                 console.log(ret);
 
 
                 for(var i=0;i<ret.pois.length;i++){
                    if(ret.pois[i].tel){
                     var phoneNumber = ret.pois[i].tel.toString();
                         phoneNumber = phoneNumber.replace(/^\s+|\s+$/gm, '');
                     var mobiles = phoneNumber.match(regx_mobile);
                     var mobile = mobiles ? mobiles[0] : "";
                     var tel = phoneNumber.split(",")[0].replace(/[^0-9]/ig,"");
                          ret.pois[i].tel=mobile;
                          ret.pois[i].uid=ret.pois[i].id;   
                        //  console.log( "LOCATION AMap")
                        //  console.log( ret.pois[i].location.split(",")[0])
                          var alat=ret.pois[i].location.split(",")[1];
                         var alng=ret.pois[i].location.split(",")[0];
 
                           ret.pois[i].location=null;
                           ret.pois[i].location={};
                          ret.pois[i].location.lat=alat;
                          ret.pois[i].location.lng=alng;
 
                          if(mobile){
                          
                                // gArr_amap.push(ret.pois[i]);
                                if(isInArray(gArr,ret.pois[i])){
                                    console.log("gARR已存在")
                                }else{
                                   gArr.push(ret.pois[i]);
                                }  
                               gArr_amap.push(ret.pois[i]);

                          }
                         
                    }
                   
                 }
 
                 console.log("高德api 全局列表")
                 console.log(gArr);
 
                 allnum=gArr.length; 
                 allnum_amap=gArr_amap.length;
                 allnumTotal=0;
                 allnumTotal=allnum_amap+allnum_bmap+allnum_tmap;
                
             setTimeout(function() {
               myshowAmap();
             },1000); 
 
 
             }
         })
        
    }else{
        console.log("停止 从高德api 获取数据")
    }
 

}


/** */
function myshowAmap(){
    if(pageindex_amap<totalpage_amap){
      searchAmap();
        ffnum=gArr.length;
     }else 
     if(totalpage_amap==1){
         console.log("这里 只有一页")
         ffnum=gArr.length;
     }else
     {
      
      console.log("高德api接口数据获取完成！！！！！");
   
      allnum=gArr.length;
      console.log("高德最终有效数据量："+allnum_amap);
      ffnum=gArr.length;
     }


}



/**** */
function searchTmap(){
    console.log("请求地图 腾讯api 获取数据");
    var type=encodeURI( $("#industry").val())  ;
    // var region=encodeURI("石家庄");
   var  region=encodeURI(queryarea);
    var tag=encodeURI("餐饮");
  
    var url=apiUrl_tmap+"?boundary=region("+region+",0)&keyword="+type+"&page_size=10&page_index="+(pageindex_tmap+1)+"&orderby=_distance&key="+tmapkey+"&output=jsonp"
  console.log(url)
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
           pageindex_tmap++;
            // shine();
             totalpage_tmap=Math.ceil(ret.count / 10);
        //     allnum=ret.count;
            console.log(ret);
            for(var i=0;i<ret.data.length;i++){
  
               
         
  
               if(ret.data[i].tel){
                      var phoneNumber = ret.data[i].tel.toString();
                          phoneNumber = phoneNumber.replace(/^\s+|\s+$/gm, '');
                      var mobiles = phoneNumber.match(regx_mobile);
                      var mobile = mobiles ? mobiles[0] : "";
                      var tel = phoneNumber.split(",")[0].replace(/[^0-9]/ig,"");
                          ret.data[i].tel=mobile;
                          ret.data[i].name=  ret.data[i].title;
                          ret.data[i].uid=  ret.data[i].id;
  
                          if(mobile){
                             
                              gArr_tmap.push(ret.data[i]);
                              if(isInArray(gArr,ret.data[i])){
                                  console.log("gARR已存在")
                                }else{
                                gArr.push(ret.data[i]);
                             } 
                            
                          }
                          
  
                    }
                       
  
            }
  
            console.log("全局列表")
            console.log(gArr);
            allnum=gArr.length; 
            allnum_tmap=gArr_tmap.length;
            allnumTotal=0;
            allnumTotal=allnum_amap+allnum_bmap+allnum_tmap;
   
           
           setTimeout(function() {
             myshowTmap();
          },800); 
  
  
        }
      })
   
    }else{
      console.log("主动停止 从api 获取数据")
    }
  
  

}



/**** */
function myshowTmap(){
    totalpage_tmap>20?totalpage_tmap=20:totalpage_tmap;

    if(pageindex_tmap<totalpage_tmap ){
      searchTmap();
      ffnum=gArr.length;
    }else 
    if(totalpage_tmap==1){
        console.log("这里 只有一页")
    //   search();
    ffnum=gArr.length;
    }else
    {
    
    console.log("腾讯api接口数据获取完成！！！！！");
    console.log(gArr);
    allnum=gArr.length;
    ffnum=gArr.length;
 
    console.log("腾讯地图最终有效数据量："+allnum_tmap);



    }
}

/***是否 已经存在  */
function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        // if(value.name == arr[i].name && value.tel==arr[i].tel){
        if(value.name == arr[i].name && value.tel==arr[i].tel){
            return true;
        }
    }
    return false;
  }
  




function mapInit(){

     map = new BMap.Map("l-map");        

	// var point=new BMap.Point(117.184811, 34.261792); 116.403694,39.913164     
	var point=new BMap.Point(116.403694, 39.913164);                 //默认位置定位在北京 
	map.centerAndZoom(point, 15);
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
    pageindex_amap=0;
    pageindex_tmap=0;
    myflag=true;
    gArr=[];
}



/* 停止采集*/
function spiderFinished(){
   
  $("#start").html("开始采集");
  $("#start").removeClass("flag");
  cf=0;
  pageindex=0;
  pageindex_amap=0;
  pageindex_tmap=0;
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
       // selectData();
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


    /**  磁盘读写权限  并创建本地数据库  * */
   function storageReadWrite(){

       console.log("存储权限");
        var sysType=api.systemType;
     
        if(sysType=="android"){
            var resultList = api.hasPermission({
                list:['storage']
            });
            var granted = resultList[0].granted;
            console.log(granted)
            // api.alert({
            //     msg: granted?'有权限':'无权限'
            // });
            if(granted==false){
                    api.confirm({
                      msg: '应用需要您的读写权限才能正常使用',
                      buttons: ['取消', '去设置']
                  }, function(ret) {
                      if (ret.buttonIndex == 2) {
                          api.requestPermission({
                              list: ["storage"],
                          }, function(res) {
                                console.log(JSON.stringify(res));
                                if(res.list[0].granted==true){
                                  openDB();
                                }
                          });
                      }
                  });
              }else{

                openDB();
              }

          }else{
            openDB();

          }

   }