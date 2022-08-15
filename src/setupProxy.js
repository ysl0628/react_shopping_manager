const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // /api代表代理路径
  // target表示目标服务器地址
  app.use(
    createProxyMiddleware("/api/upload", {
      // http://8rwbc7.natappfree.cc  地址只是实例，实际地址为项目为基准
      target: "http://52.192.103.131:1337",
      //跨域时一般设置该值为 true
      changeOrigin: true,
      //重写接口路由
      pathRewrite: {
        "^/api": "/api", //这样处理后，最终得到的接口路径为http://localhost:8080/XXX
      },
    })
  );
};
