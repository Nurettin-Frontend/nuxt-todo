<template>
  <div class="mt-3">
    <v-row justify="center">
      <v-col md="4">
        <div class="tasks-col pa-3 primary">
          <h4>To Do Tasks</h4>
          <draggable :list="tasks" group="tasks">
            <div
              class="text-color--text"
              v-for="element in tasks"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </v-col>
      <v-col md="4">
        <div class="tasks-col pa-3 error">
          <h4>Pending Tasks</h4>
          <draggable
            :list="pendingTasks"
            group="tasks"
            v-model="demo"
            @change="handle"
          >
            <div
              class="text-color--text"
              v-for="element in pendingTasks"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapMutations } from "vuex";
export default {
  props: ["todoTasks"],
  components: {
    draggable,
  },
  computed: {
    pendingTasks() {
      return this.$store.state.todos.tasks.filter((task) => task.status);
    },
    tasks() {
      return this.$store.state.todos.tasks.filter((task) => !task.status);
    },
  },
  methods: {
    ...mapMutations({
      editTask: "todos/EDIT_TASK",
    }),
    handle(val) {
      if(val.added){
        this.editTask(val.added.element)
      }
      if(val.removed){
        this.editTask(val.removed.element)
      }
    },
  },
};
</script>

<style>
.tasks-col {
  min-height: 250px;
  background: rgb(122, 122, 122);
  border-radius: 10px;
  overflow: hidden;
}
.tasks-col h4 {
  border-bottom: 2px solid rgba(100, 100, 100, 0.4);
  padding-bottom: 5px;
  margin-bottom: 10px;
}
</style>
