class AddInletsCountToBoxes < ActiveRecord::Migration[6.1]
  def change
    add_column :boxes, :inlets_count, :integer
  end
end
