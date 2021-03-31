class AddPCClassToBoxes < ActiveRecord::Migration[6.1]
  def change
    add_column :boxes, :category, :integer, null: false
  end
end
