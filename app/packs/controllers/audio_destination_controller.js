import ApplicationController from "./application_controller"
import fastdom from "fastdom"
import * as Tone from "tone"

export default class extends ApplicationController {
  static targets = [ "node" ]

  connect () {
    // Pretend to be an AudioNodeController to play the role of audioNode
    this.element["audioNodeController"] = this
  }

  // Call from other controllers to access Tone.Destination
  get audioNode () {
    return this.destination
  }

  get destination () {
    return Tone.getDestination()
  }
}
