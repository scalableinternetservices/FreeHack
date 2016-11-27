class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :bio, :following
  
  def following
    # get cached array of follows with serialized user as followed
    follows = Rails.cache.fetch("users/#{object.id}/followers", expires_in: 24.hours) do
      puts "cache: fetching followers for user: #{object.id}"
      Follow.where(followed_id: object.id).pluck(:follower_id)
    end
    
    # check for an instance with follower current_user
    following = follows.select { |followerID| followerID == @instance_options[:current_user_id] }
    if following.count > 0
      return "true"
    else
      return "false"
    end
  end
end
