# frozen_string_literal: true

class LineComponent < ApplicationComponent
  def initialize(line:)
    @line = line
  end

  private

  attr_reader :line
end
