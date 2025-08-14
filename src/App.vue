<template>
  <div class="app">
    <h1 class="title">To do List</h1>
    <AddTodo @add-todo="handleAddTodo" />
    <TodoControls
      :todoArr="todoArr"
      @check-all="checkAll"
      @delete-finish="deleteFinish"
    />
    <TodoList
      :todoArr="todoArr"
      @check-list="checkList"
      @delete-list="handleDeleteTodo"
      @edit-list="handleEditTodo"
    />
  </div>
</template>

<script setup lang="ts" name="App">
import AddTodo from "./components/AddTodo.vue";
import TodoControls from "./components/TodoControls.vue";
import TodoList from "./components/TodoList.vue";
import { type Todo } from "@/types"; // 引入 todo 類型定義
import { ref } from "vue";

let todoArr = ref<Todo[]>([]);

// 新增任務至 todoArr
const handleAddTodo = (todo: Todo) => {
  // 如果輸入框為空，不執行
  if (todo.text === "") {
    return;
  }
  todoArr.value.push(todo);
};

// 全選功能
const checkAll = (checked: boolean) => {
  todoArr.value.forEach((todo) => {
    todo.complete = checked;
  });
};

// 刪除已完成任務
const deleteFinish = () => {
  todoArr.value = todoArr.value.filter((todo) => !todo.complete);
};

// 任務完成勾選功能
const checkList = (todoID: string, checked: boolean) => {
  todoArr.value.forEach((todo) => {
    if (todo.id === todoID) {
      todo.complete = checked;
    }
  });
};

// 刪除任務
const handleDeleteTodo = (todoID: string) => {
  todoArr.value = todoArr.value.filter((todo) => todo.id !== todoID);
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
