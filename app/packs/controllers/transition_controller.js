import { Controller } from "stimulus"
// import "velocity-animate"
import "velocity-animate/velocity.ui"

export default class extends Controller {
  connect () {
    this.element.velocity("fadeInDown")
  }

  disconnect () {
    this.element.velocity("fadeOutDown")
  }
}
