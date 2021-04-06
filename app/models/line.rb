class Line < ApplicationRecord
  belongs_to :source,       inverse_of: :lines, counter_cache: true,
                            class_name: "Outlet", foreign_key: "outlet_id"
  belongs_to :destination,  inverse_of: :lines, counter_cache: true,
                            class_name: "Inlet", foreign_key: "inlet_id"
  has_one :source_box,      through: :source,      source: :box,
                            inverse_of: :destination_lines
  has_one :destination_box, through: :destination, source: :box,
                            inverse_of: :source_lines
  has_one :patch,           through: :source_box, inverse_of: :lines

  alias_attribute :source_id, :outlet_id
  alias_attribute :destination_id, :inlet_id

  def to_key
    ["#{source_id}", "#{destination_id}"]
  end

  def join_id
    to_key.join("_")
  end
end
