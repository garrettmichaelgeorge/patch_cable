class Line < ApplicationRecord
  belongs_to :source,      inverse_of: :lines, counter_cache: true,
                           class_name: "Outlet", foreign_key: "outlet_id"
  belongs_to :destination, inverse_of: :lines, counter_cache: true,
                           class_name: "Inlet", foreign_key: "inlet_id"
end
