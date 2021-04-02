class AddXAndYToBoxes < ActiveRecord::Migration[6.1]
  def change
    add_column :boxes, :x, :integer, null: false, default: 0
    add_column :boxes, :y, :integer, null: false, default: 0
  end
end
