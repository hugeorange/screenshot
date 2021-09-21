import React from "react";

/**
 * 测试组件===>被截图的组件
 * @returns
 */
export default function TestSnapComps() {
  return (
    <div>
      <h1>我是测试截图的html字符串窜</h1>
      <div className="bgimg">我是一个有背景图的div</div>
      <h5>下面是一张图片</h5>
      <img
        width="500"
        src="https://p3.img.cctvpic.com/photoAlbum/page/performance/img/2021/8/29/1630215380767_621.jpg"
        alt="防盗链加载不出来"
      ></img>
    </div>
  );
}
