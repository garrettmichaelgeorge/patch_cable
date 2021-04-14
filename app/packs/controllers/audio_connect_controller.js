import ApplicationController from "./application_controller"
import fastdom from "fastdom"
import * as Tone from "tone"

export default class extends ApplicationController {
  static targets = [ "connection" ]
  static values = {
    sourceId: String,
    destinationId: String
  }

  connect () {
    if (!(this.hasSourceIdValue && this.hasDestinationIdValue)) {
      throw Error, `Missing sourceIdValue (${this.sourceIdValue}) and/or destinationIdValue (${this.destinationIdValue})`
    }

    this.sourceElement = document.getElementById(this.sourceIdValue)
    this.destinationElement = document.getElementById(this.destinationIdValue)

    console.log(
      "Connecting: ",
      this.sourceElement,
      this.sourceBox,
      this.sourceNode,
      this.destinationElement,
      this.destinationBox,
      this.destinationNode
    )

    Tone.connect(this.sourceNode, this.destinationNode)
  }

  disconnect () {
    Tone.disconnect(this.sourceNode, this.destinationNode)
  }

  get sourceNode () {
    return this.sourceBox.audioNodeController.audioNode
  }

  get destinationNode () {
    return this.destinationBox.audioNodeController.audioNode
  }

  get sourceBox () {
    return this.sourceElement.parentElement.parentElement
  }

  get destinationBox () {
    return this.destinationElement.parentElement.parentElement
  }
}
