import request from "./axios";

// the default domain is the current server 3000
const DOMAIN = "";

export function login(username, password) {
  return request(`${DOMAIN}/login`, { username, password }, "POST");
}
