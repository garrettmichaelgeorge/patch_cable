import { Controller } from "stimulus"

export default class extends Controller {
  static classes = [ "active" ]
  static targets = [ "activatable" ]
  static values = {
    isActive: Boolean
  }

  toggle () {
    if (!this.hasActivatableTarget) return

    this.isActiveValue = !this.isActiveValue
  }

  isActiveValueChanged (value) {
    if (value) {
      this._activateAll()
    } else {
      this._deactivateAll()
    }
  }

  _activateAll () {
    console.log("Activating!")

    this.activatableTargets.forEach(target => {
      this._activate(target)
    })
  }

  _deactivateAll () {
    console.log("Deactivating!")

    this.activatableTargets.forEach(target => {
      this._deactivate(target)
    })
  }

  _activate(el) {
    el.classList.add(this.activeClass)
  }

  _deactivate(el) {
    el.classList.remove(this.activeClass)
  }
}
