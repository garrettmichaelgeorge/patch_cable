# Credit: Scott Barrow
# https://railsbytes.com/templates/xjNsDY

module ViewComponentHelper
  # OPTIMIZE: DRY out the duplication in these two methods
  # Usage:
  # <%= component :my_component, pickles: pickles %>
  # <%= component "products/pickle", product: product %>
  # <%= component "products/pickle", product: product %>
  def component(name, context: nil, **args, &block)
    cache_keys = Array(args.delete(:cache))

    cache_if cache_keys.present?, cache_keys do
      if context
        return render_component_in(context, name, **args, &block)
      else
        return render component_class_for(name).new(args), &block
      end
    end
  end

  # Usage:
  # <%= component_with_collection :my_component, collection: pickles %>
  def component_with_collection(name, collection:, context: nil, **args, &block)
    cache_keys = Array(args.delete(:cache))

    cache_if cache_keys.present?, cache_keys do
      return render(component_class_for(name).with_collection(collection, args), &block)
    end
  end

  def render_component_in(context, name, **args, &block)
    component_class_for(name).new(args)
                             .render_in(context, &block)
  end
  
  private

  def component_class_for(path)
    name, namespace = path.to_s.split("/").reverse

    file_name = name + "_component"
    component_name = file_name.classify
    namespace ||= namespace(file_name)
    return (namespace.capitalize + "::" + component_name).constantize unless namespace == "components"

    component_name.constantize
  end

  def namespace(file_name)
    file_path = component_path(file_name)
    File.dirname(file_path).split("/").last
  end

  def component_path(file_name)
    Dir.glob(File.join(Rails.root, "app", "components", "**", file_name + ".rb"))
      .first
  end
end 
