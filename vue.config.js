module.exports = {
  lintOnSave: false,

  devServer: {
    // 允许远程访问
    port: 8000,
    disableHostCheck: true,
    overlay: {
      warnings: false, // 不显示警告
      errors: false // 不显示错误
    },

    // proxy: {
    //   "/api1": {
    //     // target: 'http://www.codehere.top:1010', // 要代理的域名
    //     target: "http://192.168.3.109:8888", // 要代理的域名
    //     changeOrigin: true, // 允许跨域.
    //     ws: true,
    //     pathRewrite: {
    //       "^/api1": "" // 这里是将/api2替换为空字符串“” ，也就是删除
    //     }
    //   }
    // }
  }
};
