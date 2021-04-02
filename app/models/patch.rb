class Patch < ApplicationRecord
  has_many :boxes, -> { with_endpoints },
                   inverse_of: :patch

  validates :name, presence: true,
                   length: { maximum: 80 }
end
