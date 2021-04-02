# Inlet and Outlet are endpoints of Line
class Outlet < ApplicationRecord
  belongs_to :box, inverse_of: :outlets, counter_cache: true
  has_many :lines, inverse_of: :source, dependent: :destroy
  has_many :destinations, -> { distinct }, through: :lines
end
