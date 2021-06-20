import axios from "axios";
import { message } from "antd";

export default function request(url, data = {}, method = "GET") {
  return new Promise(async (res, rej) => {
    try {
      if (method === "GET") {
        const ret = await axios.get(url, {
          params: data,
        });

        res(ret.data);
      } else {
        const ret = await axios.post(url, data);

        res(ret.data);
      }
    } catch (err) {
      message.error(err.message);
    }
  });
}
