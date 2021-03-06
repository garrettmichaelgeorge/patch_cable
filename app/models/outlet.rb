# Inlet and Outlet are endpoints of Line
class Outlet < ApplicationRecord
  belongs_to :box, inverse_of: :outlets, counter_cache: true, touch: true
  has_many :lines, inverse_of: :source, dependent: :destroy,
                   foreign_key: "outlet_id"
  has_many :destinations, through: :lines
end
