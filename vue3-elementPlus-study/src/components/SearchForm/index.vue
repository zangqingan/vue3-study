<template>
  <div ref="searchFormBoxRef">
    <el-form
      ref="searchFormRef"
      v-bind="$attrs"
      @submit.prevent
      :inline="true"
      :label-width="130"
      :model="newFormData"
      class="search-form"
      :class="{ collapse: isCollapse, normal: !isNormal }"
    >
      <div class="body-content" ref="searchContent">
        <!-- 循环给定的表单项 -->
        <template v-for="item in optionsData" :key="item.props">
          <el-form-item
            :label="item.name"
            :prop="item.props"
            class="search-item"
          >
            <!-- 使用命名插槽 可传入自定义内容 -->
            <slot :name="item.props">
              <!--根据 item.type 字段显示不同的内容，不使用命名插槽传入指定内容时默认显示这里匹配的后备内容 -->

              <!-- 文本输入框 item.type不传时默认显示 -->
              <template v-if="item.type === 'input' || !item.type">
                <el-input
                  v-model.trim="newFormData[item.props]"
                  :maxlength="item.maxlength ? item.maxlength : '100'"
                  :placeholder="`请输入${item.name}`"
                  class="input-class"
                  clearable
                />
              </template>

              <!-- 下拉选择框  -->
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="newFormData[item.props]"
                  :placeholder="`请选择${item.name}`"
                  clearable
                >
                  <el-option
                    v-for="(option, optionIndex) in item.customDict"
                    :key="optionIndex"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>

              <!-- 下拉树 -->
              <template v-if="item.type === 'treeSelect'">
                <el-tree-select
                  v-model="newFormData[item.props]"
                  :data="item.customOptions"
                  :placeholder="`请选择${item.name}`"
                  :render-after-expand="false"
                  check-strictly
                  clearable
                />
              </template>

              <!-- 级联选择器 -->
              <template v-if="item.type === 'cascader'">
                <el-cascader
                  v-model="newFormData[item.props]"
                  :options="item.customOptions"
                  :show-all-levels="false"
                  clearable
                />
              </template>

              <!-- 日期选择器相关 -->
              <!--  选择某一天 -->
              <template v-if="item.type === 'date'">
                <el-date-picker
                  v-model="newFormData[item.props]"
                  :disabled-date="item.disabledDateFn"
                  type="date"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择日期"
                  clearable
                />
              </template>
              <!-- 选择某一周 -->
              <template v-if="item.type === 'week'">
                <el-date-picker
                  v-model="newFormData[item.props]"
                  :disabled-date="item.disabledDateFn"
                  type="week"
                  format="[第] ww [周] "
                  placeholder="请选择周"
                  clearable
                />
              </template>
              <!-- 选择某一月 -->
              <template v-if="item.type === 'month'">
                <el-date-picker
                  v-model="newFormData[item.props]"
                  :disabled-date="item.disabledDateFn"
                  type="month"
                  format="YYYY-MM"
                  value-format="YYYY-MM"
                  placeholder="请选择月份"
                  clearable
                />
              </template>
              <!-- 选择某一年 -->
              <template v-if="item.type === 'year'">
                <el-date-picker
                  v-model="newFormData[item.props]"
                  :disabled-date="item.disabledDateFn"
                  type="year"
                  format="YYYY"
                  value-format="YYYY"
                  placeholder="请选择年份"
                  clearable
                />
              </template>
              <!-- 选择日期范围之日期范围 -->
              <template v-if="item.type === 'daterange'">
                <el-date-picker
                  v-model="newFormData[item.props]"
                  :disabled-date="item.disabledDateFn"
                  type="daterange"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  range-separator="~"
                  start-placeholder="请选择开始日期"
                  end-placeholder="请选择结束日期"
                  clearable
                />
              </template>
              <!-- 选择日期范围之月份范围 -->
              <template v-if="item.type === 'monthrange'">
                <el-date-picker
                  v-model="newFormData[item.props]"
                  :disabled-date="item.disabledDateFn"
                  type="monthrange"
                  format="YYYY-MM"
                  value-format="YYYY-MM"
                  range-separator="~"
                  start-placeholder="请选择开始月份"
                  end-placeholder="请选择结束月份"
                  clearable
                />
              </template>
            </slot>
          </el-form-item>
        </template>
      </div>
      <div class="action-content">
        <div ref="searBtns" class="btns">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
        <!-- 是否展开按钮 -->
        <el-button
          v-if="isNormal"
          text
          type="primary"
          class="collapse-btn"
          @click="handleCollapse"
          >{{ isCollapse ? "展开筛选" : "收缩筛选" }}
          <img
            class="search-collapse-icon"
            src="@/assets/icons/icon_collapse.png"
        /></el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { useThrottleFn } from "@vueuse/core";

