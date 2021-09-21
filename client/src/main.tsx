import ReactDOM from "react-dom";
import React, { useState } from "react";
// 截图核心代码
import snap, { snapByUrl } from "./screenshotComps/index";
import TestSnapComps from "./testSnapComps";
import "./main.css";

function App() {
  const [isLoading, setisLoading] = useState(false);
  const [compsImg, setcompsImg] = useState("");
  const [urlImg, seturlImg] = useState("");

  // 根据react组件截图
  const compstoSnapByKoa = () => {
    setisLoading(true);
    const api = "http://localhost:3001/htmltoimage";
    snap({
      api,
      shareComps: TestSnapComps(),
    })
      .then((res) => {
        setcompsImg(res.data);
        setisLoading(false);
      })
      .catch(() => {
        setisLoading(false);
        alert("服务异常，请检查服务是否正确启动");
      });
  };

  // 根据页面url生成截图
  const urltoSnapByKoa = () => {
    // 默认尺寸苹果6
    const api = "http://localhost:3001/htmltoimage";
    snapByUrl(api, "https://www.baidu.com/")
      .then((res) => {
        seturlImg(res.data);
        setisLoading(false);
      })
      .catch(() => {
        setisLoading(false);
        alert("服务异常，请检查服务是否正确启动");
      });
  };
  return (
    <div className="App">
      <button
        onClick={() => compstoSnapByKoa()}
        style={{ marginRight: "15px" }}
      >
        react组件截图
      </button>
      <button onClick={() => urltoSnapByKoa()}>
        直接调用接口根据页面url地址截图
      </button>
      {isLoading && <h3>图片生成中...</h3>}
      <div className="show-img-wrap">
        <img src={compsImg} alt="react组件生成图片" />
        <img src={urlImg} alt="页面url地址生成图片" />
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
