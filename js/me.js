/**
 * Created by Yanyan on 2016/2/28.
 */
// 如何在一个网站或者一个页面，去书写你的JS代码，无论是简单还是复杂，遵循下面两点
// 1.JS的分成(功能)
// 2.JS的规划(管理)
window.onload=function(){
    mv.app.toTip();
    mv.app.toBanner();
    mv.app.toSel();
    mv.app.toRun();
};
var mv={};// 建立一个全局的对象，命名空间
mv.tools={};// 进行分成，功能性的
mv.tools.getByClass=function(oParent,sClass){
    var aELem=oParent.getElementsByTagName("*");
    var arr=[];
    var re=new RegExp("\\b"+sClass+"\\b");
    for(var i=0;i<aELem.length;i++){
        if(re.test(aELem[i].className)){
            arr.push(aELem[i]);
        }
    }
    return arr;
};
mv.tools.getStyle=function(obj,attr){// 当前操作元素和属性
    if(obj.currentStyle){
        return obj.currentStyle[attr];//IE6,7,8
    }else{
        return getComputedStyle(obj,false)[attr];// 标准浏览器
    }
};
mv.ui={};//组件，具体的一些小功能
mv.ui.textChange=function(obj,str){// 一个对象的光标移入和移出
    obj.onfocus=function(){
        if(this.value==str){
            this.value="";
        }
    };
    obj.onblur=function(){
        if(this.value==""){
            this.value=str;
        }
    };
};
mv.ui.fadeIn=function(obj){
    var iCur=mv.tools.getStyle(obj,"opacity");
    if(iCur==1){ return false; }// 本身透明为1的时候，不需要淡出，这样就不会有那种跳跃的淡入淡出了
    var value=0;// 淡入就是从0先开始的
    clearInterval(obj.timer);// 防止多次点击有加速的过程
    obj.timer=setInterval(function(){// 开定时器主要是有一个运动的效果
        var speed=5;
        if(value==100){// 当等于100的时候，从透明的已经变成了不透明的，要让定时器停下了
            clearInterval(obj.timer);
        }else{
            value+=speed;
            obj.style.opacity=value/100;
            obj.style.fliter="alpha(opacity"+ value +")";// 兼容处理
        }
    },30);
};
mv.ui.fadeOut=function(obj){
    var iCur=mv.tools.getStyle(obj,"opacity");
    if(iCur==0){ return false; }// 本身透明为0的时候，不需要淡入
    var value=100;// 从1开始淡出
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var speed=-5;
        if(value==0){
            clearInterval(obj.timer);
        }else{
            value+=speed;
            obj.style.opacity=value/100;
            obj.style.fliter="alpha(opacity"+ value +")";
        }
    },30);
};
mv.ui.moveLeft=function(obj,old,now){// 当前的值，移动目标点的值
    clearInterval(obj.timer);//防止定时器累加
    obj.timer=setInterval(function(){
        var iSpeed=(now-old)/10;
        //iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
        if(now==old){
            clearInterval(timer);
        }else{
            old+=iSpeed;
            obj.style.left=old+"px";
        }
    },30);
};
mv.app={};// 具体的应用，每一个小功能，公用的效果
mv.app.toTip=function(){
    var oText1=document.getElementById("text1");
    var oText2=document.getElementById("text2");
    // 当光标移入的时候，如果输入框里面是默认文字，就清空
    // 移入的时候是有判断条件的，输入的文字是否和默认的是一样的，如果不是默认文字，就不应该消失
    // 只有当输入框里面的文字是空的时候，才显示默认文字，光标移出也是有条件的
    mv.ui.textChange(oText1,"Search website");
    mv.ui.textChange(oText2,"Search website");
};
mv.app.toBanner=function(){
    // 淡入淡出，第一个li透明度为1，后两个li透明为0，盖住后面的两个li
    // 切换的时候是以运动效果，第一个li的透明度从1变成0，第二个li透明度从0变成1
    // 移到对应的span上面(利用了透明层)，出现相应的箭头，默认是不显示的
    var oAd=document.getElementById("ad");
    var aLi=oAd.getElementsByTagName("li");
    var oPrevBg=mv.tools.getByClass(oAd,"prev_bg")[0];
    var oNextBg=mv.tools.getByClass(oAd,"next_bg")[0];
    var oPrev=mv.tools.getByClass(oAd,"prev")[0];
    var oNext=mv.tools.getByClass(oAd,"next")[0];
    var iNow=0;// 声明一个要累加的变量
    var timer=setInterval(auto,3000);
    function auto(){
        // 自动播放：让所有的li淡出，让第二个li淡出，以此类推，第3个li淡出，也就是一个变量再不断的累加
        iNow++;
        if(iNow==aLi.length-1){// 不能超过最后一个li
            iNow=0;
        }else{
            iNow++;
        }
        for(var i=0;i<aLi.length;i++){// 所有的都淡出，当前的淡入
            mv.ui.fadeIn(aLi[i]);// 所有的li都淡出
        }
        mv.ui.fadeOut(aLi[iNow]);// 当前的淡入
    }
    function autoPre(){
        iNow++;
        if(iNow==0){// 当到第一个li的时候，就等于最后一个li，然后再去递减
            iNow=aLi.length-1;
        }else{
            iNow--;
        }
        for(var i=0;i<aLi.length;i++){// 所有的都淡出，当前的淡入
            mv.ui.fadeIn(aLi[i]);// 所有的li都淡出
        }
        mv.ui.fadeOut(aLi[iNow]);// 当前的淡入
    }
    oPrevBg.onmouseover=oPrev.onmouseover=function(){//span和a其实是一个分离的状态，给箭头也加鼠标事件，就不会出现闪动问题
        oPrev.style.display="block";
        clearInterval(timer);
    };
    oNextBg.onmouseover=oNext.onmouseover=function(){
        oNext.style.display="block";
        clearInterval(timer);
    };

    oPrevBg.onmouseout=oPrev.onmouseout=function(){
        oPrev.style.display="none";
        timer=setInterval(auto,3000);
    };
    oNextBg.onmouseout=oNext.onmouseout=function(){
        oNext.style.display="none";
        timer=setInterval(auto,3000);
    };
    oPrev.onclick=function(){
        autoPre();
    };
    oNext.onclick=function(){
        auto();// 轮播图是从左往右的，向右的箭头点击之后可以直接调用
    }
};
mv.app.toSel=function(){
    var oSel1=document.getElementById("sel1");
    var aDd=oSel1.getElementsByTagName("dd");
    var aUl=oSel1.getElementsByTagName("ul");
    var aH2=oSel1.getElementsByTagName("h2");
    for(var i=0;i<aDd.length;i++){
        aDd[i].index=i;
        aDd[i].onclick=function(ev){
            var ev=ev || window.event;
            var This=this;
            for(var i=0;i<aUl.length;i++){
                aUl[i].style.display="none";
            }
            aUl[this.index].style.display="block";
            document.onclick=function(){
                aUl[This.index].style.display="none";
            };
            ev.cancelBubble=true;// 阻止冒泡，这样点击之后就有反应了
        };
    }
    for(var i=0;i<aUl.length;i++){// 每个ul都用到这个函数
        aUl[i].index=i;//通过aUl的索引值找到对应的h2
        (function(oUL){
            var aLi=oUL.getElementsByTagName("li");
            for(var i=0;i<aLi.length;i++){
                aLi[i].onmouseover=function(){
                    this.className="active";
                };
                aLi[i].onmouseout=function(){
                    this.className="";
                };
                aLi[i].onclick=function(ev){
                    var ev=ev||window.event;
                    aH2[this.parentNode.index].innerHTML=this.innerHTML;
                    ev.cancelBubble=true;//阻止冒泡事件
                    this.parentNode.style.display="none";
                };
            }
        })(aUl[i]);
    }
};
mv.app.toRun=function(){// 无缝滚动切换，变化的是ul的left值，ul里面有3个li，操作无缝滚动的时候，要再复制一份li
    var oRun=document.getElementById("run1");
    var oUl=oRun.getElementsByTagName("ul")[0];
    var aLi=oUl.getElementsByTagName("li");
    var oPrev=mv.tools.getByClass(oRun,"prev")[0];
    var oNext=mv.tools.getByClass(oRun,"next")[0];
    var iNow=0;// 声明一个变量，当做标识，要知道当前是在第几张
    oUl.innerHTML+=oUl.innerHTML;
    oUl.style.width=aLi[0].offsetWidth*aLi.length+"px";// 多添加一组li，原来3个li，又添加了一组一共6个，oUl的宽度就是6个li的宽度
    // 点击1次，ul的left值就走1个li的宽度，点击两次ul就走2个li的宽度，每次都是这样累加的
    oPrev.onclick=function(){// 当你在第一张图的时候，你需要的是到复制的第一张图片,ul也应该出现在ul整体宽一半的距离
        if(iNow==0){
            iNow=aLi.length/2;
            oUl.style.left=-oUl.offsetWidth/2+"px";
        }
        mv.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
        // 左箭头，ul是往回走(向右)，left值变化是：从-2到-(2-1)，现在的iNow是3
        iNow--;
    };
    oNext.onclick=function(){// left值是负的，是减少的，向左运动是一个匀速的效果
        if(iNow==aLi.length/2){// 当ul走到一半的时候,iNow还原为0
            iNow=0;
            oUl.style.left=0;
        }
        mv.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
        iNow++;
        // 当出现第4张图片的时候，也就是出现到复制的第一张图片，要把ul的left值拉到0，也就是恢复到初始的状态
        // 这样才能够实现无缝滚动
        // 右箭头，ul是往前(向左)，left值变化是：从-1到-(1+1)，现在的iNow是3
    }
};
