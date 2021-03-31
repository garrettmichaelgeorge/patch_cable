module EndpointTestHelper
  extend ActiveSupport::Concern

  included do
    context "counter_cache columns" do
      should have_db_column(:lines_count).of_type(:integer)
    end
  end
end
