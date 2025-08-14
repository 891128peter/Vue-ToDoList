<template>
  <!-- 清單 -->
  <section>
    <ul class="todo-list" v-if="todoArr.length > 0">
      <li v-for="list in todoArr" :key="list.id">
        <input
          type="checkbox"
          :checked="list.complete"
          @change="
            checkList(list.id, (<HTMLInputElement>$event.target).checked)
          "
        />
        <label :class="{ finish: list.complete }">{{ list.text }}</label>
        <button class="edit" @click="emit('editList', list.id)">✏️編輯</button>
        <button class="delete" @click="emit('deleteList', list.id)">
          🗑️刪除
        </button>
      </li>
    </ul>
    <p v-else>目前沒有待辦事項</p>
  </section>
</template>

<script setup lang="ts" name="TodoList">
import { defineProps, defineEmits } from "vue";

defineProps(["todoArr"]);

const emit = defineEmits(["editList", "deleteList", "checkList"]);

const checkList = (todoID: string, checked: boolean) => {
  emit("checkList", todoID, checked);
};
</script>

<style scoped>
/* 清單區塊 */
.todo-list {
  list-style-type: none;
  padding: 0px;
}

.todo-list li {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.todo-list input[type="checkbox"] {
  margin-right: 15px;
}

.todo-list label {
  flex-grow: 1;
}

.todo-list .edit {
  border: none;
  cursor: pointer;
  opacity: 0.7;
}
.todo-list .edit:hover {
  opacity: 1;
}

.todo-list .delete {
  border: none;
  margin-left: 5px;
  cursor: pointer;
  opacity: 0.7;
}
.todo-list .delete:hover {
  opacity: 1;
}

p {
  text-align: center;
  color: #999;
  font-size: 1.2rem;
  margin-top: 20px;
}

/* 完成後的任務樣式 */
.finish {
  text-decoration: line-through;
  color: #999;
}
</style>
