# This lookup table maps to front end classes e.g. Tone.js or Nexus.js
class WebAudioType < ApplicationRecord
  self.table_name = "audio_types"

  belongs_to :interface, inverse_of: :web_audio_types
  has_many :boxes,       inverse_of: :web_audio_type

  scope :with_interface, ->(interface) { joins(:interface).where("interface.name = ?", interface) }
  scope :blanks,         -> { with_interface(AudioTypes::INTERFACE_MAPPINGS[:blank]) }
  scope :uis,            -> { with_interface(AudioTypes::INTERFACE_MAPPINGS[:ui]) }
  scope :audio_nodes,    -> { with_interface(AudioTypes::INTERFACE_MAPPINGS[:audio_node]) }
  scope :signals,        -> { with_interface(AudioTypes::INTERFACE_MAPPINGS[:signal]) }
  scope :audio_effects,  -> { with_interface(AudioTypes::INTERFACE_MAPPINGS[:audio_effect]) }

  validates :name, presence: true,
                   uniqueness: true,
                   length: { maximum: 40 }

  def interface_type
    case name
    when "Blank"
      "Blank"
    else
      "AudioNode"
    end
  end
end
