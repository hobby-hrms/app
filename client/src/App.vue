<template>
  <v-app>
    <v-fade-transition mode="out-in">
      <router-view></router-view>
    </v-fade-transition>
  </v-app>
</template>

<style>
html {
  overflow-y: auto;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #a9a1a1;
}
</style>

