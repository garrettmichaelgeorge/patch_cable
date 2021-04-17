class Interface < ApplicationRecord
  has_many :web_audio_types, inverse_of: :interface, dependent: :destroy

  validates :name, presence: true,
                   uniqueness: true,
                   length: { maximum: 40 }
end
