<template>
  <div class="task-row primary">
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center w-100 justify-space-between">
        <div class="d-flex align-center">
          <div
            class="checkbox-round mr-3 cursor-pointer"
            v-if="readOnly"
            @click="togglTaskStatus"
          >
            <div
              class="checkbox-bg"
              :class="task.status ? 'check-active' : ''"
            ></div>
            <v-icon
              class="check-icon"
              color="white"
              :class="task.status ? 'check-active' : ''"
              >mdi-check</v-icon
            >
          </div>
          <span v-if="!readOnly" class="light-text font-18"
            >Create a new task</span
          >
          <span
            v-if="readOnly"
            class="light-text font-18"
            :class="task.status ? 'text-line' : ''"
            >{{ task.name }}</span
          >
        </div>
        <v-icon v-if="readOnly" color="error" @click="deleteTaskHandler">mdi-delete</v-icon>
      </div>
      <v-btn
        v-if="!readOnly"
        icon
        outlined
        plain
        :dark="$vuetify.theme.dark"
        @click="$emit('addDialog')"
        ><v-icon :dark="$vuetify.theme.dark">mdi-plus</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    check: false,
  }),
  methods: {
    ...mapMutations({
      editTask: "todos/EDIT_TASK",
      deleteTask: "todos/DELETE_TASK",
    }),
    togglTaskStatus() {
      this.editTask(this.task);
    },
    deleteTaskHandler() {
      this.deleteTask(this.task);
    },
  },
};
</script>

<style lang="scss">
.task-row {
  padding: 15px 20px;
  border-radius: 2px;
  transition: 0.3s
}

.v-input {
  padding: 0px;
  margin: 0px;
}
.v-input label {
  color: #9e9e9e !important;
  font-size: 20px;
}
.v-input__slot::before,
.v-input__slot::after {
  display: none;
}
.checkbox-round {
  width: 30px;
  height: 30px;
  border-radius: 50% !important;
  overflow: hidden;
  border: 1px solid rgba(90, 90, 90, 0.45);
  transition: 3.3s;
  background: transparent;
  position: relative;
  z-index: 99;
}
.checkbox-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgb(0, 201, 209);
  background: linear-gradient(
    132deg,
    rgba(0, 201, 209, 1) 0%,
    rgba(202, 110, 255, 1) 100%
  );
  transition: 0.3s;
  opacity: 0;
}
.check-icon {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3s;
  opacity: 0;
}
.check-active {
  opacity: 1;
}

.checkbox-round .v-input {
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
