#!/bin/bash

BACKEND_PID=$(lsof -ti :3000)
FRONTEND_PID=$(lsof -ti :5600)

if [ -n "$BACKEND_PID" ]; then
  kill -9 $BACKEND_PID
fi

if [ -n "$FRONTEND_PID" ]; then
  kill -9 $FRONTEND_PID
fi