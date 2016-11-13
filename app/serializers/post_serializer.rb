class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :wow_count, :like_count, :liked, :wowed
  belongs_to :user, embed: :id, include: false
  
  def wow_count
    object.wow_reactions.size
  end
  
  def like_count
    object.like_reactions.size
  end
  
  def liked
    if LikeReaction.where(user_id: @instance_options[:current_user_id], post_id: object.id).count > 0
      return "true"
    else
      return "false"
    end
  end
  
  def wowed
    if WowReaction.where(user_id: @instance_options[:current_user_id], post_id: object.id).count > 0
      return "true"
    else
      return "false"
    end
  end
end
