<template>
  <!-- 清單 -->
  <section>
    <ul class="todo-list" v-if="todoArr.length > 0">
      <TodoItem
        v-for="todo in todoArr"
        :key="todo.id"
        :todo="todo"
        @check="checkList"
        @edit="editList"
        @delete="deleteList"
      />
    </ul>
    <p v-else>目前沒有待辦事項</p>
  </section>
</template>

<script setup lang="ts" name="TodoList">
import { defineProps, defineEmits } from "vue";
import TodoItem from "./TodoItem.vue";
import type { Todo } from "@/types";

defineProps<{ todoArr: Todo[] }>();

const emit = defineEmits(["editList", "deleteList", "checkList"]);

const checkList = (todoID: string, checked: boolean) => {
  emit("checkList", todoID, checked);
};

const editList = (todoID: string) => {
  emit("editList", todoID);
};

const deleteList = (todoID: string) => {
  emit("deleteList", todoID);
};
</script>

<style scoped>
/* 清單區塊 */
.todo-list {
  list-style-type: none;
  padding: 0px;
}

p {
  text-align: center;
  color: #999;
  font-size: 1.2rem;
  margin-top: 20px;
}
</style>
