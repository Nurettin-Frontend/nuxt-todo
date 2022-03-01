export default {
  SET_TASK(state, payload) {
    if (localStorage.getItem("tasks")) {
      state.tasks = [...JSON.parse(localStorage.getItem("tasks"))];
    }
    state.tasks.push(payload);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
    state.tasks = [...JSON.parse(localStorage.getItem("tasks"))];
  },
  GET_TASKS(state) {
    state.tasks = localStorage.getItem("tasks")
      ? [...JSON.parse(localStorage.getItem("tasks"))]
      : [];
  },
  EDIT_TASK(state, payload) {
    state.tasks.forEach((task) => {
      if (task.name == payload.name) {
        payload.status = !payload.status;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
    state.tasks = [...JSON.parse(localStorage.getItem("tasks"))];
    
  },
  CLEAR_COMPLETE(state){
    let updatedState = state.tasks.filter((task) => !task.status);
    localStorage.setItem("tasks", JSON.stringify(updatedState));
    state.tasks = [...JSON.parse(localStorage.getItem("tasks"))];    
  },
  DELETE_TASK(state, payload) {
    let updatedState = state.tasks.filter((task) => task.name != payload.name);
    localStorage.setItem("tasks", JSON.stringify(updatedState));
    state.tasks = [...JSON.parse(localStorage.getItem("tasks"))];    
  },
};
