// 데이터 호출 모듈
import axios from "axios";
import router from "@/router/index";

const BASE_URL = "http://localhost:3000";

const request = (method, url, data) => {
  return axios({
    method,
    url: BASE_URL + url,
    data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const { status } = err.response;

      if (status === 401) {
        router.push("/login");
      }

      throw Error(err);
    });
};

export const setAuthInHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null;
};

export const board = {
  // curl localhost:3000/boards -H 'Authorization: Bearer token'
  getBoards() {
    return request("get", "/boards");
  },
};

export const auth = {
  // curl -X POST localhost:3000/login -d 'email=test@test.com&password=123123'
  login(email, password) {
    return request("post", "/login", { email, password });
  },
};
