<template>
  <form id="form" @submit.prevent="onSubmit">
    <div class="input-area">
      <input type="text" v-model="text" />
      <button class="submitBtn">+</button>
    </div>
  </form>
</template>

<script setup lang="ts" name="AddTodo">
import { ref, defineEmits } from "vue";

let text = ref("");

const emit = defineEmits(["addTodo"]);

const onSubmit = () => {
  const todo = {
    id: crypto.randomUUID(),
    text: text.value,
    complete: false,
  };
  emit("addTodo", todo);

  // 清空輸入框
  text.value = "";
};
</script>

<style scoped>
.input-area {
  display: flex;
  border-radius: 20px;
  overflow: hidden;
}
input {
  flex-grow: 1;
  border: none;
  background-color: #f0f0f0;
  padding: 10px 15px;
  outline: none;
}
.submitBtn {
  background-color: rgb(85, 224, 155);
  border: none;
  padding: 10px 15px;
  cursor: pointer; /* 改變滑鼠外觀 */
}
</style>
