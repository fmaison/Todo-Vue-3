<script lang="ts" setup>
import {defineStore} from "pinia";
import {ref} from "vue";

const taskInput = ref()
interface TodoItem {
  completed: boolean;
  title: string;
}
const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as TodoItem[]
  }),
  getters: {
    count(state): number {
      return state.tasks.length
    },
    hasTasks(state): boolean {
      return state.tasks.length > 0
    }
  },
  actions: {
    addTask(task: string): void {
      if (!task) return

      const foundTask = this.tasks.find((item: TodoItem) => item.title === task)
      if (foundTask) return

      this.tasks.push({ completed: false, title: task })
      // clear input after entry
      taskInput.value.value = ''
    }
  }
})
const taskStore = useTaskStore()

</script>

<template>
  <div class="mx-auto max-w-3xl px-6 flex-col min-h-screen">
    <!-- task creation input -->
    <div class="w-full my-10">
      <input
        ref="taskInput"
        type="text"
        class="form-control text-lg"
        placeholder="Add a task..."
        @keydown.enter="taskStore.addTask($event.target.value)"/>
    </div>
    <!-- items -->
    <h4 v-if="taskStore.hasTasks"
        class="leading-6 font-medium text-sm">Tasks - {{taskStore.count}}</h4>
    <transition-group name="list" tag="ul" class="list-none m-0 p-0 space-y-1.5 mt-3">
      <li
        v-for="(task, taskIndex) in taskStore.tasks"
        :key="taskIndex"
        class="px-4 py-3 border border-gray-200 duration-200 shadow-sm bg-white hover:bg-gray-50 cursor-pointer rounded-lg">
        <input
          :id="`task-${taskIndex}`"
          v-model="task.completed"
          type="checkbox"
          :class="[task.completed ? 'shadow-emerald-500/50' : 'shadow-gray-200/50', 'h-6 w-6 rounded-full border-gray-200 text-emerald-400 focus:ring-0 focus:ring-offset-0 focus:outline-0 shadow-lg mr-2']"/>
        <label
          :for="`task-${taskIndex}`"
          :class="[task.completed ? 'line-through': undefined, 'text-gray-800 font-medium leading-4 text-[14px]']">{{task.title}}</label>
      </li>
    </transition-group>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all .25s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(5px)
}
</style>
