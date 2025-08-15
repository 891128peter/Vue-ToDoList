import { ref, watch } from "vue";
import type { Todo } from "@/types";

export function useLocalStorage() {
  const todoArr = ref<Todo[]>([]);

  // 初始化時從本地存儲讀取
  const savedTodos = localStorage.getItem("todoArr");
  if (savedTodos) {
    todoArr.value = JSON.parse(savedTodos);
  }

  // 監聽變化並存入本地存儲
  watch(
    todoArr,
    (newVal) => {
      localStorage.setItem("todoArr", JSON.stringify(newVal));
    },
    { deep: true }
  );

  return { todoArr };
}