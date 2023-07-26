// 批量自动注册全局组件，文件夹名字作为组件名
// * 匹配当前目录下的文件
// ** 匹配当前目录及其嵌套的全部子目录下的文件

// import.meta.glob加上第二个参数全部同步导入
const modules = import.meta.glob("./*/*.vue", { eager: true });

const componentsMap = new Map(
  Object.entries(modules).map(([path, module]) => {
    return [path.split("/")[1], module];
  })
);

// 批量注册全局组件函数
// export default function installGlobalComponent(app) {
//   console.log("componentsMap", componentsMap);
//   componentsMap.forEach((value, key) => {
//     app.component(key, defineAsyncComponent(value));
//   });
// }

// 批量注册全局组件插件形式
export default {
  install: (app) => {
    componentsMap.forEach((value, key) => {
      app.component(key, defineAsyncComponent(value));
    });
  },
};
