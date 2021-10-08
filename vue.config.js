module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: "@import \"~@/scss/_global.scss\";",
      },
    },
  },
};
