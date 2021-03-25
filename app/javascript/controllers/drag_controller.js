import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    console.log("Connecting!", this.element)
  }

  disconnect() {
    console.log("Disconnecting!")
  }

  start(event) {
  }

  drag(event) {
  }

  enter(event) {
  }

  drop(event) {
  }

  end(event) {
  }
}
