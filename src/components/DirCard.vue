<template>
  <li
    class="p-4 mb-3 flex justify-between items-center bg-white border border-white shadow rounded-lg cursor-move"
  >
    <div class="flex items-center">
      <button
        class="action-button p-1 focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600">
        <ArrowDownCircleIcon v-if="Dir.dir == 0"/>
        <ArrowLeftCircleIcon v-if="Dir.dir == 1"/>
        <ArrowRightCircleIcon v-if="Dir.dir == 2"/>
        <ArrowUpCircleIcon v-if="Dir.dir == 3"/>

        <RotateCcwIcon v-if="Dir.dir == 4"/>
        <RotateCwIcon v-if="Dir.dir == 5"/>
      </button>
      <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">{{Dir.name}}</p>
    </div>
    <div class="flex">
      <button
        aria-label="Delete Dir"
        class="action-button p-1 focus:outline-none focus:shadow-outline text-gray-500 hover:text-red-600"
        @click="$emit('on-delete', Dir)">
        <Trash2Icon/>
      </button>
    </div>
  </li>
</template>
<script>
import { Trash2Icon, ArrowDownCircleIcon,ArrowLeftCircleIcon,ArrowRightCircleIcon,ArrowUpCircleIcon,RotateCcwIcon, RotateCwIcon} from "vue-feather-icons";
export default {
  components: {
    Trash2Icon,
    ArrowDownCircleIcon,
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
    ArrowUpCircleIcon,
    RotateCcwIcon,
    RotateCwIcon
  },
  props: {
    Dir: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
