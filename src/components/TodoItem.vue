<template>
  <li>
    <input
      type="checkbox"
      :checked="todo.complete"
      @change="onCheck(($event.target as HTMLInputElement).checked)"
    />
    <label :class="{ finish: todo.complete }">{{ todo.text }}</label>
    <button class="edit" @click="emit('edit', todo.id)">✏️編輯</button>
    <button class="delete" @click="emit('delete', todo.id)">🗑️刪除</button>
  </li>
</template>

<script setup lang="ts" name="TodoItem">
import type { Todo } from "@/types";

const { todo } = defineProps<{ todo: Todo }>();

const emit = defineEmits<{
  (e: "check", id: string, checked: boolean): void;
  (e: "edit", id: string): void;
  (e: "delete", id: string): void;
}>();

const onCheck = (checked: boolean) => {
  emit("check", todo.id, checked);
};
</script>

<style scoped>
li {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

input[type="checkbox"] {
  margin-right: 15px;
}

label {
  flex-grow: 1;
}

.edit {
  border: none;
  cursor: pointer;
  opacity: 0.7;
}

.edit:hover {
  opacity: 1;
}

.delete {
  border: none;
  margin-left: 5px;
  cursor: pointer;
  opacity: 0.7;
}

.delete:hover {
  opacity: 1;
}

.finish {
  text-decoration: line-through;
  color: #999;
}
</style>
