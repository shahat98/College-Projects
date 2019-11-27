var num;
var alpha;
var flag=0;
var myStorage=window.localStorage;
function submited()
{
    if (myStorage.getItem("submit")==null)
    {
        myStorage.setItem("submit",1);
    }
    else
        myStorage.setItem("submit",parseInt(myStorage.getItem("submit"))+1);
    var outDivAlpha=document.getElementById(2);
    for (;outDivAlpha.childNodes.length>0;)
        outDivAlpha.removeChild(outDivAlpha.childNodes[0]);
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
        for (var i=0;i<num;i++)
        {
            var rnd=random();
            if (chk[rnd])
            {
                i--;
                continue;
            }
            chk[rnd]=1;
            var newItem=document.createElement("li");
            var newAlpha=document.createTextNode(lstAlpha[rnd]);
            if (lstAlpha[rnd]==undefined)
                alert(rnd);
            newItem.appendChild(newAlpha);
            var outAlpha=document.getElementsByTagName("li");
            newItem.addEventListener("click",function(e){
                var imgDiv=document.getElementById(3);
                for (;imgDiv.childNodes.length>0;)
                    imgDiv.removeChild(imgDiv.childNodes[0]);
                alpha=this.textContent;
                flag=1;
               }); 
            outDivAlpha.appendChild(newItem);
        }
    }
}
function random()
{
    var ret=Math.random();
		ret*=1000;
		ret=Math.floor(ret);
        ret%=26;
		return ret;
}
function play()
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