<template>
  <div class="app">
    <h1 class="title">To do List</h1>
    <AddTodo @add-todo="handleAddTodo" />
    <FilterTodo
      :filterMode="filterMode"
      @update-filter="
        (filter, keyword) => {
          filterMode = filter;
          searchKeyword = keyword || '';
        }
      "
    />
    <TodoControls
      :todoArr="filteredTodos"
      @check-all="checkAll"
      @delete-finish="deleteFinish"
    />
    <TodoList
      :todoArr="filteredTodos"
      @check-list="checkList"
      @delete-list="handleDeleteTodo"
      @edit-list="handleEditTodo"
    />
  </div>
</template>

<script setup lang="ts" name="App">
import AddTodo from "./components/AddTodo.vue";
import FilterTodo from "./components/FilterTodo.vue";
import TodoControls from "./components/TodoControls.vue";
import TodoList from "./components/TodoList.vue";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { type Todo } from "@/types";
import { ref, computed } from "vue";

const { todoArr } = useLocalStorage();
const filterMode = ref<"all" | "todo" | "done" | "search">("all");
let searchKeyword = ref("");

// 新增任務至 todoArr
const handleAddTodo = (todo: Todo) => {
  // 如果輸入框為空或只有空格建，不執行
  if (todo.text.trim() === "") {
    return;
  }
  todoArr.value.push(todo);
};

// 篩選顯示任務
const filteredTodos = computed(() => {
  switch (filterMode.value) {
    case "todo":
      return todoArr.value.filter((todo) => !todo.complete);
    case "done":
      return todoArr.value.filter((todo) => todo.complete);
    case "search":
      return todoArr.value.filter((todo) =>
        todo.text.includes(searchKeyword.value)
      );
    default:
      return todoArr.value;
  }
});

// 全選功能（僅作用於目前篩選後的清單）
const checkAll = (checked: boolean) => {
  filteredTodos.value.forEach((todo) => {
    todo.complete = checked;
  });
};

// 刪除已完成任務（僅刪除目前篩選畫面中的項目）
const deleteFinish = () => {
  const visibleIds = new Set(filteredTodos.value.map((t) => t.id));
  todoArr.value = todoArr.value.filter(
    (todo) => !(visibleIds.has(todo.id) && todo.complete)
  );
};

// 任務完成勾選功能
const checkList = (todoID: string, checked: boolean) => {
  todoArr.value.forEach((todo) => {
    if (todo.id === todoID) {
      todo.complete = checked;
    }
  });
};

// 編輯任務
const handleEditTodo = (todoID: string) => {
  const todo = todoArr.value.find((todo) => todo.id === todoID);
  if (todo) {
    const newText = prompt("請輸入新的待辦事項", todo.text);
    if (newText !== null && newText.trim() !== "") {
      todo.text = newText.trim();
    }
  }
};

// 刪除任務
const handleDeleteTodo = (todoID: string) => {
  todoArr.value = todoArr.value.filter((todo) => todo.id !== todoID);
};
</script>

<style>
body {
  background-color: skyblue;
  display: flex;
  justify-content: center; /* 水平置中 */
}
.app {
  background-color: white;
  width: 400px;
  padding: 30px;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.title {
  text-align: center; /* 子元素水平置中 */
  margin-top: 20px;
}
</style>
