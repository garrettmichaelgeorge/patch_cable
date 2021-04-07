import { Controller } from "stimulus"

export default class extends Controller {
  static classes = [ "active" ]
  static targets = [ "modal" ]
  static values = {
    active: Boolean
  }

  toggle (event) {
    if (!this.hasModalTarget) return

    if (this.activeValue) {
      this.modalTarget.classList.remove(this.activeClass)
    } else {
      this.modalTarget.classList.add(this.activeClass)
    }
  }
}
