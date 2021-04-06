# Inlet and Outlet are endpoints of Line
class Inlet < ApplicationRecord
  belongs_to :box, inverse_of: :inlets, counter_cache: true, touch: true
  has_many :lines, inverse_of: :destination, dependent: :destroy
  has_many :sources, -> { distinct }, through: :lines
end
