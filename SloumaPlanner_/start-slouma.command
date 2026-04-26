#!/bin/bash

BACKEND_PID=$(lsof -ti :3000)
FRONTEND_PID=$(lsof -ti :5600)

if [ -z "$BACKEND_PID" ]; then
  osascript -e 'tell application "Terminal" to do script "cd /Users/salmakechaou/Desktop/Soulaimene/Updated_SloumaPlanner_24April2026/backend && node server.js"'
fi

if [ -z "$FRONTEND_PID" ]; then
  osascript -e 'tell application "Terminal" to do script "cd /Users/salmakechaou/Desktop/Soulaimene/Updated_SloumaPlanner_24April2026/frontend && python3 -m http.server 5600"'
fi

sleep 2
open http://localhost:5600