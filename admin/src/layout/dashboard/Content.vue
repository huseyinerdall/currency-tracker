<template>
  <div class="content" :style="$route.path != '/login' ? 'padding: 78px 30px 30px 280px;' : 'padding: 78px 30px 30px 50px;'">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
  import {FadeTransition} from 'vue2-transitions';
  export default {
    components: {
      FadeTransition
    }
  };
</script>
