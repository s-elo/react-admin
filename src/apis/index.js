import request from "./axios";
import jsonp from "./myjsonp";
// import jsonp from 'jsonp';

// the default domain is the current server 3000
const DOMAIN = "";

export function login(username, password) {
  return request(`${DOMAIN}/login`, { username, password }, "POST");
}

export function reqCategory(parentId) {
  return request(`${DOMAIN}/manage/category/list`, { parentId }, "GET");
}

export function reqAddCategory({ parentId, categoryName }) {
  return request(
    `${DOMAIN}/manage/category/add`,
    { parentId, categoryName },
    "POST"
  );
}

export function reqUpdateCategory({ categoryId, categoryName }) {
  return request(
    `${DOMAIN}/manage/category/update`,
    { categoryId, categoryName },
    "POST"
  );
}

export function reqGetProducts(pageNum = 1, pageSize = 5) {
  return request(`${DOMAIN}/manage/product/list`, { pageNum, pageSize }, "GET");
}

export function reqAddProduct({
  categoryId,
  pCategoryId,
  name,
  desc = "",
  price = 999,
  detail = "",
  img = "",
}) {
  return request(
    `${DOMAIN}/manage/product/add`,
    { categoryId, pCategoryId, name, desc, price, detail, img },
    "POST"
  );
}

// reqAddProduct({
//   categoryId: '60d86b55d1912169f0ef915f',
//   pCategoryId: 0,
//   name: 'superleo666',
// });

export function getWeather(location) {
  jsonp(`http://api.map.baidu.com/weather/v1/`, {
    district_id: location,
    data_type: "all",
    ak: "wO9wXg0ZlkGPVhP5MtrfMcho4u6eF8og",
    output: "json",
  });

  // jsonp(
  //   `http://api.map.baidu.com/weather/v1/?district_id=222405&data_type=all&ak=wO9wXg0ZlkGPVhP5MtrfMcho4u6eF8og&output=json`,
  //   {},
  //   (err, res) => {
  //     console.log(err, res);
  //   }
  // );
}

// getWeather("222405");
