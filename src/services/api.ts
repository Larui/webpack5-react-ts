import axios from "axios";
import { message } from "antd";

interface optionsType {
  silent: boolean;
  params: {
    [K: string]: string | number | boolean;
  };
  headers: any;
}

interface requestPropsType {
  url: string;
  data?: any;
  options?: Partial<optionsType>;
}

type methodType = "POST" | "GET" | "DELETE" | "PUT";

const getRequest = (method: methodType) => {
  return (props: requestPropsType) => {
    const { url, data, options = {} } = props;

    return axios({
      baseURL: "/api/extactivity/pgw/",
      method,
      url,
      ...(method === "POST"
        ? {
            data: data,
          }
        : {}),
      params: method === "GET" ? data : options.params,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=UTF-8",
        ...options.headers,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (typeof res.data !== "object") {
          console.error("数据格式响应错误:", res.data);
          message.error("前方拥挤，请刷新再试");
          return Promise.reject(res);
        }

        if (res.data.error) {
          // silent 选项，错误不提示
          if (res.data.error.message && !options.silent)
            message.error(res.data.error.message);
          return Promise.reject(res.data);
        }

        return res.data;
      })
      .catch((err) => {
        // message.error("系统错误", 2);
        return Promise.reject(err);
      });
  };
};

export default {
  get: getRequest("GET"),
  post: getRequest("POST"),
  put: getRequest("PUT"),
  delete: getRequest("POST"),
};
