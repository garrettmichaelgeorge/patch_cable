class AddLinesCountToOutlets < ActiveRecord::Migration[6.1]
  def change
    add_column :outlets, :lines_count, :integer
  end
end
