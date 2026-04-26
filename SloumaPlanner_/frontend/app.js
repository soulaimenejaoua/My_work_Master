let tasks = [];
let calendar;
let currentYear = new Date().getFullYear();
const API_BASE = "http://localhost:3000";

const taskInput = document.getElementById("taskInput");
const taskDateInput = document.getElementById("taskDateInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskAssigneeInput = document.getElementById("taskAssigneeInput");
const taskProjectInput = document.getElementById("taskProjectInput");

if (addTaskBtn) addTaskBtn.addEventListener("click", addTask);

if (taskInput) {
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const savedLanguage = localStorage.getItem("language") || "en";

  initCalendar(savedLanguage);
  loadTasks();
  loadProfile();
  loadTheme();
  loadTaskSettings();
  loadCalendarSettings();
  loadLanguageSettings();

  const importInput = document.getElementById("importExcelInput");
  if (importInput) {
    importInput.addEventListener("change", importTasksFromExcel);
  }
});

function showPage(pageId, el = null) {
  document.querySelectorAll(".page").forEach((p) => (p.style.display = "none"));

  const page = document.getElementById(pageId);
  if (page) page.style.display = "block";

  if (pageId === "planner-page" && calendar) {
    setTimeout(() => calendar.updateSize(), 100);
  }

  document.querySelectorAll(".sidebar li").forEach((li) => li.classList.remove("active"));

  if (el) {
    el.classList.add("active");
  } else {
    const mapping = {
      "board-page": 0,
      "planner-page": 1,
      "settings-page": 2
    };
    const index = mapping[pageId];
    const item = document.querySelectorAll(".sidebar li")[index];
    if (item) item.classList.add("active");
  }

  const titles = {
    "board-page": getTranslatedText("taskBoard"),
    "planner-page": getTranslatedText("planner"),
    "settings-page": getTranslatedText("settings")
  };

  const titleEl = document.getElementById("page-title");
  if (titleEl) titleEl.innerText = titles[pageId] || "Slouma Planner";
}

function openSettings() {
  showPage("settings-page");
}

function openProfile() {
  showPage("settings-page");
}