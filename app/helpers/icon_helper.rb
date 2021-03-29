module IconHelper
  WRAPPER_CLASS = "icon".freeze
  ICON_TYPES = { solid: "fas",
                 brand: "fab" }.freeze

  def icon_tag(name, type: :solid)
    tag.icon_wrapper class: WRAPPER_CLASS do
      tag.icon class: icon_class_for(name, type) do
        yield if block_given?
      end
    end
  end

  def icon_class_for(name, type)
    token_list(icon_base_class_for(type),
               icon_modifier_class_for(name))
  end

  private

  def icon_base_class_for(type)
    ICON_TYPES.fetch(type) { ICON_TYPES[:solid] }
  end

  def icon_modifier_class_for(name)
    base = "fa"
    name = name.to_s.dasherize

    "#{base}-#{name}"
  end
end
