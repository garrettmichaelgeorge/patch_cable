import Nexus from 'nexusui'
import * as Tone from 'tone'
import ApplicationController from './application_controller'

/* This is the custom StimulusReflex controller for the Box Reflex.
 * Learn more at: https://docs.stimulusreflex.com
 */
export default class extends ApplicationController {
  initialize() {
    this.helloPatchCable()
  }

  connect () {
    super.connect()
    // add your code here, if applicable
  }

  disconnect () {
    [this.volume, this.osc].forEach(node => {
      node.dispose()
    })
  }

  helloPatchCable() {
    // Create interfaces
    this.toggle = new Nexus.Toggle("#toggle")
    this.gain = new Nexus.Slider("#gain")
    this.num = new Nexus.Number("#number", {
      'value': 440,
      'min': 110,
      'max': 1760,
      'step': 1
    })

    // Create sound nodes
    this.volume = new Tone.Volume(-Infinity)
    this.osc = new Tone.Oscillator(440, "sine")

    // Connect sound nodes
    this.volume.toDestination()
    this.osc.connect(this.volume)

    // Listen for interface events
    this.gain.on("change", (value) => {
      this.volume.volume.rampTo(value, .1)
    })
    this.gain.min = -100
    this.gain.max = 0
    this.gain.value = -30

    this.toggle.on("change", (value) => {
      if (value) {
        this.osc.start()
      } else {
        this.osc.stop()
      }
    })

    this.num.on("change", (value) => {
      this.osc.set({
        frequency: value
      })
    })

    console.log("Hello, PatchCable!")
  }
}
