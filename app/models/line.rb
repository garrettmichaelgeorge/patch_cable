class Line < ApplicationRecord
  belongs_to :source, inverse_of: "outlet_lines", class_name: "Box"
  belongs_to :destination, inverse_of: "inlet_lines", class_name: "Box"
end
