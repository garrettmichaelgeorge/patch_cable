import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    this.isDragging = false
    this.canvasOffset = {
      left: this.element.getBoundingClientRect().left,
      top: this.element.getBoundingClientRect().top
    }
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
  }

  drag(event) {
    if (!this.isDragging) return

    this._move(event.pageX, event.pageY)
  }


  enter(event) {
  }

  drop(event) {
    if (!this.isDragging) return

    this.isDragging = false
    this.draggedEl.style.zIndex = this.originalStyle.zIndex
    this.draggedEl.style.position = this.originalStyle.position

    this.draggedEl = undefined

    // TODO: persist the dragged element's coordinates server-side
  }

  end(event) {
  }

  _move(x, y) {
    const moveX = x - this.shiftX - this.canvasOffset.left
    const moveY = y - this.shiftY - this.canvasOffset.top

    this.draggedEl.style.left = `${moveX}px`
    this.draggedEl.style.top = `${moveY}px`
  }

  _isDraggable(el) {
    return el.getAttribute("data-draggable")
  }
}
