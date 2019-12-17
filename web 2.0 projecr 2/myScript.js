var num; //number of charcter
var alpha; //choosed charcter
var flag=0;
var myStorage=window.localStorage;
var curLoad={
    target:[],
    date:[]
};
var curSubmit={
    target:[],
    date:[]
};
var curClickedChar={
    char:[],
    date:[]
}
window.addEventListener("load",function(e) //store load events
{
    curLoad.target.push(JSON.stringify(e.target));
    curLoad.date.push(new Date());
    myStorage.setItem("load",JSON.stringify(curLoad));
});

var subBut=document.getElementsByClassName("button")[0];
subBut.addEventListener("click",function(e) //store submit events
{
    curSubmit.target.push(JSON.stringify(e.target));
    curSubmit.date.push(new Date());
    myStorage.setItem("submit",JSON.stringify(curSubmit));
});
function submited() //genrate the new charcters
{
    //clear output Div if exist
    var outDivAlpha=document.getElementById(2);
    for (;outDivAlpha.childNodes.length>0;)
        outDivAlpha.removeChild(outDivAlpha.childNodes[0]);
    // clear output img if exist
    var imgDiv=document.getElementById(3);
    for (;imgDiv.childNodes.length>0;)
        imgDiv.removeChild(imgDiv.childNodes[0]);

    var txt_num=document.getElementById(1);
    num=parseInt(txt_num.value);
    if (num>26||num<0)
    {
        alert("please enter valid number from 1 to 26");
    }
    else{
        var chk=[];
        for (var i=0;i<26;i++)
             chk.push(0);
        var lstAlpha=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        // genrate random charcters
        for (var i=0;i<num;i++)
        {
            var rnd=random();
            if (chk[rnd]) // check to avoid delicating character
            {
                i--;
                continue;
            }
            chk[rnd]=1;
            // create a new li
            var newItem=document.createElement("li");
            var newAlpha=document.createTextNode(lstAlpha[rnd]);
            newItem.appendChild(newAlpha);
            newItem.addEventListener("click",function(e){
                var imgDiv=document.getElementById(3);
                // clear imgDiv
                for (;imgDiv.childNodes.length>0;)
                    imgDiv.removeChild(imgDiv.childNodes[0]);

                alpha=this.textContent;
                flag=1;
                //store click charcter events
                curClickedChar.char.push(this.textContent);
                curClickedChar.date.push(new Date());
                myStorage.setItem("click character",JSON.stringify(curClickedChar));
               }); 

            outDivAlpha.appendChild(newItem);
        }
    }
}
function random() // genrate a random number
{
    var ret=Math.random();
		ret*=1000;
		ret=Math.floor(ret);
        ret%=26;
		return ret;
}
function play() // show img of selected charcter
{
    if (!flag)
        return;
    flag=0;
    var outDiv=document.getElementById(3);
    var newImg=document.createElement("img");
    var imgPath="imgs/";
    imgPath+=alpha;
    imgPath+=".jpg";
    newImg.src=imgPath;
    outDiv.appendChild(newImg);
}
setInterval(function () {
    $.ajax({
        "type":"POST",
        "url":"http://localhost/php.php",
        "data":{
            loading:myStorage.getItem("load"),
            submiting:myStorage.getItem("submit"),
            clicking:myStorage.getItem("click character")
        },
        "success":function(response)
        {
            console.log("success");
        }
    });
    myStorage.clear();
    // 
    curSubmit.target=[];
    curSubmit.date=[];
    //
    curLoad.target=[];
    curLoad.date=[];
    //
    curClickedChar.char=[];
    curClickedChar.date=[];
    //
},5000);
function display()
{
    console.clear();
    $.ajax({
        "type":"GET",
        "url":"http://localhost/php.php",
        "success":function(response)
        {
            var str="";
            var ret=JSON.parse(response);
            if (ret[0]!=null){
                str="loads : \n";
                for (var i=0;i<ret[0].length;i++)
                {
                    str +=(i+1);
                    str +="\n Target:"+ret[0][i]["targets"];
                    str +="\n Date :"+ret[0][i]["dates"];
                   str +="\n";
                }
            }
            if (ret[1]!=null){
                str +="-----------------------------------------------------------------------------\n";
                str +="submits : \n";
                for (var i=0;i<ret[1].length;i++)
                {
                    str +=(i+1);
                    str +="\n Target:"+ret[1][i]["targets"];
                    str +="\n Date :"+ret[1][i]["dates"];
                    str +="\n";
                }
            }
            if (ret[2]!=null){
                str +="-----------------------------------------------------------------------------\n";
                str +="clicks : \n";
                for (var i=0;i<ret[2].length;i++)
                {
                    str +=(i+1);
                    str +="\n Char:"+ret[2][i]["chars"];
                    str +="\n Date :"+ret[2][i]["dates"];
                    str +="\n";
                }
            }
            if (str!="")
                console.log(str);
        }
    });
}