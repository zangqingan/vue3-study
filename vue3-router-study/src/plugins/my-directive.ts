// 写一个用于管理自定义指令的插件，其中包含两个自定义指令：
// 一个是判断是否有权限，一个是给文本高亮，文本高亮还支持一个插件选项。
import type { App } from 'vue'

// 插件选项的类型
interface Options {
  // 文本高亮选项
  highlight?: {
    // 默认背景色
    backgroundColor: string
  }
}

/**
 * 自定义指令
 * @description 保证插件单一职责，当前插件只用于添加自定义指令
 */
export default {
  install: (app: App, options?: Options) => {
    /**
     * 权限控制
     * @description 用于在功能按钮上绑定权限，没权限时会销毁或隐藏对应 DOM 节点
     * @tips 指令传入的值是管理员的组别 id
     * @example <div v-permission="1" />
     */
    app.directive('permission', (el, binding) => {
      // 假设 1 是管理员组别的 id ，则无需处理
      if (binding.value === 1) return

      // 其他情况认为没有权限，需要隐藏掉界面上的 DOM 元素
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      } else {
        el.style.display = 'none'
      }
    })

    /**
     * 文本高亮
     * @description 用于给指定的 DOM 节点添加背景色，搭配文本内容形成高亮效果
     * @tips 指令传入的值需要是合法的 CSS 颜色名称或者 Hex 值
     * @example <div v-highlight="`cyan`" />
     */
    app.directive('highlight', (el, binding) => {
      // 获取默认颜色
      let defaultColor = 'unset'
      if (
        Object.prototype.toString.call(options) === '[object Object]' &&
        options?.highlight?.backgroundColor
      ) {
        defaultColor = options.highlight.backgroundColor
      }

      // 设置背景色
      el.style.backgroundColor = typeof binding.value === 'string' ? binding.value : defaultColor
    })
  }
}
