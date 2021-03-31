class CreateOutlets < ActiveRecord::Migration[6.1]
  def change
    create_table :outlets do |t|
      t.references :box, null: false, foreign_key: true

      t.timestamps
    end
  end
end
