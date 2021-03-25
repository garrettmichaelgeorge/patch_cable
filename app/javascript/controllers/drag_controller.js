import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    console.log("Connecting!", this.element)
  }

  disconnect() {
    console.log("Disconnecting!")
  }

  start(event) {
    event.dataTransfer.setData("application/drag-key", event.target.id)
    event.dataTransfer.effectAllowed = "move"
  }

  drag(event) {
    event.preventDefault()
    // event.dataTransfer.dropEffect = "move"
    // el.style.left = `${event.pageX}px`
    // el.style.top = `${event.pageY}px`
    return true
  }

  enter(event) {
    event.preventDefault()
  }

  drop(event) {
    event.preventDefault()
    
    const dragKey = event.dataTransfer.getData("application/drag-key")
    const el = this.element.getElementById(dragKey)
    el.style.left = `${event.pageX}px`
    el.style.top = `${event.pageY}px`

    // const dropTarget = event.target
    // // const draggedItem = this.element.getElementsByTagName
    // const positionComparison = dropTarget.compareDocumentPosition(d)

    // if (positionComparison & 4) {
    //   event.target.insertAdjacent
    // }
  }

  end(event) {
  }
}
