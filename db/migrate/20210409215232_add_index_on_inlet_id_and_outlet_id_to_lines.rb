class AddIndexOnInletIdAndOutletIdToLines < ActiveRecord::Migration[6.1]
  def change
    add_index :lines, [:inlet_id, :outlet_id], unique: true
  end
end
