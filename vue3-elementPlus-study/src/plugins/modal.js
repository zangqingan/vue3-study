// 对饿了么ui常见反馈组件的二次封装，主要是信息提示类的。
// 按需引入了所以不用二次引入，不然样式会不起作用。
export default {
  // 默认状态的消息提示
  msg(options) {
    ElMessage.info(options);
  },
  // 成功状态的消息提示
  successMsg(options) {
    ElMessage.success(options);
  },
  // 警告状态的消息提示
  warningMsg(options) {
    ElMessage.warning(options);
  },
  // 错误状态的消息提示
  errorMsg(options) {
    ElMessage.error(options);
  },
};
