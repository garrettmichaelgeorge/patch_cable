// Wrapper class for Tone.AudioNode or AudioNode
export default class {
  build (type) {
    let result

    switch (type) {
      case "oscillator":
        result = new Tone.Oscillator()
        break;
      case "destination":
        result = Tone.Destination
        break;
      case null:
        throw Error, `Audio type not present in the DOM. Check data-audio-type`
      default:
        throw Error, `Audio type not recognized: "${type}"`
    }

    return result
  }
}
