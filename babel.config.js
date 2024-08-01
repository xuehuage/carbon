const prodPlugins = []
if(process.env.NODE_ENV === 'production'){
  prodPlugins.push("transform-remove-console")
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
   // 配置vant按需引入
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    //清空控制台信息
    // ["transform-remove-console", { "exclude": [ "error", "warn"] }]
    ...prodPlugins
  ],
}
