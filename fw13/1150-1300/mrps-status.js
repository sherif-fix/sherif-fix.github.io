(function () {
  "use strict";
  var rawState = document.getElementById("state");
  var title = document.getElementById("friendly-title");
  var detail = document.getElementById("friendly-detail");
  var card = document.getElementById("status-card");
  var debugMode = /(?:\?|&)debug=1(?:&|$)/.test(location.search);
  var lastValue = "";

  if (debugMode) document.body.className += " debug-mode";

  function show(mainText, detailText, mode) {
    title.textContent = mainText;
    detail.textContent = detailText;
    card.className = "status-card" + (mode ? " " + mode : "");
  }

  function translate() {
    var raw = rawState && rawState.textContent ? rawState.textContent : "";
    var rawClass = rawState && rawState.className ? rawState.className : "";
    var value = raw + "|" + rawClass;
    if (!raw || value === lastValue) return;
    lastValue = value;

    if (/BERHASIL/i.test(raw)) {
      show("تم تهكير جهازك بنجاح", "اضغط زر PS للخروج والعودة إلى القائمة الرئيسية.", "success");
    } else if (/REBOOT|Gagal|FAILED|FAIL|ERROR|see log|no win|no commit|no offsets|could not|refusing|wrong|missing/i.test(raw) || /bad/i.test(rawClass)) {
      if (/REBOOT|Gagal/i.test(raw)) {
        show("يجب إعادة تشغيل الجهاز", "اضغط مطولًا على زر PS ثم اختر Power وبعدها Restart PS4.", "failure");
      } else {
        show("لم تكتمل محاولة التهكير", "أعد تشغيل الجهاز ثم حاول مرة أخرى.", "failure");
      }
    } else if (/ROOT \+ KERNEL PATCHED/i.test(raw)) {
      show("تم فتح صلاحيات الجهاز", "اكتملت تعديلات النظام لكن GoldHEN لم يبدأ تلقائيًا.", "partial");
    } else if (/^ROOT$|^REPAIRED$/i.test(raw)) {
      show("انتهت المحاولة بأمان", "لم يكتمل تشغيل GoldHEN؛ أعد التشغيل ثم حاول مرة أخرى.", "partial");
    } else if (/payload|stage 10/i.test(raw)) {
      show("جاري تشغيل GoldHEN", "تم الوصول إلى المرحلة الأخيرة، برجاء الانتظار.", "");
    } else if (/kernel patches|stage 9/i.test(raw)) {
      show("جاري تطبيق تعديلات النظام", "لا تغلق المتصفح ولا تضغط أي زر.", "");
    } else if (/jailbreak|sandbox escape|stage 8/i.test(raw)) {
      show("جاري فتح صلاحيات النظام", "العملية مستمرة بصورة طبيعية.", "");
    } else if (/leak|kernel read|kernel write|kread|karw|stage [3-7]/i.test(raw)) {
      show("جاري تجهيز ذاكرة النظام", "قد تستغرق هذه المرحلة بعض الوقت.", "");
    } else {
      show("جاري الآن تهكير جهازك", "برجاء الانتظار وعدم إغلاق المتصفح.", "");
    }
  }

  window.setInterval(translate, 150);
  window.addEventListener("error", function () {
    show("حدث خطأ أثناء التشغيل", "أعد تشغيل الجهاز ثم حاول مرة أخرى.", "failure");
  }, false);
  window.addEventListener("unhandledrejection", function () {
    show("لم تكتمل محاولة التهكير", "أعد تشغيل الجهاز ثم حاول مرة أخرى.", "failure");
  }, false);
  translate();
})();
