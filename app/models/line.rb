class Line < ApplicationRecord
  belongs_to :source,      inverse_of: :lines, counter_cache: true,
                           class_name: "Outlet", foreign_key: "outlet_id"
  belongs_to :destination, inverse_of: :lines, counter_cache: true,
                           class_name: "Inlet", foreign_key: "inlet_id"

  alias_attribute :source_id, :outlet_id
  alias_attribute :destination_id, :inlet_id

  def to_key
    ["#{source_id}", "#{destination_id}"]
  end

  def join_id
    to_key.join("_")
  end
end
