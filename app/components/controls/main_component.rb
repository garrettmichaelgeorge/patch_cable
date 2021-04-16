# frozen_string_literal: true

class Controls::MainComponent < ApplicationComponent
  def initialize(patch:)
    @patch = patch
  end

  renders_one :menu_list, "MenuListComponent"
  renders_many :controls, "ControlComponent"

  private

  attr_reader :patch

  class MenuListComponent < ApplicationComponent
    def call
      content_tag :ul, class: "menu-list" do
        content
      end
    end
  end

  class ControlComponent < ApplicationComponent
    def initialize(icon:, type: :button, **opts)
      # Rename :icon parameter to avoid naming conflicts with IconHelper#icon
      @icon_type = icon
      @type = type
      @css_class = set_up_css_class(opts.delete(:class))
      @opts = opts
    end

    def call
      content_tag :li do
        tag.button class: set_up_css_class, **opts do
          icon_tag icon_type
        end
      end
    end

    private

    attr_reader :icon_type, :type, :css_class, :opts

    def set_up_css_class(custom_css_class = "")
      token_list("button", custom_css_class)
    end
  end
end
