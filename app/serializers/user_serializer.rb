class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :following
  
  def following
    if Follow.where(follower_id: @instance_options[:current_user_id], followed_id: object.id).count > 0
      return "true"
    else
      return "false"
    end
  end
end
