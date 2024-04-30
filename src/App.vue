<template>
  <div>
    <ImG src="/public/Colaboractivo01.jpg" style="height: 7vh; position:fixed; left:0"/>
    <ImG src="/public/Open_BIM_Logo.png" style="height: 5vh; margin-top:1vh; position:fixed; right:0"/>
  </div>

  <div id="topbar">  
   <button @click="Emplazamiento" :class="btn0">
   <span style="font-size: 18px;" class="material-icons">landscape</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV0 }}</span>
   </button>
   <button @click="Arquitectura" :class="btn1">
   <span style="font-size: 18px;" class="material-icons">apartment</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV1 }}</span>
   </button>
   <button @click="Mobiliario" :class="btn2">
   <span style="font-size: 18px;" class="material-icons">chair</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV2 }}</span>
   </button>
   <button @click="Estructura" :class="btn3">
   <span style="font-size: 18px;" class="material-icons">engineering</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV3 }}</span>
   </button>
   <button @click="Fontaneria" :class="btn4">
   <span style="font-size: 18px;" class="material-icons">water_drop</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV4 }}</span>
   </button>
   <button @click="Electricidad" :class="btn5">
   <span style="font-size: 18px;" class="material-icons">outlet</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV5 }}</span>
   </button>
   <button @click="Incendios" :class="btn6">
   <span style="font-size: 18px;" class="material-icons">local_fire_department</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV6 }}</span>
   </button>
   <button @click="BorrarDisciplinas" class="btn">
   <span style="font-size: 18px;" class="material-icons">delete_forever</span>
   </button>
 </div>
  <IFCViewer />
</template>

<script setup lang="ts">
import IFCViewer from 'vue-ifc-viewer'
import * as OBC from "openbim-components"
import { useViewersManager } from 'vue-ifc-viewer'
import { ref } from "vue"

const viewersManager = useViewersManager()
const viewer = viewersManager.get()

//Botones
let btn0 = ref("btn")
let btn1 = ref("btn")
let btn2 = ref("btn")
let btn3 = ref("btn")
let btn4 = ref("btn")
let btn5 = ref("btn")
let btn6 = ref("btn")
let btnV0 = ref(0)
let btnV1 = ref(0)
let btnV2 = ref(0)
let btnV3 = ref(0)
let btnV4 = ref(0)
let btnV5 = ref(0)
let btnV6 = ref(0)


/////////////////////////Cargar Disciplinas

function Emplazamiento() {
  btn0.value = "btn2"
  const disciplina = "Emplazamiento"
  Disciplina(disciplina)
}
function Arquitectura() {
  btn1.value = "btn2"
  let disciplina = "Arquitectura"
  Disciplina(disciplina)
}
function Mobiliario() {
  btn2.value = "btn2"
  let disciplina = "Mobiliario"
  Disciplina(disciplina)
}
function Estructura() {
  btn3.value = "btn2"
  let disciplina = "Estructura"
  Disciplina(disciplina)
}
function Fontaneria() {
  btn4.value = "btn2"
  let disciplina = "Fontaneria"
  Disciplina(disciplina)
}
function Electricidad() {
  btn5.value = "btn2"
  let disciplina = "Electricidad"
  Disciplina(disciplina)
}
function Incendios() {
  btn6.value = "btn2"
  let disciplina = "Incendios"
  Disciplina(disciplina)
}

//storage
//const storage = useFirebaseStorage()
//const proyecto = "Edificio Wezig"

async function Disciplina(disciplina: string) {
  const fragmentManager = viewer.tools.get(OBC.FragmentManager)
  //const fileRef = storageRef(storage, proyecto+"/"+disciplina+" Actual.frag")
  const file = await fetch("../../public/"+disciplina+" Actual.frag")
  
  //const blob = await getBlob(fileRef)
  //const data = blob.slice(0)
  const data = await file.arrayBuffer();
  const buffer = new Uint8Array(data);
  const group = await fragmentManager.load(buffer);
  console.log(group)
}


/////////////////////////Borrar Disciplinas
async function BorrarDisciplinas() {
  btn0.value = "btn"
  btn1.value = "btn"
  btn2.value = "btn"
  btn3.value = "btn"
  btn4.value = "btn"
  btn5.value = "btn"
  btn6.value = "btn"
 
  const fragmentManager = viewer.tools.get(OBC.FragmentManager)
  fragmentManager.dispose()
}

</script>

<style>
#topbar  {

  background-color: #222a32;
  border-right: 2px solid #3e4145;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.btn {
  aspect-ratio: 1;
  height: 35px;
  border-radius: 10px;
  background-color: black;
  color: white;
  margin: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn2 {
  aspect-ratio: 1;
  height: 35px;
  border-radius: 10px;
  background-color: blue;
  color: white;
  margin: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  background-color: gray;
  cursor: pointer;
  color: black;
}
</style>