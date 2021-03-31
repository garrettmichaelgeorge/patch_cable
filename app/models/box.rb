class Box < ApplicationRecord
  serialize :settings

  belongs_to :patch, inverse_of: :boxes
  has_many :inlets, inverse_of: :box, dependent: :destroy
  has_many :outlets, inverse_of: :box, dependent: :destroy

  def type
    "destination"
  end
end
