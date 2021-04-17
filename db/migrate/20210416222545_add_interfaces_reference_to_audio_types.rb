class AddInterfacesReferenceToAudioTypes < ActiveRecord::Migration[6.1]
  def change
    add_reference :audio_types, :interface, foreign_key: true
  end
end
