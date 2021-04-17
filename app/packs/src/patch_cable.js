import AudioNodeFactory from "./audio/audio_node_factory"

class App {
  constructor () {
  }

  get AudioNodeFactory () {
    return AudioNodeFactory
  }
}

const PatchCable = new App()

export default PatchCable
