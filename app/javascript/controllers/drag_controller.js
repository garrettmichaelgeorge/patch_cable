import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    console.log("Connecting!", this.element)
    this.isDragging = false
    this.canvasOffset = {
      left: this.element.getBoundingClientRect().left,
      top: this.element.getBoundingClientRect().top
    }
  }

  disconnect() {
    console.log("Disconnecting!")
  }

  start(event) {
    if (!this._isDraggable(event.target)) return

    this.isDragging = true
    this.draggedEl = event.target

    this.draggedEl.ondragstart = () => {
      return false
    }

    this.shiftX = event.clientX - this.draggedEl.getBoundingClientRect().left
    this.shiftY = event.clientY - this.draggedEl.getBoundingClientRect().top

    this.originalStyle = this.draggedEl.style
    this.draggedEl.style.position = "absolute"
    this.draggedEl.style.zIndex = 1000

    this._move(event.pageX, event.pageY)
    console.log("Starting drag!")
  }

  drag(event) {
    if (!this.isDragging) return

    this._move(event.pageX, event.pageY)
    console.log("Dragging!")
  }


  enter(event) {
  }

  drop(event) {
    if (!this.isDragging) return

    this.isDragging = false
    this.draggedEl.style.zIndex = this.originalStyle.zIndex
    this.draggedEl.style.position = this.originalStyle.position

    this.draggedEl = undefined
    console.log("Dropped!")
  }

  end(event) {
  }

  _move(x, y) {
    console.log(x, y)
    const moveX = x - this.shiftX - this.canvasOffset.left
    const moveY = y - this.shiftY - this.canvasOffset.top

    this.draggedEl.style.left = `${moveX}px`
    this.draggedEl.style.top = `${moveY}px`
  }

  _isDraggable(el) {
    return el.getAttribute("data-draggable")
  }
}
