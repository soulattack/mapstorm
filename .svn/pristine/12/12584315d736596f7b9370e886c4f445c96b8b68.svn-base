var index,timer,arr;
var cf=0;
var map;
var myflag=true;
var pageindex=0;
var allnum=0;
var  totalpage=0;
var gArr=[];
var apiUrl="http://api.map.baidu.com/place/v2/search";
 //var bmapkey="Sk2jbVWPdmZK0QEGiQ8aB3WuzAOVh1Rk";
var bmapkey="9tL77cS5MQOBHo2viZzbGi2S698mHSGH";
var regx_mobile = /(1[3|4|5|6|7|8|9][\d]{9})/g;
var recMark;    //本次标识

$(document).ready(function(){
   //	console.log("DDDD");
	 index=0;
	 timer=null;
     arr=[1,2,34,5,6,7,97,4,2,45,3,54,6,48,4,562,7,8,3,43,34];
     
 //    createBase();

 
 mapInit()

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
     }else{

        // recMark=Date.parse(new Date());
      //  recMark=new Date().getTime();
         recMark=markFormat(new Date().getTime());
        console.log("no-flag")
      // //   $(this).addClass("flag");
      // //   $(this).html("停止采集");
      // // //   cf=0;
      // // //  pageindex=0;       
      // // //  gArr=[];
      //   myflag=true;
      spiderStart();
         recordIt();
         search();

          setTimeout(function(){
             shine();
           },3000)        
     }	   	
	});	
})

/*documentReady end*/




function shine(){
   
 if(cf<=allnum){
           
          
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
          console.log(gArr);
          var finalnum=gArr.length;
          saveCount(finalnum);

          spiderFinished();

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

            var db = openDatabase('test001', '1.0', 'Test DB', 2 * 1024 * 1024);
                      
            db.transaction(function (tx) {
               tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique,log,tel,keytime)');
               tx.executeSql('INSERT INTO LOGS (id,log,tel,keytime) VALUES ("'+item.uid+'","'+item.name+'","'+item.tel+'","'+recMark+'")');
         
            });
            bounce(item);
         
    }else{
      console.log("无效数据 返回");
   //   return false
    }
   
}




function search(){
   console.log("请求地图api 获取数据");
   var type=encodeURI( $("#industry").val())  ;
   var region=encodeURI("北京");
   var tag=encodeURI("餐饮");
  
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
                console.log(ret);
                for(var i=0;i<ret.results.length;i++){

                    /*
                     if (!ret.results[i].telephone) {
                        continue;
                    }
                    var phoneNumber = ret.results[i].telephone.toString();
                    phoneNumber = phoneNumber.replace(/^\s+|\s+$/gm, '');
                    if (!phoneNumber || phoneNumber == 'null' || phoneNumber == '(null)' || phoneNumber == null || typeof (phoneNumber) == 'undefined') {null;
                    } else {
                        //console.log(ret.data[i].category);
                        var mobiles = phoneNumber.match(regx_mobile);
                        var mobile = mobiles ? mobiles[0] : "";
                        var tel = phoneNumber.split(",")[0].replace(/[^0-9]/ig,"");
                        //console.log(JSON.stringify(mobiles));
                        var customer = {
                            name : ret.results[i].name,
                            prov : ret.results[i].province,
                  
                            phone : phoneNumber,
                            tel : tel,
                            mobile : mobile,
                        
                            lng : ret.results[i].location.lng,
                            lat : ret.results[i].location.lat,
                            addr : ret.results[i].address,
                   
                            uid : ret.results[i].uid
                        }
                    //   if(customer.mobile){
                            gArr.push(customer);
                    //   }

                       
                    }
                    */

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
	var point=new BMap.Point(117.184811, 34.261792);
	map.centerAndZoom(point, 14);
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
            var db = openDatabase('test001', '1.0', 'Test DB', 2 * 1024 * 1024);
                                
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS List (keytime,keyname,count)');
                tx.executeSql('INSERT INTO List (keytime, keyname,count) VALUES ("'+keytime+'","'+keyname+'","0")');
 
            });

   }else{
   
     console.log(" 缺少 搜索关键词");
     
   }
     
}


function saveCount(count){
   console.log("当前数量："+count);
   var db = openDatabase('test001', '1.0', 'Test DB', 2 * 1024 * 1024);

   db.transaction(function (tx) {
    tx.executeSql('UPDATE List SET count=\''+count+'\' WHERE keytime=\''+recMark+'\'');
     
    
  });


}







// console.log(markFormat(1609224334702));


function markFormat(item){
  // console.log(item);
   var time=parseInt(item);
 //  console.log( time.toString().length);
var date=new Date(time);
  var year=date.getFullYear();
 // console.log(date.getMonth()+1)
 var month=date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
  //var month=date.getMonth()+1;
  var day=date.getDay()<10?"0"+date.getDay():date.getDay();
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