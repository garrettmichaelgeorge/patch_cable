// Entry point for custom JavaScript code

import * as Tone from "tone"
import Nexus from "nexusui"

function helloPatchCable() {
  // Create interfaces
  let gain = new Nexus.Slider("#gain")
  let num = new Nexus.Number("#number")

  // Create sound nodes
  const volume = new Tone.Volume(-Infinity)
  const osc = new Tone.Oscillator(440, "sine")

  // Connect sound nodes
  volume.toDestination()
  osc.connect(volume)

  // Listen for interface events
  gain.on("change", (value) => {
    volume.volume.rampTo(value, .1)
  })
  gain.min = -100
  gain.max = 0
  gain.value = -30

  console.log("Hello, PatchCable!")
}
