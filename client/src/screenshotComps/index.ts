import { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";
import $http from "./xhr";

// 参数
interface snapOpts {
  api: string; // 截图接口
  shareComps: ReactElement;
  width?: number;
  height?: number;
  rootName?: string;
}

function snap(snapOpts: snapOpts) {
  const root = snapOpts.rootName || "#root";

  const domstr = ReactDOMServer.renderToString(snapOpts.shareComps);
  const docCopy = document.documentElement.cloneNode(true) as Element;
  const rootElement = docCopy.querySelector(root) as Element;
  rootElement.innerHTML = domstr;
  // 将html里面的所有script标签过滤掉，因为页面样式仅仅只需要html、css，将其去除减轻puppeteer的解析压力
  const htmlStr = docCopy.outerHTML.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
  // http://ue.hupu.com/html2image/poststring2imagebase64
  return $http
    .post(snapOpts.api, {
      html: htmlStr,
      width: snapOpts.width || undefined,
      height: snapOpts.height || undefined,
    })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}

export default snap;

// 直接截取输入的url的页面，如：url: https://www.baidu.com/
export function snapByUrl(api: string, url: string) {
  return $http
    .post(api, { url })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
