class AddLinesCountToInlets < ActiveRecord::Migration[6.1]
  def change
    add_column :inlets, :lines_count, :integer
  end
end
