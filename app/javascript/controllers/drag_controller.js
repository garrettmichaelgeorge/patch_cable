import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    console.log("Connecting!", this.element)
  }

  disconnect() {
    console.log("Disconnecting!")
  }

  drag(event) {
    this._preventDefaultDrag(event.target)
    this.zIndex = event.target.style.zIndex
    // event.target.style.position = 'absolute'
    event.target.style.zIndex = 1000
    this.moveAt(event)
    event.target.style

    // move the this.element on mousemove
    // document.addEventListener('mousemove', event => {
    //   this.moveAt(event)
    // })

    // this.element.onmouseup = this.drop

    console.log("Dragged!")
  }

  // drop the this.element, remove unneeded handlers
  drop(event) {
    // document.removeEventListener('mousemove', this.move)
    event.target.style.zIndex = this.zIndex
    console.log("Dropped!")
  }

  move(event) {
    this.moveAt(event)
  }

  // moves the this.element at (pageX, pageY) coordinates,
  // taking initial shifts into account
  moveAt(event) {
    event.target.style.left = event.pageX - this.shiftX(event.clientX) + 'px'
    event.target.style.top = event.pageY - this.shiftY(event.clientY) + 'px'
  }

  _preventDefaultDrag(el) {
    el.ondragstart = () => {
      return false
    }
  }

  _prepDragging(el) {
    // el.style.position = 'absolute'
    el.style.zIndex = 1000
    // this.element.appendChild(el)
  }

  shiftX(x) {
    return x - this.element.getBoundingClientRect().left
  }

  shiftY(y) {
    return y - this.element.getBoundingClientRect().top
  }
}
