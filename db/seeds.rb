# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

require_relative "../app/constants/audio_types.rb"

AudioTypes::INTERFACE_MAPPINGS.each do |interface, audio_type|
  Interface.find_or_create_by!(name: interface)
end

AudioTypes::INTERFACE_MAPPINGS.each do |interface, audio_types|
  audio_types.each do |audio_type|
    WebAudioType.find_or_create_by!(name: audio_type,
                                    interface: Interface.find_by(name: interface))
  end
end
