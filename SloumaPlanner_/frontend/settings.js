function saveProfile() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!username || !email) {
    alert(getTranslatedText("enterNameAndEmail"));
    return;
  }

  localStorage.setItem("profile", JSON.stringify({ username, email }));
  alert(getTranslatedText("profileSaved"));
}

function loadProfile() {
  const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");

  if (usernameInput) usernameInput.value = savedProfile.username || "";
  if (emailInput) emailInput.value = savedProfile.email || "";
}

function setTheme(theme) {
  localStorage.setItem("theme", theme);

  const lightBtn = document.getElementById("lightThemeBtn");
  const darkBtn = document.getElementById("darkThemeBtn");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    if (darkBtn) darkBtn.classList.add("active-theme");
    if (lightBtn) lightBtn.classList.remove("active-theme");
  } else {
    document.body.classList.remove("dark-mode");
    if (lightBtn) lightBtn.classList.add("active-theme");
    if (darkBtn) darkBtn.classList.remove("active-theme");
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}

function saveTaskSettings() {
  const taskSettings = {
    defaultStatus: document.getElementById("defaultStatus").value,
    showDates: document.getElementById("showDates").value,
    defaultPriority: document.getElementById("defaultPriority").value,
    confirmDelete: document.getElementById("confirmDelete").value
  };

  localStorage.setItem("taskSettings", JSON.stringify(taskSettings));
  alert(getTranslatedText("taskPreferencesSaved"));
  renderTasks();
}

function loadTaskSettings() {
  const saved = JSON.parse(localStorage.getItem("taskSettings") || "{}");

  document.getElementById("defaultStatus").value = saved.defaultStatus || "todo";
  document.getElementById("showDates").value = saved.showDates || "yes";
  document.getElementById("defaultPriority").value = saved.defaultPriority || "medium";
  document.getElementById("confirmDelete").value = saved.confirmDelete || "yes";
}

function saveCalendarSettings() {
  const calendarView = document.getElementById("calendarView").value;
  localStorage.setItem("calendarSettings", JSON.stringify({ calendarView }));

  if (calendar) calendar.changeView(calendarView);
  alert(getTranslatedText("calendarSettingsSaved"));
}

function loadCalendarSettings() {
  const saved = JSON.parse(localStorage.getItem("calendarSettings") || "{}");
  document.getElementById("calendarView").value = saved.calendarView || "dayGridMonth";
}

function saveLanguageSettings() {
  const language = document.getElementById("language").value;
  localStorage.setItem("language", language);

  applyLanguage(language);
  refreshCalendarLanguage(language);
  renderTasks();
  generateYearView(currentYear);

  alert(getTranslatedText("languageSaved"));
}

function loadLanguageSettings() {
  const savedLanguage = localStorage.getItem("language") || "en";
  document.getElementById("language").value = savedLanguage;

  applyLanguage(savedLanguage);
  refreshCalendarLanguage(savedLanguage);
}

async function importTasksFromExcel(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const buffer = await file.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet("Tasks") || workbook.worksheets[0];

    if (!worksheet) {
      alert("No worksheet found in this Excel file.");
      return;
    }

    const importedTasks = [];
worksheet.eachRow((row, rowNumber) => {
  // Your exported file has:
  // Row 1 = title
  // Row 2 = name/email
  // Row 3 = export date
  // Row 4 = spacer
  // Row 5 = table header
  // Real tasks start at row 6
  if (rowNumber < 6) return;

  const taskText = row.getCell(1).value;
  const status = row.getCell(2).value || "Planned";
  const priority = row.getCell(3).value || "Medium";
  const assignedTo = row.getCell(4).value || "";
  const projectName = row.getCell(5).value || "Slouma Planner";

  // In exported Excel, Due Date is column G / 7
  // In simple import template, Due Date may be column F / 6
  const dueDateValue = row.getCell(7).value || row.getCell(6).value || "";
  const dueDate = formatExcelDate(dueDateValue);

  if (!taskText) return;

  // Extra protection: skip header/report rows if they appear
  const taskTextString = String(taskText).trim().toLowerCase();
  if (
    taskTextString === "task" ||
    taskTextString.startsWith("name:") ||
    taskTextString.startsWith("export date") ||
    taskTextString.includes("slouma planner tasks")
  ) {
    return;
  }

  importedTasks.push({
    text: String(taskText).trim(),
    status: normalizeStatus(status),
    priority: normalizePriority(priority),
    assignedTo: String(assignedTo || "").trim(),
    projectName: String(projectName || "Slouma Planner").trim(),
    dueDate: dueDate,
    createdAt: new Date().toISOString(),
    eventId: dueDate ? "evt_" + Date.now() + "_" + rowNumber : ""
  });
});

const existingTasks = await fetch(`${API_BASE}/tasks`).then(r => r.json());

let importedCount = 0;
let skippedCount = 0;

for (const task of importedTasks) {
  const alreadyExists = existingTasks.some((existingTask) =>
    String(existingTask.text || "").trim().toLowerCase() === String(task.text || "").trim().toLowerCase() &&
    String(existingTask.dueDate || "") === String(task.dueDate || "") &&
    String(existingTask.assignedTo || "").trim().toLowerCase() === String(task.assignedTo || "").trim().toLowerCase() &&
    String(existingTask.projectName || "").trim().toLowerCase() === String(task.projectName || "").trim().toLowerCase()
  );

  if (alreadyExists) {
    skippedCount++;
    console.log("Skipped duplicate task:", task.text);
    continue;
  }

  const taskResponse = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });

  const taskResult = await taskResponse.json();
  task.id = taskResult.id;

  existingTasks.push(task);
  importedCount++;

  if (task.dueDate) {
    const event = {
      id: task.eventId,
      title: task.text,
      start: task.dueDate
    };

    await fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event)
    });
  }
}

