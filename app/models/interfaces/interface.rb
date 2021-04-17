class Interfaces::Interface
  attr_reader :audio_type

  def initialize(audio_type:)
    @audio_type = audio_type
  end
end
