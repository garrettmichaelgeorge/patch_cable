require "test_helper"

class PatchesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get patches_index_url
    assert_response :success
  end

  test "should get show" do
    get patches_show_url
    assert_response :success
  end
end
