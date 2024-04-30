import * as OBC from "openbim-components"
import * as THREE from "three"
import { ViewerSetup } from "vue-ifc-viewer"
import { ExampleTool } from "."

export const viewer: ViewerSetup = async (viewer: OBC.Components, container: HTMLDivElement) => {
  const sceneComponent = new OBC.SimpleScene(viewer)
  sceneComponent.setup()
  viewer.scene = sceneComponent

  const rendererComponent = new OBC.PostproductionRenderer(viewer, container)
  viewer.renderer = rendererComponent
  const postproduction = rendererComponent.postproduction

  const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer)
  viewer.camera = cameraComponent

  const raycasterComponent = new OBC.SimpleRaycaster(viewer)
  viewer.raycaster = raycasterComponent

  await viewer.init()
  postproduction.enabled = true

  const grid = new OBC.SimpleGrid(viewer, new THREE.Color(0x666666))
  postproduction.customEffects.excludedMeshes.push(grid.get())
  
  const fragments = new OBC.FragmentManager(viewer)
  const ifcLoader = new OBC.FragmentIfcLoader(viewer)
  await ifcLoader.setup()

  const highlighter = new OBC.FragmentHighlighter(viewer)
  await highlighter.setup()

  ////////Procesador de Propiedades
  const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer)
  highlighter.events.select.onClear.add(() => {
    propertiesProcessor.cleanPropertiesList()
  })
  
  ////////Carga Ifc
  ifcLoader.onIfcLoaded.add(async model => {
    propertiesProcessor.process(model)
    highlighter.updateHighlight()
    highlighter.events.select.onHighlight.add((selection) => {
    const fragmentID = Object.keys(selection)[0]
    const expressID = Number([...selection[fragmentID]][0])
    propertiesProcessor.renderProperties(model, expressID)
    })
  })

  //Para tomar medidas
const dimensions = new OBC.LengthMeasurement(viewer)
dimensions.snapDistance = 0.5
container.ondblclick = () => dimensions.create()
window.onkeydown = (event) => {
  if (event.code === 'Delete' || event.code === 'Backspace') {
  dimensions.delete()
  }
}

// Herramienta de planos de corte
const clipper = new OBC.SimpleClipper(viewer)
container.ondblclick = () => clipper.create();
window.onkeydown = (event) => {
  if (event.code === 'Delete' || event.code === 'Backspace') {
  clipper.delete()
  }
}

//exampleTool
  const exampleTool = new ExampleTool(viewer)
  await exampleTool.setup({
    message: "Hi there from ExampleTool!",
    requiredSetting: 123
  })
const disciplina = "Incendios Actual"
//Subir IFC de disciplina
function subirIfc(disciplina: string) {
  if(!fragments.groups.length) return;
  const group = fragments.groups[0];
  const data = fragments.export(group);
  const blob = new Blob([data]);
  const file = new File([blob], disciplina+".frag");
  guardarFragments(file);
}

//Guardar Fragments
function guardarFragments(file: File) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
}


//Menú principal
  const mainToolbar = new OBC.Toolbar(viewer)

//Boton para cargar IFC
let ifcLoaderBtn = ifcLoader.uiElement.get("main") as OBC.Button
ifcLoaderBtn.tooltip = "Cargar IFC"
mainToolbar.addChild(ifcLoaderBtn)

//Botón para subir IFC de disciplinas
const ifcModels = new OBC.Button(viewer)
ifcModels.materialIcon = "download"
ifcModels.tooltip = "Descargar IFCs"
mainToolbar.addChild(ifcModels)
ifcModels.onClick.add(() => subirIfc(disciplina))

//Botones de herramientas
let propertiesBtn = propertiesProcessor.uiElement.get("main") as OBC.Button
propertiesBtn.tooltip = "Propiedades"
mainToolbar.addChild(
  propertiesBtn,
  dimensions.uiElement.get("main"),
  clipper.uiElement.get("main")
   //exampleTool.uiElement.get("activationBtn")
)

  viewer.ui.addToolbar(mainToolbar)
}