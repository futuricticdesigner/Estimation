import { storage } from './storage';

export const authUtils = {
  /** Register a new user. Returns {ok, error}. */
  signUp({ name, email, password }) {
    const users = storage.getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    const user = { id: crypto.randomUUID(), name, email: email.toLowerCase(), password, createdAt: new Date().toISOString() };
    storage.setUsers([...users, user]);
    const session = { userId: user.id, name: user.name, email: user.email };
    storage.setSession(session);
    return { ok: true, session };
  },

  /** Login an existing user. Returns {ok, error}. */
  login({ email, password }) {
    const users = storage.getUsers();
    const user  = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return { ok: false, error: 'Invalid email or password.' };
    const session = { userId: user.id, name: user.name, email: user.email };
    storage.setSession(session);
    return { ok: true, session };
  },

  updateProfile({ userId, name, email }) {
    const users = storage.getUsers();
    const conflict = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== userId);
    if (conflict) return { ok: false, error: 'That email is already used by another account.' };
    const updated = users.map((u) => u.id === userId ? { ...u, name, email: email.toLowerCase() } : u);
    storage.setUsers(updated);
    const session = { userId, name, email: email.toLowerCase() };
    storage.setSession(session);
    return { ok: true, session };
  },

  changePassword({ userId, currentPassword, newPassword }) {
    const users = storage.getUsers();
    const user  = users.find((u) => u.id === userId);
    if (!user) return { ok: false, error: 'Account not found.' };
    if (user.password !== currentPassword) return { ok: false, error: 'Current password is incorrect.' };
    const updated = users.map((u) => u.id === userId ? { ...u, password: newPassword } : u);
    storage.setUsers(updated);
    return { ok: true };
  },

  resetPassword({ email, newPassword }) {
    const users = storage.getUsers();
    const user  = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return { ok: false, error: 'No account found with that email address.' };
    const updated = users.map((u) => u.id === user.id ? { ...u, password: newPassword } : u);
    storage.setUsers(updated);
    return { ok: true };
  },

  findByEmail(email) {
    const users = storage.getUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  logout() { storage.clearSession(); },

  getSession() { return storage.getSession(); },
};
