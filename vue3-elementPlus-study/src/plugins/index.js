// 批量自动依赖注入接口

// import.meta.glob加上第二个参数全部导入
const modules = import.meta.glob("./*.js", { eager: true });

const pluginsMap = new Map(
  Object.entries(modules).map(([path, module]) => {
    return [path.split("/").pop().split(".").shift(), module.default];
  })
);

// 批量全局注入依赖函数形式
// export default function installPlugins(app) {
//   pluginsMap.forEach((value, key) => {
//     app.provide(key, value);
//   });
// }

// 批量全局注入依赖插件形式
export default {
  install: (app) => {
    pluginsMap.forEach((value, key) => {
      app.provide(key, value);
    });
  },
};
