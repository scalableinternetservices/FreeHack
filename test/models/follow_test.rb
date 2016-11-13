require 'test_helper'

class FollowTest < ActiveSupport::TestCase
  def setup
    @user = User.create(name: "Pink Waters", email: "hardrock@example.com", password: "putapasswordhere")
    @other = User.create(name: "Mike Wazowsky", email: "theboy@example.com", password: "putapasswordhere")
    @follow = Follow.new(follower: @user, followed: @other)
  end
  
  test "follow should be valid" do
    assert @follow.valid?
  end
  
  test "needs follower" do
    @follow.follower_id = nil
    assert_not @follow.valid?
  end
  
  test "needs followed" do
    @follow.followed_id = nil
    assert_not @follow.valid?
  end
  
  # test "shouldn't follow self" do
  #   @follow.follower_id = @follow.followed_id
  #   assert_not @follow.valid?
  # end
  
end
