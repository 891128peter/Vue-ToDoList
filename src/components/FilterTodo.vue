<template>
  <div class="filter-area">
    <button
      class="filter"
      :class="{ active: filterMode === 'all' }"
      @click="emit('updateFilter', 'all')"
    >
      全部
    </button>
    <button
      class="filter"
      :class="{ active: filterMode === 'todo' }"
      @click="emit('updateFilter', 'todo')"
    >
      未完成
    </button>
    <button
      class="filter"
      :class="{ active: filterMode === 'done' }"
      @click="emit('updateFilter', 'done')"
    >
      已完成
    </button>
    <button
      class="filter"
      :class="{ active: filterMode === 'search' }"
      @click="searchTodo()"
    >
      搜尋
    </button>
  </div>
</template>

<script setup lang="ts" name="FilterTodo">
import { ref } from "vue";
type FilterKeys = "all" | "todo" | "done" | "search";

let searchKeyword = ref("");

const props = defineProps<{
  filterMode: FilterKeys;
}>();

const emit = defineEmits<{
  (e: "updateFilter", filter: FilterKeys, keyword?: string): void;
}>();

const searchTodo = () => {
  const keywordInput = window.prompt("請輸入關鍵字");
  // 使用者按下取消
  if (keywordInput === null) return;
  // 關鍵字為空
  const keyword = keywordInput.trim();
  if (!keyword) {
    window.alert("搜尋不得為空，返回主頁");
    emit("updateFilter", "all");
    return;
  }
  // 進行搜尋
  searchKeyword.value = keyword;
  emit("updateFilter", "search", keyword);
};
</script>

<style scoped>
.filter-area {
  display: flex;
  justify-content: center; /* 子元素水平置中 */
  gap: 10px; /* 子元素間距 */
  margin: 20px 0;
}

.filter {
  text-decoration: none; /* 移除連結的底線樣式 */
  padding: 8px 16px; /* 上下內距 8px，左右 16px */
  border: 1px solid #ccc;
  border-radius: 20px; /* 圓角效果 */
  background-color: #f0f0f0;
  color: #333; /* 文字顏色為深灰色 */
  transition: all 0.2s ease-in-out; /* 加入過渡動畫，讓 hover 效果變得更柔和 */
}

.filter:hover {
  background-color: #d0eaff; /* 背景變藍色（淺藍） */
  color: #007acc; /* 文字變藍色 */
  border-color: #007acc; /* 邊框變藍色 */
}

.filter.active {
  background-color: #007acc; /* 背景為深藍色 */
  color: white; /* 文字變白色 */
  border-color: #007acc; /* 邊框也為深藍 */
}
</style>
