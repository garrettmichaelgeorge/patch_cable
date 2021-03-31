class AddOutletsCountToBoxes < ActiveRecord::Migration[6.1]
  def change
    add_column :boxes, :outlets_count, :integer
  end
end
