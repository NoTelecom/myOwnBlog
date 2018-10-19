var login=document.getElementById("login");
var exitTips=document.getElementById("exitTips");
var ul=document.getElementById("thebigtimeline");
var droitWr=document.getElementById("droitWr");
var li=document.getElementsByTagName("li");

lookBlog();
goPage();
window.onload=onloadFun;

function onloadFun() {
        var url = decodeURI(location.href);
        var cookieUsername = getCookie("username")
        if(!cookieUsername){
            if(url.search('=') != -1)
                window.location.href="blog homepage.html";
        }
        else{
            var trueUsername = url.substr(url.indexOf('=')+1);
            if(trueUsername != cookieUsername)
                window.location.href="blog homepage.html?theUserName="+cookieUsername;
        }


    }

var droit=loginOrNot();
 // console.log(droit);
if(droit!=0) exitTips.innerHTML="退出登录";
else delCookie("username");

login.onclick=function () {
    if(droit==0)
        window.location.replace("./blog.html");
    else{
        setCookie("username",getCookie("username"),-1);
        setCookie("password",getCookie("password"),-1);
        alert("退出成功！");
        exitTips.innerHTML="登录";
        droit=0;
        delCookie("username");
        window.location.href="blog homepage.html";
    }
}

droitWr.onclick=function () {
    if(droit!=1) alert("您无权访问！")
    else window.location.href="writeBlog.html";
}

function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function lookBlog() {
    var str=localStorage.getItem("art");
    var arr=str?JSON.parse(str):[];
    if(arr!=[]){
        for(var i = 0;i<arr.length;i++){
            var title = arr[i].title;
            var content = arr[i].content;
            if(content.length>40){
                var x = content.slice(0,41);
                x+= "....";
            }
            var myDate=new Date;
            var li=document.createElement("li");
            li.setAttribute("id","timer");
            var time=document.createElement("time");
            time.setAttribute("class","cbp_tmtime");
            var span1=document.createElement("span");
            span1.innerHTML=myDate.getMonth()+1+'-'+myDate.getDate();
            //console.log(myDate.getMonth()+'-'+myDate.getDay());
            var span2=document.createElement("span");
            span2.innerHTML=myDate.getFullYear();
            var div=document.createElement("div");
            div.setAttribute("class","cbp_tmlabel");
            div.setAttribute("data-scroll-reveal","enter right over 1s");
            var h2=document.createElement("h2");
            h2.innerHTML=title;
            var p=document.createElement("p");
            var span3=document.createElement("span");
            span3.setAttribute("class","blogpic");
            var img=document.createElement("img");
            img.setAttribute("src","亚马逊中国 z.cn，一站放心购全球_files/cloud.jpg");
            if(content.length>40)
                p.innerHTML+=x;
            else p.innerHTML+=content;
            var a=document.createElement("a");
            a.setAttribute("href","veiwBlog.html?theTitle="+title);
            a.setAttribute("class","readmore");
            a.setAttribute("id","readAll");
            a.innerHTML+="阅读全文&gt;&gt;";
            time.appendChild(span1);
            time.appendChild(span2);
            li.appendChild(time);
            div.appendChild(h2);
            span3.appendChild(img);
            p.appendChild(span3);
            div.appendChild(p);
            div.appendChild(a);
            li.appendChild(div);//同层次按顺序排放，子层先来
            ul.appendChild(li);


        }

    }
}

function goPage(){
    var loading = document.getElementById("loading");
    var leftSee = document.getElementById("left-see");
    var liList=ul.getElementsByTagName("li")
    var num = liList.length;//表格所有行数(所有记录数)
    if(num<=10) loading.style.display = "hidden";
    var totalPage = 0;//总页数
    var pageSize = 10;//每页显示行数
    //总共分几页
    if(num/pageSize > parseInt(num/pageSize))
        totalPage=parseInt(num/pageSize)+1;
    else
        totalPage=parseInt(num/pageSize);
    var currentPage = 1;//当前页数
    for(var i=1;i<(num+1);i++){
        var irow = liList[i-1];
        if(i>10)
            irow.style.display = "none";
    }
    loading.onclick = function(){
        console.log("totalPage:"+totalPage)
        console.log("currentPage:"+currentPage)
        if(currentPage == totalPage) loading.style.display = "hidden";
        currentPage++;
        var startRow = (currentPage - 1) * pageSize+1;//开始显示的行
        //console.log("startPRow:"+startRow)
        var endRow = currentPage * pageSize;//结束显示的行
        //console.log("endRow:"+endRow)
        endRow = (endRow > num)? num : endRow;
        //console.log(endRow);
        for(var i=1;i<(num+1);i++){
            //console.log(liList[i-1])
            var irow = liList[i-1];
            if(i>=startRow && i<=endRow){
                irow.style.display = "block";
            }

        }
    }
}

function loginOrNot() {
    var droit=0;
   var url=location.href;
   var theUserName=url.substr(url.indexOf('=')+1);
   if(theUserName=="109002"){
       droit=1;
   }
   else{
       var str=localStorage.getItem("user");
       var arr=str?JSON.parse(str):[];
       if(arr!=[]){
           for(var i=0;i<arr.length;i++){
               var username=arr[i].username;
               if(username == theUserName){
                   droit=2;
                   break;
               }
           }
       }
   }
   return droit;
}

