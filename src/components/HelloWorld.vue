<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCounterStore } from "../store/counter";
defineProps<{ msg: string }>();

const { count } = storeToRefs(useCounterStore());
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>
      <!-- use the router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
      <router-link to="/home" class="routerlink">Go to Home</router-link>
      <router-link to="/about" class="routerlink">Go to About</router-link>
      <router-link to="/streaming" class="routerlink">Go to Streaming</router-link>
    </p>
    <button type="button" @click="count++">count is: {{ count }}</button>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view />
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
.routerlink {
  margin: 0 10px;
}
</style>
