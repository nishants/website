const CURRENT_USER_STATE_KEY = 'ikagai_user_state';
const UNDO_STATE_HISOTRY_KEY = 'ikigai_user_state_history';
const REDO_STATE_HISTORY_KEY = 'ikigai_user_redo_state_history';
const USER_KEY = 'ikigai_user';

export const classIf = (...conditions) =>
  conditions
    .filter(c => c.if)
    .map(c => c.className)
    .join(' ');

export const NBSP = '\u00A0';

export const ifEnterPressed = callback => event =>
  event.key === 'Enter' && callback(event);

const deleteStateHistory = () => {
  localStorage.removeItem(UNDO_STATE_HISOTRY_KEY);
  localStorage.removeItem(REDO_STATE_HISTORY_KEY);
};

const ensureStorageAvailable = callback => {
  try {
    const result = callback();
    return result;
  } catch (error) {
    alert(`${error.code} ---> ${error.message}`);
    console.log(error);
    if (DOMException.QUOTA_EXCEEDED_ERR === error.code) {
      alert('deleting hisotry');
      deleteStateHistory();
      return callback();
    }
    throw error;
  }
};

const getRedoStateHistory = () =>
  JSON.parse(localStorage.getItem(REDO_STATE_HISTORY_KEY) || '[]');

const saveRedoStateHistory = history => {
  ensureStorageAvailable(() => {
    localStorage.setItem(REDO_STATE_HISTORY_KEY, JSON.stringify(history));
  });
};

const addToRedoStateHistory = state =>
  saveRedoStateHistory([
    ...getRedoStateHistory(),
    { time: new Date().getTime(), state }
  ]);

const resetRedoStateHistory = () => saveRedoStateHistory([]);

const getUndoHistory = () =>
  JSON.parse(localStorage.getItem(UNDO_STATE_HISOTRY_KEY) || '[]');

const saveUndoHistory = history => {
  ensureStorageAvailable(() => {
    localStorage.setItem(UNDO_STATE_HISOTRY_KEY, JSON.stringify(history));
  });
};

const addToUndoHistory = state => {
  saveUndoHistory([...getUndoHistory(), { time: new Date().getTime(), state }]);
};

export const redoState = () => {
  const redoHistory = getRedoStateHistory();
  const historyItem = redoHistory.pop();
  saveRedoStateHistory(redoHistory);
  return historyItem ? historyItem.state : null;
};

export const undoState = currentState => {
  const undoHistory = getUndoHistory();
  const historyItem = undoHistory.pop();
  if (!historyItem) return null;

  saveUndoHistory(undoHistory);
  addToRedoStateHistory(currentState);
  return historyItem.state;
};

export const getLastSavedState = () => {
  const saved = localStorage.getItem(CURRENT_USER_STATE_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const saveState = state => {
  ensureStorageAvailable(() => {
    localStorage.setItem(CURRENT_USER_STATE_KEY, JSON.stringify(state));
  });

  addToUndoHistory(state);
  resetRedoStateHistory();
};

export const getMethodsFrom = object =>
  Object.keys(object).filter(key => typeof object[key] === 'function');

export const getUserFromStorage = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};
