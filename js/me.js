/**
 * Created by Yanyan on 2016/2/28.
 */
// �����һ����վ����һ��ҳ�棬ȥ��д���JS���룬�����Ǽ򵥻��Ǹ��ӣ���ѭ��������
// 1.JS�ķֳ�(����)
// 2.JS�Ĺ滮(����)
window.onload=function(){
    mv.app.toTip();
    mv.app.toBanner();
    mv.app.toSel();
    mv.app.toRun();
};
var mv={};// ����һ��ȫ�ֵĶ��������ռ�
mv.tools={};// ���зֳɣ������Ե�
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
mv.tools.getStyle=function(obj,attr){// ��ǰ����Ԫ�غ�����
    if(obj.currentStyle){
        return obj.currentStyle[attr];//IE6,7,8
    }else{
        return getComputedStyle(obj,false)[attr];// ��׼�����
    }
};
mv.ui={};//����������һЩС����
mv.ui.textChange=function(obj,str){// һ������Ĺ��������Ƴ�
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
    if(iCur==1){ return false; }// ����͸��Ϊ1��ʱ�򣬲���Ҫ�����������Ͳ�����������Ծ�ĵ��뵭����
    var value=0;// ������Ǵ�0�ȿ�ʼ��
    clearInterval(obj.timer);// ��ֹ��ε���м��ٵĹ���
    obj.timer=setInterval(function(){// ����ʱ����Ҫ����һ���˶���Ч��
        var speed=5;
        if(value==100){// ������100��ʱ�򣬴�͸�����Ѿ�����˲�͸���ģ�Ҫ�ö�ʱ��ͣ����
            clearInterval(obj.timer);
        }else{
            value+=speed;
            obj.style.opacity=value/100;
            obj.style.fliter="alpha(opacity"+ value +")";// ���ݴ���
        }
    },30);
};
mv.ui.fadeOut=function(obj){
    var iCur=mv.tools.getStyle(obj,"opacity");
    if(iCur==0){ return false; }// ����͸��Ϊ0��ʱ�򣬲���Ҫ����
    var value=100;// ��1��ʼ����
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
mv.ui.moveLeft=function(obj,old,now){// ��ǰ��ֵ���ƶ�Ŀ����ֵ
    clearInterval(obj.timer);//��ֹ��ʱ���ۼ�
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
mv.app={};// �����Ӧ�ã�ÿһ��С���ܣ����õ�Ч��
mv.app.toTip=function(){
    var oText1=document.getElementById("text1");
    var oText2=document.getElementById("text2");
    // ����������ʱ����������������Ĭ�����֣������
    // �����ʱ�������ж������ģ�����������Ƿ��Ĭ�ϵ���һ���ģ��������Ĭ�����֣��Ͳ�Ӧ����ʧ
    // ֻ�е����������������ǿյ�ʱ�򣬲���ʾĬ�����֣�����Ƴ�Ҳ����������
    mv.ui.textChange(oText1,"Search website");
    mv.ui.textChange(oText2,"Search website");
};
mv.app.toBanner=function(){
    // ���뵭������һ��li͸����Ϊ1��������li͸��Ϊ0����ס���������li
    // �л���ʱ�������˶�Ч������һ��li��͸���ȴ�1���0���ڶ���li͸���ȴ�0���1
    // �Ƶ���Ӧ��span����(������͸����)��������Ӧ�ļ�ͷ��Ĭ���ǲ���ʾ��
    var oAd=document.getElementById("ad");
    var aLi=oAd.getElementsByTagName("li");
    var oPrevBg=mv.tools.getByClass(oAd,"prev_bg")[0];
    var oNextBg=mv.tools.getByClass(oAd,"next_bg")[0];
    var oPrev=mv.tools.getByClass(oAd,"prev")[0];
    var oNext=mv.tools.getByClass(oAd,"next")[0];
    var iNow=0;// ����һ��Ҫ�ۼӵı���
    var timer=setInterval(auto,3000);
    function auto(){
        // �Զ����ţ������е�li�������õڶ���li�������Դ����ƣ���3��li������Ҳ����һ�������ٲ��ϵ��ۼ�
        iNow++;
        if(iNow==aLi.length-1){// ���ܳ������һ��li
            iNow=0;
        }else{
            iNow++;
        }
        for(var i=0;i<aLi.length;i++){// ���еĶ���������ǰ�ĵ���
            mv.ui.fadeIn(aLi[i]);// ���е�li������
        }
        mv.ui.fadeOut(aLi[iNow]);// ��ǰ�ĵ���
    }
    function autoPre(){
        iNow++;
        if(iNow==0){// ������һ��li��ʱ�򣬾͵������һ��li��Ȼ����ȥ�ݼ�
            iNow=aLi.length-1;
        }else{
            iNow--;
        }
        for(var i=0;i<aLi.length;i++){// ���еĶ���������ǰ�ĵ���
            mv.ui.fadeIn(aLi[i]);// ���е�li������
        }
        mv.ui.fadeOut(aLi[iNow]);// ��ǰ�ĵ���
    }
    oPrevBg.onmouseover=oPrev.onmouseover=function(){//span��a��ʵ��һ�������״̬������ͷҲ������¼����Ͳ��������������
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
        auto();// �ֲ�ͼ�Ǵ������ҵģ����ҵļ�ͷ���֮�����ֱ�ӵ���
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
            ev.cancelBubble=true;// ��ֹð�ݣ��������֮����з�Ӧ��
        };
    }
    for(var i=0;i<aUl.length;i++){// ÿ��ul���õ��������
        aUl[i].index=i;//ͨ��aUl������ֵ�ҵ���Ӧ��h2
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
                    ev.cancelBubble=true;//��ֹð���¼�
                    this.parentNode.style.display="none";
                };
            }
        })(aUl[i]);
    }
};
mv.app.toRun=function(){// �޷�����л����仯����ul��leftֵ��ul������3��li�������޷������ʱ��Ҫ�ٸ���һ��li
    var oRun=document.getElementById("run1");
    var oUl=oRun.getElementsByTagName("ul")[0];
    var aLi=oUl.getElementsByTagName("li");
    var oPrev=mv.tools.getByClass(oRun,"prev")[0];
    var oNext=mv.tools.getByClass(oRun,"next")[0];
    var iNow=0;// ����һ��������������ʶ��Ҫ֪����ǰ���ڵڼ���
    oUl.innerHTML+=oUl.innerHTML;
    oUl.style.width=aLi[0].offsetWidth*aLi.length+"px";// �����һ��li��ԭ��3��li���������һ��һ��6����oUl�Ŀ�Ⱦ���6��li�Ŀ��
    // ���1�Σ�ul��leftֵ����1��li�Ŀ�ȣ��������ul����2��li�Ŀ�ȣ�ÿ�ζ��������ۼӵ�
    oPrev.onclick=function(){// �����ڵ�һ��ͼ��ʱ������Ҫ���ǵ����Ƶĵ�һ��ͼƬ,ulҲӦ�ó�����ul�����һ��ľ���
        if(iNow==0){
            iNow=aLi.length/2;
            oUl.style.left=-oUl.offsetWidth/2+"px";
        }
        mv.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
        // ���ͷ��ul��������(����)��leftֵ�仯�ǣ���-2��-(2-1)�����ڵ�iNow��3
        iNow--;
    };
    oNext.onclick=function(){// leftֵ�Ǹ��ģ��Ǽ��ٵģ������˶���һ�����ٵ�Ч��
        if(iNow==aLi.length/2){// ��ul�ߵ�һ���ʱ��,iNow��ԭΪ0
            iNow=0;
            oUl.style.left=0;
        }
        mv.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
        iNow++;
        // �����ֵ�4��ͼƬ��ʱ��Ҳ���ǳ��ֵ����Ƶĵ�һ��ͼƬ��Ҫ��ul��leftֵ����0��Ҳ���ǻָ�����ʼ��״̬
        // �������ܹ�ʵ���޷����
        // �Ҽ�ͷ��ul����ǰ(����)��leftֵ�仯�ǣ���-1��-(1+1)�����ڵ�iNow��3
    }
};
