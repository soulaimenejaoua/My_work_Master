
// ===== TRANSLATIONS =====
function applyLanguage(language) {
  const translations = {
    en: {
      appName: "Slouma Planner",
      board: "Board",
      planner: "Planner",
      settings: "Settings",
      taskBoard: "Task Board",
      addTask: "Add Task",
      enterTask: "Enter a new task...",
      toDo: "Planned",
      doing: "In Progress",
      done: "Completed",
      profile: "Profile",
      yourName: "Your name",
      yourEmail: "Your email",
      saveProfile: "Save Profile",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      taskPreferences: "Task Preferences",
      defaultTaskStatus: "Default Task Status",
      showTaskDates: "Show Task Dates",
      defaultTaskPriority: "Default Task Priority",
      confirmBeforeDelete: "Confirm Before Delete",
      savePreferences: "Save Preferences",
      calendarPreferences: "Calendar Preferences",
      defaultCalendarView: "Default Calendar View",
      saveCalendarSettings: "Save Calendar Settings",
      language: "Language",
      chooseLanguage: "Choose Language",
      saveLanguage: "Save Language",
      data: "Data",
      exportTasks: "Export Tasks",
      clearCompletedTasks: "Clear Completed Tasks",
      clearAllTasks: "Clear All Tasks",
      yes: "Yes",
      no: "No",
      low: "Low",
      medium: "Medium",
      high: "High",
      month: "Month",
      week: "Week",
      day: "Day",
      yearList: "Year List",
      yearView: "Year View",
      priority: "Priority",
      edit: "Edit",
      delete: "Delete",
      deleteTaskConfirm: "Delete this task?",
      editTaskPrompt: "Edit task:",
      enterEventTitle: "Enter event title:",
      profileSaved: "Profile saved successfully!",
      clearAllTasksConfirm: "Are you sure you want to clear all tasks?",
      allTasksCleared: "All tasks cleared!",
      completedTasksCleared: "Completed tasks cleared!",
      taskPreferencesSaved: "Task preferences saved!",
      calendarSettingsSaved: "Calendar settings saved!",
      languageSaved: "Language saved!",
      jan: "Jan",
      feb: "Feb",
      mar: "Mar",
      apr: "Apr",
      may: "May",
      jun: "Jun",
      jul: "Jul",
      aug: "Aug",
      sep: "Sep",
      oct: "Oct",
      nov: "Nov",
      dec: "Dec",
      addEvent: "Add Event",
      helpTitle: "How to Use This App",
helpIntro: "Use the app in 3 simple steps every day:",
helpStep1: "Check Planner for today’s events and deadlines.",
helpStep2: "Move tasks on the Board from Planned to In Progress when you start working on them.",
helpStep3: "Move finished tasks to Completed and prepare tomorrow’s tasks before you leave.",
helpTip: "Tip: keep no more than 3 tasks in progress at the same time."

    },
    fr: {
      appName: "Slouma Planner",
      board: "Tableau",
      planner: "Planificateur",
      settings: "Paramètres",
      taskBoard: "Tableau des tâches",
      addTask: "Ajouter une tâche",
      enterTask: "Entrez une nouvelle tâche...",
      toDo: "À faire",
      doing: "En cours",
      done: "Terminé",
      profile: "Profil",
      yourName: "Votre nom",
      yourEmail: "Votre email",
      saveProfile: "Enregistrer le profil",
      theme: "Thème",
      light: "Clair",
      dark: "Sombre",
      taskPreferences: "Préférences des tâches",
      defaultTaskStatus: "Statut par défaut",
      showTaskDates: "Afficher les dates des tâches",
      defaultTaskPriority: "Priorité par défaut",
      confirmBeforeDelete: "Confirmer avant suppression",
      savePreferences: "Enregistrer les préférences",
      calendarPreferences: "Préférences du calendrier",
      defaultCalendarView: "Vue par défaut du calendrier",
      saveCalendarSettings: "Enregistrer le calendrier",
      language: "Langue",
      chooseLanguage: "Choisir la langue",
      saveLanguage: "Enregistrer la langue",
      data: "Données",
      exportTasks: "Exporter les tâches",
      clearCompletedTasks: "Effacer les tâches terminées",
      clearAllTasks: "Effacer toutes les tâches",
      yes: "Oui",
      no: "Non",
      low: "Faible",
      medium: "Moyenne",
      high: "Élevée",
      month: "Mois",
      week: "Semaine",
      day: "Jour",
      yearList: "Liste annuelle",
      yearView: "Vue annuelle",
      priority: "Priorité",
      edit: "Modifier",
      delete: "Supprimer",
      deleteTaskConfirm: "Supprimer cette tâche ?",
      editTaskPrompt: "Modifier la tâche :",
      enterEventTitle: "Entrez le titre de l’événement :",
      profileSaved: "Profil enregistré avec succès !",
      clearAllTasksConfirm: "Voulez-vous vraiment effacer toutes les tâches ?",
      allTasksCleared: "Toutes les tâches ont été effacées !",
      completedTasksCleared: "Les tâches terminées ont été effacées !",
      taskPreferencesSaved: "Préférences des tâches enregistrées !",
      calendarSettingsSaved: "Préférences du calendrier enregistrées !",
      languageSaved: "Langue enregistrée !",
      jan: "Jan",
      feb: "Fév",
      mar: "Mar",
      apr: "Avr",
      may: "Mai",
      jun: "Juin",
      jul: "Juil",
      aug: "Août",
      sep: "Sep",
      oct: "Oct",
      nov: "Nov",
      dec: "Déc",
      addEvent: "Ajouter un événement",
      helpTitle: "Comment utiliser cette application",
helpIntro: "Utilisez l’application en 3 étapes simples chaque jour :",
helpStep1: "Consultez le planificateur pour les événements et échéances du jour.",
helpStep2: "Déplacez les tâches du tableau de Planifié vers En cours lorsque vous commencez à travailler dessus.",
helpStep3: "Déplacez les tâches terminées vers Terminé et préparez les tâches de demain avant de partir.",
helpTip: "Conseil : gardez au maximum 3 tâches en cours en même temps."
    },
    ar: {
      appName: "منظم سلوما",
      board: "اللوحة",
      planner: "المخطط",
      settings: "الإعدادات",
      taskBoard: "لوحة المهام",
      addTask: "إضافة مهمة",
      enterTask: "أدخل مهمة جديدة...",
      toDo: "للإنجاز",
      doing: "قيد العمل",
      done: "مكتمل",
      profile: "الملف الشخصي",
      yourName: "اسمك",
      yourEmail: "بريدك الإلكتروني",
      saveProfile: "حفظ الملف الشخصي",
      theme: "المظهر",
      light: "فاتح",
      dark: "داكن",
      taskPreferences: "تفضيلات المهام",
      defaultTaskStatus: "الحالة الافتراضية للمهمة",
      showTaskDates: "إظهار تواريخ المهام",
      defaultTaskPriority: "الأولوية الافتراضية",
      confirmBeforeDelete: "تأكيد قبل الحذف",
      savePreferences: "حفظ التفضيلات",
      calendarPreferences: "تفضيلات التقويم",
      defaultCalendarView: "العرض الافتراضي للتقويم",
      saveCalendarSettings: "حفظ إعدادات التقويم",
      language: "اللغة",
      chooseLanguage: "اختر اللغة",
      saveLanguage: "حفظ اللغة",
      data: "البيانات",
      exportTasks: "تصدير المهام",
      clearCompletedTasks: "حذف المهام المكتملة",
      clearAllTasks: "حذف كل المهام",
      yes: "نعم",
      no: "لا",
      low: "منخفضة",
      medium: "متوسطة",
      high: "عالية",
      month: "شهر",
      week: "أسبوع",
      day: "يوم",
      yearList: "قائمة السنة",
      yearView: "عرض السنة",
      priority: "الأولوية",
      edit: "تعديل",
      delete: "حذف",
      deleteTaskConfirm: "هل تريد حذف هذه المهمة؟",
      editTaskPrompt: "عدّل المهمة:",
      enterEventTitle: "أدخل عنوان الحدث:",
      profileSaved: "تم حفظ الملف الشخصي بنجاح!",
      clearAllTasksConfirm: "هل أنت متأكد من حذف كل المهام؟",
      allTasksCleared: "تم حذف كل المهام!",
      completedTasksCleared: "تم حذف المهام المكتملة!",
      taskPreferencesSaved: "تم حفظ تفضيلات المهام!",
      calendarSettingsSaved: "تم حفظ إعدادات التقويم!",
      languageSaved: "تم حفظ اللغة!",
      jan: "ينا",
      feb: "فبر",
      mar: "مار",
      apr: "أبر",
      may: "ماي",
      jun: "يون",
      jul: "يول",
      aug: "أغس",
      sep: "سبت",
      oct: "أكت",
      nov: "نوف",
      dec: "ديس",
      addEvent: "إضافة حدث",
      helpTitle: "كيفية استخدام هذا التطبيق",
helpIntro: "استخدم التطبيق يوميًا في 3 خطوات بسيطة:",
helpStep1: "تحقق من المخطط لمعرفة أحداث ومواعيد اليوم.",
helpStep2: "انقل المهام في اللوحة من مخطط إلى قيد الإنجاز عندما تبدأ العمل عليها.",
helpStep3: "انقل المهام المنتهية إلى مكتمل وجهّز مهام الغد قبل الانتهاء.",
helpTip: "نصيحة: لا تجعل أكثر من 3 مهام في قيد الإنجاز في نفس الوقت."
    }
  };

  const dict = translations[language] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });

  if (language === "ar") {
    document.body.dir = "rtl";
  } else {
    document.body.dir = "ltr";
  }

  const activePage = document.querySelector(".page:not([style*='display: none'])");
  if (activePage) {
    const pageId = activePage.id;
    const titleEl = document.getElementById("page-title");
    if (titleEl) {
      if (pageId === "board-page") titleEl.innerText = dict.taskBoard;
      if (pageId === "planner-page") titleEl.innerText = dict.planner;
      if (pageId === "settings-page") titleEl.innerText = dict.settings;
    }
  }
}

