class CreateLinesV2 < ActiveRecord::Migration[6.1]
  def change
    create_join_table :inlets, :outlets, table_name: "lines" do |t|
      t.index :inlet_id
      t.index :outlet_id

      t.timestamps
    end
  end
end
