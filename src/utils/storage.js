const ESTIMATES_KEY = 'azularc_estimates_v3';
const USERS_KEY     = 'azularc_users_v1';
const SESSION_KEY   = 'azularc_session_v1';

export const storage = {
  getEstimates: ()  => JSON.parse(localStorage.getItem(ESTIMATES_KEY) || '[]'),
  setEstimates: (v) => localStorage.setItem(ESTIMATES_KEY, JSON.stringify(v)),

  getUsers: ()  => JSON.parse(localStorage.getItem(USERS_KEY) || '[]'),
  setUsers: (v) => localStorage.setItem(USERS_KEY, JSON.stringify(v)),

  getSession: ()  => JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'),
  setSession: (v) => localStorage.setItem(SESSION_KEY, JSON.stringify(v)),
  clearSession: () => localStorage.removeItem(SESSION_KEY),
};