function getTranslatedText(key) {
  const language = localStorage.getItem("language") || "en";

  const textMap = {
    en: {
      toDo: "Planned",
      doing: "In Progress",
      done: "Completed",
      priority: "Priority",
      edit: "Edit",
      delete: "Delete",
      deleteTaskConfirm: "Delete this task?",
      editTaskPrompt: "Edit task:",
      enterEventTitle: "Enter event title:",
      profileSaved: "Profile saved successfully!",
      clearAllTasksConfirm: "Are you sure you want to clear all tasks?",
      allTasksCleared: "All tasks cleared!",
      completedTasksCleared: "Completed tasks cleared!",
      taskPreferencesSaved: "Task preferences saved!",
      calendarSettingsSaved: "Calendar settings saved!",
      languageSaved: "Language saved!",
      taskBoard: "Task Board",
      planner: "Planner",
      settings: "Settings",
      enterNameAndEmail: "Please enter both name and email.",
      noTasksToExport: "No tasks to export.",
      addEvent: "Add Event",
      helpTitle: "How to Use This App",
helpIntro: "Use the app in 3 simple steps every day:",
helpStep1: "Check Planner for today’s events and deadlines.",
helpStep2: "Move tasks on the Board from Planned to In Progress when you start working on them.",
helpStep3: "Move finished tasks to Completed and prepare tomorrow’s tasks before you leave.",
helpTip: "Tip: keep no more than 3 tasks in progress at the same time."
    },
    fr: {
      toDo: "À faire",
      doing: "En cours",
      done: "Terminé",
      priority: "Priorité",
      edit: "Modifier",
      delete: "Supprimer",
      deleteTaskConfirm: "Supprimer cette tâche ?",
      editTaskPrompt: "Modifier la tâche :",
      enterEventTitle: "Entrez le titre de l’événement :",
      profileSaved: "Profil enregistré avec succès !",
      clearAllTasksConfirm: "Voulez-vous vraiment effacer toutes les tâches ?",
      allTasksCleared: "Toutes les tâches ont été effacées !",
      completedTasksCleared: "Les tâches terminées ont été effacées !",
      taskPreferencesSaved: "Préférences des tâches enregistrées !",
      calendarSettingsSaved: "Préférences du calendrier enregistrées !",
      languageSaved: "Langue enregistrée !",
      taskBoard: "Tableau des tâches",
      planner: "Planificateur",
      settings: "Paramètres",
      enterNameAndEmail: "Veuillez entrer le nom et l’email.",
      noTasksToExport: "Aucune tâche à exporter.",
      addEvent: "Ajouter un événement",
      helpTitle: "Comment utiliser cette application",
helpIntro: "Utilisez l’application en 3 étapes simples chaque jour :",
helpStep1: "Consultez le planificateur pour les événements et échéances du jour.",
helpStep2: "Déplacez les tâches du tableau de Planifié vers En cours lorsque vous commencez à travailler dessus.",
helpStep3: "Déplacez les tâches terminées vers Terminé et préparez les tâches de demain avant de partir.",
helpTip: "Conseil : gardez au maximum 3 tâches en cours en même temps."
    },
    ar: {
      toDo: "للإنجاز",
      doing: "قيد العمل",
      done: "مكتمل",
      priority: "الأولوية",
      edit: "تعديل",
      delete: "حذف",
      deleteTaskConfirm: "هل تريد حذف هذه المهمة؟",
      editTaskPrompt: "عدّل المهمة:",
      enterEventTitle: "أدخل عنوان الحدث:",
      profileSaved: "تم حفظ الملف الشخصي بنجاح!",
      clearAllTasksConfirm: "هل أنت متأكد من حذف كل المهام؟",
      allTasksCleared: "تم حذف كل المهام!",
      completedTasksCleared: "تم حذف المهام المكتملة!",
      taskPreferencesSaved: "تم حفظ تفضيلات المهام!",
      calendarSettingsSaved: "تم حفظ إعدادات التقويم!",
      languageSaved: "تم حفظ اللغة!",
      taskBoard: "لوحة المهام",
      planner: "المخطط",
      settings: "الإعدادات",
      enterNameAndEmail: "يرجى إدخال الاسم والبريد الإلكتروني.",
      noTasksToExport: "لا توجد مهام للتصدير.",
      addEvent: "إضافة حدث",
      helpTitle: "كيفية استخدام هذا التطبيق",
helpIntro: "استخدم التطبيق يوميًا في 3 خطوات بسيطة:",
helpStep1: "تحقق من المخطط لمعرفة أحداث ومواعيد اليوم.",
helpStep2: "انقل المهام في اللوحة من مخطط إلى قيد الإنجاز عندما تبدأ العمل عليها.",
helpStep3: "انقل المهام المنتهية إلى مكتمل وجهّز مهام الغد قبل الانتهاء.",
helpTip: "نصيحة: لا تجعل أكثر من 3 مهام في قيد الإنجاز في نفس الوقت."
    }
  };

  return textMap[language]?.[key] || textMap.en[key] || key;
}

