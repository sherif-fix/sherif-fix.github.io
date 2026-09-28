(function () {
  "use strict";
  var state=document.getElementById("state"),detail=document.getElementById("detail"),countdown=document.getElementById("countdown");
  var match=(navigator.userAgent||"").match(/PlayStation 4[ /]([\d.]+)/i);
  var fw=match?parseFloat(match[1]):NaN, engine="";
  if(fw===5.05||fw===5.07)engine="5.05";
  else if(fw>=7&&fw<=8.52)engine="7.00–8.52";
  else if(fw>=9&&fw<=9.60)engine="9.00–9.60";
  else if(fw>=10&&fw<=11.02)engine="10.00–11.02";
  else if(fw>=11.50&&fw<=12.02)engine="LAPSE";
  else if(fw>=12.50&&fw<=13)engine="POOPS";
  else if(fw>=13.02&&fw<=13.52)engine="13.02–13.52";
  state.setAttribute("dir","rtl");detail.setAttribute("dir","rtl");countdown.setAttribute("dir","rtl");
  if(!engine){state.textContent=match?"هذا الإصدار غير مدعوم":"افتح الصفحة من متصفح PS4";state.className="error";detail.textContent=match?"الإصدار المكتشف: "+match[1]:"لم يتم التعرف على جهاز PS4";countdown.textContent="يمكنك الرجوع إلى الصفحة الرئيسية.";return;}
  state.textContent="تم التعرف على إصدار "+match[1];state.className="ready";
  detail.textContent="تم اختيار المسار المناسب تلقائيًا: "+engine;
  var seconds=10;
  function tick(){countdown.textContent="يبدأ التجهيز تلقائيًا خلال "+seconds+" ثوانٍ...";
    if(seconds<=0){location.replace("../g2all/index.html");return;}
    seconds-=1;setTimeout(tick,1000);
  }
  tick();
})();
