import React, { useEffect } from "react";
import axios from "axios";

const dict_env = {
  dev: "//ue-sit.hupu.com/",
  sit: "//ue-sit.hupu.com/",
  stg: "//ue-stg.hupu.io/",
  prod: "//ue.hupu.com/",
};

const $http = axios.create();

axios.interceptors.request.use((config) => {
  return config;
});

$http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err);
    return err;
  }
);

function AjaxSnap(props) {
  useEffect(() => {}, []);

  const request_path = {
    url: "html2image/poststring2imageurl",
    base64: "html2image/poststring2imagebase64",
  };

  // 掉虎扑截图接口
  const ajaxtoSnap = () => {
    const params = {
      html: props.html,
      protocol: window.location.protocol,
      width: props.width,
      height: props.height,
      quality: 85,
      fullPage: false,
      bgTransparency: false,
      async: false,
    };

    $http
      .post("http://ue.hupu.com/html2image/poststring2imagebase64", params)
      .then((res) => {
        console.log(res);
        props.onCreateImg(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 掉自己的koa服务接口
  const ajaxtoSnapByKoa = () => {
    const params = {
      html: props.html,
      width: props.width,
      height: props.height,
    };

    $http
      .post("http://localhost:3001/htmltoimage", params, {
        responseType: "arraybuffer",
      })
      .then((res: any) => {
        console.log(res);
        const url =
          "data:image/png;base64," +
          btoa(
            new Uint8Array(res).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          console.log('url===>', url)
          props.onCreateImg(url);
      });
    // $http
    //   .post("http://localhost:3001/htmltoimage", params)
    //   .then((res) => {
    //     console.log(res);
    //     props.onCreateImg(res.data.image);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <>
      <button onClick={() => ajaxtoSnap()}>ajax直接请求生成截图</button>
      <button onClick={() => ajaxtoSnapByKoa()}>自己本地的koa服务接口</button>
    </>
  );
}

export default AjaxSnap;
