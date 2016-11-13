require 'test_helper'

class ReactionsTest < ActiveSupport::TestCase
  def setup
    @user = User.create(name: "Pink Waters", email: "hardrock@example.com", password: "putapasswordhere")
    @other = User.create(name: "Mike Wazowsky", email: "theboy@example.com", password: "putapasswordhere")
    @post = Post.create(user: @other, content: "\u{00AD}\u{00AD}\u{00AD}")
    @like = LikeReaction.new(user: @user, post: @post)
    @wow = WowReaction.new(user: @user, post: @post)
  end
  
  test "like should be valid" do
    assert @like.valid?
  end
  
  test "wow should be valid" do
    assert @wow.valid?
  end
  
  test "like should require user" do
    @like.user = nil
    assert_not @like.valid?
  end
  
  test "wow should require user" do
    @wow.user = nil
    assert_not @wow.valid?
  end
  
  test "like should require post" do
    @like.post = nil
    assert_not @like.valid?
  end
  
  test "wow should require post" do
    @wow.post = nil
    assert_not @wow.valid?
  end
    
end