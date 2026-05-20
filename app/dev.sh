#!/usr/bin/env bash
set -euo pipefail

AVD_NAME="${AVD_NAME:-SimTrader}"
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="${APP_DIR}/.dev-logs"
mkdir -p "$LOG_DIR"

STARTED_EMU=0
STARTED_METRO=0
METRO_PID=""

cleanup() {
  echo ""
  echo "→ stopping..."
  if [[ "$STARTED_METRO" == 1 && -n "$METRO_PID" ]]; then
    kill -TERM -"$METRO_PID" 2>/dev/null || kill "$METRO_PID" 2>/dev/null || true
  fi
  if [[ "$STARTED_EMU" == 1 ]]; then
    adb -s emulator-5554 emu kill 2>/dev/null || true
  fi
  exit 0
}
trap cleanup INT TERM

# --- 1. Emulator ---
if adb devices | grep -qE "^emulator-5554[[:space:]]+device$"; then
  echo "✓ emulator already running"
else
  echo "→ starting emulator '$AVD_NAME'..."
  nohup emulator -avd "$AVD_NAME" > "$LOG_DIR/emulator.log" 2>&1 &
  STARTED_EMU=1
  echo "  waiting for device..."
  adb wait-for-device
  echo "  waiting for boot..."
  until [[ "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" == "1" ]]; do
    sleep 2
  done
  echo "✓ emulator ready"
fi

# --- 2. Metro ---
if curl -s --max-time 1 http://localhost:8081/status 2>/dev/null | grep -q "packager-status:running"; then
  echo "✓ Metro already running on :8081"
else
  echo "→ starting Metro..."
  cd "$APP_DIR"
  setsid npm start > "$LOG_DIR/metro.log" 2>&1 < /dev/null &
  METRO_PID=$!
  STARTED_METRO=1
  echo "  waiting for Metro to be ready..."
  for i in {1..60}; do
    if curl -s --max-time 1 http://localhost:8081/status 2>/dev/null | grep -q "packager-status:running"; then
      break
    fi
    sleep 1
  done
  if ! curl -s --max-time 1 http://localhost:8081/status 2>/dev/null | grep -q "packager-status:running"; then
    echo "✗ Metro didn't become ready in 60s — check $LOG_DIR/metro.log"
    cleanup
  fi
  echo "✓ Metro ready"
fi

# --- 3. Build & install via Gradle ---
echo "→ building APK and installing on emulator..."
cd "$APP_DIR"
node node_modules/react-native/cli.js run-android --no-packager

echo ""
echo "✓ app launched on emulator-5554"
echo "  emulator log: $LOG_DIR/emulator.log"
echo "  metro log:    $LOG_DIR/metro.log"
echo ""
if [[ "$STARTED_METRO" == 0 && "$STARTED_EMU" == 0 ]]; then
  echo "Metro and emulator were already running — nothing to tail. Exiting."
  exit 0
fi

echo "Press Ctrl+C to stop $( [[ "$STARTED_METRO" == 1 ]] && printf 'Metro' )$( [[ "$STARTED_METRO" == 1 && "$STARTED_EMU" == 1 ]] && printf ' and ' )$( [[ "$STARTED_EMU" == 1 ]] && printf 'emulator' )."

if [[ -f "$LOG_DIR/metro.log" ]]; then
  echo "Tailing Metro log:"
  echo "---"
  tail -f "$LOG_DIR/metro.log"
else
  echo "Metro log not in $LOG_DIR (Metro was started elsewhere)."
  echo "Press Ctrl+C to stop the emulator."
  while true; do sleep 3600; done
fi
