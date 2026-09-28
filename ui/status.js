(function () {
"use strict";
var raw=document.getElementById("msgs"), state=document.getElementById("state");
var title=document.getElementById("friendly-title"), detail=document.getElementById("friendly-detail");
var card=document.getElementById("status-card"), fill=document.getElementById("cache-fill"), notice=document.getElementById("notice");
var cache=document.body.getAttribute("data-screen")==="cache";
var last="", lastState="", lastRaw="", phase="running";
function show(t,d,mode){title.textContent=t;detail.textContent=d;card.className="status-card"+(mode?" "+mode:"");notice.textContent=mode==="success"?"اكتملت العملية":mode==="failure"?"اتبع التعليمات الظاهرة":"لا تغلق المتصفح أثناء التشغيل";}
function render(){
 var text=raw.textContent||"", st=state.textContent||"", stClass=state.className||"";
 var signature=text+"|"+st+"|"+stClass;
 if(signature===last)return;
 var newState=st+"|"+stClass!==lastState, newRaw=text!==lastRaw;
 last=signature;lastState=st+"|"+stClass;lastRaw=text;
 if(cache){
   var percent=text.match(/(\d+)%/);
   if(/Error/i.test(text)){show("تعذر حفظ ملفات الأوفلاين","امسح بيانات المتصفح ثم افتح الصفحة مجددًا.","failure");fill.style.width="0%";}
   else if(/Installed Successfully|Close And Re-Open/i.test(text)){show("تم حفظ ملفات الأوفلاين بنجاح","أغلق المتصفح، وافصل الإنترنت، ثم افتح المتصفح مجددًا كما يطلب المحرك الجديد.","success");fill.style.width="100%";notice.textContent="التجهيز فقط اكتمل؛ لم يبدأ تشغيل GoldHEN بعد";}
   else{show("جاري تجهيز ملفات الأوفلاين",percent?"تم تنزيل "+percent[1]+"%":"يتم حفظ الملفات المطلوبة لإصدار جهازك.","");fill.style.width=percent?percent[1]+"%":"0%";}
   return;
 }
 if(/Failed to Load|Restart Your Console|Content not Found|Unsupported Firmware|Only for PS4|No offsets/i.test(text)){
   phase="failure";show("لم تكتمل محاولة التشغيل",/Only for PS4/i.test(text)?"افتح الصفحة من جهاز PS4 بإصدار مدعوم.":/Content not Found/i.test(text)?"تعذر تحميل ملف: امسح بيانات المتصفح وأعد تثبيت الكاش.":/Unsupported|No offsets/i.test(text)?"هذا الإصدار غير مدعوم بملفات التشغيل الحالية.":"أعد تشغيل الجهاز ثم حاول مرة أخرى.","failure");return;
 }
 if(newState && (/REBOOT|poisoned|no offsets|^threw$/i.test(st)||/bad/.test(stClass))){
   phase="failure";show("المحرك يطلب إعادة تشغيل الجهاز","أعد تشغيل PS4 قبل المحاولة التالية.","failure");return;
 }
 if(/GoldHEN.*\bLoaded\b/i.test(text)){
   if(phase!=="failure" || newRaw){
     phase="success";show(/Already Loaded/i.test(text)?"GoldHEN يعمل بالفعل":"تم تهكير جهازك بنجاح","اضغط زر PS للخروج والعودة إلى القائمة الرئيسية.","success");
   }
 }else if(phase!=="success"){
   phase="running";show("جاري الآن تهكير جهازك","برجاء الانتظار وعدم إغلاق المتصفح.","");
 }
}
if(window.MutationObserver){
 var observer=new MutationObserver(render);
 observer.observe(raw,{childList:true,subtree:true,characterData:true});
 observer.observe(state,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["class"]});
 render();
}else{document.body.className+=" raw-fallback";}
})();
