# This lookup table maps to Tone.js classes
class WebAudioType < ApplicationRecord
  self.table_name = "audio_nodes"

  has_many :boxes, inverse_of: :web_audio_type

  validates :name, presence: true,
                   uniqueness: true,
                   length: { maximum: 40 }
end
