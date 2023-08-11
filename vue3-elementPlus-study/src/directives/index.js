const modules = import.meta.glob("./*/*.js", { eager: true });

const pluginsMap = new Map(
  Object.entries(modules).map(([path, module]) => {
    return [path.split("/")[1], module.default];
  })
);

// vue插件形式注册全局指令
export default {
  install: (app) => {
    pluginsMap.forEach((value, key) => {
      app.directive(key, value);
    });
  },
};
