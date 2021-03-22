class CreateLines < ActiveRecord::Migration[6.1]
  def change
    create_table :lines do |t|
      t.references :source, null: false, foreign_key: [ to_table: :boxes ]
      t.references :destination, null: false, foreign_key: [ to_table: :boxes ]

      t.timestamps
    end
  end
end
