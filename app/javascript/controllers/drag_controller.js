import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "draggable", "droppable" ]
  static classes = [ "isDragging", "draggable", "droppable" ]
  static values = {
    isDragging: Boolean,
    draggableOriginalPosition: Object,
    clientPosition: Object,
    draggableOffset: Object,
    canvasOffset: Object,
    subscribers: Array
  }

  connect() {
    this.allDraggables.forEach(el => {
      this._registerController(el)
    })

    this.canvasOffsetValue = {
      x: this.element.getBoundingClientRect().left,
      y: this.element.getBoundingClientRect().top
    }

    document.addEventListener(`${this.identifier}.state`, this.stateBroadcaster)
  }

  disconnect() {
    document.removeEventListener(`${this.identifier}.state`, this.stateBroadcaster)
  }

  start(event) {
    if (!this._isDraggable(event.target)) return

    event.preventDefault()

    event.target.setAttribute("data-drag-target", "draggable")
    this.isDraggingValue = true

    this.draggableOffsetValue = {
      x: event.clientX - this.draggableTarget.getBoundingClientRect().left,
      y: event.clientY - this.draggableTarget.getBoundingClientRect().top
    }

    // Update the client position state, which triggers the _move() action
    this.clientPositionValue = {
      x: event.pageX,
      y: event.pageY
    }
  }

  drag(event) {
    if (!this.isDraggingValue) return;

    this.clientPositionValue = {
      x: event.pageX,
      y: event.pageY
    }

    // if (!this.elementBelowDraggable) return;
    // const closestDroppable = this.elementBelowDraggable
    // if (closestDroppable != this.droppableTarget) return
  }

  revert(event) {
    if (!this.isDraggingValue || event.target != this.element) return;

    this.draggableTarget.style.left = this.draggableOriginalPositionValue.x
    this.draggableTarget.style.top = this.draggableOriginalPositionValue.y

    this.drop(event)
  }

  drop(event) {
    if (!this.isDraggingValue) return

    this.isDraggingValue = false
  }

  isDraggingValueChanged(isDragging) {
    if (!this.hasDraggableTarget) return

    if (isDragging) {
      this._preventDefaultOnDragStart(this.draggableTarget)

      // Store original position in case of reverting
      this.draggableOriginalPositionValue = {
        x: this.draggableTarget.style.x,
        y: this.draggableTarget.style.y
      }

      this.draggableTarget.classList.add(this.draggableClass)
      this.element.classList.add(this.isDraggingClass)
    } else {
      this.element.classList.remove(this.isDraggingClass)
      this.draggableTarget.classList.remove(this.draggableClass)
      this.draggableTarget.setAttribute("data-drag-target", "")
    }
  }

  clientPositionValueChanged({ x, y }) {
    if (!this.isDraggingValue) return

    this._move()
  }

  _move() {
    // TODO: refactor to use MouseEvent.offsetX and MouseEvent.offsetY,
    // which implements the canvasOffset logic natively
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetY

    this.draggableTarget.setAttribute("data-x", this.canvasPosition.x)
    this.draggableTarget.setAttribute("data-y", this.canvasPosition.y)

    this.draggableTarget.style.left = `${this.canvasPosition.x}px`
    this.draggableTarget.style.top = `${this.canvasPosition.y}px`
  }

  _isDraggable(el) {
    return el.getAttribute("data-draggable")
  }

  _hide(el) {
    el.hidden = true
  }

  _show(el) {
    el.hidden = false
  }

  _preventDefaultOnDragStart(el) {
    el.ondragstart = () => {
      return false
    }
  }

  _isEmpty(obj) {
    for (let _key in obj) {
      // if the loop has started, there is a property
      return false
    }
    return true
  }

  _toggle(bool) {
    if (typeof bool != Boolean) return

    bool = !bool
  }

  _registerController(el) {
    el[this.identifier] = this
  }

  // Temporarily (for a split second) hide the draggable in order to access the
  // element underneath
  get elementBelowDraggable() {
    this._hide(this.draggableTarget)

    const result = document.elementFromPoint(
      this.clientPositionValue.x,
      this.clientPositionValue.y
    )

    this._show(this.draggableTarget)

    return result
  }

  get canvasPosition() {
    return {
      x: this.clientPositionValue.x - this.offset.x,
      y: this.clientPositionValue.y - this.offset.y
    }
  }

  get offset() {
    return {
      x: this.draggableOffsetValue.x + this.canvasOffsetValue.x,
      y: this.draggableOffsetValue.y + this.canvasOffsetValue.y
    }
  }

  get allDraggables() {
    return this.element.querySelectorAll("[data-draggable]")
  }

  get stateBroadcaster() {
    return function(_event, callback) {
      callback(this)
    }.bind(this)
  }
}
