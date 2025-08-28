<template>
  <div class="app">
    <h1 class="title">To do List</h1>
    <AddTodo @add-todo="addTodo" />
    <FilterTodo :filterMode="filterMode" @update-filter="updateFilter" />
    <TodoControls
      :todoArr="filteredTodos"
      @check-all="checkAll"
      @delete-finish="deleteFinish"
    />
    <TodoList
      :todoArr="filteredTodos"
      @check-list="checkList"
      @delete-list="deleteTodo"
      @edit-list="editTodo"
    />
  </div>
</template>

<script setup lang="ts" name="App">
import AddTodo from "./components/AddTodo.vue";
import FilterTodo from "./components/FilterTodo.vue";
import TodoControls from "./components/TodoControls.vue";
import TodoList from "./components/TodoList.vue";
import { useTodos } from "@/composables/useTodos";

const {
  // state
  todoArr,
  filteredTodos,
  filterMode,
  // actions
  addTodo,
  checkAll,
  deleteFinish,
  checkList,
  editTodo,
  deleteTodo,
  updateFilter,
} = useTodos();
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
