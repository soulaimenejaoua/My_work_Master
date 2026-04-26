const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./slouma.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      status TEXT NOT NULL,
      priority TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      dueDate TEXT,
      eventId TEXT,
      assignedTo TEXT,
      projectName TEXT
    )
  `);

   db.run(`ALTER TABLE tasks ADD COLUMN assignedTo TEXT`, () => {});
   db.run(`ALTER TABLE tasks ADD COLUMN projectName TEXT`, () => {});

   db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      start TEXT NOT NULL
    )
  `);
});

// ===== TASKS =====
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/tasks", (req, res) => {
  const { text, status, priority, createdAt, dueDate, eventId, assignedTo, projectName } = req.body;

  db.run(
   `INSERT INTO tasks (text, status, priority, createdAt, dueDate, eventId, assignedTo, projectName)
 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
[
  text,
  status,
  priority,
  createdAt,
  dueDate || null,
  eventId || null,
  assignedTo || null,
  projectName || null
],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put("/tasks/:id", (req, res) => {
  const { status, text, priority, dueDate, assignedTo, projectName } = req.body;

  db.run(
  `UPDATE tasks
   SET status = COALESCE(?, status),
       text = COALESCE(?, text),
       priority = COALESCE(?, priority),
       dueDate = COALESCE(?, dueDate),
       assignedTo = COALESCE(?, assignedTo),
       projectName = COALESCE(?, projectName)
   WHERE id = ?`,
  [status, text, priority, dueDate, assignedTo, projectName, req.params.id],
  function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  }
);
});

app.delete("/tasks/:id", (req, res) => {
  db.run(`DELETE FROM tasks WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// ===== EVENTS =====
app.get("/events", (req, res) => {
  db.all("SELECT * FROM events", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/events", (req, res) => {
  const { id, title, start } = req.body;

  db.run(
    `INSERT INTO events (id, title, start) VALUES (?, ?, ?)`,
    [id, title, start],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ok: true });
    }
  );
});

app.delete("/events/:id", (req, res) => {
  db.run(`DELETE FROM events WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});