const USER_KEY = "user_key";

export default {
  set user(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  get user() {
    return JSON.parse(localStorage.getItem(USER_KEY) || {});
  },

  removeUser() {
    localStorage.remove(USER_KEY);
  },
};
