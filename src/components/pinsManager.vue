<template>
  <div>
    <div v-for="(variable, index) in variables" :key="'variable-' + index">
      {{ variable.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'pinsManager',
  props: {
    variables: [],
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
