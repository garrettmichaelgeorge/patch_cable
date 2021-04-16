class CreateInterfaces < ActiveRecord::Migration[6.1]
  def change
    create_table :interfaces do |t|
      t.string :name, limit: 40, null: false

      t.timestamps
    end
    add_index :interfaces, :name, unique: true
  end
end
