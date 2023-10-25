import * as ElementPlusIcons from "@element-plus/icons-vue";

export default {
  install: (app) => {
    for (const [key, component] of Object.entries(ElementPlusIcons)) {
      app.component(key, component);
    }
  },
};
