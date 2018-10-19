var user=document.getElementById("username");
var pwd=document.getElementById("password");
var register=document.getElementById("register");
var login=document.getElementById("login");

function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

user.onchange=function (e) {
    if(/[^\d]/.test(e.target.value)){
        console.log("error");
        e.target.style.borderColor="#9f0f17";

    }else{
        e.target.style.borderColor="";
    }
}

user.onfocus=function (e) {
    e.target.select();
    if(e.target.style.borderColor!="#9f0f17")
        e.target.style.borderColor="#0055AA";
}

register.onclick=function()
{
    window.location.href="http://localhost:63342/webstrom%20Code/WebstormProjects/blog%20register.html?_ijt=bbe7r1i0mvclqppk9kcbd1kuin";
}

login.onclick=function (e) {
    var str=localStorage.getItem("user");
    var arr=str?JSON.parse(str):[];
    if(arr==[]){
        alert("该账号未注册！")
    }
    else{
        for(var i=0;i<arr.length;i++){
            if(arr[i].username==user.value&&arr[i].password==pwd.value){
                setCookie("username",user.value,1);
                setCookie("password",pwd.value,1);
                alert("您已经成功登陆！");
                window.location.href="blog homepage.html?theUserName="+user.value;
                break;
            }
        }
        if(i==arr.length)
            alert("账号或密码不正确！")
    }
}