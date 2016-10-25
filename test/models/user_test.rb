require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: "Pink Waters", email: "hardrock@example.com", password: "putapasswordhere")
  end
  
  test "user should be valid" do
    assert @user.valid?
  end
  
  # test "name should be present" do
  #   @user.name = "     "
  #   assert_not @user.valid?
  # end
  
  test "email should be present" do
    @user.email = "     "
    assert_not @user.valid?
  end
  
  test "name maximum length" do
    @user.name = "a" * 75 + "@example.com"
    assert_not @user.valid?
  end
  
  test "email maximum length" do
    @user.email = "a" * 256 + "@example.com"
    assert_not @user.valid?
  end
  
  test "valid emails should be accepted" do
    valid_email_addresses = %w[dog@example.com dogood@example.com xxyyxx@pizzaplanet.net]
    valid_email_addresses.each do |valid_email|
      @user.email = valid_email
      assert @user.valid?, "email should be valid: #{valid_email}"
    end
  end
  
  test "invalid emails should not be accepted" do
    invalid_email_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_email_addresses.each do |invalid_email|
      @user.email = invalid_email
      assert_not @user.valid?, "email should not be valid: #{invalid_email}"
    end
  end
  
  test "email addresses should be unique" do
    @dup_user = @user.dup
    @dup_user.email = @user.email.upcase
    @user.save
    assert_not @dup_user.valid?
  end
end
