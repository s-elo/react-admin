export default function jsonp(url, params) {
  window.json = function (res) {
    console.log(res);
  };

  const script = document.createElement("script");

  script.src = `${url}?${convertParams(params)}`;

  console.log(script);
  script.onload = (res) => {
    console.log(res);
  };

  script.onerror = (err) => {
    console.log(err);
  };

  document.querySelector("body").appendChild(script);
}

function convertParams(params) {
  const ret = [];

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      ret.push(`${key}=${params[key]}`);
    }
  }

  return ret.join("&");
}
