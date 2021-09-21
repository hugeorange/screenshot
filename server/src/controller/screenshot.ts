import { ParameterizedContext } from "Koa";
import puppeteer from "puppeteer";
import { Browser } from "puppeteer";

interface paramsType {
  url?: string; // 指定url截图
  html?: string; // 传入html字符串
  fullPage?: "1" | "0"; // 是否全屏
  width?: number; // 非全屏状态下宽
  height?: number; // 高
}

let browser: Browser;

/**
 * 网页转换为图片
 * @param ctx
 */
export const urlToImage = async (ctx: ParameterizedContext) => {
  const {
    url,
    html,
    fullPage,
    width = 375,
    height = 667,
  } = ctx.request.body as paramsType;
  // 此处对参数做校验

  // 建议初始化时就启动，复用标签页而不是每次都打开一个新的实例
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true, // false 开启本地调试预览
      product: "chrome", // chrome or firefox
      args: [
        // 参数-性能调优
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--security-opt",
        "--no-first-run",
        "--no-sandbox",
        "--no-zygote",
        "--single-process",
      ],
    });
  }
  const page = await browser.newPage();
  // 设置viewport，必须在访问页面之前设置
  await page.setViewport({
    width: parseInt(width as unknown as string),
    height: parseInt(height as unknown as string),
  });

  // url 截图
  if (url) {
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
  }
  // html字符串截图
  if (html) {
    await page.setContent(html, {
      waitUntil: "networkidle2",
    });
  }

  const base64 = await page.screenshot({ encoding: "base64" });
  const imgUrl = `data:image/png;base64,${base64}`;
  ctx.body = {
    data: imgUrl,
    code: 200,
    message: "成功~",
  };

  // const buffer = await page.screenshot();

  // ctx.set({
  //   "Content-Type": "application/octet-stream", //告诉浏览器这是一个二进制文件
  //   "Content-Disposition": "attachment; filename=buffer.jpg", //告诉浏览器这是一个需要下载的文件
  // });
  // ctx.body = buffer;

  // 关闭实例
  // await browser.close();
};

// 第一种 buffer返回
/**
 * buffer 返回，供下载本地文件需要ajax设置content-type，在前端在拼成base64图片也可以
 * https://blog.csdn.net/yh_852974543/article/details/90045434
 * buffer 返回浏览器主动下载
 *   const buffer = await page.screenshot();
    ctx.set({
      "Content-Type": "application/octet-stream", //告诉浏览器这是一个二进制文件
      "Content-Disposition": "attachment; filename=buffer.jpg", //告诉浏览器这是一个需要下载的文件
    });
    ctx.body = buffer;
  */

// 第二种本地存储或上传至oss，返回url
/**
 * 创建图片本地存储文件返回
 * await page.screenshot({ path: `static/1.png` });
 */

// 第三种直接返回base64，如上栗所示

// ===================================分割线============================================

/**
 * 网页转换为PDF
 * @param ctx
 */
export const urlToPDF = async (ctx: ParameterizedContext) => {
  const url = (ctx.request.query.url || "https://www.baidu.com") as string;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  const imgName = url.split(".")?.[1];
  await page.pdf({
    path: `static/${imgName}.pdf`,
    format: "a4",
    printBackground: true,
  });
  await browser.close();
  ctx.body = {
    data: { url: `${ctx.origin}/${imgName}.pdf` },
    code: 200,
    message: "成功~",
  };
};
