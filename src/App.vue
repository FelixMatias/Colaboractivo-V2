<template>
  <div>
    <ImG src="./Colaboractivo01.jpg" style="height: 7vh; position:fixed; left:0"/>
    <ImG src="./Open_BIM_Logo.png" style="height: 5vh; margin-top:1vh; position:fixed; right:0"/>
  </div>

  <div id="topbar">  
   <button @click="Emplazamiento" :class="btn0">
   <span style="font-size: 18px;" class="material-icons">landscape</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV0 }}</span>
   </button>
   <button @click="Arquitectura" :class="btn1">
   <span style="font-size: 18px;" class="material-icons">night_shelter</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV1 }}</span>
   </button>
   <button @click="Mobiliario" :class="btn2">
   <span style="font-size: 18px;" class="material-icons">chair</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV2 }}</span>
   </button>
   <button @click="Estructura1" :class="btn3">
   <span style="font-size: 18px;" class="material-icons">apartment</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV3 }}</span>
   </button>
   <button @click="Estructura2" :class="btn4">
   <span style="font-size: 18px;" class="material-icons">domain_add</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV4 }}</span>
   </button>
   <button @click="Estructura3" :class="btn5">
   <span style="font-size: 18px;" class="material-icons">engineering</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV5 }}</span>
   </button>
   <button @click="Sanitaria" :class="btn6">
   <span style="font-size: 18px;" class="material-icons">water_drop</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV6 }}</span>
   </button>
   <button @click="Electricidad" :class="btn7">
   <span style="font-size: 18px;" class="material-icons">outlet</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV7 }}</span>
   </button>
   <button @click="Mecanicas" :class="btn8">
   <span style="font-size: 18px;" class="material-icons">ac_unit</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV8 }}</span>
   </button>
   <button @click="Incendios" :class="btn9">
   <span style="font-size: 18px;" class="material-icons">local_fire_department</span>
   <span style="font-size: 10px; font-weight:bolder; color: gray ">{{ btnV9 }}</span>
   </button>
   <button @click="BorrarDisciplinas" class="btnA">
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
let btn0 = ref("btnA")
let btn1 = ref("btnA")
let btn2 = ref("btnA")
let btn3 = ref("btnE")
let btn4 = ref("btnE")
let btn5 = ref("btnE")
let btn6 = ref("btnI")
let btn7 = ref("btnI")
let btn8 = ref("btnI")
let btn9 = ref("btnI")
let btnV0 = ref(0)
let btnV1 = ref(0)
let btnV2 = ref(0)
let btnV3 = ref(0)
let btnV4 = ref(0)
let btnV5 = ref(0)
let btnV6 = ref(0)
let btnV7 = ref(0)
let btnV8 = ref(0)
let btnV9 = ref(0)


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
function Estructura1() {
  btn3.value = "btn2"
  let disciplina = "Estructura Concreto"
  Disciplina(disciplina)
}
function Estructura2() {
  btn4.value = "btn2"
  let disciplina = "Estructura Acero"
  Disciplina(disciplina)
}
function Estructura3() {
  btn5.value = "btn2"
  let disciplina = "Estructura Refuerzo"
  Disciplina(disciplina)
}
function Sanitaria() {
  btn6.value = "btn2"
  let disciplina = "Sanitaria"
  Disciplina(disciplina)
}
function Electricidad() {
  btn7.value = "btn2"
  let disciplina = "Electricidad"
  Disciplina(disciplina)
}
function Mecanicas() {
  btn8.value = "btn2"
  let disciplina = "Mecanicas"
  Disciplina(disciplina)
}
function Incendios() {
  btn9.value = "btn2"
  let disciplina = "Incendios"
  Disciplina(disciplina)
}

//storage
//const storage = useFirebaseStorage()
//const proyecto = "Edificio Wezig"

async function Disciplina(disciplina: string) {
  const fragmentManager = viewer.tools.get(OBC.FragmentManager)
  //const fileRef = storageRef(storage, proyecto+"/"+disciplina+" Actual.frag")
  const file = await fetch("./"+disciplina+" Actual.frag")
  
  //const blob = await getBlob(fileRef)
  //const data = blob.slice(0)
  const data = await file.arrayBuffer();
  const buffer = new Uint8Array(data);
  const group = await fragmentManager.load(buffer);
  console.log(group)
}


/////////////////////////Borrar Disciplinas
async function BorrarDisciplinas() {
  btn0.value = "btnA"
  btn1.value = "btnA"
  btn2.value = "btnA"
  btn3.value = "btnE"
  btn4.value = "btnE"
  btn5.value = "btnE"
  btn6.value = "btnI"
  btn7.value = "btnI"
  btn8.value = "btnI"
  btn9.value = "btnI"
 
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

.btnA {
  aspect-ratio: 1;
  height: 35px;
  border-radius: 10px;
  background-color: black;
  color: white;
  margin: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btnE {
  aspect-ratio: 1;
  height: 35px;
  border-radius: 10px;
  background-color: rgb(0, 30, 20);
  color: white;
  margin: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btnI {
  aspect-ratio: 1;
  height: 35px;
  border-radius: 10px;
  background-color: rgb(0, 20, 50);
  color: white;
  margin: 0.5vw;
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
  margin: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btnA:hover {
  cursor: pointer;
  color: rgb(254, 49, 49);
}
.btnE:hover {
  cursor: pointer;
  color: cyan;
}
.btnI:hover {
  cursor: pointer;
  color: blue;
}
</style>