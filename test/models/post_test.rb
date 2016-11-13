require 'test_helper'

class PostTest < ActiveSupport::TestCase
  def setup
    @user = User.create(name: "Pink Waters", email: "hardrock@example.com", password: "putapasswordhere")
    @post = Post.new(user_id: @user.id, content: ":joy: :joy: :astonished:")
  end
  
  test "test post should be valid" do
    assert @post.valid?
  end
  
  test "should only accept emojis" do
    @post.content = "ayyy"
    assert_not @post.valid?
  end
  
  test "should only accept present content" do
    @post.content = nil
    assert_not @post.valid?
  end
  
  test "should only accept posts with users" do
    @post.user_id = nil
    assert_not @post.valid?
  end
end
