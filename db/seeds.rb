# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

require_relative "../app/constants/audio_types.rb"

AudioTypes::AUDIO_TYPES.each do |type|
  WebAudioType.find_or_create_by!(name: type)
end
