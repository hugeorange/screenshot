/**
 * 封装一个最简单的xhr请求
 */

/**
 * ajax请求封装
 * @param option
 * @returns
 */

type resType = "arraybuffer" | "blob" | "document" | "json" | "text"; // 默认为text
interface optionType {
  url: string;
  data: Record<string, any>;
  method: "POST" | "GET";
  responseType?: resType;
  success: Function;
  error: Function;
  // success: (res: any) => Promise<any>;
  // error: (res: any) => Promise<any>;
}

const $http = {
  post: (
    url: string,
    params: Record<string, any>,
    extra?: Record<string, any>
  ) => {
    return new Promise<any>((resolve, reject) => {
      ajax({
        url,
        method: "POST",
        data: params,
        responseType: (extra && extra.responseType) || "json",
        success: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });
  },
  get: (
    url: string,
    params: Record<string, any>,
    extra?: Record<string, any>
  ) => {
    return new Promise(() => {
      ajax({
        url,
        method: "GET",
        data: params,
        responseType: (extra && extra.responseType) || "json",
        success: (res) => Promise.resolve(res),
        error: (err) => Promise.reject(err),
      });
    });
  },
};

export default $http;

function ajax(option: optionType) {
  option.method = option.method || "GET";

  var xhr = new XMLHttpRequest();
  xhr.responseType = option.responseType || "json";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (option.success && typeof option.success === "function") {
          option.success(xhr.response);
        }
      } else {
        if (option.error && typeof option.error === "function") {
          option.error(xhr.response);
        }
      }
    }
  };

  xhr.open(option.method, option.url, true);
  if (option.method === "POST") {
    // 此处的请求头 还可设置 formData、multi/formdata text/plain application/json
    xhr.setRequestHeader("Content-type", "application/json");
  }
  xhr.send(option.method === "POST" ? JSON.stringify(option.data) : null);
}
