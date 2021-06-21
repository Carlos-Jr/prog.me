<template>
  <div class="home">
    <pinsManager></pinsManager>
  </div>
</template>

<script>
// @ is an alias to /src
import pinsManager from '@/components/pinsManager.vue';

export default {
  name: 'Home',
  components: {
    pinsManager,
  },
};
</script>
