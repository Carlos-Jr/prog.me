<template>
  <div id="app">
    <vue-nestable v-model="nestableItems">
      <vue-nestable-handle slot-scope="{ item }" :item="item">
        {{ item.text }}
      </vue-nestable-handle>
    </vue-nestable>
  </div>
</template>

<script>
import { VueNestable, VueNestableHandle } from 'vue-nestable';

export default {
  name: 'App',
  components: {
    VueNestable,
    VueNestableHandle,
  },
  data() {
    return {
      text: '',
      nestableItems: [
        {
          id: 0,
          type: 'conditional',
          text: 'Andy',
        },
        {
          id: 1,
          type: 'conditional',
          text: 'Harry',
          children: [
            {
              id: 2,
              type: 'command',
              text: 'David',
            },
          ],
        },
        {
          id: 3,
          type: 'command',
          text: 'Lisa',
        },
      ],
    };
  },
};
</script>
