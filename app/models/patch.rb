class Patch < ApplicationRecord
  has_many :boxes, -> { with_endpoints.with_web_audio_type },
                   inverse_of: :patch

  # Note: Patch's lines are box destination lines only (not source lines) in
  # order to eliminate redundancy
  has_many :lines, through: :boxes, source: :destination_lines,
                   inverse_of: :patch

  validates :name, presence: true,
                   length: { maximum: 80 }
end
