// -------------------------------
// HELPER FUNCTIONS
// -------------------------------

import { timeOutMAX } from "./config";
function timeOut(sec) {
  return new Promise(function (res, rej) {
    setTimeout(function () {
      rej(new Error("The request took too long!"));
    }, sec * 1000);
  });
}

export function AJAX(url) {
  const headers = {
    "Content-Type": "application/json",
  };

  async function getJSON(fetchPro) {
    const res = await Promise.race([fetchPro, timeOut(timeOutMAX)]);
    const json = await res.json();

    if (!res.ok) throw json;

    return json;
  }

  return {
    async post(data) {
      return await getJSON(
        fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        })
      );
    },

    async get() {
      return await getJSON(fetch(url));
    },
  };
}
