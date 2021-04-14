class CreateAudioNodes < ActiveRecord::Migration[6.1]
  def change
    create_table :audio_nodes do |t|
      t.string :name, limit: 40, null: false

      t.timestamps
    end
    add_index :audio_nodes, :name, unique: true
  end
end
