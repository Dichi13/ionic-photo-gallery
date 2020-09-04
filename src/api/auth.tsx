import { request } from "./core";

export async function requestLogin(body: {email: string, password: string}) {
  const options = { method: 'POST', body };
  return await request('/login', options);
}