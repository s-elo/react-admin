const USER_KEY = "user_key";

const storage = {
  set user(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  get user() {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },
};

export default storage;
