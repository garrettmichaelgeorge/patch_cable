class AddBoxesCountToPatches < ActiveRecord::Migration[6.1]
  def change
    add_column :patches, :boxes_count, :integer
  end
end
