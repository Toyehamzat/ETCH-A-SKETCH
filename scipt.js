const DEFAULT_COLOR = '#333333'
const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'color'

let currentcolor = DEFAULT_COLOR
let currentmode = DEFAULT_MODE
let currentsize = DEFAULT_SIZE

function setcurrentcolor(newcolor) {
  currentcolor = newcolor
}

function setcurrentmode(newmode) {
  activateButton(newmode)
  currentmode = newmode
}

function setcurrentsize(newsize) {
  currentsize = newsize
}

const colorpicker = document.getElementById('colorpicker')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const sizevalue = document.getElementById('sizeValue')
const sizeslider = document.getElementById('sizeSlider')
const grid = document.getElementById('grid')

colorpicker.oninput = (e) => setcurrentcolor(e.target.value)
colorBtn.onclick = () => setcurrentmode('color')
rainbowBtn.onclick = () => setcurrentmode('rainbow')
eraserBtn.onclick = () => setcurrentmode('eraser')
clearBtn.onclick = () => reloadGrid()
sizeslider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeslider.onchange = (e) => changeSize(e.target.value)

let mousedown = false
document.body.onmousedown = () => (mousedown = true)
document.body.onmouseup = () => (mousedown = false)

function changeSize(value) {
  setcurrentsize(value)
  updateSizeValue(value)
  reloadGrid()
}

function updateSizeValue(value) {
  sizevalue.innerHTML = `${value}x${value}`
}
function reloadGrid() {
  cleargrid()
  setupgrid(currentsize)
}

function cleargrid() {
  grid.innerHTML = ''
}

function setupgrid(size) {
  grid.style.gridTemplateRows = `repeat(${size},1fr)`
  grid.style.gridTemplateColumns = `repeat(${size},1fr)`

  for (let i = 0; i < size * size; i++) {
    const gridelement = document.createElement('div')
    gridelement.classList.add('gridelement')
    gridelement.addEventListener('mousedown', changecolor)
    gridelement.addEventListener('mouseover', changecolor)
    grid.appendChild(gridelement)
  }
}

function changecolor(e) {
  if (e.type === 'mouseover' && !mousedown) return
  if (currentmode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentmode === 'color') {
    e.target.style.backgroundColor = currentcolor
  } else if (currentmode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function activateButton(newmode) {
  if (currentmode === 'rainbow') {
    rainbowBtn.classList.remove('active')
  } else if (currentmode === 'color') {
    colorBtn.classList.remove('active')
  } else if (currentmode === 'eraser') {
    eraserBtn.classList.remove('active')
  }

  if (newmode === 'rainbow') {
    rainbowBtn.classList.add('active')
  } else if (newmode === 'color') {
    colorBtn.classList.add('active')
  } else if (newmode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}
window.onload = () => {
  setupgrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}







