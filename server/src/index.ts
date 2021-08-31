import Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as koaCors from "koa2-cors";
import * as koaStatic from "koa-static";
import { urlToImage, urlToPDF } from "./controller/screenshot";

const app = new Koa();
const router = new Router();

const PORT = 3001;

//路由
router.get("/", (ctx) => {
  const welcome = `
        <h3>欢迎使用node截图服务</h3>
        <p>截图接口为：localhost:${PORT}/sreenshot 请求方式POST</p>
    `;
  ctx.body = welcome;
});

router.get("/urltoimage1", urlToImage);
router.post("/htmltoimage", urlToImage);
router.get("/urltopdf", urlToPDF);
app.use(koaStatic('./static'))
app.use(koaCors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, () => {
  console.log(`应用启动成功 请访问localhost:${PORT}`);
});
