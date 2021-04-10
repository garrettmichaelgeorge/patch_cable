# frozen_string_literal: true

class PanelComponent < ApplicationComponent
  renders_one :heading
  renders_many :blocks, "BlockComponent"

  class BlockComponent < ApplicationComponent
    attr_reader :css_class, :url, :icon_name

    def initialize(url: nil, icon: nil, **opts)
      css_class = opts.fetch(:class) { nil }

      @css_class = token_list(css_class, "panel-block")
      @url = url
      @icon_name = icon
    end

    def call
      wrapper do
        content
      end
    end

    private

    def wrapper
      if url
        link_to url, class: css_class do
          yield
        end
      else
        content_tag :div, class: css_class do
          yield
        end
      end
    end
  end
end
