var num; //number of charcter
var alpha; //choosed charcter
var flag=0;
var myStorage=window.localStorage;
window.addEventListener("load",function(e) //store load events
{
    var last_load="";
    if (myStorage.getItem("load")!=null)
    {
        last_load=myStorage.getItem("load")+" , ";
    }
    myStorage.setItem("load",last_load+"load  the "+(e.target)+" in "+ new Date());
});

var subBut=document.getElementsByClassName("button")[0];
subBut.addEventListener("click",function(e) //store submit events
{
    var last_submit="";
    if (myStorage.getItem("submit")!=null)
        last_submit=myStorage.getItem("submit")+" , ";
    myStorage.setItem("submit",last_submit+"submit "+e.target+" in "+ new Date());
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
                var last_click="";
                if (myStorage.getItem("click character")!=null)
                    last_click=myStorage.getItem("click character")+" , ";
                myStorage.setItem("click character",last_click+"click character "+this.textContent+" in "+ new Date());
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