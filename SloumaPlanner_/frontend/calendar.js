function initCalendar(language = "en") {
  const calendarEl = document.getElementById("calendar");
  if (!calendarEl) return;

  const calendarSettings = JSON.parse(localStorage.getItem("calendarSettings") || "{}");

  calendar = new FullCalendar.Calendar(calendarEl, {
    locale: language,
    direction: language === "ar" ? "rtl" : "ltr",
    initialView: calendarSettings.calendarView || "dayGridMonth",

    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listYear"
    },

    buttonText: getFullCalendarButtonText(language),
    allDayText: getFullCalendarAllDayText(language),
    titleFormat: getCalendarTitleFormat(language),

    events: async function(fetchInfo, successCallback, failureCallback) {
      try {
        const response = await fetch(`${API_BASE}/events`);
        const events = await response.json();
        successCallback(events);
      } catch (error) {
        failureCallback(error);
      }
    },

    dateClick: async function (info) {
      const title = prompt(getTranslatedText("enterEventTitle"));
      if (!title) return;

      const eventId = "evt_" + Date.now();

      const event = {
        id: eventId,
        title,
        start: info.dateStr
      };

      const savedTaskSettings = JSON.parse(localStorage.getItem("taskSettings") || "{}");

      const task = {
        text: `${title} (${info.dateStr})`,
        status: savedTaskSettings.defaultStatus || "todo",
        priority: savedTaskSettings.defaultPriority || "medium",
        createdAt: new Date().toISOString(),
        dueDate: info.dateStr,
        eventId
      };

      try {
        await fetch(`${API_BASE}/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event)
        });

        const taskResponse = await fetch(`${API_BASE}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task)
        });

        const taskResult = await taskResponse.json();
        task.id = taskResult.id;

        calendar.addEvent(event);
        tasks.unshift(task);
        renderTasks();
      } catch (error) {
        console.error("Error adding planner event:", error);
      }
    }
  });

  calendar.render();
}

function showYearView() {
  document.getElementById("calendar").style.display = "none";
  document.getElementById("yearCalendar").style.display = "grid";
  document.getElementById("yearHeader").style.display = "block";
  document.getElementById("yearTitle").innerText = currentYear;
  generateYearView(currentYear);
}

function generateYearView(year = new Date().getFullYear()) {
  const container = document.getElementById("yearCalendar");
  container.innerHTML = "";

  const months = [
    getTranslatedText("jan"),
    getTranslatedText("feb"),
    getTranslatedText("mar"),
    getTranslatedText("apr"),
    getTranslatedText("may"),
    getTranslatedText("jun"),
    getTranslatedText("jul"),
    getTranslatedText("aug"),
    getTranslatedText("sep"),
    getTranslatedText("oct"),
    getTranslatedText("nov"),
    getTranslatedText("dec")
  ];

  for (let m = 0; m < 12; m++) {
    const firstDay = new Date(year, m, 1).getDay();
    const daysInMonth = new Date(year, m + 1, 0).getDate();

    let table = "<table><tr>";
    for (let i = 0; i < firstDay; i++) table += "<td></td>";

    for (let d = 1; d <= daysInMonth; d++) {
      if ((firstDay + d - 1) % 7 === 0) table += "</tr><tr>";
      table += `<td onclick="openDay('${year}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}')">${d}</td>`;
    }

    table += "</tr></table>";

    const monthDiv = document.createElement("div");
    monthDiv.className = "month";
    monthDiv.innerHTML = `<h3>${months[m]}</h3>${table}`;
    container.appendChild(monthDiv);
  }
}

async function openDay(date) {
  document.getElementById("yearHeader").style.display = "none";
  document.getElementById("calendar").style.display = "block";
  document.getElementById("yearCalendar").style.display = "none";

  if (!calendar) return;
  calendar.gotoDate(date);

  const title = prompt(getTranslatedText("enterEventTitle"));
  if (!title) return;

  const eventId = "evt_" + Date.now();

  const event = {
    id: eventId,
    title,
    start: date
  };

  const savedTaskSettings = JSON.parse(localStorage.getItem("taskSettings") || "{}");

  const task = {
    text: `${title} (${date})`,
    status: savedTaskSettings.defaultStatus || "todo",
    priority: savedTaskSettings.defaultPriority || "medium",
    createdAt: new Date().toISOString(),
    dueDate: date,
    eventId
  };

  try {
    await fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event)
    });

    const taskResponse = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    });

    const taskResult = await taskResponse.json();
    task.id = taskResult.id;

    calendar.addEvent(event);
    tasks.unshift(task);
    renderTasks();
  } catch (error) {
    console.error("Error adding year-view event:", error);
  }
}

function changeYear(step) {
  currentYear += step;
  document.getElementById("yearTitle").innerText = currentYear;
  generateYearView(currentYear);
}

async function addPlannerEvent() {
  const title = prompt(getTranslatedText("enterEventTitle"));
  if (!title) return;

  const selectedDate = new Date().toISOString().split("T")[0];
  const eventId = "evt_" + Date.now();

  const event = {
    id: eventId,
    title,
    start: selectedDate
  };

  const savedTaskSettings = JSON.parse(localStorage.getItem("taskSettings") || "{}");

  const task = {
    text: `${title} (${selectedDate})`,
    status: savedTaskSettings.defaultStatus || "todo",
    priority: savedTaskSettings.defaultPriority || "medium",
    createdAt: new Date().toISOString(),
    dueDate: selectedDate,
    eventId
  };

  try {
    await fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event)
    });

    const taskResponse = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    });

    const taskResult = await taskResponse.json();
    task.id = taskResult.id;

    if (calendar) {
      calendar.addEvent(event);
      calendar.gotoDate(selectedDate);
    }

    tasks.unshift(task);
    renderTasks();
  } catch (error) {
    console.error("Error adding planner event:", error);
  }
}