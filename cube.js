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
    <div class="cube__face cube__face--front"></div>
    <div class="cube__face cube__face--back"></div>
    <div class="cube__face cube__face--right"></div>
    <div class="cube__face cube__face--left"></div>
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
    this.element = createElement(template)
    stylize(this.element, makeStyle(options))
  }
}
