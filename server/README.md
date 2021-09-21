# screenshot
puppeteer截图 、Koa
### TODO 
- [ ] puppeteer连接池与性能优化 减少 内存 CPU 的使用以及定期重启

### 参考文章：
- puppeteer参数解释参考
  - 官方github https://github.com/puppeteer/puppeteer/blob/v10.2.0/docs/api.md#pagesetviewportviewport
  - https://www.cnblogs.com/Wayou/p/using_puppeteer_to_take_screenshot.html
  - https://cloud.tencent.com/developer/article/1470473
  - https://tech.youzan.com/shi-yong-puppeteerda-jian-tong-hai-bao-xuan-ran-fu-wu/
  - https://www.dilatoit.com/zh/2021/05/11/puppeteershiyongjiaocheng.html


- puppeteer连接池与性能优化
  - https://zhuanlan.zhihu.com/p/30203613 参数介绍
  - 英语流利说 https://mp.weixin.qq.com/s/IOybLG2B2EiNMNQ-kW1-7A
  - https://zhuanlan.zhihu.com/p/107800256 generic-pool连接池
  - Puppeteer自动化的性能优化与执行速度提升	 https://cloud.tencent.com/developer/article/1673764

- pkg 打包将nodejs应用打成二进制包防止源码泄露，便于演示不用安装node环境（不知道为什么puppeteer不能打进pkg里面）
  - 不能把puppeteer打包进二进制文件  设置assets: ["node_modules/puppeteer/.local-chromium/mac-901912/chrome-mac/Chromium.app/Contents/MacOS/Chromium"] 
  - https://zhuanlan.zhihu.com/p/66411743 pkg打包
  - https://www.ancii.com/ary78zmn/ 寸志pkg打包web网页不用安装nodejs环境
  - https://juejin.cn/post/6844904034281717774 think.js pkg打包

- node ts配置参考文章
  - https://www.jianshu.com/p/a35dfc72c6e6 nodemon启动参数解释`--watch dir --ext ts --exec ts-node xxx`
  - 了不起的tsconfig.json https://segmentfault.com/a/1190000022809326
  - ts 模块默认导入 https://juejin.cn/post/6844903619188391950
    ```
    // https://tasaid.com/blog/2019022017450863.html
    // commonjs 模块
    import * as xx from 'xx'

    // 标准 es6 模块, tsconfig 开启allowSyntheticDefaultImports esModuleInterop 所有的模块都可以使用这种方式了
    import xx from 'xx'

    // commonjs 模块，类型声明为 export = xx
    import xx = require('xx')

    // 没有类型声明，默认导入 any 类型
    const xx = require('xx')
    ```
- node服务端打包的意义？？？
  - 仅仅将ts文件转成js文件吗？或是用webpack/rollup 将多个文件合一吗，但运行时依然要依赖node_modules
  - https://juejin.cn/post/6844903635118194702 是否需要在服务器上执行`npm install` ==> 专门的ci打包机，然后使用tar/docker 将构建后的代码放进业务服务器 ，[docker部署node.js]应用