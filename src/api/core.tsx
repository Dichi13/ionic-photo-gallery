import log from "loglevel";
const baseUrl = process.env.REACT_APP_REQUEST_API;

export async function request(url: string, options?: any) {
  try {
    const res = await fetch(baseUrl + url, {
      headers: {
        "Content-Type": "application/json"
      },
      ...options,
      body: JSON.stringify(options.body)
    });
    const json = await res.json();

    if (!res.ok) throw json
    else return json;
  } catch (err) {
    log.error(err);
    throw err;
  }
}