function getTranslatedPriority(priority) {
  const language = localStorage.getItem("language") || "en";

  const priorities = {
    en: { low: "Low", medium: "Medium", high: "High" },
    fr: { low: "Faible", medium: "Moyenne", high: "Élevée" },
    ar: { low: "منخفضة", medium: "متوسطة", high: "عالية" }
  };

  return priorities[language]?.[priority] || priority;
}

function getFullCalendarButtonText(language) {
  const map = {
    en: {
      today: "today",
      month: "month",
      week: "week",
      day: "day",
      list: "list"
    },
    fr: {
      today: "aujourd’hui",
      month: "mois",
      week: "semaine",
      day: "jour",
      list: "liste"
    },
    ar: {
      today: "اليوم",
      month: "شهر",
      week: "أسبوع",
      day: "يوم",
      list: "قائمة"
    }
  };

  return map[language] || map.en;
}

function getFullCalendarAllDayText(language) {
  const map = {
    en: "all-day",
    fr: "toute la journée",
    ar: "طوال اليوم"
  };

  return map[language] || map.en;
}

function getCalendarTitleFormat(language) {
  if (language === "ar") {
    return { year: "numeric", month: "long", day: "numeric" };
  }

  if (language === "fr") {
    return { year: "numeric", month: "long", day: "numeric" };
  }

  return { year: "numeric", month: "long" };
}
function refreshCalendarLanguage(language) {
  if (!calendar) {
    initCalendar(language);
    return;
  }

  const currentDate = calendar.getDate();
  const currentView = calendar.view.type;

  calendar.destroy();
  initCalendar(language);

  calendar.changeView(currentView);
  calendar.gotoDate(currentDate);
}