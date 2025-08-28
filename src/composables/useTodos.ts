import { ref, computed } from "vue";
import type { Todo } from "@/types";
import { useLocalStorage } from "@/composables/useLocalStorage";

type FilterKeys = "all" | "todo" | "done" | "search";

export function useTodos() {
  const { todoArr } = useLocalStorage();

  const filterMode = ref<FilterKeys>("all");
  const searchKeyword = ref("");

  const addTodo = (todo: Todo) => {
    if (todo.text.trim() === "") return;
    todoArr.value.push(todo);
  };

  const filteredTodos = computed(() => {
    switch (filterMode.value) {
      case "todo":
        return todoArr.value.filter((todo) => !todo.complete);
      case "done":
        return todoArr.value.filter((todo) => todo.complete);
      case "search":
        return todoArr.value.filter((todo) => todo.text.includes(searchKeyword.value));
      default:
        return todoArr.value;
    }
  });

  const checkAll = (checked: boolean) => {
    filteredTodos.value.forEach((todo) => {
      todo.complete = checked;
    });
  };

  const deleteFinish = () => {
    const visibleIds = new Set(filteredTodos.value.map((t) => t.id));
    todoArr.value = todoArr.value.filter((todo) => !(visibleIds.has(todo.id) && todo.complete));
  };

  const checkList = (todoID: string, checked: boolean) => {
    todoArr.value.forEach((todo) => {
      if (todo.id === todoID) {
        todo.complete = checked;
      }
    });
  };

  const editTodo = (todoID: string) => {
    const todo = todoArr.value.find((t) => t.id === todoID);
    if (todo) {
      const newText = prompt("請輸入新的待辦事項", todo.text);
      if (newText !== null && newText.trim() !== "") {
        todo.text = newText.trim();
      }
    }
  };

  const deleteTodo = (todoID: string) => {
    todoArr.value = todoArr.value.filter((todo) => todo.id !== todoID);
  };

  const updateFilter = (filter: FilterKeys, keyword?: string) => {
    filterMode.value = filter;
    searchKeyword.value = keyword ? keyword : "";
  };

  return {
    // state
    todoArr,
    filterMode,
    filteredTodos,
    // actions
    addTodo,
    checkAll,
    deleteFinish,
    checkList,
    editTodo,
    deleteTodo,
    updateFilter,
  };
}

