class CreateBoxes < ActiveRecord::Migration[6.1]
  def change
    create_table :boxes do |t|
      t.jsonb 'settings'

      t.timestamps
    end
  end
end
