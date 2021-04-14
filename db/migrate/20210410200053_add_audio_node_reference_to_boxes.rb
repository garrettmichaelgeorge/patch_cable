class AddAudioNodeReferenceToBoxes < ActiveRecord::Migration[6.1]
  def change
    add_reference :boxes, :audio_node, null: false, foreign_key: true
  end
end
