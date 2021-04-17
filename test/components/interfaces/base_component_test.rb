require "test_helper"

class Interfaces::BaseComponentTest < ViewComponent::TestCase
  context "#call" do
    it "raises NotImplementedError" do
      assert_raises NotImplementedError do
        render_inline(Interfaces::BaseComponent.new(box: nil))
      end
    end
  end
end
