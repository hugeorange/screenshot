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

export function snapByUrl(api: string, url: string) {
  return $http
    .post(api, { url })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}
