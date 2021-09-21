## 基于React的截图组件客户端
- 传递一个 React Components直接返回一张base64图片或图片buffer
- 基本原理借助`ReactDOMServer.renderToString`将react组件变成dom字符串，然后将 字符串塞回当前html的root元素下，再利用outhtml将整个html文档变成字符串通过post请求交由 puppeteer处理，然后返回图片

### TODO
- [ ] snap方法打成npm包
### 参考
- buffer返回 https://www.cnblogs.com/penghuwan/p/12053775.html
- react组件实现方式 https://github.com/BobbyLH/template-extract-plugin/issues/7
