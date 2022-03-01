<template>
  <div class="primary pa-5 text-center">
    <div class="d-flex align-center justify-space-between">
      <div></div>
      <h3 class="text-color--text">Create A New Task</h3>
      <v-icon @click="$emit('closeDialog')" :dark="$vuetify.theme.dark"
        >mdi-close</v-icon
      >
    </div>
    <v-form v-model="validForm" @submit.prevent="addHandler" class="mt-4">
      <v-text-field
        class="pb-0 mb-0"
        full-width
        type="text"
        color="text-color"
        label="Title"
        :rules="[(v) => (v && v.length <= 250) || 'it must be less than 250']"
        :dark="$vuetify.theme.dark"
        outlined
        v-model="task.name"
      ></v-text-field>

      <v-textarea
        hide-details="true"
        full-width
        v-model="task.description"
        color="text-color"
        label="Description"
        :dark="$vuetify.theme.dark"
        outlined
        rows="3"
        :rules="[
          (v) => {
            if (v) return v.length <= 1000 || 'maximum 1000 characters';
            else return true;
          },
        ]"
      ></v-textarea>
      <global-date class="mt-6"></global-date>

      <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        color="text-color"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        :dark="$vuetify.theme.dark"
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Select Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            color="text-color"
            outlined
            :dark="$vuetify.theme.dark"
            class="mt-6"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>

      <v-checkbox
        hide-details="true"
        full-width
        color="text-color"
        :dark="$vuetify.theme.dark"
        :label="task.status ? 'Pending' : 'Active'"
        v-model="task.status"
      ></v-checkbox>
      <div class="d-flex justify-end mt-2">
        <v-btn
          type="submit"
          :dark="$vuetify.theme.dark"
          :disabled="!validForm"
          color="text-color"
          ><span class="primary--text">Add</span></v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script>
import GlobalDate from "../global/Date.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    GlobalDate,
  },
  data: () => ({
    validForm: false,
    task: {},
    time: null,
    menu2: false,
    modal2: false,
  }),
  methods: {
    addHandler() {
      let taskObj = {
        name: this.task.name,
        completion_date: this.task.completion_date,
        description: this.task.description,
        due_date: this.task.due_date,
        status: this.task.status || false,
      };
      this.addTask(taskObj);
      this.$emit("closeDialog");
      this.task = {};
    },
    ...mapMutations({
      addTask: "todos/SET_TASK",
    }),
  },
};
</script>

<style></style>
