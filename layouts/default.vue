<template>
  <v-app>
    <div class="app-layout">
      <img class="img" src="/images/layout-bg.jpg" alt="layout image" />
      <div class="bg"></div>
    </div>
    <transition name="fade" mode="out-in">
      <nuxt keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>

<style>
.v-application {
  transition: 0.3s;
}
.app-layout {
  height: 350px;
  width: 100%;
  position: relative;
}

.app-layout .bg {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgb(9, 0, 157);
  background: linear-gradient(
    90deg,
    rgba(9, 0, 157, 0.6026785714285714) 0%,
    rgba(172, 0, 209, 0.6951155462184874) 100%
  );
}

.app-layout .img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
