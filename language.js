const translations = {
  en: {
    home: "Home",
    setting: "Setting",
    hello: "Hello, Amjad",
    chatSummarized: "Your chat is summarized!",
    groupsActive: "Your groups are active!",
    tasksFound: "Tasks found",
    deadlinesDetected: "Deadlines detected",
    importantFound: "Important messages found",
    tasks: "Tasks",
    deadlines: "Deadlines",
    importantMessages: "Important Messages",
    addNewTask: "Add new task",
    addNewDeadline: "Add new deadline",
    uploadChatFile: "Upload Chat File",
    groupName: "Group name",
    groupHint: "Enter the group name exactly the same every time.",
    chatFile: "Chat file",
    chatHint: "Upload exported chat file as .txt",
    analyzeChat: "Analyze chat",
    resetHistory: "Reset this group history",
    preview: "Preview",
    noFile: "No file analyzed yet",
    previewHint: "Upload a chat file to see which messages will be summarized.",
    profile: "Profile",
    usernameLabel: "Username:",
    emailLabel: "Email:",
    changePassword: "Change Password",
    logout: "Logout",
    languages: "Languages",
    notification: "Notification",
    tasksAlerts: "Tasks Alerts",
    deadlinesAlerts: "Deadlines Alerts",
    importantAlerts: "Important Messages",
    reminderFrequency: "Reminder Frequency",
    daily: "Daily",
    weekly: "Weekly"
  },

  ar: {
    home: "الرئيسية",
    setting: "الإعدادات",
    hello: "مرحبًا، أمجاد",
    chatSummarized: "تم تلخيص المحادثة!",
    groupsActive: "قروباتك نشطة!",
    tasksFound: "مهام تم العثور عليها",
    deadlinesDetected: "مواعيد نهائية تم اكتشافها",
    importantFound: "رسائل مهمة تم العثور عليها",
    tasks: "المهام",
    deadlines: "المواعيد النهائية",
    importantMessages: "الرسائل المهمة",
    addNewTask: "إضافة مهمة جديدة",
    addNewDeadline: "إضافة موعد نهائي",
    uploadChatFile: "رفع ملف المحادثة",
    groupName: "اسم القروب",
    groupHint: "اكتب اسم القروب بنفس الطريقة كل مرة.",
    chatFile: "ملف المحادثة",
    chatHint: "ارفع ملف المحادثة بصيغة .txt",
    analyzeChat: "تحليل المحادثة",
    resetHistory: "إعادة ضبط سجل هذا القروب",
    preview: "معاينة",
    noFile: "لم يتم تحليل أي ملف بعد",
    previewHint: "ارفع ملف محادثة لعرض الرسائل التي سيتم تلخيصها.",
    profile: "الملف الشخصي",
    usernameLabel: "اسم المستخدم:",
    emailLabel: "البريد الإلكتروني:",
    changePassword: "تغيير كلمة المرور",
    logout: "تسجيل الخروج",
    languages: "اللغة",
    notification: "الإشعارات",
    tasksAlerts: "تنبيهات المهام",
    deadlinesAlerts: "تنبيهات المواعيد",
    importantAlerts: "تنبيهات الرسائل المهمة",
    reminderFrequency: "تكرار التذكير",
    daily: "يومي",
    weekly: "أسبوعي"
  }
};

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

function getUserKey(key) {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "index.html";
    return null;
  }

  return `${key}_${user.id}`;
}

function applyLanguage() {
  const lang = localStorage.getItem(getUserKey("appLanguage")) || "en";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");

    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;

  const selected = document.querySelector(
    `input[name="language"][value="${lang}"]`
  );

  if (selected) selected.checked = true;
}

function changeLanguage(lang) {
  localStorage.setItem(getUserKey("appLanguage"), lang);
  applyLanguage();
}

window.addEventListener("load", applyLanguage);