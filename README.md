# use-idle-action

A lightweight React hook that detects when a user is idle and triggers an action. Useful for auto-logout, reminders, or analytics.

## Install
```bash
npm install use-idle-action




# 📝 Explanation of Code
1. **State Management**
   - `isIdle` → true/false depending on user’s activity.
   - `lastActive` → tracks last time the user was active.

2. **Timer Handling**
   - `resetIdleTimer()` clears old timer and sets a new one.
   - If no activity happens in `timeout` ms → `isIdle = true` and `onIdle` callback runs.

3. **Event Listeners**
   - Listens to `mousemove`, `keydown`, `scroll`, `touchstart` by default.
   - Each event resets the timer.

4. **Cleanup**
   - Removes listeners + clears timeout when component unmounts → avoids memory leaks.

---
