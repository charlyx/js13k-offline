function makeStyle({ x, y, width, height, color }) {
  return {
    cube: {
      width: `${width}px`,
      height: `${height}px`,
      position: 'absolute',
      bottom: y,
      left: x,
      transformStyle: 'preserve-3d',
      transition: 'transform 1s',
    },
    cube__face: {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      border: '1px solid black',
    },
    ['cube__face--front']: { background: color, transform: `rotateY(0deg) translateZ(${width / 2}px)` },
    ['cube__face--right']: { background: color, transform: `rotateY(90deg) translateZ(${width / 2}px)` },
    ['cube__face--back']: { background: color, transform: `rotateY(180deg) translateZ(${width / 2}px)` },
    ['cube__face--left']: { background: color, transform: `rotateY(-90deg) translateZ(${width / 2}px)` },
  }
}

const template = `
  <div class="cube" id="cube">
    <div class="cube__face cube__face--front">Front</div>
    <div class="cube__face cube__face--back">Back</div>
    <div class="cube__face cube__face--right">Right</div>
    <div class="cube__face cube__face--left">Left</div>
  </div>
`

function createElement(htmlString) {
  var div = document.createElement('div')
  div.innerHTML = htmlString.trim()

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild
}

function stylize(element, pStyle) {
  for (const prop in pStyle) {
    const isRootClass = element.classList.contains(prop)
    if (isRootClass) {
        for(const cssProperty in pStyle[prop]) {
          element.style[cssProperty] = pStyle[prop][cssProperty]
        }
    }

    const parts = element.querySelectorAll(`.${prop}`)
    if (parts) {
      parts.forEach(el => {
        for(const cssProperty in pStyle[prop]) {
          el.style[cssProperty] = pStyle[prop][cssProperty]
        }
      })
    }
  }
}

export class Cube {
  constructor(options) {
    this.options = options
    this.rotation = 0
    this.currentFace = 0
    this.children = []

    this.element = createElement(template)
    stylize(this.element, makeStyle(options))

    this.element.style.zIndex = this.options.zIndex
  }

  attachTo(child, face) {
    child.face = face
    this.children.push(child)

    const { x, width, zIndex } = this.options

    child.element.style.zIndex = zIndex - 1
    child.element.style.transformOrigin = `${(parseInt(x) + parseInt(width)) / 2}px center`
  }

  rotateRight() {
    this.previousHiddenFace = this.getHiddenFace()
    if (this.currentFace === 0) {
      this.currentFace = 4
    }
    this.currentFace -= 1
    this.rotation += 90
    this.rotate()
  }

  rotateLeft() {
    this.previousHiddenFace = this.getHiddenFace()
    if(this.currentFace === 3) {
      this.currentFace = 0
    } else {
      this.currentFace += 1
    }
    this.rotation -= 90
    this.rotate()
  }

  rotate() {
    this.element.style.transform = `rotateY(${this.rotation}deg)`

    this.children.forEach(child => {
      child.element.style.transform = `rotateY(${this.rotation}deg)`

      if(this.isChildHidden(child)) {
        child.element.style.transition = 'transform 1s, zIndex 1s'
      } else {
        child.element.style.transition = 'transform 1s'
      }

      if(this.isChildHidden(child)) {
        child.element.style.zIndex = this.options.zIndex - 1
      } else {
        child.element.style.zIndex = this.options.zIndex + 1
      }
    })
  }

  getHiddenFace() {
    if (this.currentFace === 0) return 2
    if (this.currentFace === 3) return 1
    if (this.currentFace === 2) return 0
    return 3
  }

  isChildHidden({ face }) {
    return face === this.getHiddenFace() || face === this.previousHiddenFace
  }
}