// 定义接收props
const props = defineProps({
  // 表单数据
  formData: {
    type: Object,
    default: () => {},
  },
  // 表单项
  optionsData: {
    type: Array,
  },
});

// 发射事件
const emits = defineEmits(["update:formData"]);

// 拷贝筛选条件点击搜索改变传参
const newFormData = computed({
  get() {
    return props.formData;
  },
  // 修改时触发更新
  set(value) {
    emits("update:formData", value);
  },
});

// 搜索
const handleSearch = () => {
  console.log("search");
};

// 重置搜索表单
const handleReset = () => {
  console.log("reset");
};

const isCollapse = ref(false); // 是否是收缩状态
const isNormal = ref(false); // 是否是正常状态
const searBtns = ref(null); // 搜索按钮div
const searchContent = ref(null); // 表单项div
const searchFormBoxRef = ref(null); // 根div
// 定义一个方法计算舒服需要收缩
const calculateNeedCollapseOrNot = () => {
  /**
   * 1. 获取搜索栏的总宽度：searchBoxWidth。搜索+重置div宽度：searchActionNormalWidth。搜索+重置+筛选宽度：searchActionCollapseWidth
   * 2. 通过搜索项目的个数计算占用宽度 searchItemTotalWidth
   * 3. searchItemTotalWidth + searchActionNormalWidth > searchBoxWidth 宽度超出，需要开启展开/收缩；否则不需要
   * 4. 计算搜索项目显示宽度
   * resize时，重新计算。不需要collapse->不需要collapse；不需要collapse->需要collapse；需要collapse->需要collapse；需要collapse->不需要collapse
   */
  const searchActionNormalWidth = searBtns.value.clientWidth; // 搜索+重置div宽度
  const searchActionCollapseWidth = 232; // 搜索+重置+筛选宽度
  const formItems = searchContent.value.querySelectorAll(".search-item"); // 获取所有的表单项
  let searchItemTotalWidth = 0; // 搜索项目总宽度
  formItems.forEach((item) => {
    searchItemTotalWidth += item.clientWidth + 20;
  });
  const searchBoxWidth = searchFormBoxRef.value.clientWidth - 40; // 搜索栏的总宽度

  if (searchItemTotalWidth + searchActionNormalWidth < searchBoxWidth) {
    // 所有输入框总宽度+搜索+重置宽度 < 总宽度，则无需collapse
    isNormal.value = false;
    isCollapse.value = false;
  } else {
    // 需要collapse
    const beforeNeedCollapse = isNormal.value;
    isNormal.value = true;
    if (!beforeNeedCollapse) {
      // 如果之前是不需要collapse的，则collapse收起
      isCollapse.value = true;
    }
    const restFormWidth = searchBoxWidth - searchActionCollapseWidth; // 能够显示formitem的剩余宽度
    let restWidth = 0;
    for (let i = 0; i < formItems.length; i++) {
      restWidth += formItems[i].clientWidth + 20;
      if (restWidth > restFormWidth) {
        restWidth = restWidth - formItems[i].clientWidth;
        break;
      }
    }
  }
};

// 展开收缩按钮取反
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

// 监听浏览器resize事件，触发时计算，同时引入vueuse库做防抖处理防止过多触发
const throttleFn = useThrottleFn(() => {
  calculateNeedCollapseOrNot();
}, 300);

// 挂载完成后开始监听
onMounted(() => {
  throttleFn();
  window.addEventListener("resize", throttleFn);
});

// 卸载时去除监听
onUnmounted(() => {
  window.removeEventListener("resize", throttleFn);
});
</script>

<style lang="scss" scoped>
.search-form {
  border-top: 1px solid #e8e8e8;
  padding: 16px 20px;
  .input-class {
    width: 220px;
  }
  :deep(.el-select) {
    width: 220px;
  }
  :deep(.el-cascader) {
    width: 220px;
  }
  :deep(.el-date-editor) {
    width: 220px;
  }
  :deep(.el-range-editor) {
    width: 600px;
  }
  // 去掉展开收缩按钮背景颜色
  .el-button.is-text:not(.is-disabled):focus,
  .el-button.is-text:not(.is-disabled):hover {
    background: none;
  }
}
// 收缩时的样式
.collapse {
  display: flex;
  .body-content {
    height: 50px;
    overflow: hidden;
  }
  .action-content {
    flex: 1;
    justify-content: space-between;
    display: flex;
  }
  .search-collapse-icon {
    transform: rotate(0);
  }
}
// 正常时的样式
.normal {
  display: flex;
  padding-bottom: 0;
}
.body-content {
  height: auto;
}
.action-content {
  display: flex;
  justify-content: flex-end;
}
.btns {
  width: 132px;
  word-break: keep-all;
}
.collapse-btn {
  padding-right: 0;
}
.search-collapse-icon {
  width: 20px;
  height: 20px;
  margin-left: 8px;
  transform: rotate(180deg);
  transition: all 0.1s ease-in-out;
}
</style>
