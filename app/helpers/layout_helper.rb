module LayoutHelper
  def header_class
    header_size = if content_for?(:header_class)
                    content_for(:header_class)
                  else
                    ""
                  end

    token_list("hero", "is-dark", header_size)
  end
end
