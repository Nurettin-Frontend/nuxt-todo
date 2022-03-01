<template>
  <div class="contain">
    <div class="head">
      <div class="d-flex align-center justify-space-between">
        <h3>TODO</h3>
        <v-icon
          class="cursor-pointer"
          size="30"
          :color="$vuetify.theme.dark ? 'yellow' : 'white'"
          @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          >mdi-white-balance-sunny</v-icon
        >
      </div>
      <task-row @addDialog="addDialog = true"></task-row>
      <div class="d-flex justify-center mt-6" v-if="!$vuetify.breakpoint.mobile">
        <span class="mx-2 d-inline-block cursor-pointer" @click="style = 'list'">List</span>
        <span class="mx-2 d-inline-block cursor-pointer" @click="style = 'kanban'">Kanban</span>
      </div>
      <div v-if="style == 'list' " class="tasks-list primary">
        <div class="content">
          <div v-if="!chartSection">
            <div v-if="filteredTasks.length > 0">
              <div
                class="task"
                :style="{ borderColor: borderColor }"
                v-for="(task, i) in filteredTasks"
                :key="i"
              >
                <task-row
                  :task="task"
                  :active="task.active"
                  :readOnly="true"
                ></task-row>
              </div>
            </div>
            <div class="text-center py-3" v-if="filteredTasks.length == 0">
              <span class="light-text">No tasks yet...</span>
            </div>
          </div>
          <div class="pa-4" v-if="chartSection" :key="toggleChart">
            <no-ssr>
              <line-chart :chartData="chartData"></line-chart>
            </no-ssr>
          </div>
        </div>
        <div class="d-flex align-center justify-space-between px-5 py-3">
          <span class="light-text cursor-pointer"
            >{{ tasksLeft.length }} tasks left</span
          >
          <div class="d-flex align-center">
            <span
              class="transition-3 d-inline-block mx-2 cursor-pointer"
              :class="selected == 'all' ? 'primary-text' : 'light-text'"
              @click="[(selected = 'all'), (chartSection = false)]"
              >All</span
            >
            <span
              class="transition-3 d-inline-block mx-2 cursor-pointer"
              :class="selected == 'active' ? 'primary-text' : 'light-text'"
              @click="[(selected = 'active'), (chartSection = false)]"
              >Active</span
            >
            <span
              class="transition-3 d-inline-block mx-2 cursor-pointer"
              :class="selected == 'completed' ? 'primary-text' : 'light-text'"
              @click="openChartSection"
              >Completed</span
            >
          </div>
          <span class="light-text cursor-pointer" @click="clearHandler">Clear Completed</span>
        </div>
      </div>
      <div v-if="style == 'kanban' && !$vuetify.breakpoint.mobile">
        <no-ssr>
          <kanban :todoTasks="tasks" :key="style"></kanban>
        </no-ssr>
      </div>
    </div>
    <v-dialog v-model="addDialog" max-width="500">
      <dialogs-add @closeDialog="addDialog = false"></dialogs-add>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "IndexPage",
  data: () => ({
    selected: "all",
    addDialog: false,
    validForm: false,
    chartSection: false,
    chartData: {
      labels: ["Completed", "Not yet"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: ["#f87979", "#cccccc"],
          data: [0, 0],
        },
      ],
    },
    toggleChart: 0,
    style: 'list'
  }),
  computed: {
    ...mapGetters({
      tasks: "todos/getTasks",
      lightMode: "getLightMode",
    }),
    filteredTasks() {
      if (this.selected == "all") return this.tasks;
      if (this.selected == "active")
        return this.tasks.filter((task) => task.status == true);
    },
    tasksLeft() {
      return this.tasks.filter((task) => !task.status);
    },
    borderColor() {
      return this.$vuetify.theme.dark
        ? this.$vuetify.theme.themes.light.accent
        : this.$vuetify.theme.themes.dark.accent;
    },
  },
  methods: {
    ...mapMutations({
      fetchTasks: "todos/GET_TASKS",
      clearHandler: "todos/CLEAR_COMPLETE"
    }),
    openChartSection() {
      this.selected = "completed";
      this.chartSection = true;
      this.chartData.datasets[0].data[0] = 0;
      this.chartData.datasets[0].data[1] = 0;
      this.tasks.forEach((task) => {
        if (task.status) {
          this.chartData.datasets[0].data[0] += 1;
        } else {
          this.chartData.datasets[0].data[1] += 1;
        }
      });
    },
  },
  watch: {
    tasks: {
      handler() {
        this.chartData.datasets[0].data[0] = 0;
        this.chartData.datasets[0].data[1] = 0;
        this.tasks.forEach((task) => {
          if (task.status) {
            this.chartData.datasets[0].data[0] += 1;
          } else {
            this.chartData.datasets[0].data[1] += 1;
          }
        });
      },
    },
  },
  created() {
    if (process.client) {
      this.fetchTasks();
      this.tasks.forEach((task) => {
        if (task.status) {
          this.chartData.datasets[0].data[0] += 1;
        } else {
          this.chartData.datasets[0].data[1] += 1;
        }
      });
    }
  },
};
</script>

<style scoped>
.contain {
  position: relative;
  top: -250px;
  margin: auto;
  width: 100%;
  max-width: 1200px;
}
.contain .head {
  max-width: 600px;
  margin: auto;
  position: relative;
  width: 100%;
}
.head h3 {
  font-size: 60px;
  color: white;
  letter-spacing: 14px;
}
.tasks-list {
  border-radius: 10px;
  margin-top: 20px;
  padding-bottom: 10px;
  overflow: hidden;
}

.tasks-list .content {
  max-height: 450px;
  overflow-x: hidden;
  overflow-y: auto;
}

.tasks-list .content .task {
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);
}
</style>
