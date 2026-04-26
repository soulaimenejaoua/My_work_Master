async function addTask() {
  const text = taskInput?.value.trim();
  if (!text) return;

  const selectedDate = taskDateInput?.value || "";
  const assignedTo = taskAssigneeInput?.value.trim() || "";
  const projectName = taskProjectInput?.value.trim() || "Slouma Planner";
  const savedTaskSettings = JSON.parse(localStorage.getItem("taskSettings") || "{}");

  const eventDate = selectedDate || new Date().toISOString().split("T")[0];
  const eventId = "evt_" + Date.now();

  const task = {
  text,
  status: savedTaskSettings.defaultStatus || "todo",
  priority: savedTaskSettings.defaultPriority || "medium",
  createdAt: new Date().toISOString(),
  dueDate: eventDate,
  eventId,
  assignedTo,
  projectName
};
  try {
    const taskResponse = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    });

    if (!taskResponse.ok) throw new Error("Failed to save task");

    const taskResult = await taskResponse.json();
    task.id = taskResult.id;

    const event = {
      id: eventId,
      title: text,
      start: eventDate
    };

    const eventResponse = await fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event)
    });

    if (!eventResponse.ok) throw new Error("Failed to save event");

    tasks.unshift(task);
    taskInput.value = "";
    if (taskDateInput) taskDateInput.value = "";
    if (taskAssigneeInput) taskAssigneeInput.value = "";
    if (taskProjectInput) taskProjectInput.value = "";
    renderTasks();

    if (calendar) calendar.addEvent(event);
  } catch (error) {
    console.error("Error adding task:", error);
    alert("Add Task failed. Check console.");
  }
}

async function moveTask(id, status) {
  try {
    await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    tasks = tasks.map((t) => (t.id === id ? { ...t, status } : t));
    renderTasks();
  } catch (error) {
    console.error("Error moving task:", error);
  }
}

async function deleteTask(id) {
  const savedTaskSettings = JSON.parse(localStorage.getItem("taskSettings") || "{}");
  const mustConfirm = savedTaskSettings.confirmDelete !== "no";

  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  if (mustConfirm && !confirm(getTranslatedText("deleteTaskConfirm"))) return;

  try {
    await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });

    if (task.eventId) {
      await fetch(`${API_BASE}/events/${task.eventId}`, { method: "DELETE" });

      if (calendar) {
        const calendarEvent = calendar.getEventById(task.eventId);
        if (calendarEvent) calendarEvent.remove();
      }
    }

    tasks = tasks.filter((t) => t.id !== id);
    renderTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

async function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  const newText = prompt(getTranslatedText("editTaskPrompt"), task.text);
  if (!newText || !newText.trim()) return;

  const trimmedText = newText.trim();

  try {
    await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: trimmedText })
    });

    task.text = trimmedText;
    renderTasks();
  } catch (error) {
    console.error("Error editing task:", error);
  }
}

function formatDate(date) {
  const language = localStorage.getItem("language") || "en";
  const localeMap = { en: "en-US", fr: "fr-FR", ar: "ar" };
  return new Date(date).toLocaleString(localeMap[language] || "en-US");
}

function renderTasks() {
  const todo = document.getElementById("todo");
  const doing = document.getElementById("doing");
  const done = document.getElementById("done");
  if (!todo || !doing || !done) return;

  const savedTaskSettings = JSON.parse(localStorage.getItem("taskSettings") || "{}");
  const showDates = savedTaskSettings.showDates !== "no";

  todo.innerHTML = "";
  doing.innerHTML = "";
  done.innerHTML = "";

  tasks.forEach((task) => {
    const el = document.createElement("div");
    el.className = "task";

    el.innerHTML = `
      <p><strong>${task.text}</strong></p>
      <small class="priority ${task.priority || "medium"}">
        ${getTranslatedText("priority")}: ${getTranslatedPriority(task.priority || "medium")}
      </small>

      ${task.assignedTo ? `<small>Assigned to: ${task.assignedTo}</small>` : ""}
      ${task.projectName ? `<small>Project: ${task.projectName}</small>` : ""}
      
      ${showDates ? `<small>${formatDate(task.createdAt)}</small>` : ""}

      <div class="actions">
        <button title="${getTranslatedText("toDo")}" onclick="moveTask(${task.id}, 'todo')"><i class="fa-solid fa-list"></i></button>
        <button title="${getTranslatedText("doing")}" onclick="moveTask(${task.id}, 'doing')"><i class="fa-solid fa-gear"></i></button>
        <button title="${getTranslatedText("done")}" onclick="moveTask(${task.id}, 'done')"><i class="fa-solid fa-check"></i></button>
        <button class="icon-btn edit" title="${getTranslatedText("edit")}" onclick="editTask(${task.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="icon-btn delete" title="${getTranslatedText("delete")}" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    if (task.status === "todo") todo.appendChild(el);
    if (task.status === "doing") doing.appendChild(el);
    if (task.status === "done") done.appendChild(el);
  });
}

async function loadTasks() {
  try {
    const response = await fetch(`${API_BASE}/tasks`);
    tasks = await response.json();
    renderTasks();
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

async function clearTasks() {
  if (!confirm(getTranslatedText("clearAllTasksConfirm"))) return;

  try {
    for (const task of tasks) {
      await fetch(`${API_BASE}/tasks/${task.id}`, { method: "DELETE" });
      if (task.eventId) {
        await fetch(`${API_BASE}/events/${task.eventId}`, { method: "DELETE" });
        if (calendar) {
          const calendarEvent = calendar.getEventById(task.eventId);
          if (calendarEvent) calendarEvent.remove();
        }
      }
    }

    tasks = [];
    renderTasks();
    alert(getTranslatedText("allTasksCleared"));
  } catch (error) {
    console.error("Error clearing all tasks:", error);
  }
}

async function clearCompletedTasks() {
  const doneTasks = tasks.filter((task) => task.status === "done");

  try {
    for (const task of doneTasks) {
      await fetch(`${API_BASE}/tasks/${task.id}`, { method: "DELETE" });
      if (task.eventId) {
        await fetch(`${API_BASE}/events/${task.eventId}`, { method: "DELETE" });
        if (calendar) {
          const calendarEvent = calendar.getEventById(task.eventId);
          if (calendarEvent) calendarEvent.remove();
        }
      }
    }

    tasks = tasks.filter((task) => task.status !== "done");
    renderTasks();
    alert(getTranslatedText("completedTasksCleared"));
  } catch (error) {
    console.error("Error clearing completed tasks:", error);
  }
}