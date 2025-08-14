<template>
  <!-- 控制按鈕 -->
  <section class="control-area">
    <label>
      <input
        type="checkbox"
        :checked="isAllChecked"
        :disabled="todoArr.length === 0"
        @change="checkAll((<HTMLInputElement>$event.target).checked)"
      />全選
    </label>
    <button class="deleteFinish" @click="emit('deleteFinish')">
      刪除已完成
    </button>
  </section>
</template>

<script setup lang="ts" name="TodoControls">
import type { Todo } from "@/types";
import { defineEmits, defineProps, computed } from "vue";

const props = defineProps(["todoArr"]);

const emit = defineEmits(["checkAll", "deleteFinish"]);

// 計算屬性：檢查是否所有任務都已完成
const isAllChecked = computed(() => {
  // 沒有任務 → 一定是 false
  if (props.todoArr.length === 0) return false;
  // 有任務且全部完成 → true
  return props.todoArr.every((todo: Todo) => todo.complete);
});

const checkAll = (checked: boolean) => {
  emit("checkAll", checked);
};
</script>

<style scoped>
/* 控制區域 */
.control-area {
  display: flex;
  justify-content: space-between; /* 左右兩側元素靠邊 */
  align-items: center; /* 垂直置中 */
  margin: 1rem 0; /* 上下外距 */
  padding: 0.5rem 1rem; /* 內距，讓內容不緊貼邊緣 */
  border-bottom: 1px solid #ccc; /* 底部加一條淡灰色分隔線 */
}

.control-area label {
  font-size: 1rem; /* 字體大小 */
  display: flex; /* 讓 label 內部元素可排列 */
  align-items: center; /* 垂直置中 */
  gap: 0.5rem; /* checkbox 和文字之間的距離 */
}

.control-area input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer; /* 滑鼠移過變成指標 */
}

.deleteFinish {
  border: none; /* 移除預設邊框 */
  padding: 0.4rem 1rem; /* 按鈕內距 */
  border-radius: 6px; /* 圓角 */
  cursor: pointer; /* 滑鼠變手指 */
  transition: background-color 0.3s ease; /* 滑鼠移入背景色過渡效果 */
}

.deleteFinish:hover {
  background-color: #e74c3c; /* 滑入時改成更深的紅色 */
}
</style>
