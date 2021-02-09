<template>

  <div
    id="app"
    class="min-h-screen h-full bg-green-500 w-screen bg-gray-200 flex flex-col md:items-start md:flex-row">
    <header class="fixed content-center flex flex-col w-full mb-16">
      <div class="bg-green-600 z-100 w-full px-5 py-2 flex justify-between text-green-900">
          <button class="p-1 focus:outline-none focus:none" v-if="page>0" @click="setpage(-1)">
            <ChevronLeftIcon/>
          </button>
          <b class="p-1">{{pageName}}</b>
          <button class="p-1 focus:outline-none focus:none" v-if="page<2"  @click="setpage(1)">
            <ChevronRightIcon/>
          </button>
      </div>
      <div v-if="page==1" class="bg-gray-900 shadow-md  z-50 w-full px-5 py-2 flex justify-between">
          <button class="p-1 focus:outline-none focus:none text-white" @click="add(0)">
            <ArrowDownCircleIcon/>
          </button>
          <button class="p-1 focus:outline-none focus:none text-white"  @click="add(1)">
            <ArrowLeftCircleIcon/>
          </button>
          <button class="p-1 focus:outline-none focus:none text-white"  @click="add(2)">
            <ArrowRightCircleIcon/>
          </button>
          <button class="p-1 focus:outline-none focus:none text-white"  @click="add(3)">
            <ArrowUpCircleIcon/>
          </button>
          <button class="p-1 focus:outline-none focus:none text-white"  @click="add(4)">
            <RotateCcwIcon/>
          </button>
          <button class="p-1 focus:outline-none focus:none text-white"  @click="add(5)">
            <RotateCwIcon/>
          </button>
      </div>
    </header>
    <div class="flex h-full mt-24 mt-8 bg-green-500 flex flex-col md:items-start md:flex-row " v-if="page==0">
      <div class="w-full max-w-md text-center content-center p-10 "> 
        <img src="/logo.png">
      </div>
    </div>
    <div class="flex mt-24 mt-8" v-if="page==1">
      <div class="w-full max-w-md text-center content-center px-2">
        <b class="text-white text-xl mt-8" v-if="directions.length==0"> Clique nos botões acima para adicionar uma direção</b>
        <draggable
          tag="ul"
          group="all-dirs"
          class="draggable-list"
          ghost-class="moving-card"
          filter=".action-button"
          :list="directions"
          :animation="200"
        >
          <dir-card
            v-for="direction in directions"
            :Dir="direction"
            :key="'dir'+direction.id"
            @on-edit="onEdit"
            @on-delete="onDelete"
          ></dir-card>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import DirCard from "./components/DirCard";
import {ChevronRightIcon,ChevronLeftIcon,ArrowDownCircleIcon,ArrowLeftCircleIcon,ArrowRightCircleIcon,ArrowUpCircleIcon,RotateCwIcon, RotateCcwIcon} from "vue-feather-icons";

export default {
  name: "App",
  components: {
    Draggable,
    DirCard,
    
    ChevronRightIcon,
    ChevronLeftIcon,
    ArrowDownCircleIcon,
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
    ArrowUpCircleIcon,
    RotateCwIcon,
    RotateCcwIcon
  },
  data() {
    return {
      directions:[],
      page:0,
      pageName:"Conectar dispositivo",
      toolsNow:"",
      options:[
        {
          dir:0,
          dist:1,
          name:"Andar de ré"
        },
        {
          dir:1,
          dist:2,
          name:"Andar para esquerda"
        },
        {
          dir:2,
          dist:1,
          name:"Andar para direita"
        },
        {
          dir:3,
          dist:0,
          name:"Seguir em frente",
        },
        {
          dir:4,
          dist:3,
          name:"Girar sentido anti-horário",

        },
        {
          dir:5,
          dist:3,
          name:"Girar sentido horário",
        },
      ]
    };
  },
  methods: {
    setpage(value){
      this.page +=value;
      if(this.page<0)
        this.page =0;

      if(this.page== 0)
        this.pageName="Conectar dispositivo";
      if(this.page== 1)
        this.pageName="Programar!";
      if(this.page== 2)
        this.pageName="Executação";

    },
    add(element){
      let newDir = Object.assign({},this.options[element]);
      newDir.id =  this.directions.length;
      this.directions.push(newDir);
    },
    onEdit(user) {
      alert(`Editing ${user.name}`);
    },
    onDelete(item) {
      this.directions = this.directions.filter(x => {
        return x.id != item.id;
      })
    }
  }
};
</script>


<style>
.draggable-list {
  min-height: 100px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.moving-card {
  /* @apply border opacity-50 border-blue-500 bg-gray-200 */
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>
