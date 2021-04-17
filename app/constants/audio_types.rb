module AudioTypes
  BLANK = [ "Blank" ].freeze

  DESTINATION = [ "Destination" ].freeze

  AUDIO_NODE = %w[
    Oscillator
    AMOscillator
    FMOscillator
    FatOscillator
    GrainPlayer
    LFO
    Noise
    OmniOscillator
    PWMOscillator
    Player
    Players
    PulseOscillator
    ToneBufferSource
    ToneOscillatorNode
    UserMedia
  ].freeze

  AUDIO_EFFECT = %w[
    AutoFilter
    AutoPanner
    AutoWah
    BitCrusher
    Chebyshev
    Chorus
    Distortion
    FeedbackDelay
    Freeverb
    FrequencyShifter
    JCReverb
    MidSideEffect
    Phaser
    PingPongDelay
    PitchShift
    Reverb
    StereoWidener
    Tremolo
    Vibrato
  ].freeze

  SIGNAL = %w[
    Abs
    Add
    AudioToGain
    GainToAudio
    GreaterThan
    GreaterThanZero
    Multiply
    Negate
    Pow
    Scale
    ScaleExp
    Signal
    Subtract
    ToneConstantSource
    WaveShaper
    Zero
  ].freeze

  UI = %w[
    Button
    Dial
    Number
    Position
    Slider
    Toggle
    Envelope
    Multislider
    Piano
    RadioButton
    Select
    Sequencer
    TextButton
    Tilt
    Pan
    Pan2d
    Meter
    Oscilloscope
    Spectrogram
  ].freeze

  INTERFACE_MAPPINGS = {
    blank: BLANK,
    destination: DESTINATION,
    audio_node: AUDIO_NODE,
    audio_effect: AUDIO_EFFECT,
    signal: SIGNAL,
    ui: UI
  }.freeze
end
