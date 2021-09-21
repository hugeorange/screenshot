import React, { useEffect } from "react";
import $http from "./comps/screenshotComps/xhr";

/**
 * 测试代码===>废弃
 * @param props
 * @returns
 */
function AjaxSnap(props) {
  useEffect(() => {}, []);

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

    // $http
    //   .post("http://localhost:3001/htmltoimage", params, {
    //     responseType: "arraybuffer",
    //   })
    //   .then((res: any) => {
    //     // btoa atob base64编解码
    //     console.log(res);
    //     const url =
    //       "data:image/png;base64," +
    //       btoa(
    //         new Uint8Array(res).reduce(
    //           (data, byte) => data + String.fromCharCode(byte),
    //           ""
    //         )
    //       );
    //     console.log("url===>", url);
    //     props.onCreateImg(url);
    //   });
    $http
      .post("http://localhost:3001/htmltoimage", params)
      .then((res) => {
        console.log(res);
        props.onCreateImg(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button onClick={() => ajaxtoSnap()}>ajax直接请求生成截图</button>
      <button onClick={() => ajaxtoSnapByKoa()}>自己本地的koa服务接口</button>
    </>
  );
}

export default AjaxSnap;
