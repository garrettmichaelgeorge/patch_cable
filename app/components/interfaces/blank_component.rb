# frozen_string_literal: true

class Interfaces::BlankComponent < Interfaces::BaseComponent
  def web_audio_types(web_audio_type_class = WebAudioType)
    web_audio_type_class.order(:name)
  end
end
