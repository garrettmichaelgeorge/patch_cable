class RenameAudioNodes < ActiveRecord::Migration[6.1]
  def change
    rename_table :audio_nodes, :audio_types
  end
end
