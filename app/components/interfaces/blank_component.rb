# frozen_string_literal: true

class Interfaces::BlankComponent < ApplicationComponent
  def initialize(box:)
    @box = box
  end

  def web_audio_types(web_audio_type_class = WebAudioType)
    # web_audio_type_class.all.map { |record| [ record.name, record.id ] }
    web_audio_type_class.order(:name)
  end

  private

  attr_reader :box
end