await loadTasks();

if (calendar) {
  calendar.refetchEvents();
}

alert(`${importedCount} tasks imported successfully. ${skippedCount} duplicates skipped.`);

event.target.value = "";
  } catch (error) {
    console.error("Error importing Excel:", error);
    alert("Import failed. Please check the Excel file format.");
  }
}

function formatExcelDate(value) {
  if (!value) return "";

  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  if (typeof value === "object") {
    if (value.text) return String(value.text).trim().split("T")[0];
    if (value.result) return formatExcelDate(value.result);
  }

  if (typeof value === "number") {
    const excelEpoch = new Date(1899, 11, 30);
    excelEpoch.setDate(excelEpoch.getDate() + value);
    return excelEpoch.toISOString().split("T")[0];
  }

  return String(value).trim().split("T")[0];
}

async function exportTasks() {
  if (!tasks.length) {
    alert(getTranslatedText("noTasksToExport") || "No tasks to export.");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Tasks");

  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  const username = profile.username || "Unknown User";
  const email = profile.email || "No email";
  const exportDate = new Date().toLocaleDateString();

  // ===== TOP REPORT AREA =====
  worksheet.mergeCells("A1:G1");
  worksheet.getCell("A1").value = "Slouma Planner Tasks";
  worksheet.getCell("A1").font = {
    bold: true,
    size: 18,
    color: { argb: "FFFFFFFF" }
  };
  worksheet.getCell("A1").alignment = {
    horizontal: "center",
    vertical: "middle"
  };
  worksheet.getCell("A1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1D4ED8" }
  };
  worksheet.getRow(1).height = 28;

  worksheet.mergeCells("A2:G2");
  worksheet.getCell("A2").value = `Name: ${username}   |   Email: ${email}`;
  worksheet.getCell("A2").font = {
    bold: true,
    size: 11,
    color: { argb: "1E293B" }
  };
  worksheet.getCell("A2").alignment = {
    horizontal: "center",
    vertical: "middle"
  };
  worksheet.getCell("A2").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "EFF6FF" }
  };
  worksheet.getRow(2).height = 22;

  worksheet.mergeCells("A3:G3");
  worksheet.getCell("A3").value = `Export Date: ${exportDate}`;
  worksheet.getCell("A3").font = {
    italic: true,
    size: 11,
    color: { argb: "475569" }
  };
  worksheet.getCell("A3").alignment = {
    horizontal: "center",
    vertical: "middle"
  };
  worksheet.getCell("A3").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "F8FAFC" }
  };
  worksheet.getRow(3).height = 20;

  // Empty spacer row
  worksheet.getRow(4).height = 8;

  // ===== TABLE COLUMNS =====
  worksheet.columns = [
  { header: "Task", key: "text", width: 34 },
  { header: "Status", key: "status", width: 16 },
  { header: "Priority", key: "priority", width: 16 },
  { header: "Assigned To", key: "assignedTo", width: 20 },
  { header: "Project", key: "projectName", width: 22 },
  { header: "Created At", key: "createdAt", width: 24 },
  { header: "Due Date", key: "dueDate", width: 18 }
];

  // Put headers on row 5
  const headerRowIndex = 5;
  const headerRow = worksheet.getRow(headerRowIndex);
  headerRow.values = ["Task", "Status", "Priority", "Assigned To", "Project", "Created At", "Due Date"];
  headerRow.height = 24;

  headerRow.eachCell((cell) => {
    cell.font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
      size: 12
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "2563EB" }
    };
    cell.alignment = {
      horizontal: "center",
      vertical: "middle"
    };
    cell.border = {
      top: { style: "medium", color: { argb: "1E3A8A" } },
      left: { style: "medium", color: { argb: "1E3A8A" } },
      bottom: { style: "medium", color: { argb: "1E3A8A" } },
      right: { style: "medium", color: { argb: "1E3A8A" } }
    };
  });

  // ===== DATA ROWS =====
  tasks.forEach((task) => {
    worksheet.addRow({
  text: task.text,
  status: getDisplayStatus(task.status),
  priority: task.priority,
  assignedTo: task.assignedTo || "",
  projectName: task.projectName || "",
  createdAt: task.createdAt ? formatDate(task.createdAt) : "",
  dueDate: task.dueDate || ""
});
  });

  const lastRow = worksheet.lastRow.number;
  const startDataRow = 6;

  for (let rowNumber = startDataRow; rowNumber <= lastRow; rowNumber++) {
    const row = worksheet.getRow(rowNumber);

    row.eachCell((cell, colNumber) => {
      cell.alignment = {
        vertical: "middle",
        horizontal: colNumber === 2 || colNumber === 3 ? "center" : "left",
        wrapText: true
      };

      cell.border = {
        top: { style: "thin", color: { argb: "CBD5E1" } },
        left: { style: "thin", color: { argb: "CBD5E1" } },
        bottom: { style: "thin", color: { argb: "CBD5E1" } },
        right: { style: "thin", color: { argb: "CBD5E1" } }
      };
    });

    // Alternate row shading
    if (rowNumber % 2 === 0) {
      row.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F8FAFC" }
        };
      });
    }

    // Status cell style
    const statusCell = row.getCell(2);
    if (statusCell.value === "Planned") {
      statusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "E5E7EB" }
      };
      statusCell.font = { bold: true, color: { argb: "374151" } };
    } else if (statusCell.value === "In Progress") {
      statusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DBEAFE" }
      };
      statusCell.font = { bold: true, color: { argb: "1D4ED8" } };
    } else if (statusCell.value === "Completed") {
      statusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DCFCE7" }
      };
      statusCell.font = { bold: true, color: { argb: "15803D" } };
    }

    // Priority cell style
    const priorityCell = row.getCell(3);
    if (priorityCell.value === "low") {
      priorityCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DCFCE7" }
      };
      priorityCell.font = { bold: true, color: { argb: "166534" } };
    } else if (priorityCell.value === "medium") {
      priorityCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FEF3C7" }
      };
      priorityCell.font = { bold: true, color: { argb: "B45309" } };
    } else if (priorityCell.value === "high") {
      priorityCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FEE2E2" }
      };
      priorityCell.font = { bold: true, color: { argb: "B91C1C" } };
    }
  }

  // ===== THICKER OUTER BORDER =====
  for (let col = 1; col <= 7; col++) {
    worksheet.getCell(headerRowIndex, col).border = {
      ...worksheet.getCell(headerRowIndex, col).border,
      top: { style: "medium", color: { argb: "1E3A8A" } }
    };
    worksheet.getCell(lastRow, col).border = {
      ...worksheet.getCell(lastRow, col).border,
      bottom: { style: "medium", color: { argb: "1E3A8A" } }
    };
  }

  for (let row = headerRowIndex; row <= lastRow; row++) {
    worksheet.getCell(row, 1).border = {
      ...worksheet.getCell(row, 1).border,
      left: { style: "medium", color: { argb: "1E3A8A" } }
    };
    worksheet.getCell(row, 7).border = {
      ...worksheet.getCell(row, 7).border,
      right: { style: "medium", color: { argb: "1E3A8A" } }
    };
  }

  // ===== FILTERS =====
  worksheet.autoFilter = {
    from: "A5",
    to: "G5"
  };

  // Freeze header row
  worksheet.views = [{ state: "frozen", ySplit: 5 }];

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "slouma-tasks.xlsx";
  a.click();
  URL.revokeObjectURL(url);
}


function toggleHelpBox() {
  const helpBox = document.getElementById("helpBox");
  const helpToggle = document.querySelector(".help-toggle");

  if (!helpBox || !helpToggle) return;

  const isOpen = helpBox.style.display === "block";
  helpBox.style.display = isOpen ? "none" : "block";
  helpToggle.classList.toggle("open", !isOpen);
}

function normalizeStatus(value) {
  const status = String(value || "").trim().toLowerCase();

  if (status === "planned" || status === "todo" || status === "to do") {
    return "todo";
  }

  if (status === "in progress" || status === "doing") {
    return "doing";
  }

  if (status === "completed" || status === "done") {
    return "done";
  }

  return "todo";
}

function normalizePriority(value) {
  const priority = String(value || "").trim().toLowerCase();

  if (priority === "high") return "high";
  if (priority === "low") return "low";
  return "medium";
}

function getDisplayStatus(status) {
  if (status === "todo") return "Planned";
  if (status === "doing") return "In Progress";
  if (status === "done") return "Completed";
  return status || "";
}
